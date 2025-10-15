"use client"

import { useState, useEffect, useCallback } from "react"
import { type FavoriteRecipe, getFavorites, addFavorite, removeFavorite, isFavorited } from "@/lib/favorites-store"

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites on mount
  useEffect(() => {
    const loaded = getFavorites()
    setFavorites(loaded)
    setIsLoading(false)
  }, [])

  const toggleFavorite = useCallback(
    (recipe: Omit<FavoriteRecipe, "id" | "savedAt">) => {
      const existing = favorites.find((f) => f.title === recipe.title)

      if (existing) {
        removeFavorite(existing.id)
        setFavorites(favorites.filter((f) => f.id !== existing.id))
      } else {
        const newFavorite = addFavorite(recipe)
        setFavorites([...favorites, newFavorite])
      }
    },
    [favorites],
  )

  const checkIsFavorited = useCallback((title: string) => isFavorited(title), [])

  return {
    favorites,
    isLoading,
    toggleFavorite,
    checkIsFavorited,
  }
}
