"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does ChefAI generate recipes?",
      answer:
        "ChefAI uses advanced AI technology to analyze the ingredients you select and generates creative, personalized recipe suggestions. Our AI considers ingredient combinations, cooking techniques, and flavor profiles to recommend delicious recipes you can make.",
    },
    {
      question: "Can I add my own ingredients?",
      answer:
        "Yes! In addition to our curated list of popular ingredients, you can add any ingredient you have on hand using the custom ingredient input field. This helps you find recipes tailored specifically to what you have available.",
    },
    {
      question: "How do I save my favorite recipes?",
      answer:
        "Simply click the heart icon on any recipe card or recipe details page to save it to your favorites. Your favorites are automatically saved to your device and can be accessed anytime from the Favorites page.",
    },
    {
      question: "Will my favorites be saved if I close the app?",
      answer:
        "Yes! Your favorites are stored locally on your device using browser storage, so they will persist even after you close the app or refresh the page.",
    },
    {
      question: "Can I share recipes with others?",
      answer:
        "Each recipe page includes a share button that lets you share the recipe with friends using your device's native sharing options.",
    },
    {
      question: "Does ChefAI include nutritional information?",
      answer:
        "Yes, each recipe includes estimated nutritional information per serving, including calories, protein, carbohydrates, and fat content. These are approximate values based on the ingredients used.",
    },
  ]

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Suggestions",
      description:
        "Smart AI technology that learns from your ingredient selections and generates personalized recipe recommendations.",
    },
    {
      icon: "⚡",
      title: "Instant Recipes",
      description:
        "Get recipe suggestions in seconds with complete ingredients, step-by-step instructions, and cooking tips.",
    },
    {
      icon: "❤️",
      title: "Save Favorites",
      description:
        "Build your personal recipe collection by saving favorites and accessing them whenever you want to cook.",
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Intuitive interface designed for everyone, from beginner cooks to experienced chefs.",
    },
    {
      icon: "🌱",
      title: "Flexible Ingredients",
      description:
        "Use any ingredients you have on hand. Add custom ingredients to find recipes tailored to your needs.",
    },
    {
      icon: "📊",
      title: "Nutrition Info",
      description: "Every recipe includes detailed nutritional information to help you make informed cooking choices.",
    },
  ]

  const steps = [
    {
      number: "1",
      title: "Select Ingredients",
      description: "Choose from our popular ingredients or add your own custom ingredients from your kitchen.",
    },
    {
      number: "2",
      title: "Generate Recipes",
      description:
        'Click "Generate Recipes" and our AI will create personalized recipe suggestions based on your selection.',
    },
    {
      number: "3",
      title: "View Details",
      description:
        'Browse through the suggestions and click "View Recipe" to see complete ingredients, instructions, and tips.',
    },
    {
      number: "4",
      title: "Save & Cook",
      description: "Save your favorites and follow the step-by-step instructions to create delicious meals at home.",
    },
  ]

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
        <div className="space-y-20">
          {/* Hero Section */}
          <section className="space-y-6 text-center">
            <h1 className="text-5xl font-bold text-foreground text-balance">About ChefAI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ChefAI is your personal AI-powered cooking assistant that helps you discover delicious recipes based on
              the ingredients you have on hand.
            </p>
          </section>

          {/* Features Grid */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">Why Choose ChefAI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 border border-border hover:border-primary/50 transition">
                  <p className="text-4xl mb-4">{feature.icon}</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">How to Use ChefAI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="p-6 border border-border bg-card/50">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border border-border overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition text-left"
                  >
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-muted-foreground transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 pt-0 border-t border-border text-muted-foreground">{faq.answer}</div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Getting Started CTA */}
          <section className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 border border-border text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ready to Start Cooking?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover amazing recipes based on the ingredients you have. Let our AI help you create delicious meals
              today.
            </p>
            <Link href="/recipes">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Discover Recipes
              </Button>
            </Link>
          </section>

          {/* Footer Info */}
          <section className="text-center space-y-4 py-12 border-t border-border">
            <h3 className="text-lg font-bold text-foreground">Have Questions?</h3>
            <p className="text-muted-foreground">
              Our AI-powered recipe engine is designed to make cooking easy and enjoyable. If you have any questions or
              suggestions, feel free to explore the app and experiment with different ingredients.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/recipes">
                <Button variant="outline" className="border-border bg-transparent">
                  Back to Recipes
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-border bg-transparent">
                  Home
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
