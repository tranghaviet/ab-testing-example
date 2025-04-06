import Link from "next/link"
import NavBarItem from "./NavBarItem"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ABConvert
        </Link>
        <div className="space-x-6">
          {/* <NavBarItem href="/">Home</NavBarItem> */}
          <NavBarItem href="/cart">Cart</NavBarItem>
          <NavBarItem href="/checkout">Checkout</NavBarItem>
          <NavBarItem href="/admin/ab-testing">AB Testing</NavBarItem>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
