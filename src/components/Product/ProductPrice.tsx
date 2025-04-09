"use client"

import { POST_MESSAGE_AB_TEST_TYPE, dispatchMessage } from "@/utils/ab-test"
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
  function handleClick() {
    dispatchMessage({
      type: POST_MESSAGE_AB_TEST_TYPE,
      model: MODEL,
      field: FIELD,
      id,
      value: price,
    })
  }

  return (
    <p className={clsx("text-gray-600", className)} onClick={handleClick}>
      {priceToText(price)}
    </p>
  )
}
