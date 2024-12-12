"use client"
import DeviceItem from "@/components/devices/DeviceItem";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster"

import {RegisterDeviceForm} from '../../components/forms/RegisterDeviceForm'

export default function Home() {

  return (
    <body>
      <main className="">
        <div className="flex flex-col items-center v-screen overflow-auto p-16 h-screen">
            <h1 className="font-bold text-2xl">Cadastro de Dispositivos</h1>
            <RegisterDeviceForm/>
            
        </div>
      </main>
      
      <Toaster/>
    </body>

  );
}
