"use client";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCadastrarClick = () => {
    setIsLoading(true);
    router.push("/cadastro");
  };

  const handlePesquisaClick = () => {
    setIsLoading(true);
    router.push("/pesquisa");
  };

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Cadastro de Equipamentos TI
          </h1>
          <div className="flex justify-around gap-2">
            <LoadingButton
              className="grow"
              onClick={handleCadastrarClick}
              label="Cadastrar"
              loading={isLoading}
            />
            <LoadingButton
              className="grow"
              onClick={handlePesquisaClick}
              label="Pesquisar"
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>  );
}
