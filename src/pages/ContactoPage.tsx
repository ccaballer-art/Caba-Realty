import { Helmet } from "react-helmet-async";
import SellerLeadForm from "@/components/SellerLeadForm";
import { COMPANY_NAME, WHATSAPP_NUMBER, PHONE_NUMBER_DISPLAY, PHONE_NUMBER_TEL } from "@/lib/constants";

export default function ContactoPage() {
  return (
    <>
      <Helmet>
        <title>Contacto | {COMPANY_NAME}</title>
        <meta name="description" content="Comunícate con Christian Caballer para orientación sobre la venta de tu propiedad en Puerto Rico." />
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-navy-900 mb-3">Contacto</h1>
          <p className="text-gray-600">
            Completa el formulario o comunícate directamente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center">
          <a href={`tel:${PHONE_NUMBER_TEL}`} className="btn-secondary text-sm">
            Llamar: {PHONE_NUMBER_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <SellerLeadForm />
      </div>
    </>
  );
}
