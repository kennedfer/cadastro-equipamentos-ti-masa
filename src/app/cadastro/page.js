"use client"
import DeviceItem from "@/components/devices/DeviceItem";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";

import {RegisterDeviceForm} from '../../components/forms/RegisterDeviceForm'

export default function Home() {

  return (
    <body>
      <main>
        <div className="flex flex-col items-center v-screen h-screen">
            <h1 className="mt-10 font-bold text-2xl">Cadastro de Dispositivos</h1>
            <RegisterDeviceForm/>
        </div>
      </main>
    </body>

  );
}
