"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

interface FormData {
  name: string
  country: string
  street: string
  city: string
  state: string
  zip: string
  cardNumber: string
  expiry: string
  cvc: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { itemCount, total, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData({ ...formData, [name]: formatted })
      return
    }

    // Format expiry date with slash
    if (name === "expiry") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      setFormData({ ...formData, [name]: formatted })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Validate required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormData] = "This field is required"
      }
    })

    // Validate card number format
    if (
      formData.cardNumber &&
      formData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Card number must be 16 digits"
    }

    // Validate expiry date format
    if (formData.expiry && !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Use MM/YY format"
    }

    // Validate CVC format
    if (formData.cvc && !/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = "CVC must be 3 or 4 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Successful!",
        description: "Your order has been placed successfully.",
        duration: 5000,
      })

      clearCart()
      setIsSubmitting(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {itemCount === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            Your cart is empty, you need to add some products
          </p>
          <Link href="/">
            <Button className="mt-4">Go to products</Button>
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Address</h2>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors.country ? "border-red-500" : ""}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                  className={errors.street ? "border-red-500" : ""}
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className={errors.state ? "border-red-500" : ""}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="zip">ZIP</Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleChange}
                    className={errors.zip ? "border-red-500" : ""}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Card Information</h2>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">MM/YY</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    maxLength={5}
                    className={errors.expiry ? "border-red-500" : ""}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    name="cvc"
                    placeholder="CVC"
                    value={formData.cvc}
                    onChange={handleChange}
                    maxLength={4}
                    className={errors.cvc ? "border-red-500" : ""}
                  />
                  {errors.cvc && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <div className="mb-4 text-right">
                <p className="text-lg">
                  Total: <span className="font-bold">${total.toFixed(2)}</span>
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="px-12 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Order"}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
