-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dispositivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT,
    "marca" TEXT,
    "modelo" TEXT,
    "tag" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "cautela" TEXT,
    "status" TEXT
);
INSERT INTO "new_Dispositivo" ("cautela", "id", "marca", "modelo", "serial", "status", "tag", "tipo") SELECT "cautela", "id", "marca", "modelo", "serial", "status", "tag", "tipo" FROM "Dispositivo";
DROP TABLE "Dispositivo";
ALTER TABLE "new_Dispositivo" RENAME TO "Dispositivo";
CREATE UNIQUE INDEX "Dispositivo_tag_key" ON "Dispositivo"("tag");
CREATE UNIQUE INDEX "Dispositivo_serial_key" ON "Dispositivo"("serial");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
