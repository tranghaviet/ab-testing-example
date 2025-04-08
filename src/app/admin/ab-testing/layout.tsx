"use client"

import { CopilotKit } from "@copilotkit/react-core"
import "@copilotkit/react-ui/styles.css"

export default function ABTestingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CopilotKit
      publicApiKey={process.env.NEXT_PUBLIC_COPILOT_PUBLIC_API_KEY}
      showDevConsole={false}
    >
      {children}
    </CopilotKit>
  )
}
