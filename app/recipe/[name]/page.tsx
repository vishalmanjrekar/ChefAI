import { RecipeDetailsView } from "@/components/recipe-details-view"
import Link from "next/link"
import { Suspense, use } from "react"
import { RecipeDetailsClient } from "./RecipeDetailsClient"

export default function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const resolvedParams = use(params)
  const recipeName = decodeURIComponent(resolvedParams.name)
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipeDetailsClient recipeName={recipeName} />
    </Suspense>
  )
}
