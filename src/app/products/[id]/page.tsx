import { Button } from "@/components/ui/button";
import { dummyProducts } from '@/lib/data';
import Image from "next/image";

const ProductDetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params
  const id = params.id

  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-96 mb-4 md:mb-0">
          <Image
            src={product.imageUrl}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <Button className="w-full md:w-auto">Add to Cart</Button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Related Images</h2>
        <div className="flex space-x-2">
          {product.images.map((img, index) => (
            <div key={index} className="relative h-20 w-20">
              <Image src={img} alt={`Related ${index}`} layout="fill" objectFit="cover" className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
