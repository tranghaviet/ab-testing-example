export type Product = {
  id: string
  imageUrl: string
  productName: string
  category: string
  description: string
  price: number
  images: string[]
}

export const dummyProducts: Product[] = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/200",
    productName: "Laptop Pro",
    description: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/200",
    productName: "Running Shoes",
    description: "Running Shoes",
    category: "Apparel",
    price: 89.95,
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
  },
  {
    id: "3",
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
    imageUrl: "https://picsum.photos/200",
    productName: "Coffee Maker",
    description: "Coffee Maker",
    category: "Home",
    price: 59.5,
  },
  {
    id: "4",
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
    imageUrl: "https://picsum.photos/200",
    productName: "Wireless Mouse",
    description: "Wireless Mouse",
    category: "Electronics",
    price: 24.99,
  },
  {
    id: "5",
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
    imageUrl: "https://picsum.photos/200",
    productName: "Cotton T-Shirt",
    description: "Cotton T-Shirt",
    category: "Apparel",
    price: 19.99,
  },
  {
    id: "6",
    images: Array.from(
      { length: 5 },
      (_, index) => `https://picsum.photos/50?random=${index}`
    ),
    imageUrl: "https://picsum.photos/200",
    productName: "Kitchen Blender",
    description: "Kitchen Blender",
    category: "Home",
    price: 79.0,
  },
]
