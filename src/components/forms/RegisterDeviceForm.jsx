import { useForm } from "react-hook-form";
import { RenderField, RenderSelect, renderDynamicFields } from "../input/FieldsRenderer";
import { Separator } from "@/components/ui/separator";
import { LoadingButton } from "../buttons/LoadingButton";

export function RegisterDeviceForm({ onSubmit, loading }) {
  const { register, setValue, handleSubmit, reset,watch, formState: { errors } } = useForm();
  const type = watch("tipo");

  return (
    <form onSubmit={handleSubmit(e => {
      onSubmit(e, reset);
      })} className="space-y-4 w-[600px]">
      {/* Dados do Equipamento */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-500">Dados do Equipamento</h2>
        <Separator />

        <RenderSelect
          id="tipo"
          label="Tipo de Dispositivo"
          options={[
            { value: "computador", label: "Computador" },
            { value: "impressora", label: "Impressora" },
          ]}
          setValue={setValue}
          errors={errors}
        />

        <RenderField
          id="marca"
          label="Marca"
          placeholder="Ex.: Dell, HP, Lenovo"
          register={register}
          errors={errors}
        />

        <RenderSelect
          id="modelo"
          label="Modelo"
          options={[
            { value: "Precision 7670", label: "Precision 7670" },
            { value: "Precision 7680", label: "Precision 7680" },
            { value: "Precision 7550", label: "Precision 7550" },
            { value: "Precision 7530", label: "Precision 7530" },
            { value: "Precision 7340", label: "Precision 7340" },
            { value: "Precision 5820", label: "Precision 5820" },
            { value: "Latitude 3420", label: "Latitude 3420" },
            { value: "Latitude 3490", label: "Latitude 3490" },
            { value: "Latitude 3410", label: "Latitude 3410" },
            { value: "Latitude 3400", label: "Latitude 3400" },
            { value: "Latitude 7440", label: "Latitude 7440" },
            { value: "Latitude 7340", label: "Latitude 7340" },
            { value: "Latitude 5420", label: "Latitude 5420" },
            { value: "OptiPlex 5070", label: "OptiPlex 5070" },
            { value: "OptiPlex 3070", label: "OptiPlex 3070" },
          ]}
          setValue={setValue}
          errors={errors}
        />

        <RenderField
          id="tag"
          label="Service Tag"
          placeholder="Ex.: JKDKOI, DA2JH4"
          register={register}
          errors={errors}
        />

        <RenderField
          id="patrimonio"
          label="Patrimônio"
          placeholder="Ex.: 123134, 987654"
          register={register}
          errors={errors}
        />

        <RenderSelect
          id="status"
          label="Status"
          options={[
            { value: "ativo", label: "Ativo" },
            { value: "inativo", label: "Inativo" },
            { value: "manutencao", label: "Em Manutenção" },
            { value: "desativado", label: "Desativado" },
          ]}
          setValue={setValue}
          errors={errors}
        />

        {renderDynamicFields(type, register, errors, setValue)}
      </div>

      {/* Dados do Responsável */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-500">Dados do Responsável</h2>
        <Separator />

        <RenderField
          id="nome"
          label="Nome"
          placeholder="Responsável ou local"
          register={register}
          errors={errors}
        />

        <RenderField
          id="cpf"
          label="CPF"
          placeholder="Ex.: 123.456.789-00"
          register={register}
          errors={errors}
        />

        <RenderField
          id="setor"
          label="Setor"
          placeholder="Ex.: RH, TI, BARRAGEM..."
          register={register}
          errors={errors}
        />

        <RenderField
          id="funcao"
          label="Função"
          placeholder="Ex.: ANL RH PL, ANL TI SR..."
          register={register}
          errors={errors}
        />
      </div>

      {/* Botão de Enviar */}
      <LoadingButton type="submit" label="Cadastrar" loading={loading} />
    </form>
  );
}
