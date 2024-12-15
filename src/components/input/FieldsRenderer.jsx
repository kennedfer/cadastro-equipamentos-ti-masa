import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { exclusiveAttributes, prismaErrorMessages } from "../forms/form.config.js";

export function RenderField({ id, label, placeholder, register, errors }) {
  return (
    <div className="mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} placeholder={placeholder} {...register(id, { required: `${label} é obrigatório.` })} />
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
    </div>
  );
}

export function RenderSelect({ id, label, options, setValue, errors }) {
  return (
    <div className="mt-2">
      <Label htmlFor={id}>{label}</Label>
      <Select onValueChange={(value) => setValue(id, value)}>
        <SelectTrigger>
          <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
    </div>
  );
}

export function renderDynamicFields(type, register, errors, setValue) {
  const attributes = exclusiveAttributes[type] || [];
  return attributes.map((attr) =>
    attr.type === "text" ? (
      <RenderField key={attr.key} id={attr.key} label={attr.label} placeholder={attr.placeholder} register={register} errors={errors} />
    ) : (
      <RenderSelect key={attr.key} id={attr.key} label={attr.label} options={attr.options} setValue={setValue} errors={errors} />
    )
  );
}
