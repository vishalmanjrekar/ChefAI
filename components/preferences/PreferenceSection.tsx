import type { ReactNode } from "react"

interface PreferenceSectionProps {
  title: string
  description?: string
  children: ReactNode
}

export function PreferenceSection({ title, description, children }: PreferenceSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}