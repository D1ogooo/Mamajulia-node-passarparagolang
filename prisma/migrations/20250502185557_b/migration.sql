/*
  Warnings:

  - You are about to drop the `PratosRetirados` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "StatusPrato" ADD VALUE 'INATIVO';

-- AlterTable
ALTER TABLE "Prato" ADD COLUMN     "status" "StatusPrato" NOT NULL DEFAULT 'PENDENTE_PARA_PREPARO';

-- DropTable
DROP TABLE "PratosRetirados";

-- CreateTable
CREATE TABLE "PedidosConcluidos" (
    "id" TEXT NOT NULL,
    "prato" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PedidosConcluidos_pkey" PRIMARY KEY ("id")
);
