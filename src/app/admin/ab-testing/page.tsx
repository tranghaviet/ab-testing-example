"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea"
import { prompt } from "@/lib/prompt"
import { ABMessage } from "@/utils/ab-test"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"
import { CopilotChat, CopilotPopup } from "@copilotkit/react-ui"
import {
  useEffect,
  useRef,
  useState
} from "react"
import { useFormState } from "react-dom"
import { saveABTestVariant } from "./actions"

const childOrigin = process.env.SITE_URL || "http://localhost:3000"

const ABTesting = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const abTestValueRef = useRef<HTMLTextAreaElement>(null)
  // const [iframeSrc, setIframeSrc] = useState(childOrigin)
  // const iframeSrcInputRef = useRef<HTMLInputElement>(null)

  const [abMessage, setABmessage] = useState<ABMessage | null>(null)

  function onRecievedMessage(event: MessageEvent<ABMessage>) {
    if (event.origin !== childOrigin) {
      return
    }

    // do something with the received messages
    if (event.data?.type === "ab-test-config") {
      // console.log("receive ab-test-config", event.data)
      setABmessage(event.data)
      // setABTestValue(JSON.stringify({ value: event.data.value }, null, 2))
    }
  }

  useEffect(function () {
    window.addEventListener("message", onRecievedMessage)
    console.log("attached message listener")

    return function () {
      window.removeEventListener("message", onRecievedMessage)
    }
  }, [])

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

  // Use useFormState with the defined initial state
  const [formState, formAction] = useFormState(saveABTestVariant, initialState)

  useEffect(() => {
    // console.log("Form state changed:", formState);
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
      console.log('action', action);

      setABmessage({ ...abMessage, value: action.value } as ABMessage)
    },
  })

  // watch abMessage
  useEffect(() => {
    console.log("abMessage changed", abMessage)
  }, [abMessage])

  return (
    <div className="h-dvh gap-x-4 p-4">
      <CopilotPopup
        instructions={prompt}
        // defaultOpen
        labels={{
          title: "✨ AB Testing Assistant",
          initial: ["I'm an AB Testing Assistant. How can I help?"],
        }}
      />
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel defaultSize={30}>
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
                      <input
                        type="hidden"
                        name="recordId"
                        value={abMessage.id}
                      />
                      <input
                        type="hidden"
                        name="model"
                        value={abMessage.model}
                      />
                      <input
                        type="hidden"
                        name="field"
                        value={abMessage.field}
                      />
                      {/* Remove hidden input for variant */}
                    </div>
                    <div className="grid w-full items-center gap-1.5 col-span-2">
                      {" "}
                      {/* Removed max-w-sm */}
                      <Label htmlFor="value">Value</Label>
                      {/* Use a textarea for potentially larger JSON values */}
                      <Textarea
                        ref={abTestValueRef}
                        name="value" // Name attribute is crucial for FormData
                        id="value"
                        // placeholder='Enter JSON like { "value": "new text" }'
                        placeholder="Enter field's value"
                        // className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Basic textarea styling
                        // value needs to be the stringified version of { value: actualData }
                        value={abMessage.value}
                        onChange={(e) => {
                          // setABTestValue(e.target.value) // Update state with the inner value
                          setABmessage({ ...abMessage, value: e.target.value }) // Update state with the inner value
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
                    <p className="text-green-500 text-xs mt-2">
                      Changes saved successfully!
                    </p>
                  )}
                  {/* Display general string errors */}
                  {formState?.error && typeof formState.error === "string" && (
                    <p className="text-red-500 text-xs mt-2">
                      Error: {formState.error}
                    </p>
                  )}
                  {/* Display field errors other than 'value' if they exist */}
                  {formState?.error &&
                    typeof formState.error === "object" &&
                    Object.entries(formState.error).map(
                      ([key, value]) =>
                        key !== "value" &&
                        value && (
                          <p
                            key={key}
                            className="text-red-500 text-xs mt-1"
                          >{`${key}: ${
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
              <CopilotChat
                instructions={prompt}
                labels={{
                  title: "✨ AB Testing Assistant",
                  initial: ["I'm an AB Testing Assistant. How can I help?"],
                }}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle className="mx-0.5" />
        <ResizablePanel defaultSize={70}>
          {/* Right: Live Preview */}
          <div className="rounded-md border border-border overflow-hidden h-full">
            {/* <div className="flex gap-2 items-center p-2">
              <Label>URL:</Label>
              <Input
                ref={iframeSrcInputRef}
                defaultValue={iframeSrc}
                // value={iframeSrc}
                className="w-full"
              />
              <Button
                onClick={() =>
                  setIframeSrc(iframeSrcInputRef.current?.value as string)
                }
              >
                Go
              </Button>
            </div>
            <Separator /> */}
            <iframe
              ref={iframeRef}
              // src={iframeSrc}
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

export default ABTesting
