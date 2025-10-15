import { NextResponse } from "next/server"
import { Groq } from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { recipeName, ingredients } = await req.json()

    if (!recipeName) {
      return NextResponse.json({ error: "Recipe name is required" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured. Please add it to your .env.local file." },
        { status: 500 }
      )
    }

    const prompt = `Provide detailed cooking instructions and information for the recipe "${recipeName}" using these ingredients: ${ingredients?.join(", ") || "general ingredients"}.

Provide the response in the following JSON format (and ONLY JSON, no markdown or additional text):
{
  "ingredients": [
    {
      "item": "ingredient name",
      "amount": "quantity and unit"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "instruction": "detailed step"
    }
  ],
  "tips": [
    "helpful cooking tip"
  ],
  "nutrition": {
    "calories": "approximate calories per serving",
    "protein": "grams",
    "carbs": "grams",
    "fat": "grams"
  }
}

Make sure to include at least 6-8 ingredients, 6-8 detailed cooking steps, 3-4 helpful tips, and accurate nutrition information.`

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 2048,
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

    const details = JSON.parse(cleanedText)

    return NextResponse.json({ details })
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch recipe details" },
      { status: 500 }
    )
  }
}