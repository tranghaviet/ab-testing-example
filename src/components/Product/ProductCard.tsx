import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  imageUrl: string;
  productName: string;
  category: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  productName,
  category,
  price,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md w-64">
      <div className="relative h-40 mb-4">
        <Image
          src={imageUrl}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{productName}</h3>
      <p className="text-sm text-gray-500 mb-1">{category}</p>
      <p className="text-base font-medium mb-2">${price.toFixed(2)}</p>
      <Button className="w-full">Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
