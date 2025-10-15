import type { UserPreferences } from "@/types/preferences"
import { DietaryRestriction, CookingTime, DifficultyLevel } from "@/types/preferences"

const PREFERENCES_KEY = "user_preferences"

export const DEFAULT_PREFERENCES: UserPreferences = {
  dietaryRestriction: DietaryRestriction.NON_VEGETARIAN,
  allergyRestrictions: [],
  tastePreferences: [],
  cookingTime: CookingTime.MEDIUM,
  difficultyLevel: DifficultyLevel.INTERMEDIATE,
  cuisinePreferences: [],
}

export function savePreferences(preferences: UserPreferences): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
  }
}

export function loadPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES
  }

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY)
    if (stored) {
      return JSON.parse(stored) as UserPreferences
    }
  } catch (error) {
    console.error("Error loading preferences:", error)
  }

  return DEFAULT_PREFERENCES
}

export function clearPreferences(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PREFERENCES_KEY)
  }
}