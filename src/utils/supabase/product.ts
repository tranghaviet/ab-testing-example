import { prisma } from "@/server/prisma"
import { Prisma } from "@prisma/client"

export const DEFAULT_PRODUCT_LIST_SIZE = 12

export type AdditionalVariantRecordType = {
  field: string | null
  value: string | null
}

export function getTotalProductPages() {
  return prisma.product
    .count()
    .then((count) => Math.ceil(count / DEFAULT_PRODUCT_LIST_SIZE))
}

export const productListQueryBase =
  Prisma.validator<Prisma.ProductFindManyArgs>()({
    take: DEFAULT_PRODUCT_LIST_SIZE,
    select: {
      id: true,
      imageUrl: true,
      name: true,
      category: true,
      price: true,
    },
    orderBy: {
      id: "desc",
    },
  })

export function getProductList(skip: number) {
  return prisma.product.findMany({
    ...productListQueryBase,
    skip,
  })
}

export type ProductListRecordType = Prisma.ProductGetPayload<
  typeof productListQueryBase
>

export type ProductListVariantRecordType = ProductListRecordType &
  AdditionalVariantRecordType

export async function getProductListVariantRecords(
  offset: number
): Promise<Array<ProductListVariantRecordType>> {
  return prisma.$queryRaw<Array<ProductListVariantRecordType>>(Prisma.sql`
SELECT products.*, tv.field, tv.value
FROM products
LEFT JOIN "TestVariant" tv ON products.id = tv."recordId"
ORDER BY products.id DESC
LIMIT ${DEFAULT_PRODUCT_LIST_SIZE}
OFFSET ${offset}
  `)
}

export type ProductRecordType =
  Prisma.ProductGetPayload<Prisma.ProductFindFirstArgs>

export type ProductVariantRecordType = AdditionalVariantRecordType &
  ProductRecordType

export async function getProductVariantRecords(
  id: string
): Promise<Array<ProductVariantRecordType>> {
  const records = await prisma.$queryRaw<Array<ProductVariantRecordType>>`
    SELECT products.*, tv.field, tv.value
    FROM products
    LEFT JOIN "TestVariant" tv ON products.id = tv."recordId"
    WHERE products.id = ${id}
  `

  return records
}
