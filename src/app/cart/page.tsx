"use client"

import CartItemComponent from "@/components/Cart/CartItem"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, updateQuantity, removeItem, itemCount, total } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">
        {itemCount} {itemCount === 1 ? "item" : "items"} in the cart
      </h1>

      <Separator className="my-4" />

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-0">
            {items.map((item) => (
              <div key={item.id}>
                <CartItemComponent
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
                <Separator />
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-end items-center mt-4">
            <Button size="lg" onClick={handleCheckout} className="px-8">
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
