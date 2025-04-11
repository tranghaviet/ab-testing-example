export const EXPERIMENT_COOKIE_NAME = "experiment"
export const POST_MESSAGE_AB_TEST_TYPE = "ab-test-config"
export const POST_MESSAGE_TARGET_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "*" // "*" for demo purpose

export function generateDataTestId(
  prefix: string,
  id: string,
  variant: string
): string {
  return `${prefix}.${id}.${variant}`
}

export type ABMessage = {
  type: string
  model: string
  field: string
  id: string
  value: any
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
export function dispatchMessage(
  message: ABMessage,
  targetOrigin = POST_MESSAGE_TARGET_ORIGIN
) {
  window.parent.postMessage(message, targetOrigin)
}
