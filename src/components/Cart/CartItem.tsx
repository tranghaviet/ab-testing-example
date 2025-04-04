"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { CartItem } from "@/context/cart-context"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
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
  const [inputValue, setInputValue] = useState(item.quantity.toString())

  const handleDecrease = () => {
    const newQuantity = item.quantity - 1
    if (newQuantity === 0) {
      onRemove(item.id)
    } else {
      onUpdateQuantity(item.id, newQuantity)
      setInputValue(newQuantity.toString())
    }
  }

  const handleIncrease = () => {
    const newQuantity = item.quantity + 1
    onUpdateQuantity(item.id, newQuantity)
    setInputValue(newQuantity.toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow empty input while typing
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    // Convert to number and ensure it's not negative
    let newQuantity = Number.parseInt(inputValue, 10)

    // Handle NaN case
    if (isNaN(newQuantity)) {
      newQuantity = item.quantity
      setInputValue(item.quantity.toString())
      return
    }

    // Handle zero or negative case
    if (newQuantity <= 0) {
      onRemove(item.id)
      return
    }

    // Update quantity if changed
    if (newQuantity !== item.quantity) {
      onUpdateQuantity(item.id, newQuantity)
    }

    // Ensure input shows the correct value
    setInputValue(newQuantity.toString())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }

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
              loading="lazy"
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
              <div className="flex items-center border rounded overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none border-r"
                  onClick={handleDecrease}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  className="w-12 h-8 text-center focus:outline-none"
                  aria-label="Quantity"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-none border-l"
                  onClick={handleIncrease}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="border-l pl-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-0"
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
