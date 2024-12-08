import '../../../lib/mongoose';

import deviceController from '@/controllers/device.controller';

export async function GET(req, res) {
  return deviceController.all(req, res);
}

export async function POST(req, res) {
  return deviceController.create(req, res);
}
