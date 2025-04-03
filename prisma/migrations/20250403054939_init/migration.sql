-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
