import Device from "@/models/device";
import QRCode from "qrcode";

import { prisma } from "../database/prisma";

class DeviceController {
  // Método para obter todos os dispositivos
  async all(req) {
    // try {
    // const devices = await Device.find({});
    const devices = await prisma.dispositivo.findMany();
    return new Response(JSON.stringify(devices), { status: 200 });
    // } catch (error) {
    //   // console.log(error);
    //   return new Response(JSON.stringify({ error: 'Error retrieving devices' }), { status: 500 });
    // }
  }

  // Método para obter um dispositivo específico
  async get(patrimonio) {
    const device = await prisma.dispositivo.findUnique({
      where: {
        patrimonio
      }
    });
    if (!device) {
      return new Response(JSON.stringify({ error: "Device not found" }), {
        status: 404
      });
    }
    return new Response(JSON.stringify(device), { status: 200 });
  }

  async create(req, res) {
    try {
      const atributos = await req.json();

      const atributosArray = Object.entries(
        atributos["atributos"]
      ).map(([chave, valor]) => ({
        chave,
        valor
      }));

      const newDevice = await prisma.dispositivo.create({
        data: {
          ...atributos,
          atributos: {
            create: atributosArray
          }
        }
      });

      return new Response(JSON.stringify(newDevice), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
  }

  // Método para atualizar um dispositivo
  async update(req, id) {
    try {
      const updatedDevice = await Device.findByIdAndUpdate(
        id,
        await req.json(),
        {
          new: true,
          runValidators: true
        }
      );
      if (!updatedDevice) {
        return new Response(JSON.stringify({ error: "Device not found" }), {
          status: 404
        });
      }
      return new Response(JSON.stringify(updatedDevice), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Error updating device" }), {
        status: 500
      });
    }
  }

  // Método para excluir um dispositivo
  async delete(req, id) {
    try {
      const deletedDevice = await Device.findByIdAndDelete(id);
      if (!deletedDevice) {
        return new Response(JSON.stringify({ error: "Device not found" }), {
          status: 404
        });
      }
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: "Error deleting device" }), {
        status: 500
      });
    }
  }
}

const deviceController = new DeviceController();
export default deviceController;
