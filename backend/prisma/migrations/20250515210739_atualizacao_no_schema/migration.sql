/*
  Warnings:

  - You are about to drop the `PedidosConcluidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidosSituacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PedidosConcluidos";

-- DropTable
DROP TABLE "PedidosSituacao";

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PedidoItems" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pedidoId" TEXT NOT NULL,
    "pratoId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItems" ADD CONSTRAINT "PedidoItems_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoItems" ADD CONSTRAINT "PedidoItems_pratoId_fkey" FOREIGN KEY ("pratoId") REFERENCES "Prato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
