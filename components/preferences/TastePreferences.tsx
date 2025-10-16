import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TastePreference, TASTE_PREFERENCE_LABELS } from "@/types/preferences"

interface TastePreferencesProps {
  tastePreferences: TastePreference[]
  onTastePreferencesChange: (value: TastePreference[]) => void
}

const ALL_TASTE_PREFERENCES = Object.values(TastePreference)

export function TastePreferences({ tastePreferences, onTastePreferencesChange }: TastePreferencesProps) {
  const handleToggle = (preference: TastePreference) => {
    if (tastePreferences.includes(preference)) {
      onTastePreferencesChange(tastePreferences.filter((p) => p !== preference))
    } else {
      onTastePreferencesChange([...tastePreferences, preference])
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {ALL_TASTE_PREFERENCES.map((preference) => (
        <div key={preference} className="flex items-center space-x-2">
          <Checkbox
            id={`taste-${preference}`}
            checked={tastePreferences.includes(preference)}
            onCheckedChange={() => handleToggle(preference)}
          />
          <Label htmlFor={`taste-${preference}`} className="font-normal cursor-pointer">
            {TASTE_PREFERENCE_LABELS[preference]}
          </Label>
        </div>
      ))}
    </div>
  )
}