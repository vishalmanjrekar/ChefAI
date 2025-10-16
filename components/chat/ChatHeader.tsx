import { Button } from "@/components/ui/button"
import { Minimize2, X } from "lucide-react"

interface ChatHeaderProps {
  onMinimize: () => void
  onClose: () => void
}

export function ChatHeader({ onMinimize, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">🍳</span>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Recipe Assistant</h3>
          <p className="text-xs text-muted-foreground">Ask me anything about recipes</p>
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMinimize}
          className="hover:bg-accent"
        >
          <Minimize2 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="hover:bg-accent"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}