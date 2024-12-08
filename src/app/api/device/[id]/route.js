import '../../../../lib/mongoose';
import deviceController from "@/controllers/device.controller";

export async function GET(_, { params }) {
  const { id } = params;
  return deviceController.get(id);
}

export async function PATCH(req, { params }) {
  const { id } = params;
  return deviceController.update(req, id);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  return deviceController.delete(req, id);
}
