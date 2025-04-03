import { Prisma } from '@prisma/client'

export const productListQuery = Prisma.validator<Prisma.ProductFindManyArgs>()({
  // take: 20,
  select: {
    id: true,
    imageUrl: true,
    name: true,
    category: true,
    price: true,
  },
})

export type ProductListRecordType = Prisma.ProductGetPayload<typeof productListQuery>
