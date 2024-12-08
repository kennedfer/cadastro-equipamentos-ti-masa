"use client"
import DeviceItem from "@/components/devices/DeviceItem";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
// const 

export default function Home() {
  const [devices, setDevices] = useState([]);


  useEffect(() => {
    (async function () {
      const res = await fetch("/api/device");
      const devices = await res.json();

      setDevices(devices);
    })();
  }, []);

  return (
    <body>
      <Header />
      <main>
        <div className="d-flex flex-column space-y-4 p-4">
          {
            devices.map(device => <DeviceItem key={device._id} device={device} />)
          }
        </div>
      </main>
    </body>

  );
}
