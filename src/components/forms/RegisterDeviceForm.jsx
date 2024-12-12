import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import { LoadingButton } from "../buttons/LoadingButton";

const exclusiveAttributes = {
  computador: [
    { key: "processador", label: "Processador", type: "text", placeholder: "Ex.: Intel Core i7" },
    { key: "memoria", label: "Memória RAM", type: "text", placeholder: "Ex.: 16GB" },
  ],
  impressora: [
    { key: "cor", label: "Cor", type: "text", placeholder: "Ex.: Preto" },
    { key: "tipoImpressao", label: "Tipo de Impressão", type: "select", options: ["Laser", "Jato de Tinta"] },
  ],
  vazio: [],
};

const prismaErrorMessages = {
  P2002: "Um dos atributos únicos já foi salvo. Certifique-se de que o valor 'tag' ou 'patrimonio' está correto.",
  P2003: "Não foi possível concluir a operação porque o item relacionado não existe.",
  P2025: "O registro solicitado não foi encontrado. Verifique os dados fornecidos.",
  P2016: "Houve um problema ao interpretar a consulta. Certifique-se de que os dados estão corretos.",
  P2018: "Uma relação obrigatória está faltando. Verifique os dados enviados.",
  P2011: "Um valor obrigatório não foi fornecido. Certifique-se de preencher todos os campos necessários.",
  P3015: "O banco de dados está fora de sincronia. Entre em contato com o suporte técnico.",
  P3006: "Falha ao executar a migração. Revise o modelo ou consulte o administrador do banco.",
  P1001: "Não foi possível se conectar ao banco de dados. Verifique sua conexão e tente novamente.",
  P1009: "O banco de dados especificado não existe. Entre em contato com o suporte técnico.",
  P1010: "Falha na autenticação. Verifique suas credenciais de acesso ao banco de dados.",
  P1017: "A conexão com o servidor foi encerrada inesperadamente. Tente novamente mais tarde."
};


