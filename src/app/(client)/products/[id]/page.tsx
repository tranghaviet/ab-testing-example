import AddToCartBtn from "@/components/Product/AddToCartBtn"
import Productdescription from "@/components/Product/ProductDescription"
import ProductPrice from "@/components/Product/ProductPrice"
import { BLUR_DATA_URL } from "@/constants/image"
import { prisma } from "@/server/prisma"
import { EXPERIMENT_COOKIE_NAME } from "@/utils/ab-test"
import {
  getProductVariantRecords,
  ProductRecordType,
  ProductVariantRecordType,
} from "@/utils/supabase/product"
import { omit } from "lodash-es"
import { cookies } from "next/headers"
import Image from "next/image"
import { notFound } from "next/navigation"

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const cookieStore = await cookies()
  const isEnable = cookieStore.get(EXPERIMENT_COOKIE_NAME)?.value === "true"
  let product: ProductRecordType | null = null

  if (!isEnable) {
    product = await prisma.product.findFirst({
      where: {
        id,
      },
    })
  } else {
    const records = await getProductVariantRecords(id)

    if (!records || records.length === 0) {
      return <div>Product not found.</div>
    }

    const map = new Map<string, ProductRecordType>()
    records.forEach((product: ProductVariantRecordType) => {
      const { field, value } = product
      if (field !== null && value !== null) {
        // const parsedValue = JSON.parse(value)
        const oldRecord = map.get(product.id)
        map.set(product.id, { ...(oldRecord ?? product), [field]: value })
      } else {
        // no associated field, so just omit the field and value
        map.set(product.id, omit(product, ["field", "value"]))
      }
    })

    product = Array.from(map.values())[0]
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="relative h-96 mb-4 md:mb-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-md max-w-[432px]"
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="mt-4 mb-6">
            <div className="flex space-x-2">
              {product.images.map((img, index) => (
                <div key={index} className="relative h-20 w-20">
                  <Image
                    src={img}
                    alt={product.name}
                    className="object-cover rounded-md"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    width={80}
                    height={80}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <ProductPrice
            id={product.id}
            price={product.price}
            className="text-xl font-semibold"
          />
          <Productdescription
            id={product.id}
            description={product.description}
          />
          <AddToCartBtn product={product} className="sm:w-auto"></AddToCartBtn>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
