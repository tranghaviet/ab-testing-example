import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes } from 'react'

export type ProductDetailLinkProps = Omit<LinkProps, "href"> & AnchorHTMLAttributes<HTMLAnchorElement> & {
  id: string
}

export default function ProductDetailLink({
  id,
  ...rest
}: ProductDetailLinkProps) {
  return <Link href={`/products/${id}`} {...rest}></Link>
}
