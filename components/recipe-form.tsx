"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  cookTime: string
  difficulty: string
}

interface RecipeFormProps {
  onRecipesSuggested: (recipes: Recipe[]) => void
}

const COMMON_INGREDIENTS = [
  "Chicken",
  "Beef",
  "Pork",
  "Fish",
  "Salmon",
  "Tomato",
  "Onion",
  "Garlic",
  "Potato",
  "Carrot",
  "Broccoli",
  "Spinach",
  "Lettuce",
  "Bell Pepper",
  "Cucumber",
  "Rice",
  "Pasta",
  "Bread",
  "Cheese",
  "Milk",
  "Eggs",
  "Butter",
  "Olive Oil",
  "Salt",
  "Pepper",
  "Basil",
  "Oregano",
  "Thyme",
  "Cumin",
  "Paprika",
  "Lemon",
  "Lime",
  "Apple",
  "Banana",
  "Strawberry",
]

export default function RecipeForm({ onRecipesSuggested }: RecipeFormProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [customIngredient, setCustomIngredient] = useState("")
  const [loading, setLoading] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient)) {
      setSelectedIngredients([...selectedIngredients, customIngredient])
      setCustomIngredient("")
      setShowSuggestions(false)
    }
  }

  const handleToggleIngredient = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleInputChange = (value: string) => {
    setCustomIngredient(value)
    if (value.trim()) {
      const filtered = COMMON_INGREDIENTS.filter(
        (ing) => ing.toLowerCase().includes(value.toLowerCase()) && !selectedIngredients.includes(ing),
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const getSuggestedRecipes = async () => {
    if (selectedIngredients.length === 0) return

    setLoading(true)
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      })
      const data = await response.json()
      onRecipesSuggested(data.recipes || [])
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Your Ingredients</h3>

        {/* Custom Ingredient Input */}
        <div className="mb-4 relative">
          <Input
            type="text"
            placeholder="Add ingredient..."
            value={customIngredient}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCustomIngredient()}
            className="bg-input border-border"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    handleToggleIngredient(suggestion)
                    setCustomIngredient("")
                    setShowSuggestions(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-muted transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Ingredients */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedIngredients.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleToggleIngredient(ingredient)}
              className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm hover:opacity-80 transition flex items-center gap-2"
            >
              {ingredient}
              <span>×</span>
            </button>
          ))}
        </div>

        {/* Common Ingredients Grid */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-semibold">Popular Ingredients</p>
          <div className="grid grid-cols-2 gap-2">
            {COMMON_INGREDIENTS.slice(0, 12).map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => handleToggleIngredient(ingredient)}
                className={`border rounded-lg px-3 py-2 text-sm transition ${
                  selectedIngredients.includes(ingredient)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {ingredient}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Get Recipes Button */}
      <Button
        onClick={getSuggestedRecipes}
        disabled={selectedIngredients.length === 0 || loading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        size="lg"
      >
        {loading ? "Finding Recipes..." : `Get Recipes (${selectedIngredients.length})`}
      </Button>
    </div>
  )
}
