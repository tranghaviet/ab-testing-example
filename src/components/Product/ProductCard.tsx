import { BLUR_DATA_URL } from "@/constants/image";
import { generateDataTestId, PRODUCT_DATA_TEST_PREFIX } from '@/utils/ab-test';
import { ProductListRecordType } from "@/utils/supabase/product";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import ProductDetailLink from "./ProductDetailLink";

export type ProductCardProps = {
  product: ProductListRecordType;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      data-test-id={generateDataTestId(PRODUCT_DATA_TEST_PREFIX, product.id, 'id')}
    >
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
          <ProductDetailLink
            id={product.id}
            title={product.name}
            data-test-id={generateDataTestId(PRODUCT_DATA_TEST_PREFIX, product.id, 'name')}
          >
            {product.name}
          </ProductDetailLink>
        </h3>
        <div className="flex justify-between items-center">
          <span
            className="text-sm text-gray-600"
            data-test-id={generateDataTestId(PRODUCT_DATA_TEST_PREFIX, product.id, 'category')}
          >
            {product.category}
          </span>
          <span
            className="font-bold"
            data-test-id={generateDataTestId(PRODUCT_DATA_TEST_PREFIX, product.id, 'price')}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>
        <AddToCartBtn product={product}></AddToCartBtn>
      </div>
    </div>
  );
}
