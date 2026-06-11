import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Compradores | ${COMPANY_NAME}`,
  description:
    "Representación para compradores de propiedades en Puerto Rico. Christian Caballer, Caba Group Real Estate.",
};

export default function CompradoresPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-navy-900 mb-4">
        Representación para compradores
      </h1>
      <p className="text-gray-600 mb-8">
        Si estás buscando comprar una propiedad en Puerto Rico, podemos
        orientarte sobre el proceso y ayudarte a encontrar opciones que se
        ajusten a tu situación y presupuesto.
      </p>
      <Link href="/#contacto" className="btn-primary">
        Solicitar orientación
      </Link>
    </div>
  );
}
