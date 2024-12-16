import deviceController from "@/controllers/device.controller";

export async function GET(_, { params }) {
  const { id } = params;
  try {
    return await deviceController.get(id);
  } catch (error) {
    console.error("Erro ao recuperar o dispositivo:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao recuperar o dispositivo" }),
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    return await deviceController.update(req, Number(id));
  } catch (error) {
    console.error("Erro ao atualizar o dispositivo:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar o dispositivo" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    return await deviceController.delete(req, Number(id));
  } catch (error) {
    console.error("Erro ao deletar o dispositivo:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao deletar o dispositivo" }),
      { status: 500 }
    );
  }
}
