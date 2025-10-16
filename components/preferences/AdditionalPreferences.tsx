import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  CookingTime,
  DifficultyLevel,
  CuisineType,
  COOKING_TIME_LABELS,
  DIFFICULTY_LEVEL_LABELS,
  CUISINE_TYPE_LABELS,
} from "@/types/preferences"

interface AdditionalPreferencesProps {
  cookingTime: CookingTime
  difficultyLevel: DifficultyLevel
  cuisinePreferences: CuisineType[]
  onCookingTimeChange: (value: CookingTime) => void
  onDifficultyLevelChange: (value: DifficultyLevel) => void
  onCuisinePreferencesChange: (value: CuisineType[]) => void
}

const ALL_COOKING_TIMES = Object.values(CookingTime)
const ALL_DIFFICULTY_LEVELS = Object.values(DifficultyLevel)
const ALL_CUISINE_TYPES = Object.values(CuisineType)

export function AdditionalPreferences({
  cookingTime,
  difficultyLevel,
  cuisinePreferences,
  onCookingTimeChange,
  onDifficultyLevelChange,
  onCuisinePreferencesChange,
}: AdditionalPreferencesProps) {
  const handleCuisineToggle = (cuisine: CuisineType) => {
    if (cuisinePreferences.includes(cuisine)) {
      onCuisinePreferencesChange(cuisinePreferences.filter((c) => c !== cuisine))
    } else {
      onCuisinePreferencesChange([...cuisinePreferences, cuisine])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Cooking Time Preference</Label>
        <RadioGroup value={cookingTime} onValueChange={onCookingTimeChange}>
          {ALL_COOKING_TIMES.map((time) => (
            <div key={time} className="flex items-center space-x-2">
              <RadioGroupItem value={time} id={`time-${time}`} />
              <Label htmlFor={`time-${time}`} className="font-normal cursor-pointer">
                {COOKING_TIME_LABELS[time]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Difficulty Level</Label>
        <RadioGroup value={difficultyLevel} onValueChange={onDifficultyLevelChange}>
          {ALL_DIFFICULTY_LEVELS.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={`difficulty-${level}`} />
              <Label htmlFor={`difficulty-${level}`} className="font-normal cursor-pointer">
                {DIFFICULTY_LEVEL_LABELS[level]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Cuisine Preferences</Label>
        <div className="grid grid-cols-2 gap-3">
          {ALL_CUISINE_TYPES.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={`cuisine-${cuisine}`}
                checked={cuisinePreferences.includes(cuisine)}
                onCheckedChange={() => handleCuisineToggle(cuisine)}
              />
              <Label htmlFor={`cuisine-${cuisine}`} className="font-normal cursor-pointer">
                {CUISINE_TYPE_LABELS[cuisine]}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}