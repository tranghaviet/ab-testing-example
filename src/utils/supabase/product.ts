import { prisma } from "@/server/prisma"
import { Prisma } from "@prisma/client"

export const DEFAULT_PRODUCT_LIST_SIZE = 12

export type AdditionalVariantRecordType = {
  field: string;
  value: string;
}

export function getTotalProductPages() {
  return prisma.product
    .count()
    .then((count) => Math.ceil(count / DEFAULT_PRODUCT_LIST_SIZE))
}

export const productListQueryBase =
  Prisma.validator<Prisma.ProductFindManyArgs>()({
    take: DEFAULT_PRODUCT_LIST_SIZE,
    skip: 0,
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

export function getProductList(skip: number = 0) {
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
  skip: number
): Promise<Array<ProductListRecordType>> {
  const products = await prisma.product.findMany({
    ...productListQueryBase,
    skip,
  })

  const variantRecords = await prisma.testVariant.findMany({
    select: {
      field: true,
      value: true,
      recordId: true,
    },
    where: {
      recordId: {
        in: products.map((record) => record.id),
      },
    },
  })
  const variantMap = new Map<string, AdditionalVariantRecordType[]>()
  variantRecords.forEach((variant) => {
    const { field, value, recordId } = variant
    if (field !== null && value !== null) {
      if (variantMap.has(recordId)) {
        variantMap.get(recordId)?.push({field, value} as AdditionalVariantRecordType)
      } else {
        variantMap.set(recordId, [{ field, value } as AdditionalVariantRecordType])
      }
    }
  })

  const productMap = new Map<string, ProductListRecordType>();
  products.forEach((product: ProductListRecordType) => {
    const variants = variantMap.get(product.id)
    if (variants) {
      variants.forEach((variant) => {
        (product as any)[variant.field] = variant.value
      })
    }

    productMap.set(product.id, product)
  })

  return Array.from(productMap.values())
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
