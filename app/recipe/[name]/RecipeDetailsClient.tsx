"use client"

import { RecipeDetailsView } from "@/components/recipe-details-view"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export function RecipeDetailsClient({ recipeName }: { recipeName: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ingredientsParam = searchParams.get("ingredients")
  const ingredients = ingredientsParam ? ingredientsParam.split(",") : []

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
              Back to Recipes
            </Link>
            <Link href="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition">
              Favorites
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RecipeDetailsView recipeName={recipeName} ingredients={ingredients} onBack={() => router.back()} />
      </main>
    </div>
  )
}