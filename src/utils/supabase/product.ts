import { prisma } from "@/server/prisma"
import { Prisma } from "@prisma/client"

export type AdditionalVariantRecordType = {
  field: string | null
  value: string | null
}

export const productListQuery = Prisma.validator<Prisma.ProductFindManyArgs>()({
  take: 21,
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

export type ProductListRecordType = Prisma.ProductGetPayload<
  typeof productListQuery
>

export type ProductListVariantRecordType = ProductListRecordType &
  AdditionalVariantRecordType

export async function getProductListVariantRecords(): Promise<
  Array<ProductListVariantRecordType>
> {
  return prisma.$queryRaw<Array<ProductListVariantRecordType>>`
SELECT products.*, tv.field, tv.value
FROM products
LEFT JOIN "TestVariant" tv ON products.id = tv."recordId"
ORDER BY products.id DESC
LIMIT 21
  `
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
