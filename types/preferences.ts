// Enums for preferences
export enum DietaryRestriction {
  VEGETARIAN = "vegetarian",
  NON_VEGETARIAN = "non_vegetarian",
  VEGAN = "vegan",
  GLUTEN_FREE = "gluten_free",
  DAIRY_FREE = "dairy_free",
  NUT_FREE = "nut_free"
}

export enum TastePreference {
  SPICY = "spicy",
  SWEET = "sweet",
  MILD = "mild",
  SAVORY = "savory",
  TANGY = "tangy",
  SOUR = "sour",
  BITTER = "bitter"
}

export enum CookingTime {
  QUICK = "quick",
  MEDIUM = "medium",
  LONG = "long"
}

export enum DifficultyLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced"
}

export enum CuisineType {
  ITALIAN = "italian",
  CHINESE = "chinese",
  INDIAN = "indian",
  MEXICAN = "mexican",
  THAI = "thai",
  JAPANESE = "japanese",
  MEDITERRANEAN = "mediterranean",
  AMERICAN = "american",
  FRENCH = "french",
  KOREAN = "korean"
}

export interface UserPreferences {
  dietaryRestriction: DietaryRestriction
  allergyRestrictions: DietaryRestriction[]
  tastePreferences: TastePreference[]
  cookingTime: CookingTime
  difficultyLevel: DifficultyLevel
  cuisinePreferences: CuisineType[]
}

export const DIETARY_RESTRICTION_LABELS: Record<DietaryRestriction, string> = {
  [DietaryRestriction.VEGETARIAN]: "Vegetarian",
  [DietaryRestriction.NON_VEGETARIAN]: "Non-Vegetarian",
  [DietaryRestriction.VEGAN]: "Vegan",
  [DietaryRestriction.GLUTEN_FREE]: "Gluten-Free",
  [DietaryRestriction.DAIRY_FREE]: "Dairy-Free",
  [DietaryRestriction.NUT_FREE]: "Nut-Free",
}

export const TASTE_PREFERENCE_LABELS: Record<TastePreference, string> = {
  [TastePreference.SPICY]: "Spicy",
  [TastePreference.SWEET]: "Sweet",
  [TastePreference.MILD]: "Mild",
  [TastePreference.SAVORY]: "Savory",
  [TastePreference.TANGY]: "Tangy",
  [TastePreference.SOUR]: "Sour",
  [TastePreference.BITTER]: "Bitter",
}

export const COOKING_TIME_LABELS: Record<CookingTime, string> = {
  [CookingTime.QUICK]: "Quick (15-30 min)",
  [CookingTime.MEDIUM]: "Medium (30-60 min)",
  [CookingTime.LONG]: "Long (60+ min)",
}

export const DIFFICULTY_LEVEL_LABELS: Record<DifficultyLevel, string> = {
  [DifficultyLevel.BEGINNER]: "Beginner",
  [DifficultyLevel.INTERMEDIATE]: "Intermediate",
  [DifficultyLevel.ADVANCED]: "Advanced",
}

export const CUISINE_TYPE_LABELS: Record<CuisineType, string> = {
  [CuisineType.ITALIAN]: "Italian",
  [CuisineType.CHINESE]: "Chinese",
  [CuisineType.INDIAN]: "Indian",
  [CuisineType.MEXICAN]: "Mexican",
  [CuisineType.THAI]: "Thai",
  [CuisineType.JAPANESE]: "Japanese",
  [CuisineType.MEDITERRANEAN]: "Mediterranean",
  [CuisineType.AMERICAN]: "American",
  [CuisineType.FRENCH]: "French",
  [CuisineType.KOREAN]: "Korean",
}