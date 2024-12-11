import { useForm } from "react-hook-form";
// import { Button, Input, Label, Select } from "@shadcn/ui"; // Adjust import path if needed.
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,} from "@/components/ui/select"

import {useState} from "react"

const exclusiveAtributes = {
  computador:[
    {key:"processador", type:"input"}
  ],
  impressora:[
    {key:"cor", type:"input"}
  ],
  "":[]
}

export function RegisterDeviceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("");

  const onSubmit = async (data) => {
    const reply = await fetch("/api/device",{
      method:"POST",
      body: JSON.stringify(data)
    });

    const newDevice = await reply.json();

    console.log(newDevice);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[600px]">
      {/* Tipo Field */}
      <div>
        <Label htmlFor="tipo">Tipo de Dispositivo</Label>
        <Select id="tipo" onValueChange={tipo => setType(tipo)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo do dispositivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo de Dispositivo</SelectLabel>
              <SelectItem value="computador">Computador</SelectItem>
              <SelectItem value="impressora">Impressora</SelectItem>
              {/* <SelectItem value="inativo">Inativo</SelectItem>
              <SelectItem value="manutencao">Em Manutenção</SelectItem>
              <SelectItem value="desativado">Desativado</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      {/* Marca Field */}
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

      {/* Modelo Field */}
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

      {/* TAG Field */}
      <div>
        <Label htmlFor="tag">TAG</Label>
        <Input
          id="tag"
          type="text"
          placeholder="Identificação do patrimônio"
          {...register("tag", { required: "TAG é obrigatória" })}
        />
        {errors.tag && (
          <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
        )}
      </div>

      {/* S/N Field */}
      <div>
        <Label htmlFor="sn">Número de Série</Label>
        <Input
          id="sn"
          type="text"
          placeholder="Número de série"
          {...register("sn", { required: "Número de série é obrigatório" })}
        />
        {errors.sn && (
          <p className="text-red-500 text-sm mt-1">{errors.sn.message}</p>
        )}
      </div>

      {/* Cautela Field */}
      <div>
        <Label htmlFor="cautela">Cautela</Label>
        <Input
          id="cautela"
          type="text"
          placeholder="Responsável ou local"
          {...register("cautela", { required: "Cautela é obrigatória" })}
        />
        {errors.cautela && (
          <p className="text-red-500 text-sm mt-1">{errors.cautela.message}</p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select id="status">
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

      {/* Submit Button */}
      {
        exclusiveAtributes[type].map( e => 
          <div>
            <Label>{e.key}</Label>
            <Input type="text" id={e.key}/>
          </div>

        )
      }
      <Button type="submit">Cadastrar Dispositivo</Button>
    </form>
  );
}