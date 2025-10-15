import { NextResponse } from "next/server"
import { Groq } from "groq-sdk"
import { z } from "zod"
import type { UserPreferences } from "@/types/preferences"
import { DietaryRestriction } from "@/types/preferences"

const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cookTime: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  servings: z.string(),
})

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { ingredients, preferences } = await req.json()

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json({ error: "At least one ingredient is required" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured. Please add it to your .env.local file." },
        { status: 500 }
      )
    }

    // Build dietary restrictions text
    let dietaryText = ""
    if (preferences) {
      const prefs = preferences as UserPreferences
      
      // Primary dietary restriction
      if (prefs.dietaryRestriction === DietaryRestriction.VEGETARIAN) {
        dietaryText = "IMPORTANT: All recipes MUST be vegetarian (no meat, poultry, or seafood). "
      } else if (prefs.dietaryRestriction === DietaryRestriction.VEGAN) {
        dietaryText = "IMPORTANT: All recipes MUST be vegan (no animal products including meat, dairy, eggs, honey). "
      }
      
      // Allergy restrictions
      if (prefs.allergyRestrictions.length > 0) {
        const allergies = prefs.allergyRestrictions.map(a => a.replace(/_/g, " ")).join(", ")
        dietaryText += `Must be ${allergies}. `
      }
      
      // Taste preferences
      if (prefs.tastePreferences.length > 0) {
        dietaryText += `Preferred flavors: ${prefs.tastePreferences.join(", ")}. `
      }
      
      // Cooking time
      if (prefs.cookingTime === "quick") {
        dietaryText += "Prefer recipes that take 15-30 minutes. "
      } else if (prefs.cookingTime === "medium") {
        dietaryText += "Prefer recipes that take 30-60 minutes. "
      }
      
      // Difficulty
      if (prefs.difficultyLevel) {
        dietaryText += `Difficulty should match ${prefs.difficultyLevel} skill level. `
      }
      
      // Cuisine preferences
      if (prefs.cuisinePreferences.length > 0) {
        dietaryText += `Preferred cuisines: ${prefs.cuisinePreferences.join(", ")}. `
      }
    }

    const prompt = `Generate 3 unique and delicious recipe suggestions based on these ingredients: ${ingredients.join(", ")}.

${dietaryText}

For each recipe, provide:
1. Recipe title
2. Brief description (1 sentence)
3. Estimated cook time (e.g., "30 minutes")
4. Difficulty level (Easy, Medium, or Hard)
5. Number of servings

Format your response as a JSON array with objects containing: title, description, cookTime, difficulty, servings.
Only return valid JSON, no markdown formatting or additional text.

Example format:
[
  {
    "title": "Recipe Name",
    "description": "Brief description",
    "cookTime": "30 minutes",
    "difficulty": "Medium",
    "servings": "4"
  }
]`

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
    })

    const responseText = chatCompletion.choices[0]?.message?.content || ""

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = responseText.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\n?/, "").replace(/\n?```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\n?/, "").replace(/\n?```$/, "")
    }

    // Parse the JSON response
    const recipes = JSON.parse(cleanedText)

    // Validate the recipes
    const validatedRecipes = recipes.map((recipe: any) => recipeSchema.parse(recipe))

    return NextResponse.json({ recipes: validatedRecipes })
  } catch (error) {
    console.error("Error generating recipes:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate recipes" },
      { status: 500 }
    )
  }
}