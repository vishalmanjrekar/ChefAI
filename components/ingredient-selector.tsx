"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { loadPreferences } from "@/lib/preferences"
import { DietaryRestriction } from "@/types/preferences"
import type { UserPreferences } from "@/types/preferences"

interface IngredientSelectorProps {
  onGenerateRecipes: (ingredients: string[]) => void
  isLoading: boolean
}

const ALL_INGREDIENTS = [
  { name: "Tomato", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Garlic", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Onion", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Bell Pepper", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Chicken", nonVeg: true, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Beef", nonVeg: true, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Pasta", nonVeg: false, containsDairy: false, containsGluten: true, containsNuts: false },
  { name: "Rice", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Bread", nonVeg: false, containsDairy: false, containsGluten: true, containsNuts: false },
  { name: "Eggs", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Milk", nonVeg: false, containsDairy: true, containsGluten: false, containsNuts: false },
  { name: "Cheese", nonVeg: false, containsDairy: true, containsGluten: false, containsNuts: false },
  { name: "Basil", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Olive Oil", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Salt", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Pepper", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Lemon", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Ginger", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Carrot", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Broccoli", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Spinach", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Mushroom", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Potato", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Bacon", nonVeg: true, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Fish", nonVeg: true, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Tofu", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Chickpeas", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Lentils", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Quinoa", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
  { name: "Almonds", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: true },
  { name: "Peanuts", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: true },
  { name: "Butter", nonVeg: false, containsDairy: true, containsGluten: false, containsNuts: false },
  { name: "Yogurt", nonVeg: false, containsDairy: true, containsGluten: false, containsNuts: false },
  { name: "Honey", nonVeg: false, containsDairy: false, containsGluten: false, containsNuts: false },
]

export function IngredientSelector({ onGenerateRecipes, isLoading }: IngredientSelectorProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [customInput, setCustomInput] = useState("")
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [filteredIngredients, setFilteredIngredients] = useState(ALL_INGREDIENTS)

  useEffect(() => {
    const prefs = loadPreferences()
    setPreferences(prefs)
    
    // Filter ingredients based on preferences
    const filtered = ALL_INGREDIENTS.filter((ingredient) => {
      // Filter based on dietary restriction
      if (prefs.dietaryRestriction === DietaryRestriction.VEGETARIAN || 
          prefs.dietaryRestriction === DietaryRestriction.VEGAN) {
        if (ingredient.nonVeg) return false
      }
      
      // Filter based on vegan (no eggs, dairy, honey)
      if (prefs.dietaryRestriction === DietaryRestriction.VEGAN) {
        if (ingredient.name === "Eggs" || ingredient.name === "Honey") return false
        if (ingredient.containsDairy) return false
      }
      
      // Filter based on allergy restrictions
      if (prefs.allergyRestrictions.includes(DietaryRestriction.GLUTEN_FREE)) {
        if (ingredient.containsGluten) return false
      }
      
      if (prefs.allergyRestrictions.includes(DietaryRestriction.DAIRY_FREE)) {
        if (ingredient.containsDairy) return false
      }
      
      if (prefs.allergyRestrictions.includes(DietaryRestriction.NUT_FREE)) {
        if (ingredient.containsNuts) return false
      }
      
      return true
    })
    
    setFilteredIngredients(filtered)
  }, [])

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleAddCustom = () => {
    if (customInput.trim() && !selectedIngredients.includes(customInput.trim())) {
      setSelectedIngredients([...selectedIngredients, customInput.trim()])
      setCustomInput("")
    }
  }

  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
  }

  const handleGenerate = () => {
    if (selectedIngredients.length > 0) {
      onGenerateRecipes(selectedIngredients)
    }
  }

  return (
    <div className="space-y-6">
      {/* Custom Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddCustom()
            }
          }}
          placeholder="Add your own ingredient..."
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button onClick={handleAddCustom} variant="outline" className="border-border bg-transparent">
          Add
        </Button>
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Selected Ingredients ({selectedIngredients.length})</p>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient}
                className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full"
              >
                <span className="text-sm">{ingredient}</span>
                <button onClick={() => handleRemoveIngredient(ingredient)} className="hover:opacity-70 transition">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Ingredients */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Popular Ingredients</p>
          {preferences && (preferences.dietaryRestriction === DietaryRestriction.VEGETARIAN || 
                          preferences.dietaryRestriction === DietaryRestriction.VEGAN) && (
            <span className="text-xs text-muted-foreground">
              Filtered for {preferences.dietaryRestriction === DietaryRestriction.VEGAN ? "vegan" : "vegetarian"}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredIngredients.map((ingredient) => (
            <button
              key={ingredient.name}
              onClick={() => handleAddIngredient(ingredient.name)}
              disabled={selectedIngredients.includes(ingredient.name)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-card hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:bg-muted transition"
            >
              {ingredient.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={selectedIngredients.length === 0 || isLoading}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? "Generating Recipes..." : "Generate Recipes"}
      </Button>
    </div>
  )
}
