"use client"

import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { ReactNode, useState } from "react"

type AddToCartBtnProps = {
  id: string
  className?: string
  children?: ReactNode
}

export default function AddToCartBtn({
  id,
  children,
  className,
}: AddToCartBtnProps) {
  // const [loading, setLoading] = useState(false)
  // const { addToCart } = useCart()
  function onAddToCart(id: string): void {
    console.log("add to cart", id)
  }

  return (
    <Button
      className={clsx("w-full", className)}
      onClick={() => onAddToCart(id)}
    >
      {children ?? "Add to Cart"}
    </Button>
  )
}
