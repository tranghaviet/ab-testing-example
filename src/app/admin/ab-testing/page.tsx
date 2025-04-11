"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea"
import { ABMessage, POST_MESSAGE_AB_TEST_TYPE } from "@/utils/ab-test"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import { saveABTestVariant } from "./actions"
import CopilotChat from "@/components/Chat/CopilotChat"

const DEFAULT_CHAT_PANEL_WIDTH_PERCENT = 25

const childOrigin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

// Define a type for the form state
type FormState = {
  success: boolean
  // Prisma's TestVariant type or a subset might be complex, use 'any' or a simplified type for initial state
  data?: any | null // Or import TestVariant and use Partial<TestVariant> | null
  error?: Record<string, string[]> | string | null // Allow for field errors or general string error
}

// Define the initial state matching the FormState type
const initialState: FormState = {
  success: false,
  error: null,
  data: null,
}

export default function ABTesting() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [abMessage, setABmessage] = useState<ABMessage | null>(null)

  function onRecievedMessage(event: MessageEvent<ABMessage>) {
    if (event.origin !== childOrigin) {
      return
    }

    // do something with the received messages
    if (event.data?.type === POST_MESSAGE_AB_TEST_TYPE) {
      // console.log("receive ab-test-config", event.data)
      setABmessage(event.data)
    }
  }

  useEffect(function () {
    window.addEventListener("message", onRecievedMessage)

    return function () {
      window.removeEventListener("message", onRecievedMessage)
    }
  }, [])

  // Use useFormState with the defined initial state
  const [formState, formAction] = useFormState(saveABTestVariant, initialState)

  useEffect(() => {
    if (formState.success) {
      iframeRef.current?.contentWindow?.location.reload()
    }
  }, [formState])

  useCopilotReadable(
    {
      description: "AB Testing info to customize",
      value: abMessage,
    },
    [abMessage]
  )

  useCopilotAction({
    name: "abTestingCustomFieldContent",
    description: "Custom field content for AB Testing",
    parameters: [
      {
        name: "value",
        type: "string",
        required: true,
        description: "The field value",
      },
    ],
    handler: async (action) => {
      setABmessage({ ...abMessage, value: action.value } as ABMessage)
    },
  })

  return (
    <div className="h-dvh gap-x-4 p-4">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={DEFAULT_CHAT_PANEL_WIDTH_PERCENT}>
          {/* Left: Control Panel */}
          <div className="flex flex-col gap-y-4 h-full">
            <div className="rounded-md border border-border p-4">
              <h2 className="text-lg font-semibold">AB Test Control Panel</h2>
              {abMessage ? ( // Check if abMessage is not null before rendering the form
                // Use the formAction from useFormState
                <form action={formAction} className="flex flex-col gap-y-4">
                  {" "}
                  {/* Corrected gap */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Model:</Label> {abMessage.model}
                    </div>
                    <div>
                      <Label>Field:</Label> {abMessage.field}
                    </div>
                    <div className="col-span-2">
                      <Label>ID:</Label> {abMessage.id}
                      {/* Hidden inputs to pass necessary data to the server action */}
                      {/* Safe access with optional chaining ?. */}
                      <input type="hidden" name="recordId" value={abMessage.id} />
                      <input type="hidden" name="model" value={abMessage.model} />
                      <input type="hidden" name="field" value={abMessage.field} />
                      {/* Remove hidden input for variant */}
                    </div>
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                      {" "}
                      <Label htmlFor="value">Value</Label>
                      {/* Use a textarea for potentially larger JSON values */}
                      <Textarea
                        name="value"
                        id="value"
                        placeholder="Enter field's value"
                        value={abMessage.value}
                        onChange={(e) => {
                          setABmessage({ ...abMessage, value: e.target.value })
                        }}
                        required
                      />
                      {/* Display validation errors from the server action */}
                      {formState?.error?.value && (
                        <p className="text-red-500 text-xs">
                          {Array.isArray(formState.error.value)
                            ? formState.error.value.join(", ")
                            : formState.error.value}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Change button type to submit */}
                  <Button type="submit">Save Changes</Button>
                  {/* Display success/error messages */}
                  {formState?.success && (
                    <p className="text-green-500 text-xs mt-2">Changes saved successfully!</p>
                  )}
                  {/* Display general string errors */}
                  {formState?.error && typeof formState.error === "string" && (
                    <p className="text-red-500 text-xs mt-2">Error: {formState.error}</p>
                  )}
                  {/* Display field errors other than 'value' if they exist */}
                  {formState?.error &&
                    typeof formState.error === "object" &&
                    Object.entries(formState.error).map(
                      ([key, value]) =>
                        key !== "value" &&
                        value && (
                          <p key={key} className="text-red-500 text-xs mt-1">{`${key}: ${
                            Array.isArray(value) ? value.join(", ") : value
                          }`}</p>
                        )
                    )}
                </form>
              ) : (
                <p>No element selected. Click on an element in the preview.</p>
              )}
            </div>
            <div className="flex-1 rounded-md border border-border p-4 overflow-auto">
            <CopilotChat/>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="mx-0.5" />
        <ResizablePanel defaultSize={100-DEFAULT_CHAT_PANEL_WIDTH_PERCENT}>
          <div className="rounded-md border border-border overflow-hidden h-full">
            <iframe
              ref={iframeRef}
              src={childOrigin}
              className="w-full h-full"
              title="Live Preview"
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
