import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar um dispositivo
  const newDevice = await prisma.device.create({
    data: {
      name: "Dispositivo 1",
    },
  });
  console.log("Dispositivo criado:", newDevice);

  // Listar dispositivos
  const devices = await prisma.device.findMany();
  console.log("Lista de dispositivos:", devices);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
