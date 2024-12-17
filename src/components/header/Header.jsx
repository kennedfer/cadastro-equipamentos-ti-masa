import { useState } from "react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Header() {
  const router = useRouter();

  function handleBackClick() {
    router.push("/");
  }

  return (
    <header className="fixed p-4 flex justify-between items-center">
      <Button onClick={handleBackClick}>Voltar</Button>
    </header>
  );
}
