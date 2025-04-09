import ProductsPagination from "@/components/Product/ProductsPagination"
import ProductList from "@/components/Product/ProductList"
import { getTotalProductPages } from "@/utils/supabase/product"

type Props = {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function ProductListPage(props: Props) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) ?? 1

  if (currentPage < 1) {
    throw new Error("Invalid page number")
  }

  const pageCount = await getTotalProductPages()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductList page={currentPage} />
      {pageCount > 1 && <ProductsPagination pageCount={pageCount} />}
    </div>
  )
}
