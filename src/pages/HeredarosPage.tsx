import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "@/lib/constants";

export default function HeredarosPage() {
  return (
    <>
      <Helmet>
        <title>Herederos | {COMPANY_NAME}</title>
        <meta name="description" content="Orientación para herederos que necesitan entender sus opciones con una propiedad heredada en Puerto Rico." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">
          Orientación para herederos
        </h1>
        <p className="text-gray-600 mb-8">
          Si heredaste una propiedad y no sabes cómo proceder, podemos orientarte
          sobre el proceso y las opciones disponibles antes de tomar cualquier
          decisión.
        </p>
        <Link to="/#contacto" className="btn-primary">
          Solicitar orientación
        </Link>
      </div>
    </>
  );
}
