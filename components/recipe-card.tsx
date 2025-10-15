"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isFavorited } from "@/lib/favorites-store"

interface RecipeCardProps {
  recipe: {
    title: string
    description: string
    cookTime: string
    difficulty: "Easy" | "Medium" | "Hard"
    servings: string
  }
  ingredients?: string[]
  onViewDetails?: () => void
  onAddToFavorites?: () => void
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function RecipeCard({ recipe, ingredients = [], onViewDetails, onAddToFavorites }: RecipeCardProps) {
  const [isFav, setIsFav] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsFav(isFavorited(recipe.title))
  }, [recipe.title])

  const handleToggleFavorite = () => {
    setIsFav(!isFav)
    onAddToFavorites?.()
  }

  const handleViewDetails = () => {
    const ingredientsParam = ingredients.join(",")
    router.push(`/recipe/${encodeURIComponent(recipe.title)}?ingredients=${ingredientsParam}`)
    onViewDetails?.()
  }

  return (
    <Card className="p-6 border border-border hover:border-primary/50 transition">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground text-balance">{recipe.title}</h3>
          <button onClick={handleToggleFavorite} className="mt-1 transition hover:scale-110">
            <Heart size={24} className={isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
          </button>
        </div>

        <p className="text-muted-foreground">{recipe.description}</p>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Cook Time</p>
            <p className="text-sm text-foreground font-medium">{recipe.cookTime}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Servings</p>
            <p className="text-sm text-foreground font-medium">{recipe.servings}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Difficulty</p>
            <p
              className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${difficultyColors[recipe.difficulty]}`}
            >
              {recipe.difficulty}
            </p>
          </div>
        </div>

        <Button onClick={handleViewDetails} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          View Recipe
        </Button>
      </div>
    </Card>
  )
}
