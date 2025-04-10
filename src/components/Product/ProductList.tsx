import ProductCard from "@/components/Product/ProductCard"
import { EXPERIMENT_COOKIE_NAME } from "@/utils/ab-test"
import {
  getProductList,
  getProductListVariantRecords,
  ProductListRecordType,
  ProductListVariantRecordType
} from "@/utils/supabase/product"
import { omit } from "lodash-es"
import { cookies } from "next/headers"

export default async function ProductList({ page }: { page: number }) {
  const pageSize = 21; // Number of products per page
  const offset = isNaN(page) ? 0 : (page - 1) * pageSize;

  const cookieStore = await cookies()
  const isEnable = cookieStore.get(EXPERIMENT_COOKIE_NAME)?.value === "true"

  let products: Array<ProductListRecordType> | null = null

  if (!isEnable) {
    products = await getProductList(offset)
  } else {
    const records = await getProductListVariantRecords(offset)

    const map = new Map<string, ProductListRecordType>()
    records.forEach((product: ProductListVariantRecordType) => {
      const { field, value } = product
      if (field !== null && value !== null) {
        // const parsedValue = JSON.parse(value)
        const oldRecord = map.get(product.id)
        map.set(product.id, { ...(oldRecord ?? product), [field]: value })
      } else {
        map.set(product.id, omit(product, ["field", "value"]))
      }
    })

    products = Array.from(map.values())
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
