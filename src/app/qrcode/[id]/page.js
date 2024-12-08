'use client'

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const QRCodeDetails = () => {
  const [device, setDevice] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`/api/device/${id}`)
        .then((res) => res.json())
        .then((data) => setDevice(data))
        .catch((error) => console.error("Erro ao buscar informações:", error));
    }
  }, [id]);

  if (!device) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Card className="max-w-lg bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Informações do QR Code:</CardTitle>
          <CardDescription>Informações do cadastro do equipamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg">
              <strong>Nome:</strong> {device.name}
            </p>
            <p className="text-lg">
              <strong>Proprietário:</strong> {device.owner}
            </p>
            <p className="text-lg">
              <strong>Service Tag:</strong> {device.serviceTag}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeDetails;