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
      runtimeUrl="/api/copilotkit"
      showDevConsole={process.env.NODE_ENV !== "production"}
    >
      {children}
    </CopilotKit>
  )
}
