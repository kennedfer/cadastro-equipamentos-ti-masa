import { useState } from "react";
import { DeviceCreationForm } from "../forms/DeviceCreationForm";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <header className="p-4 flex justify-between items-center">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Cadastro de Equipamentos TI
        </h1>

        <Button onClick={handleOpenModal}>Criar Novo Registro</Button>
      </header>

      <Separator />
      <DeviceCreationForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
