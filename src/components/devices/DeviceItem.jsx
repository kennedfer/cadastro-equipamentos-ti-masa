import React, { useState } from "react";
import QRCodeModal from "../qrcode/QRCodeModal";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogCancel,
} from "@/components/ui/dialog";
import { Trash2, Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Supondo que o ShadCN tem um componente Input

const DeviceItem = ({ device }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // React Hook Form para gerenciamento de inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: device.name,
      owner: device.owner,
      serviceTag: device.serviceTag,
    },
  });

  // Função para deletar o dispositivo
  const deleteDevice = async () => {
    try {
      const response = await fetch(`/api/device/${device._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Falha ao excluir dispositivo.");
      }
    } catch (error) {
      console.error("Erro ao deletar dispositivo:", error);
      alert("Erro ao excluir dispositivo.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async (data) => {
    try {
      const response = await fetch(`/api/device/${device._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsEditModalOpen(false);
        window.location.reload();
      } else {
        alert("Falha ao atualizar dispositivo.");
      }
    } catch (error) {
      console.error("Erro ao atualizar dispositivo:", error);
      alert("Erro ao atualizar dispositivo.");
    }
  };

  return (
    <Card className="flex items-center justify-between p-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold">{device.name}</h3>
        <p className="text-sm text-gray-500">Proprietário: {device.owner}</p>
        <p className="text-sm text-gray-500">
          Service Tag: {device.serviceTag}
        </p>
      </div>
      <Button variant="outline" onClick={handleOpenModal}>
        Ver QR Code
      </Button>
      {/* Botão de Editar */}
      <Button
        variant="secondary"
        className="ml-4"
        onClick={handleOpenEditModal}
      >
        <Edit /> Editar
      </Button>

      {/* Modal de QR Code */}
      <QRCodeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        qrValue={device.qrcode}
      />

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="gap-0 bg-white p-6 rounded-md shadow-lg w-96">
          <DialogHeader className="gap-0">
            <DialogTitle>Editar Dispositivo</DialogTitle>
            <DialogDescription>
              Edite os detalhes do dispositivo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleSaveEdit)}>
            <div className="mt-4">
              <label className="block text-sm font-medium">Nome</label>
              <Input
                {...register("name", { required: "Nome é obrigatório" })}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Proprietário</label>
              <Input
                {...register("owner", {
                  required: "Proprietário é obrigatório",
                })}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.owner && (
                <p className="text-red-500 text-sm">{errors.owner.message}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium">Service Tag</label>
              <Input
                {...register("serviceTag", {
                  required: "Service Tag é obrigatória",
                })}
                className="w-full p-2 mt-1 border rounded-md"
              />
              {errors.serviceTag && (
                <p className="text-red-500 text-sm">
                  {errors.serviceTag.message}
                </p>
              )}
            </div>

            <DialogFooter className="mt-5">
              {/* <Button variant="outline" onClick={handleCloseEditModal}>
                Cancelar
              </Button> */}
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal de confirmação de exclusão */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="ml-4"
            variant="destructive"
            onClick={handleOpenDeleteModal}
          >
            <Trash2 />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white p-6 rounded-md shadow-lg w-96">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-700 mt-2">
              Tem certeza que deseja excluir o dispositivo "{device.name}"?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                className={"bg-red-500"}
                onClick={() => {
                  deleteDevice();
                  handleCloseDeleteModal();
                }}
              >
                Confirmar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default DeviceItem;
