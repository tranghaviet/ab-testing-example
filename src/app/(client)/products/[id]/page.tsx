import AddToCartBtn from "@/components/Product/AddToCartBtn"
import { BLUR_DATA_URL } from "@/constants/image"
import { prisma } from "@/server/prisma"
import { generateDataTestId, PRODUCT_DATA_TEST_PREFIX } from "@/utils/ab-test"
import Image from "next/image"

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  })

  if (!product) {
    return <div>Product not found.</div>
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
          <p
            className="text-xl font-semibold mb-4"
            data-test-id={generateDataTestId(
              PRODUCT_DATA_TEST_PREFIX,
              product.id,
              "price"
            )}
          >
            ${product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <AddToCartBtn product={product} className="sm:w-auto"></AddToCartBtn>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
