import ProductCard from '@/components/Product/ProductCard';
import { dummyProducts } from '@/lib/data';
import React from "react";

const ProductListPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dummyProducts.map((product, index) => (
          <ProductCard
            key={index}
            imageUrl={product.imageUrl}
            productName={product.productName}
            category={product.category}
            price={product.price}
          />
        ))}
      </main>
    </div>
  );
};

export default ProductListPage;
