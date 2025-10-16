import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DietaryRestriction, DIETARY_RESTRICTION_LABELS } from "@/types/preferences"

interface DietaryPreferencesProps {
  dietaryRestriction: DietaryRestriction
  allergyRestrictions: DietaryRestriction[]
  onDietaryRestrictionChange: (value: DietaryRestriction) => void
  onAllergyRestrictionsChange: (value: DietaryRestriction[]) => void
}

const PRIMARY_RESTRICTIONS = [
  DietaryRestriction.VEGETARIAN,
  DietaryRestriction.NON_VEGETARIAN,
  DietaryRestriction.VEGAN,
]

const ALLERGY_RESTRICTIONS = [
  DietaryRestriction.GLUTEN_FREE,
  DietaryRestriction.DAIRY_FREE,
  DietaryRestriction.NUT_FREE,
]

export function DietaryPreferences({
  dietaryRestriction,
  allergyRestrictions,
  onDietaryRestrictionChange,
  onAllergyRestrictionsChange,
}: DietaryPreferencesProps) {
  const handleAllergyToggle = (restriction: DietaryRestriction) => {
    if (allergyRestrictions.includes(restriction)) {
      onAllergyRestrictionsChange(allergyRestrictions.filter((r) => r !== restriction))
    } else {
      onAllergyRestrictionsChange([...allergyRestrictions, restriction])
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Primary Dietary Preference</Label>
        <RadioGroup value={dietaryRestriction} onValueChange={onDietaryRestrictionChange}>
          {PRIMARY_RESTRICTIONS.map((restriction) => (
            <div key={restriction} className="flex items-center space-x-2">
              <RadioGroupItem value={restriction} id={restriction} />
              <Label htmlFor={restriction} className="font-normal cursor-pointer">
                {DIETARY_RESTRICTION_LABELS[restriction]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Allergies & Additional Restrictions</Label>
        <div className="space-y-2">
          {ALLERGY_RESTRICTIONS.map((restriction) => (
            <div key={restriction} className="flex items-center space-x-2">
              <Checkbox
                id={`allergy-${restriction}`}
                checked={allergyRestrictions.includes(restriction)}
                onCheckedChange={() => handleAllergyToggle(restriction)}
              />
              <Label htmlFor={`allergy-${restriction}`} className="font-normal cursor-pointer">
                {DIETARY_RESTRICTION_LABELS[restriction]}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}