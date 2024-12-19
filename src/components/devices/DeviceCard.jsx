import { Card } from "@/components/ui/card"; // Ajuste se necessário
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DeviceCard({ device }) {
  const {
    marca,
    modelo,
    tag,
    patrimonio,
    nome,
    cpf,
    setor,
    funcao,
    tipo,
    processador,
    memoria,
    status,
  } = device;

  return (
    <Card className="space-y-4 w-full sm:w-[600px] p-4 border rounded-lg shadow-lg bg-white">
      {/* Dados do Equipamento */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900">Dados do Equipamento</h3>
        <div>
          <Label>Tipo:</Label>
          <p>{tipo}</p>
        </div>
        <div>
          <Label>Marca:</Label>
          <p>{marca}</p>
        </div>
        <div>
          <Label>Modelo:</Label>
          <p>{modelo}</p>
        </div>
        <div>
          <Label>Tag:</Label>
          <p>{tag}</p>
        </div>
        <div>
          <Label>Patrimônio:</Label>
          <p>{patrimonio}</p>
        </div>
        <div>
          <Label>Processador:</Label>
          <p>{processador}</p>
        </div>
        <div>
          <Label>Memória RAM:</Label>
          <p>{memoria}</p>
        </div>
        <div>
          <Label>Status:</Label>
          <Badge variant={status === "ativo" ? "success" : "destructive"}>{status}</Badge>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Dados do Dono */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900">Dados do Dono</h3>
        <div>
          <Label>Nome:</Label>
          <p>{nome}</p>
        </div>
        <div>
          <Label>CPF:</Label>
          <p>{cpf}</p>
        </div>
        <div>
          <Label>Setor:</Label>
          <p>{setor}</p>
        </div>
        <div>
          <Label>Função:</Label>
          <p>{funcao}</p>
        </div>
      </div>
    </Card>
  );
}
