import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DeviceCard({device}) {

  return (
    <Card className="w-full max-w-sm p-4 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{device.marca} - {device.modelo}</CardTitle>
        <CardDescription>{device.tipo}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p><strong>Tag:</strong> {device.tag}</p>
          <p><strong>SN:</strong> {device.sn}</p>
          <p><strong>Cautela:</strong> {device.cautela}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-1 font-medium ${device.status === "ativo" ? "text-green-600" : "text-red-600"}`}>
              {device.status}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
