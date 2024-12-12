"use client"

import * as React from "react";
import { Button } from "@/components/ui/button"; // Supondo que o botão esteja configurado dessa forma no Shadcn
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCadastrarClick = () => {
    // Ação para redirecionar para a página de cadastro ou qualquer outra lógica necessária
    router.push("/cadastro");
  };

  const handlePesquisaClick = () => {
    // Ação para redirecionar para a página de pesquisa ou qualquer outra lógica necessária
    router.push("/pesquisa");
  };

  return (
    <body>
      <main>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div>
        <h1 className="text-2xl font-semibold text-center mb-6">
          Cadastro de Equipamentos TI
        </h1>
        <div className="flex justify-around gap-2">
          <Button
            className="flex-grow"
            onClick={handleCadastrarClick}
          >
            Cadastrar
          </Button>
          <Button
            className="flex-grow"
            onClick={handlePesquisaClick}
          >
            Pesquisa
          </Button>
        </div>
      </div>
    </div>
    </main>
    </body>
  );
}
