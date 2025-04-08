import ProductCard from "@/components/Product/ProductCard"
import { prisma } from "@/server/prisma"
import { EXPERIMENT_COOKIE_NAME } from "@/utils/ab-test"
import {
  getProductListVariantRecords,
  productListQuery,
  ProductListRecordType,
  ProductListVariantRecordType,
} from "@/utils/supabase/product"
import { omit } from "lodash-es"
import { cookies } from "next/headers"

export default async function ProductListPage() {
  const cookieStore = await cookies()
  const isEnable = cookieStore.get(EXPERIMENT_COOKIE_NAME)?.value === "true"

  let products: Array<ProductListRecordType> | null = null

  if (!isEnable) {
    products = await prisma.product.findMany(productListQuery)
  } else {
    const records = await getProductListVariantRecords()

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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
