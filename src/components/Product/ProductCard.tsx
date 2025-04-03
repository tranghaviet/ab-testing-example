import { ProductListRecordType } from "@/utils/supabase/product"
import Image from "next/image"
import AddToCartBtn from "./AddToCartBtn"
import ProductDetailLink from "./ProductDetailLink"

type Props = {
  product: ProductListRecordType
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-56 w-full">
        <ProductDetailLink id={product.id}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </ProductDetailLink>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg truncate">
          <ProductDetailLink id={product.id}>{product.name}</ProductDetailLink>
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{product.category}</span>
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
        <AddToCartBtn product={product}></AddToCartBtn>
      </div>
    </div>
  )
}
