import { Helmet } from "react-helmet-async";
import { COMPANY_NAME } from "@/lib/constants";

export default function PropiedadesPage() {
  return (
    <>
      <Helmet>
        <title>Propiedades | {COMPANY_NAME}</title>
        <meta name="description" content="Propiedades disponibles representadas por Caba Group Real Estate en Puerto Rico." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">Propiedades</h1>
        <p className="text-gray-600">Sección de propiedades disponible próximamente.</p>
      </div>
    </>
  );
}
