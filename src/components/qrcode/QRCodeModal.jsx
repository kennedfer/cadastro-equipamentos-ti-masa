import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const QRCodeModal = ({ isOpen, qrValue, onClose }) => {
  function print() {
    window.print();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>QR Code do Dispositivo:</DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex justify-center items-center">
          <img
            className="qrcode mb-4"
            alt="qrcode do equipamento"
            src={qrValue}
            width={300}
          />
        </DialogDescription>
        <DialogFooter>
          <Button className="w-full" onClick={print}>
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
