"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  cookTime: string
  difficulty: string
  instructions?: string[]
}

export default function RecipeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const recipeId = params.id as string
    const allRecipes = sessionStorage.getItem("recipes") || "[]"

    try {
      const recipes = JSON.parse(allRecipes)
      const found = recipes.find((r: Recipe) => r.id === recipeId)
      if (found) {
        setRecipe(found)
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        setIsFavorited(favorites.some((r: Recipe) => r.id === recipeId))
      }
    } catch (error) {
      console.error("Error loading recipe:", error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  const handleToggleFavorite = () => {
    if (!recipe) return
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    if (isFavorited) {
      const updated = favorites.filter((r: Recipe) => r.id !== recipe.id)
      localStorage.setItem("favorites", JSON.stringify(updated))
    } else {
      favorites.push(recipe)
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    setIsFavorited(!isFavorited)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading recipe...</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
            <Button variant="outline" onClick={() => router.back()} className="border-border">
              ← Back
            </Button>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground text-lg">Recipe not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Button variant="outline" onClick={() => router.back()} className="border-border">
            ← Back
          </Button>
          <button
            onClick={handleToggleFavorite}
            className={`text-3xl transition ${isFavorited ? "text-red-500" : "text-muted-foreground hover:text-red-500"}`}
          >
            {isFavorited ? "❤️" : "🤍"}
          </button>
        </div>
      </nav>

      {/* Recipe Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground text-balance">{recipe.name}</h1>
            <p className="text-xl text-muted-foreground">{recipe.description}</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Cook Time</p>
              <p className="text-2xl font-bold text-primary">{recipe.cookTime}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
              <p className="text-2xl font-bold text-primary capitalize">{recipe.difficulty}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Ingredients</p>
              <p className="text-2xl font-bold text-primary">{recipe.ingredients.length}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions ? (
                recipe.instructions.map((instruction, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-foreground pt-1">{instruction}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground italic">
                  Check the full recipe details to get step-by-step instructions
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleToggleFavorite}
              className={`flex-1 ${
                isFavorited
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
              size="lg"
            >
              {isFavorited ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
            </Button>
            <Button onClick={() => router.back()} variant="outline" className="flex-1 border-border" size="lg">
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
