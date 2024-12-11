/*
  Warnings:

  - You are about to drop the `atributos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dispositivos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "atributos";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "dispositivos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Dispositivo" (
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
CREATE TABLE "Atributo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "dispositivoId" INTEGER NOT NULL,
    CONSTRAINT "Atributo_dispositivoId_fkey" FOREIGN KEY ("dispositivoId") REFERENCES "Dispositivo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_tag_key" ON "Dispositivo"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Dispositivo_serial_key" ON "Dispositivo"("serial");
