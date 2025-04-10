import ProductCard from "@/components/Product/ProductCard"
import { EXPERIMENT_COOKIE_NAME } from "@/utils/ab-test"
import {
  getProductList,
  getProductListVariantRecords,
  ProductListRecordType
} from "@/utils/supabase/product"
import { cookies } from "next/headers"

export default async function ProductList({ page }: { page: number }) {
  const pageSize = 21; // Number of products per page
  const offset = isNaN(page) ? 0 : (page - 1) * pageSize;

  const cookieStore = await cookies()
  const isEnable = cookieStore.get(EXPERIMENT_COOKIE_NAME)?.value === "true"

  let products: Array<ProductListRecordType> | null = null

  if (isEnable) {
    products = await getProductListVariantRecords(offset)
  } else {
    products = await getProductList(offset)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
