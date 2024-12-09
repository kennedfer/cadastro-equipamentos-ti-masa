// import '../../../lib/mongoose';
import "../../../database/prisma"

import deviceController from '@/controllers/device.controller';

export async function GET(req, res) {
  // const devices = await Device.findAll();
  console.log('Dispositivos encontrados:', devices.map((d) => d.toJSON()));
  // return deviceController.all(req, res);
}

export async function POST(req, res) {
  return deviceController.create(req, res);
}
