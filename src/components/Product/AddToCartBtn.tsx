"use client"

import { Button } from "@/components/ui/button"
import { useCart } from '@/context/cart-context'
import { useToast } from '@/hooks/use-toast'
import { ProductListRecordType } from '@/utils/supabase/product'
import clsx from "clsx"
import { ReactNode, useState } from "react"

type AddToCartBtnProps = {
  product: ProductListRecordType
  className?: string
  children?: ReactNode
}

export default function AddToCartBtn({
  product,
  children,
  className,
}: AddToCartBtnProps) {
  const { toast } = useToast()
  const { addItem } = useCart()

  function onAddToCart(): void {
    addItem(product)
    toast({
      title: `Added ${product.name}`
    })
  }

  return (
    <Button
      className={clsx("w-full", className)}
      onClick={onAddToCart}
    >
      {children ?? "Add to Cart"}
    </Button>
  )
}
