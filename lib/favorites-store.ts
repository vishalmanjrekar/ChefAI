// Local storage utility for managing favorite recipes
const FAVORITES_KEY = "chefai-favorites"

export interface FavoriteRecipe {
  id: string
  title: string
  description: string
  cookTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  servings: string
  ingredients: string[]
  savedAt: number
}

export function getFavorites(): FavoriteRecipe[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error reading favorites:", error)
    return []
  }
}

export function addFavorite(recipe: Omit<FavoriteRecipe, "id" | "savedAt">): FavoriteRecipe {
  const favorites = getFavorites()
  const newFavorite: FavoriteRecipe = {
    ...recipe,
    id: `${recipe.title}-${Date.now()}`,
    savedAt: Date.now(),
  }

  favorites.push(newFavorite)

  if (typeof window !== "undefined") {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }

  return newFavorite
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites()
  const filtered = favorites.filter((f) => f.id !== id)

  if (typeof window !== "undefined") {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  }
}

export function isFavorited(title: string): boolean {
  const favorites = getFavorites()
  return favorites.some((f) => f.title === title)
}

export function getFavoriteByTitle(title: string): FavoriteRecipe | undefined {
  const favorites = getFavorites()
  return favorites.find((f) => f.title === title)
}
