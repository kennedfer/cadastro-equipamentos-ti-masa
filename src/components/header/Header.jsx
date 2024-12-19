import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LoadingButton } from "../buttons/LoadingButton";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  async function handleBackClick() {
    setIsLoading(true);
    router.push("/");
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <header className="p-2 flex justify-between items-center">
      <LoadingButton onClick={handleBackClick} label="Voltar" loading={isLoading} />
    </header>
  );
}
