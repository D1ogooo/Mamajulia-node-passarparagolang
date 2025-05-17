-- CreateTable
CREATE TABLE "PedidosSituacao" (
    "id" TEXT NOT NULL,
    "prato" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PedidosSituacao_pkey" PRIMARY KEY ("id")
);
