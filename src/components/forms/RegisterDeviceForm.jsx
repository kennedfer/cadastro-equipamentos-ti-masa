import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";

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

export function RegisterDeviceForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const type = watch("tipo");

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
    const reply = await fetch("/api/device", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const newDevice = await reply.json();
    console.log(newDevice);
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
          <Input
            id="modelo"
            type="text"
            placeholder="Ex.: Inspiron, ThinkPad"
            {...register("modelo", { required: "Modelo é obrigatório" })}
          />
          {errors.modelo && (
            <p className="text-red-500 text-sm mt-1">{errors.modelo.message}</p>
          )}
        </div>
        {renderAttributes()}
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
            {...register("cautela", { required: "Nome é obrigatório" })}
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
      <Button type="submit">Cadastrar Dispositivo</Button>
    </form>
  );
}
