"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCart } from '@/context/cart-context'
import { EXPERIMENT_COOKIE_NAME } from '@/utils/ab-test'
import Cookies from "js-cookie" // Import js-cookie

const oldValue = Cookies.get(EXPERIMENT_COOKIE_NAME) === "true"

export default function NavbarExperiment() {
  const { clearCart } = useCart()

  function handleClick(isEnable: boolean) {
    // Save to cookie "experiment"
    if (isEnable !== oldValue) {
      Cookies.set(EXPERIMENT_COOKIE_NAME, isEnable ? "true" : "false")
      clearCart() // Clear the cart if the experiment mode is changed
      window.location.reload() // Reload the page to apply changes
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="hover:text-gray-600 transition-colors font-semibold cursor-pointer">
          Experiment
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Experiment Mode</DialogTitle>
          <DialogDescription>
            Do you want to enable experiment mode?
            <br />
            Current mode: <strong>{oldValue ? "Enabled" : "Disabled"}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button type="button" onClick={() => handleClick(!oldValue)}>
                {oldValue ? "Disable" : "Enable"}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
