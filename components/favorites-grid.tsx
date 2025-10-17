"use client"

import { RecipeCard } from "@/components/recipe-card"
import type { FavoriteRecipe } from "@/lib/favorites-store"

interface FavoritesGridProps {
  favorites: FavoriteRecipe[]
  onRemoveFavorite: (id: string, title: string) => void
}

export function FavoritesGrid({ favorites, onRemoveFavorite }: FavoritesGridProps) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">📚</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">No Favorites Yet</h3>
        <p className="text-muted-foreground mb-6">Start exploring recipes and save your favorites to see them here!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <RecipeCard
            recipe={{
              title: favorite.title,
              description: favorite.description,
              cookTime: favorite.cookTime,
              difficulty: favorite.difficulty,
              servings: favorite.servings,
            }}
            ingredients={favorite.ingredients}
            onAddToFavorites={() => onRemoveFavorite(favorite.id, favorite.title)}
          />
        </div>
      ))}
    </div>
  )
}
