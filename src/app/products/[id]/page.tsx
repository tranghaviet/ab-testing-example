import AddToCartBtn from "@/components/Product/AddToCartBtn"
import { prisma } from "@/server/prisma"
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
        <div className="md:w-1/3 relative h-96 mb-4 md:mb-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md max-w-[432px]"
            />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <AddToCartBtn product={product} className="md:w-auto"></AddToCartBtn>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex space-x-2">
          {product.images.map((img, index) => (
            <div key={index} className="relative h-20 w-20">
              <Image
                src={img}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
