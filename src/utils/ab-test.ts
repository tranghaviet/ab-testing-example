export const PRODUCT_DATA_TEST_PREFIX = "products";

export function generateDataTestId(
  prefix: string,
  id: string,
  variant: string
): string {
  return `${prefix}.${id}.${variant}`
}
