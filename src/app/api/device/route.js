import deviceController from "@/controllers/device.controller";

export async function GET(req) {
  try {
    return deviceController.all(req);
  } catch (error) {
    console.error("Erro ao recuperar dispositivos:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao recuperar dispositivos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    return deviceController.create(req);
  } catch (error) {
    console.error("Erro ao criar dispositivo:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao criar dispositivo" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
