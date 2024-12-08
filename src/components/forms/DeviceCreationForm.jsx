import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DeviceCreationForm({ isOpen, onClose }) {
  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function newDevice(body) {
    try {
      const res = await fetch("/api/device", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const newDevice = await res.json();

      if (newDevice._id) {
        console.log("Created");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = async (data) => {
    await newDevice(data);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Criar Novo Registro</DialogTitle>
          <DialogDescription>Registre um novo equipamento:</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nome */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <Input
              id="name"
              placeholder="Ex: Monitor Dell 24' DL2412h"
              {...register("name", { required: "Nome é obrigatório" })}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Proprietário */}
          <div className="mb-4">
            <label
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700"
            >
              Proprietário
            </label>
            <Input
              id="owner"
              placeholder="Ex: Kenned Ferreira"
              {...register("owner", { required: "Proprietário é obrigatório" })}
              className="mt-1"
            />
            {errors.owner && (
              <p className="text-red-500 text-sm">{errors.owner.message}</p>
            )}
          </div>

          {/* Service Tag */}
          <div className="mb-4">
            <label
              htmlFor="serviceTag"
              className="block text-sm font-medium text-gray-700"
            >
              Service Tag
            </label>
            <Input
              id="serviceTag"
              placeholder="Ex: KLGD-JAUI"
              {...register("serviceTag", {
                required: "Service Tag é obrigatória",
              })}
              className="mt-1"
            />
            {errors.serviceTag && (
              <p className="text-red-500 text-sm">
                {errors.serviceTag.message}
              </p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const HeaderWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <header className="bg-blue-500 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Meu Sistema</h1>

        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Criar Novo Registro
        </button>
      </header>

      <DeviceCreationForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
