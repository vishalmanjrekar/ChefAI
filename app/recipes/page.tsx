"use client"

import { useState, useEffect } from "react"
import { IngredientSelector } from "@/components/ingredient-selector"
import { RecipeCard } from "@/components/recipe-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { loadPreferences } from "@/lib/preferences"
import type { UserPreferences } from "@/types/preferences"

interface Recipe {
  title: string
  description: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  servings: string
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)

  useEffect(() => {
    setPreferences(loadPreferences())
  }, [])

  const handleGenerateRecipes = async (ingredients: string[]) => {
    setIsLoading(true)
    setSelectedIngredients(ingredients)

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, preferences }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate recipes")
      }

      const data = await response.json()
      setRecipes(data.recipes)
    } catch (error) {
      console.error("Error generating recipes:", error)
      setRecipes([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🍳</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">ChefAI</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/preferences" className="text-sm text-muted-foreground hover:text-foreground transition">
              Preferences
            </Link>
            <Link href="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition">
              Favorites
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {recipes.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Ingredient Selector */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-foreground text-balance">Find Your Perfect Recipe</h2>
                <p className="text-lg text-muted-foreground">
                  Select ingredients you have on hand and discover AI-suggested recipes tailored just for you.
                </p>
              </div>
              <IngredientSelector onGenerateRecipes={handleGenerateRecipes} isLoading={isLoading} />
            </div>

            {/* Right: Info Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-primary mb-2">How It Works</p>
                  <h3 className="text-2xl font-bold text-foreground">Smart Recipe Discovery</h3>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Select Ingredients",
                      description: "Choose from common ingredients or add your own",
                    },
                    {
                      step: "2",
                      title: "AI Analyzes",
                      description: "Our AI engine finds the best recipe combinations",
                    },
                    {
                      step: "3",
                      title: "Get Suggestions",
                      description: "Receive personalized recipe recommendations",
                    },
                    {
                      step: "4",
                      title: "Cook & Enjoy",
                      description: "Follow the recipe and create delicious meals",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Recipe Suggestions</h2>
                <p className="text-muted-foreground mt-2">Based on: {selectedIngredients.join(", ")}</p>
              </div>
              <Button
                onClick={() => {
                  setRecipes([])
                  setSelectedIngredients([])
                }}
                variant="outline"
                className="border-border"
              >
                Try Again
              </Button>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  ingredients={selectedIngredients}
                  onViewDetails={() => {
                    // Navigation handled in RecipeCard component
                  }}
                  onAddToFavorites={() => {
                    // Will integrate with favorites system
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
