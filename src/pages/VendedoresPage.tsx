import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "@/lib/constants";

export default function VendedoresPage() {
  return (
    <>
      <Helmet>
        <title>Vendedores | {COMPANY_NAME}</title>
        <meta name="description" content="Representación especializada para vendedores de propiedades en Puerto Rico. Christian Caballer, Caba Group Real Estate." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">
          Representación para vendedores
        </h1>
        <p className="text-gray-600 mb-8">
          Si estás pensando en vender una propiedad en Puerto Rico, podemos
          orientarte sobre el proceso, tus opciones y los próximos pasos.
        </p>
        <Link to="/#contacto" className="btn-primary">
          Solicitar orientación
        </Link>
      </div>
    </>
  );
}
