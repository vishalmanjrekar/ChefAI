import { NextRequest, NextResponse } from "next/server"
import type { UserPreferences } from "@/types/preferences"
import { DietaryRestriction } from "@/types/preferences"

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, preferences } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Build dietary context from preferences
    let dietaryContext = ""
    if (preferences) {
      const prefs = preferences as UserPreferences
      
      if (prefs.dietaryRestriction === DietaryRestriction.VEGETARIAN) {
        dietaryContext = "\n\nIMPORTANT: The user is VEGETARIAN. Never suggest recipes with meat, poultry, or seafood. Focus on vegetarian options."
      } else if (prefs.dietaryRestriction === DietaryRestriction.VEGAN) {
        dietaryContext = "\n\nIMPORTANT: The user is VEGAN. Never suggest recipes with any animal products (meat, dairy, eggs, honey). Focus on plant-based options only."
      }
      
      if (prefs.allergyRestrictions.length > 0) {
        const allergies = prefs.allergyRestrictions.map(a => a.replace(/_/g, " ")).join(", ")
        dietaryContext += `\nThe user has the following dietary restrictions: ${allergies}. Avoid suggesting recipes with these ingredients.`
      }
      
      if (prefs.tastePreferences.length > 0) {
        dietaryContext += `\nThe user prefers ${prefs.tastePreferences.join(", ")} flavors.`
      }
      
      if (prefs.cuisinePreferences.length > 0) {
        dietaryContext += `\nThe user enjoys ${prefs.cuisinePreferences.join(", ")} cuisines.`
      }
    }

    // Build the conversation context for the AI
    const systemPrompt = `You are a helpful Recipe Assistant AI. You specialize in:
- Recipe suggestions and recommendations
- Cooking techniques and methods
- Ingredient substitutions
- Dietary preferences (vegetarian, vegan, gluten-free, etc.)
- Cooking tips and tricks
- Meal planning
- Kitchen equipment advice
- Food safety and storage

Provide helpful, accurate, and friendly responses about recipes and cooking. Keep responses concise but informative. Use bullet points when listing multiple items.${dietaryContext}`

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ]

    // Try Groq API first, then OpenAI, then fallback to mock
    const groqApiKey = process.env.GROQ_API_KEY
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (groqApiKey) {
      // Use Groq API
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      })

      if (!response.ok) {
        throw new Error("Groq API request failed")
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

      return NextResponse.json({
        response: aiResponse,
      })
    } else if (openaiApiKey) {
      // Use OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) {
        throw new Error("OpenAI API request failed")
      }

      const data = await response.json()
      const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again."

      return NextResponse.json({
        response: aiResponse,
      })
    } else {
      // Fallback to mock responses if no API key is configured
      return NextResponse.json({
        response: getMockResponse(message),
      })
    }
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}

// Mock response function as fallback
function getMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return "Hello! I'm your Recipe Assistant. I can help you with recipe suggestions, cooking tips, ingredient substitutions, and more. What would you like to know?"
  }

  if (lowerMessage.includes("ingredient") && lowerMessage.includes("substitute")) {
    return "I can help with ingredient substitutions! For example:\n• Butter → Coconut oil or applesauce\n• Eggs → Flax eggs or mashed banana\n• Milk → Almond milk or oat milk\n\nWhat specific ingredient are you looking to substitute?"
  }

  if (lowerMessage.includes("vegetarian") || lowerMessage.includes("vegan")) {
    return "Great choice! I can suggest delicious vegetarian/vegan recipes. Some popular options include:\n• Chickpea curry\n• Veggie stir-fry\n• Lentil soup\n• Buddha bowls\n• Pasta primavera\n\nWould you like a detailed recipe for any of these?"
  }

  if (lowerMessage.includes("quick") || lowerMessage.includes("fast") || lowerMessage.includes("30 min")) {
    return "Here are some quick recipes you can make in 30 minutes or less:\n• Pasta aglio e olio\n• Chicken stir-fry\n• Caprese salad\n• Quesadillas\n• Fried rice\n\nWhich one interests you?"
  }

  if (lowerMessage.includes("dessert") || lowerMessage.includes("sweet")) {
    return "Sweet tooth? Here are some delightful dessert ideas:\n• Chocolate chip cookies\n• Tiramisu\n• Fruit tart\n• Brownies\n• Panna cotta\n\nWould you like the recipe for any of these?"
  }

  if (lowerMessage.includes("healthy") || lowerMessage.includes("diet")) {
    return "For healthy eating, consider:\n• Grilled salmon with vegetables\n• Quinoa salad\n• Greek yogurt parfait\n• Smoothie bowls\n• Roasted chicken with sweet potato\n\nThese are nutritious and delicious!"
  }

  if (lowerMessage.includes("pasta") || lowerMessage.includes("italian")) {
    return "Italian cuisine is wonderful! Try these pasta dishes:\n• Carbonara\n• Bolognese\n• Pesto pasta\n• Cacio e pepe\n• Arrabbiata\n\nWould you like step-by-step instructions for any?"
  }

  if (lowerMessage.includes("chicken")) {
    return "Chicken is so versatile! Popular recipes include:\n• Grilled chicken breast\n• Chicken tikka masala\n• Lemon herb chicken\n• Chicken parmesan\n• Teriyaki chicken\n\nWhat style are you in the mood for?"
  }

  if (lowerMessage.includes("soup")) {
    return "Soups are comforting and nutritious! Here are some favorites:\n• Tomato soup\n• Chicken noodle soup\n• Minestrone\n• French onion soup\n• Butternut squash soup\n\nWould you like a recipe for any of these?"
  }

  if (lowerMessage.includes("how") && (lowerMessage.includes("cook") || lowerMessage.includes("make"))) {
    return "I'd be happy to guide you through cooking! Could you be more specific about what you'd like to make? For example:\n• A specific dish\n• A type of cuisine\n• Using certain ingredients\n• Dietary preferences"
  }

  if (lowerMessage.includes("tip") || lowerMessage.includes("advice")) {
    return "Here are some essential cooking tips:\n• Always read the recipe fully before starting\n• Prep all ingredients before cooking (mise en place)\n• Season as you go, not just at the end\n• Let meat rest after cooking\n• Taste and adjust seasoning\n\nNeed tips for something specific?"
  }

  // Default response
  return "I'm here to help with all your recipe questions! You can ask me about:\n• Recipe suggestions\n• Cooking techniques\n• Ingredient substitutions\n• Dietary preferences\n• Cooking tips and tricks\n\nWhat would you like to know?"
}