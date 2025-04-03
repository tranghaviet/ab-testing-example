"use client"

import Image from "next/image"
import type { CartItem } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import ProductDetailLink from "../Product/ProductDetailLink"

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="py-4">
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 flex-shrink-0 border">
          <ProductDetailLink id={item.id}>
            <Image
              src={item.imageUrl || "/placeholder.svg?height=100&width=100"}
              alt={item.name}
              fill
              className="object-cover"
            />
          </ProductDetailLink>
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-lg">
            <ProductDetailLink id={item.id}>{item.name}</ProductDetailLink>
          </h3>
          <p className="text-gray-600">{item.category}</p>

          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center">
              <span className="mr-2">Qty: </span>
              <select
                value={item.quantity}
                onChange={(e) =>
                  onUpdateQuantity(item.id, Number.parseInt(e.target.value))
                }
                className="border rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-l pl-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <span className="mr-1">Delete</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="text-right font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  )
}
