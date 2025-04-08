"use client"

import { CONFIG_TYPE, dispatchMessage } from "@/utils/ab-test"
import clsx from "clsx"

const MODEL = "products"
const FIELD = "description"

export default function Productdescription({
  description,
  id,
  className,
}: {
  description: string
  id: string
  className?: string
}) {
  function handleClick() {
    dispatchMessage({
      type: CONFIG_TYPE,
      model: MODEL,
      field: FIELD,
      id,
      value: description,
    })
  }

  return (
    <p className={clsx("text-gray-600 mb-4", className)} onClick={handleClick}>
      {description}
    </p>
  )
}
