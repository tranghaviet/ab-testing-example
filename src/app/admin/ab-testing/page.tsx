"use client"

import { Thread } from "@/components/assistant-ui/thread"
import { ThreadList } from "@/components/assistant-ui/thread-list"
import {
  useAssistantInstructions
} from "@assistant-ui/react"

const ABTesting = () => {
  useAssistantInstructions(
    "You are a coding assistant that talks like a pirate"
  )

  return (
    <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-4 p-4">
      {/* Main grid: Sidebar | Content Area */}
      {/* Left Sidebar */}
      <ThreadList />
      {/* Right Content Area: Preview + Chat */}
      <div className="flex flex-col gap-y-4 overflow-hidden">
        {/* Top: Live Preview */}
        <div className="flex-1 rounded-md border border-border overflow-hidden">
          <iframe src="/" className="h-full w-full" title="Live Preview" />
        </div>
        {/* Bottom: Chat Thread */}
        <div className="flex-1 overflow-auto rounded-md border border-border p-4">
          <Thread />
        </div>
      </div>
    </div>
  )
}

export default ABTesting
