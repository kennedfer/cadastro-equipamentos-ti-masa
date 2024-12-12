"use client"
import { useEffect, useState } from "react";

import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"

import { useRef } from 'react';
import {DeviceCard} from "@/components/devices/DeviceCard";

export default function Home() {
    const searchRef = useRef(null);
    const [device, setDevice] = useState(null)

    async function searchDevice(){
        const sn = searchRef.current.value;

        const data = await fetch("/api/device/"+sn);
        const device = await data.json();

        setDevice(device);
    }

    return (
        <body>
        <main className="p-10">
            <div className="flex flex-col gap-2 justify-center items-center v-screen h-screen">
                <h1 className="font-bold text-2xl">Pesquisa de Dispositivos</h1>
                <Label htmlFor="busca">Número de Série para buscar:</Label>
                <Input ref={searchRef} placeholder="Ex.: 988213, 182123" className="w-[300px]" id="busca" type="text"/>
                <Button onClick={searchDevice}>Pesquisar</Button>
            { device && <DeviceCard device={device}/>}
            </div>

        </main>
        </body>

  );
}
