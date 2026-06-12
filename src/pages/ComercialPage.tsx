import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "@/lib/constants";

export default function ComercialPage() {
  return (
    <>
      <Helmet>
        <title>Comercial | {COMPANY_NAME}</title>
        <meta name="description" content="Representación en transacciones de propiedades comerciales en Puerto Rico. Caba Group Real Estate." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-navy-900 mb-4">
          Propiedades comerciales
        </h1>
        <p className="text-gray-600 mb-8">
          Representación en transacciones de propiedades comerciales en Puerto
          Rico. Contáctanos para discutir tu situación.
        </p>
        <Link to="/contacto" className="btn-primary">
          Contactar
        </Link>
      </div>
    </>
  );
}
