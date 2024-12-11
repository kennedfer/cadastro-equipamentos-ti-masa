// import '../../../lib/mongoose';

import deviceController from '@/controllers/device.controller';

export async function GET(req, res) {
  // const devices = await Device.findAll();
  // const devices = await prisma.device.findMany();
  return deviceController.all(req, res);
}

export async function POST(req, res) {
  return deviceController.create(req, res);
}
