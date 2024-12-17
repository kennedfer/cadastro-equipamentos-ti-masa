"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRef, useState } from "react";
import { DeviceCard } from "@/components/devices/DeviceCard";
import { LoadingButton } from "@/components/buttons/LoadingButton";

export default function Home() {
  const searchRef = useRef(null);
  const [device, setDevice] = useState(null);

  const [loading, setLoading] = useState(false);

  async function searchDevice() {
    setLoading(true);
    const patrimonio = searchRef.current.value;

    const data = await fetch("/api/device/" + patrimonio);
    const device = await data.json();

    setDevice(device);
    setLoading(false);
  }

  return (

    <main className="grid p-16 overflow-auto h-screen">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold text-2xl">Pesquisa de Dispositivos</h1>
        <Label htmlFor="busca">Número de Série para buscar:</Label>
        <Input
          ref={searchRef}
          placeholder="Ex.: 988213, 182123"
          className="w-[300px]"
          id="busca"
          type="text"
        />
        <LoadingButton
          loading={loading}
          onClick={searchDevice}
          label="Pesquisar"
        />

        {device && <DeviceCard device={device} />}
      </div>
    </main>
  );
}
