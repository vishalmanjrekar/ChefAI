"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FavoritesGrid } from "@/components/favorites-grid"
import { type FavoriteRecipe, removeFavorite, getFavorites } from "@/lib/favorites-store"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loaded = getFavorites()
    setFavorites(loaded)
    setIsLoading(false)
  }, [])

  const handleRemoveFavorite = (id: string, title: string) => {
    removeFavorite(id)
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all favorites?")) {
      favorites.forEach((fav) => removeFavorite(fav.id))
      setFavorites([])
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
            <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition">
              Discover Recipes
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground mt-2">
                {isLoading
                  ? "Loading..."
                  : `${favorites.length} saved ${favorites.length === 1 ? "recipe" : "recipes"}`}
              </p>
            </div>
            {favorites.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Favorites Grid */}
          {!isLoading && <FavoritesGrid favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />}

          {!isLoading && favorites.length === 0 && (
            <div className="mt-12">
              <Link href="/recipes">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Discovering Recipes
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
