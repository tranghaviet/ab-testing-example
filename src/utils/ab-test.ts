export const EXPERIMENT_COOKIE_NAME = "experiment"
export const CONFIG_TYPE = "ab-test-config"
export const TARGET_ORIGIN = "*"

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
  targetOrigin = TARGET_ORIGIN
) {
  window.parent.postMessage(message, targetOrigin)
}
