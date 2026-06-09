import type { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Propiedades | ${COMPANY_NAME}`,
  description: "Propiedades disponibles representadas por Caba Group Real Estate en Puerto Rico.",
};

export default function PropiedadesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-navy-900 mb-4">Propiedades</h1>
      <p className="text-gray-600">
        Sección de propiedades disponible próximamente.
      </p>
    </div>
  );
}
