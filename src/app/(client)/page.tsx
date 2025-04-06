import ProductCard from "@/components/Product/ProductCard"
import { prisma } from "@/server/prisma"
import { productListQuery } from '@/utils/supabase/product'

export default async function ProductListPage() {
  const products = await prisma.product.findMany(productListQuery)

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
