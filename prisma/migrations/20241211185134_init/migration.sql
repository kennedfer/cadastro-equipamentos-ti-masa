/*
  Warnings:

  - You are about to drop the `Device` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Device";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "dispositivos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "cautela" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "atributos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "dispositivoId" INTEGER NOT NULL,
    CONSTRAINT "atributos_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "dispositivos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "dispositivos_tag_key" ON "dispositivos"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "dispositivos_serial_key" ON "dispositivos"("serial");
