import { BLUR_DATA_URL } from "@/constants/image"
import { priceToText } from '@/utils/number'
import { ProductListRecordType } from "@/utils/supabase/product"
import Image from "next/image"
import AddToCartBtn from "./AddToCartBtn"
import ProductDetailLink from "./ProductDetailLink"

export type ProductCardProps = {
  product: ProductListRecordType
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <ProductDetailLink id={product.id} className="relative h-56 w-full block">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ProductDetailLink>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg truncate">
          <ProductDetailLink id={product.id} title={product.name}>
            {product.name}
          </ProductDetailLink>
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{product.category}</span>
          {/* <ProductPrice
            id={product.id}
            price={product.price}
            className="font-bold"
          /> */}
          <span className="font-bold">{priceToText(product.price)}</span>
        </div>
        <AddToCartBtn product={product}></AddToCartBtn>
      </div>
    </div>
  )
}
