"use client";

import { Button } from "@/components/ui/button"; // Certifique-se de ajustar o caminho para o botão do shadcn.
import { Loader2 } from "lucide-react"; // Certifique-se de ter o pacote `lucide-react` instalado.

export function LoadingButton({ label, loading, ...props }) {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}