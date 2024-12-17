"use client";

import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(null); // null: nenhum botão está carregando

  const navigateTo = async (path, button) => {
    setLoadingButton(button); // Define o botão que está carregando
    router.push(path);
  };

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="p-6 bg-white max-w-lg w-full">
          <h1 className="text-5xl font-bold text-center mb-4">
            Controle Inteligente de Equipamentos
          </h1>
          <h2 className="text-gray-700 text-center mb-6">
            Monitore os ativos de TI em um só lugar, com segurança e
            praticidade.
          </h2>
          <div className="flex justify-around gap-4">
            <LoadingButton
              className="grow"
              onClick={() => navigateTo("/cadastro", "cadastrar")}
              label="Cadastrar"
              loading={loadingButton === "cadastrar"}
              disabled={loadingButton === "pesquisar"}
            />
            <LoadingButton
              className="grow"
              onClick={() => navigateTo("/pesquisa", "pesquisar")}
              label="Pesquisar"
              loading={loadingButton === "pesquisar"}
              disabled={loadingButton === "cadastrar"}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
