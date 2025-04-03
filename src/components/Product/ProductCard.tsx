import { ProductListRecordType } from '@/utils/supabase/product'
import Image from "next/image"
import Link from "next/link"
import AddToCartBtn from "./AddToCartBtn"


type Props = {
  product: ProductListRecordType
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-56 w-full">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <div className="p-4 space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{product.category}</span>
          <span className="font-bold">${product.price.toFixed(2)}</span>
        </div>
        <AddToCartBtn id={product.id}></AddToCartBtn>
      </div>
    </div>
  )
}
