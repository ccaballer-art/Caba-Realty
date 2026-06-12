import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import SellerSituations from "@/components/SellerSituations";
import SellerLeadForm from "@/components/SellerLeadForm";
import SellerFAQ from "@/components/SellerFAQ";
import BuyerSection from "@/components/BuyerSection";
import { COMPANY_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{COMPANY_NAME} | ¿Estás pensando vender una propiedad?</title>
        <meta
          name="description"
          content="Representación enfocada en vendedores, herederos y propietarios que necesitan orientación clara para tomar una buena decisión de venta en Puerto Rico."
        />
      </Helmet>

      <Hero />
      <SellerSituations />

      <section id="contacto" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
              Solicitar orientación
            </h2>
            <p className="text-gray-600">
              Completa el formulario y me comunicaré contigo para entender tu
              situación y discutir próximos pasos.
            </p>
          </div>
          <SellerLeadForm />
        </div>
      </section>

      <SellerFAQ />
      <BuyerSection />
    </>
  );
}
