import Device from "@/models/device";
import QRCode from "qrcode";

import {prisma} from "../database/prisma"

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
  async get(serial) {
    const device = await prisma.dispositivo.findUnique({
      where:{
        sn: serial
      }
    });
    if (!device) {
      return new Response(JSON.stringify({ error: 'Device not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(device), { status: 200 });
  }

  async create(req, res) {
    try {
      const data = await req.json();
      console.log(data)
      // Cria um novo dispositivo sem o QR code inicialmente
      // const newDevice = new Device({{ name, owner, serviceTag }});

      // Salva o dispositivo no banco para obter o ID
      // await newDevice.save();

      // Gera o URL baseado no ID do dispositivo
      // const domain = process.env.DOMAIN || 'http://localhost:3000'; // Altere o domínio conforme necessário
      // const qrCodeURL = `${domain}/qrcode/${newDevice._id}`;
      const newDevice = await prisma.dispositivo.create({data})

      // // Gera o QR code com base na URL
      // const qrcode = await QRCode.toDataURL(qrCodeURL);

      // // Adiciona o QR code ao dispositivo e salva novamente
      // newDevice.qrcode = qrcode;
      // await newDevice.save();

      return new Response(JSON.stringify(newDevice), { status: 201 });
    } catch (error) {
      console.error('Error creating device:', error);
      return new Response(JSON.stringify({ error: 'Error creating device' }), { status: 500 });
    }
  }

  // Método para atualizar um dispositivo
  async update(req, id) {
    try {
      const updatedDevice = await Device.findByIdAndUpdate(id, await req.json(), {
        new: true,
        runValidators: true,
      });
      if (!updatedDevice) {
        return new Response(JSON.stringify({ error: 'Device not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(updatedDevice), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Error updating device' }), { status: 500 });
    }
  }

  // Método para excluir um dispositivo
  async delete(req, id) {
    try {
      const deletedDevice = await Device.findByIdAndDelete(id);
      if (!deletedDevice) {
        return new Response(JSON.stringify({ error: 'Device not found' }), { status: 404 });
      }
      return new Response(null, { status: 204 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Error deleting device' }), { status: 500 });
    }
  }
}

const deviceController = new DeviceController();
export default deviceController;