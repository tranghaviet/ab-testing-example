import { prompt } from "@/lib/prompt";
import { CopilotChat as CopilotChatKit } from "@copilotkit/react-ui";

const DEFAULT_LABELS = {
  title: "✨ AB Testing Assistant",
  initial: ["I'm an AB Testing Assistant. How can I help?"],
}

export default function CopilotChat() {
  return <CopilotChatKit
    instructions={prompt}
    labels={DEFAULT_LABELS}
  />
}