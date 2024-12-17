import { Button } from "@/components/ui/button";

export function Footer(){
    return (
        <footer className="bg-black text-white py-2">
          <div className="container mx-auto text-center space-y-1">
            <p className="text-xs">
              Idealizado pelos setores de TI e RH da Mineracao Aurizona S/A, 
              <br /> 
              Desenvolvido com dedicação por Jorge Kenned Ferreira dos Santos.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              © {new Date().getFullYear()} Mineracao Aurizona S/A. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      );
}