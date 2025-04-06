"use client"

import { Thread } from "@/components/assistant-ui/thread"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useAssistantInstructions } from "@assistant-ui/react"
import { useEffect, useState } from "react"

interface SelectedElement {
  id: string
  content: string
}

const ABTesting = () => {
  const [selectedElement, setSelectedElement] =
    useState<SelectedElement | null>(null)

  useAssistantInstructions(
    "You are a AB Testing Expert. You will be given a list of elements in a web page. Your task is to select one element and provide suggestions for improving its performance. The suggestions should be based on the content of the selected element and the context of the web page. You can also provide alternative content for the selected element."
  )

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === "abTestSelection") {
        setSelectedElement(event.data.payload)
      }
    }
    window.addEventListener("message", messageHandler)
    return () => window.removeEventListener("message", messageHandler)
  }, [])

  return (
    <div className="h-dvh gap-x-4 p-4">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={25}>
          {/* Left: Control Panel */}
          <div className="flex flex-col gap-y-4 h-full">
            <div className="rounded-md border border-border p-4">
              <h2 className="text-lg font-semibold">AB Test Control Panel</h2>
              {selectedElement ? (
                <div>
                  <p>
                    <strong>Selected Element ID:</strong> {selectedElement.id}
                  </p>
                  <p>
                    <strong>Content:</strong> {selectedElement.content}
                  </p>
                  <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
                    Get Suggestions
                  </button>
                </div>
              ) : (
                <p>No element selected. Click on an element in the preview.</p>
              )}
            </div>
            <div className="flex-1 rounded-md border border-border p-4 overflow-auto">
              <Thread />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="mx-0.5" />
        <ResizablePanel defaultSize={75}>
          {/* Right: Live Preview */}
          <div className="rounded-md border border-border overflow-hidden h-full">
            <iframe src="/" className="w-full h-full" title="Live Preview" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ABTesting
