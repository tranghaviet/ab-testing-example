import clsx from 'clsx'
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes } from 'react'

type NavbarItemType = Omit<LinkProps, "href"> & AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

export default function NavBarItem({ href, ...rest }: NavbarItemType) {
  return (
    <Link
      {...rest}
      href={href}
      className={clsx("hover:text-gray-600 transition-colors font-semibold", rest.className)}
    />
  )
}
