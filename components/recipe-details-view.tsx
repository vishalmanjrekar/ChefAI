"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { addFavorite, removeFavorite, getFavoriteByTitle } from "@/lib/favorites-store"

interface RecipeDetailsViewProps {
  recipeName: string
  ingredients: string[]
  isFavorited?: boolean
  onAddToFavorites?: () => void
  onBack?: () => void
}

interface RecipeDetails {
  ingredients: Array<{ item: string; amount: string }>
  instructions: Array<{ step: number; instruction: string }>
  tips: string[]
  nutrition: {
    calories: string
    protein: string
    carbs: string
    fat: string
  }
}

export function RecipeDetailsView({
  recipeName,
  ingredients: selectedIngredients,
  isFavorited: initialFavorited = false,
  onAddToFavorites,
  onBack,
}: RecipeDetailsViewProps) {
  const [details, setDetails] = useState<RecipeDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(initialFavorited)

  useEffect(() => {
    const favorite = getFavoriteByTitle(recipeName)
    setIsFavorited(!!favorite)
  }, [recipeName])

  const fetchDetails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/recipes/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeName,
          ingredients: selectedIngredients,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details")
      }

      const data = await response.json()
      setDetails(data.details)
    } catch (error) {
      console.error("Error fetching recipe details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch details on mount
  if (!details && !isLoading) {
    fetchDetails()
  }

  const handleToggleFavorite = () => {
    if (isFavorited) {
      const favorite = getFavoriteByTitle(recipeName)
      if (favorite) {
        removeFavorite(favorite.id)
      }
    } else {
      addFavorite({
        title: recipeName,
        description: details?.instructions?.[0]?.instruction || "Delicious recipe",
        cookTime: "30 minutes",
        difficulty: "Medium",
        servings: "4",
        ingredients: selectedIngredients,
      })
    }
    setIsFavorited(!isFavorited)
    onAddToFavorites?.()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition">
                <ArrowLeft size={20} className="text-muted-foreground" />
              </button>
            )}
            <h1 className="text-4xl font-bold text-foreground text-balance">{recipeName}</h1>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={handleToggleFavorite} className="p-3 hover:bg-muted rounded-lg transition">
            <Heart size={24} className={isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
          </button>
          <button className="p-3 hover:bg-muted rounded-lg transition">
            <Share2 size={24} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
            <p className="text-muted-foreground">Generating recipe details...</p>
          </div>
        </div>
      ) : details ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ingredients */}
            <Card className="p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {details.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-foreground">
                      {ingredient.amount} <span className="text-muted-foreground">{ingredient.item}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructions */}
            <Card className="p-6 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Instructions</h2>
              <div className="space-y-4">
                {details.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {instruction.step}
                    </div>
                    <p className="text-foreground pt-1">{instruction.instruction}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tips */}
            {details.tips.length > 0 && (
              <Card className="p-6 border border-border bg-secondary/5">
                <h2 className="text-2xl font-bold text-foreground mb-4">Chef's Tips</h2>
                <ul className="space-y-2">
                  {details.tips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-secondary font-bold">💡</span>
                      <p className="text-foreground">{tip}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Nutrition Facts */}
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Nutrition (per serving)</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Calories</span>
                  <span className="font-bold text-foreground">{details.nutrition.calories}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Protein</span>
                  <span className="font-bold text-foreground">{details.nutrition.protein}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Carbs</span>
                  <span className="font-bold text-foreground">{details.nutrition.carbs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Fat</span>
                  <span className="font-bold text-foreground">{details.nutrition.fat}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleToggleFavorite}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isFavorited ? "Remove from Favorites" : "Save to Favorites"}
              </Button>
              <Button
                variant="outline"
                className="w-full border-border bg-transparent"
                onClick={() => {
                  navigator.share?.({
                    title: recipeName,
                    text: "Check out this recipe!",
                  })
                }}
              >
                Share Recipe
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Unable to load recipe details. Please try again.</p>
        </div>
      )}
    </div>
  )
}
