"use client"

import { CONFIG_TYPE, dispatchMessage } from "@/utils/ab-test"
import { priceToText } from '@/utils/number'
import clsx from "clsx"

const MODEL = "products"
const FIELD = "price"

export default function ProductPrice({
  price,
  id,
  className,
}: {
  price: number
  id: string
  className?: string
}) {
  function handleClick(e: React.MouseEvent) {
    dispatchMessage({
      type: CONFIG_TYPE,
      model: MODEL,
      field: FIELD,
      id: id,
      value: price,
    })
  }

  return (
    <p className={clsx("text-gray-600", className)} onClick={handleClick}>
      {priceToText(price)}
    </p>
  )
}
