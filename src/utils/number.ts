export function priceToText(price: number) {
  return '$' + Number(price).toFixed(2).replace(/(\.?0+)$/, '')
}
