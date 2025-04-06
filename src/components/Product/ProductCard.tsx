import { ProductListRecordType } from "@/utils/supabase/product"
import Image from "next/image"
import AddToCartBtn from "./AddToCartBtn"
import ProductDetailLink from "./ProductDetailLink"
import { BLUR_DATA_URL } from "@/constants/image"

export type ProductCardProps = {
  product: ProductListRecordType
}

export const DATA_TEST_TYPE = "products"

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      data-test-type={DATA_TEST_TYPE}
      data-test-id={product.id}
    >
      <div className="relative h-56 w-full">
        <ProductDetailLink id={product.id}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </ProductDetailLink>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg truncate">
          <ProductDetailLink
            id={product.id}
            title={product.name}
            data-test-type={`${DATA_TEST_TYPE}.name`}
            data-test-id={product.id}
          >
            {product.name}
          </ProductDetailLink>
        </h3>
        <div className="flex justify-between items-center">
          <span
            className="text-sm text-gray-600"
            data-test-type={`${DATA_TEST_TYPE}.category`}
            data-test-id={product.id}
          >
            {product.category}
          </span>
          <span
            className="font-bold"
            data-test-type={`${DATA_TEST_TYPE}.price`}
            data-test-id={product.id}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>
        <AddToCartBtn product={product}></AddToCartBtn>
      </div>
    </div>
  )
}
