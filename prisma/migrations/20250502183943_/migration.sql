/*
  Warnings:

  - You are about to drop the column `productId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cartId,pratoId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pratoId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPrato" AS ENUM ('PENDENTE_PARA_PREPARO', 'EM_PREPARO', 'PRONTO_PARA_RETIRAR', 'RETIRADO', 'CANCELADO');

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productId",
ADD COLUMN     "pratoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Prato" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PratosRetirados" (
    "id" TEXT NOT NULL,
    "prato" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,

    CONSTRAINT "PratosRetirados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_pratoId_key" ON "CartItem"("cartId", "pratoId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
