import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
// import { google } from "@ai-sdk/google"
export const runtime = "edge"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, system, tools } = await req.json()

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages format", { status: 400 })
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      // model: google("gemini-2.5-pro-preview-03-25"),
      messages,
      // forward system prompt and tools from the frontend
      system,
      tools,
      // tools: Object.fromEntries(
      //   Object.entries<{ parameters: unknown }>(tools).map(([name, tool]) => [
      //     name,
      //     {
      //       parameters: jsonSchema(tool.parameters!),
      //     },
      //   ]),
      // ),
    })
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("An error occurred while processing your request", {
      status: 500,
    })
  }
}
