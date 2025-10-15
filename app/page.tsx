"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🍳</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">ChefAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/preferences" className="text-sm text-muted-foreground hover:text-foreground transition">
              Preferences
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Button onClick={() => router.push("/recipes")} size="sm" className="bg-primary hover:bg-primary/90">
              Start Cooking
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                  Cook Amazing Meals with What You Have
                </h2>
                <p className="text-xl text-muted-foreground text-balance">
                  Select ingredients from your kitchen and let our AI suggest delicious recipes tailored just for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => router.push("/recipes")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Discover Recipes
                </Button>
                <Button onClick={() => router.push("/favorites")} size="lg" variant="outline" className="border-border">
                  View Favorites
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">AI Recipes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">Instant</p>
                  <p className="text-sm text-muted-foreground">Suggestions</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">Save</p>
                  <p className="text-sm text-muted-foreground">Favorites</p>
                </div>
              </div>
            </div>

            {/* Right - Feature Showcase */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border">
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Step 1: Select Ingredients</p>
                    <div className="flex gap-2 flex-wrap">
                      {["Tomato", "Garlic", "Basil", "Olive Oil"].map((ingredient) => (
                        <span key={ingredient} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Step 2: AI Suggests</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground">🍝 Pasta al Pomodoro</p>
                      <p className="text-sm text-muted-foreground">Italian classic with fresh tomatoes and basil</p>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Step 3: Get Full Recipe</p>
                    <p className="text-sm text-muted-foreground">Complete instructions with cooking tips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground text-balance">Why Choose ChefAI?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered",
                description: "Smart recommendations based on your ingredients using advanced AI",
                icon: "🤖",
              },
              {
                title: "Quick & Easy",
                description: "Get recipe suggestions in seconds, start cooking immediately",
                icon: "⚡",
              },
              {
                title: "Save Favorites",
                description: "Keep track of your favorite recipes and build your collection",
                icon: "❤️",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-foreground text-balance">Ready to Cook?</h3>
            <p className="text-xl text-muted-foreground">
              Start exploring recipes based on what you have in your kitchen right now.
            </p>
          </div>
          <Button
            onClick={() => router.push("/recipes")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 ChefAI. Powered by AI.</p>
          <div className="flex gap-6">
            <Link href="/preferences" className="text-sm text-muted-foreground hover:text-foreground transition">
              Preferences
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition">
              Recipes
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