export function RegisterDeviceForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const type = watch("tipo");

  const {toast} = useToast();

  const renderAttributes = () => {
    const attributes = exclusiveAttributes[type] || [];
    return attributes.map((attr) => {
      if (attr.type === "text") {
        return (
          <div key={attr.key} className="mt-2">
            <Label htmlFor={attr.key}>{attr.label}</Label>
            <Input
              id={attr.key}
              type="text"
              placeholder={attr.placeholder}
              {...register(attr.key, { required: `${attr.label} é obrigatório.` })}
            />
            {errors[attr.key] && (
              <p className="text-red-500 text-sm mt-1">{errors[attr.key].message}</p>
            )}
          </div>
        );
      } else if (attr.type === "select") {
        return (
          <div key={attr.key} className="mt-2">
            <Label htmlFor={attr.key}>{attr.label}</Label>
            <Select onValueChange={(value) => setValue(attr.key, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Selecione ${attr.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{attr.label}</SelectLabel>
                  {attr.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors[attr.key] && (
              <p className="text-red-500 text-sm mt-1">{errors[attr.key].message}</p>
            )}
          </div>
        );
      }
      return null;
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const reply = await fetch("/api/device", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const newDevice = await reply.json();
    const error = newDevice.error;


    if(error){
      console.log(error)

      toast({
        title:"Erro:",
        description:(prismaErrorMessages[error.code] || "Ocorreu um erro inesperado. Tente novamente."),
        variant: "destructive"
      });

      return setLoading(false);
    }

    toast({
      title:"Sucesso:",
      variant: "sucess",
      description:"Cadastro realizado!"});

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[600px]">
      {/* Dados do Equipamento */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-500">Dados do Equipamento</h2>
        <Separator />
        <div>
          <Label htmlFor="tipo">Tipo de Dispositivo</Label>
          <Select id="tipo" onValueChange={(value) => setValue("tipo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo do dispositivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de Dispositivo</SelectLabel>
                <SelectItem value="computador">Computador</SelectItem>
                <SelectItem value="impressora">Impressora</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.tipo && (
            <p className="text-red-500 text-sm mt-1">{errors.tipo.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="marca">Marca</Label>
          <Input
            id="marca"
            type="text"
            placeholder="Ex.: Dell, HP, Lenovo"
            {...register("marca", { required: "Marca é obrigatória" })}
          />
          {errors.marca && (
            <p className="text-red-500 text-sm mt-1">{errors.marca.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="modelo">Modelo</Label>
          <Select id="modelo"  onValueChange={(value) => setValue("modelo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o modelo do computador" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* Série Precision */}
                <SelectLabel>Precision</SelectLabel>
                <SelectItem value="Precision 7670">Precision 7670</SelectItem>
                <SelectItem value="Precision 7680">Precision 7680</SelectItem>
                <SelectItem value="Precision 7550">Precision 7550</SelectItem>
                <SelectItem value="Precision 7530">Precision 7530</SelectItem>
                <SelectItem value="Precision 7340">Precision 7340</SelectItem>
                <SelectItem value="Precision 5820">Precision 5820</SelectItem>
              </SelectGroup>

              <SelectGroup>
                {/* Série Latitude */}
                <SelectLabel>Latitude</SelectLabel>
                <SelectItem value="Latitude 3420">Latitude 3420</SelectItem>
                <SelectItem value="Latitude 3490">Latitude 3490</SelectItem>
                <SelectItem value="Latitude 3410">Latitude 3410</SelectItem>
                <SelectItem value="Latitude 3400">Latitude 3400</SelectItem>
                <SelectItem value="Latitude 7440">Latitude 7440</SelectItem>
                <SelectItem value="Latitude 7340">Latitude 7340</SelectItem>
                <SelectItem value="Latitude 5420">Latitude 5420</SelectItem>
              </SelectGroup>

              <SelectGroup>
                {/* Série OptiPlex */}
                <SelectLabel>OptiPlex</SelectLabel>
                <SelectItem value="OptiPlex 5070">OptiPlex 5070</SelectItem>
                <SelectItem value="OptiPlex 3070">OptiPlex 3070</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tag">Service Tag</Label>
          <Input
            id="tag"
            type="text"
            placeholder="Ex.: JKDKOI, DA2JH4"
            {...register("tag", { required: "service tag é obrigatório" })}
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="patrimonio">Patrimonio</Label>
          <Input
            id="patrimonio"
            type="text"
            placeholder="Ex.: 123134, 987654"
            {...register("patrimonio", { required: "patrimonio é obrigatório" })}
          />
          {errors.patrimonio && (
            <p className="text-red-500 text-sm mt-1">{errors.patrimonio.message}</p>
          )}
        </div>
        {/* {renderAttributes()} */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" onValueChange={(value) => setValue("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado do dispositivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado do Dispositivo</SelectLabel>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
                <SelectItem value="manutencao">Em Manutenção</SelectItem>
                <SelectItem value="desativado">Desativado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* Dados do Dono */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-500">Dados do Responsável</h2>
        <Separator />
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            type="text"
            placeholder="Responsável ou local"
            {...register("nome", { required: "Nome é obrigatório" })}
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}\"
            placeholder="Ex.: 123.456.789-00"
            {...register("cpf", { required: "cpf é obrigatório" })}
          />
          {errors.cpf && (
            <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="setor">Setor</Label>
          <Input
            id="setor"
            type="text"
            placeholder="Ex.: RH, TI, BARRAGEM..."
            {...register("setor", { required: "setor é obrigatória" })}
          />
          {errors.setor && (
            <p className="text-red-500 text-sm mt-1">{errors.setor.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="funcao">Função</Label>
          <Input
            id="funcao"
            type="text"
            placeholder="Ex.: ANL RH PL, ANL TI SR..."
            {...register("funcao", { required: "funcao é obrigatória" })}
          />
          {errors.funcao && (
            <p className="text-red-500 text-sm mt-1">{errors.funcao.message}</p>
          )}
        </div>
        
      </div>

      {/* Botão de Enviar */}
      <LoadingButton type="submit" label="Cadastrar" loading={loading}/>
    </form>
  );
}
