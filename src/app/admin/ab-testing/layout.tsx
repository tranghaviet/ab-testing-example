'use client'

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"

export default function ABTestingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const runtime = useChatRuntime({
    api: "/api/chat",
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  )
}
