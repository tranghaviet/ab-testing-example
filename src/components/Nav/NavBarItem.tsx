import Link, { LinkProps } from "next/link"

type NavbarItemType = Omit<LinkProps, "href"> & {
  href: string
  children?: React.ReactNode
}

export default function NavBarItem({ href, children }: NavbarItemType) {
  return (
    <Link
      href={href}
      className="hover:text-gray-600 transition-colors font-semibold"
    >
      {children}
    </Link>
  )
}
