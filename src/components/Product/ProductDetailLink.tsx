import Link, { LinkProps } from "next/link"

export type ProductDetailLinkProps = Omit<LinkProps<a>, "href"> & {
  id: string
  children?: React.ReactNode
}

export default function ProductDetailLink({
  id,
  ...rest
}: ProductDetailLinkProps) {
  return <Link href={`/products/${id}`} {...rest}></Link>
}
