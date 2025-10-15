import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json()

    if (!ingredients || ingredients.length === 0) {
      return Response.json({ recipes: [] }, { status: 400 })
    }

    const prompt = `You are a professional chef and recipe expert. Based on the following ingredients, suggest 3-5 delicious recipes that can be made with these ingredients.

Ingredients available: ${ingredients.join(", ")}

For each recipe, provide:
1. Recipe name
2. Brief description (1-2 sentences)
3. List of main ingredients needed (from the provided list)
4. Estimated cook time (e.g., "30 minutes")
5. Difficulty level (easy, medium, hard)

Format your response as a JSON array with objects containing: name, description, ingredients (array), cookTime, difficulty

Return ONLY the JSON array, no additional text.`

    const { text } = await generateText({
      model: "openai/gpt-4-mini",
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    })

    // Parse the response
    let recipes = []
    try {
      recipes = JSON.parse(text)
    } catch {
      // If parsing fails, return empty array
      console.error("Failed to parse recipes:", text)
      return Response.json({ recipes: [] })
    }

    // Add IDs to recipes
    const recipesWithIds = recipes.map((recipe: any, index: number) => ({
      id: `recipe-${Date.now()}-${index}`,
      ...recipe,
    }))

    return Response.json({ recipes: recipesWithIds })
  } catch (error) {
    console.error("Error generating recipes:", error)
    return Response.json({ recipes: [], error: "Failed to generate recipes" }, { status: 500 })
  }
}
