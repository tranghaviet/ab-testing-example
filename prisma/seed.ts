import "../envConfig"

/**
 * Adds seed data to your db
 *
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { prisma } from "@/server/prisma"

const images = Array.from(
  { length: 5 },
  (_, index) => `https://picsum.photos/id/21/100?random=${index}`
)

async function main() {
  new Array(100).fill(0).forEach(async (_, i) => {
    await prisma.product.create({
      data: {
        name: `Product ${i}`,
        imageUrl: "https://picsum.photos/id/21/500",
        description:
          "Consectetur minim veniam sit deserunt dolore ullamco laborum esse qui et est.",
        price: Math.round(Math.random() * 1000) / 10,
        images,
        category: `Category ${i % 10}`,
      },
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
