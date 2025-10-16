"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PreferenceSection } from "@/components/preferences/PreferenceSection"
import { DietaryPreferences } from "@/components/preferences/DietaryPreferences"
import { TastePreferences } from "@/components/preferences/TastePreferences"
import { AdditionalPreferences } from "@/components/preferences/AdditionalPreferences"
import { savePreferences, loadPreferences } from "@/lib/preferences"
import type { UserPreferences } from "@/types/preferences"
import { DietaryRestriction, TastePreference, CookingTime, DifficultyLevel, CuisineType } from "@/types/preferences"
import toast, { Toaster } from "react-hot-toast"
import { Save } from "lucide-react"

export default function PreferencesPage() {
  const router = useRouter()
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestriction: DietaryRestriction.NON_VEGETARIAN,
    allergyRestrictions: [],
    tastePreferences: [],
    cookingTime: CookingTime.MEDIUM,
    difficultyLevel: DifficultyLevel.INTERMEDIATE,
    cuisinePreferences: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadedPreferences = loadPreferences()
    setPreferences(loadedPreferences)
    setIsLoading(false)
  }, [])

  const handleSave = () => {
    savePreferences(preferences)
    toast.success("Preferences saved successfully!", {
      duration: 3000,
      position: "bottom-center",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading preferences...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
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
              Recipes
            </Link>
            <Link href="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition">
              Favorites
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-foreground">Your Preferences</h2>
            <p className="text-lg text-muted-foreground">
              Customize your recipe suggestions based on your dietary needs and taste preferences
            </p>
          </div>

          {/* Preferences Form */}
          <Card>
            <CardHeader>
              <CardTitle>Dietary & Taste Preferences</CardTitle>
              <CardDescription>
                Your preferences will be used to personalize recipe suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreferenceSection
                title="Dietary Restrictions"
                description="Choose your dietary preferences to get personalized recipe suggestions"
              >
                <DietaryPreferences
                  dietaryRestriction={preferences.dietaryRestriction}
                  allergyRestrictions={preferences.allergyRestrictions}
                  onDietaryRestrictionChange={(value) =>
                    setPreferences({ ...preferences, dietaryRestriction: value as DietaryRestriction })
                  }
                  onAllergyRestrictionsChange={(value) =>
                    setPreferences({ ...preferences, allergyRestrictions: value })
                  }
                />
              </PreferenceSection>

              <Separator />

              <PreferenceSection
                title="Taste Preferences"
                description="Select your preferred flavors"
              >
                <TastePreferences
                  tastePreferences={preferences.tastePreferences}
                  onTastePreferencesChange={(value) =>
                    setPreferences({ ...preferences, tastePreferences: value })
                  }
                />
              </PreferenceSection>

              <Separator />

              <PreferenceSection
                title="Cooking Preferences"
                description="Set your cooking time, skill level, and favorite cuisines"
              >
                <AdditionalPreferences
                  cookingTime={preferences.cookingTime}
                  difficultyLevel={preferences.difficultyLevel}
                  cuisinePreferences={preferences.cuisinePreferences}
                  onCookingTimeChange={(value) =>
                    setPreferences({ ...preferences, cookingTime: value as CookingTime })
                  }
                  onDifficultyLevelChange={(value) =>
                    setPreferences({ ...preferences, difficultyLevel: value as DifficultyLevel })
                  }
                  onCuisinePreferencesChange={(value) =>
                    setPreferences({ ...preferences, cuisinePreferences: value })
                  }
                />
              </PreferenceSection>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={() => router.push("/recipes")}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="size-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}