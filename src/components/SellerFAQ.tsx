"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "¿Cuánto vale mi propiedad?",
    answer:
      "El valor depende de varios factores: ubicación, condición, tamaño, y las ventas comparables más recientes en el área. No existe un número estándar. Durante la orientación podemos analizar tu propiedad específica y darte una perspectiva realista del mercado actual.",
  },
  {
    question: "¿Cuánto tiempo puede tardar vender?",
    answer:
      "El tiempo varía según el precio, la condición de la propiedad y las condiciones actuales del mercado. Hay propiedades que se venden en semanas y otras que pueden tardar más. Lo importante es tener expectativas claras desde el inicio, algo que podemos discutir durante la orientación.",
  },
  {
    question: "¿Puedo vender si la propiedad tiene deuda CRIM?",
    answer:
      "En muchos casos, sí. La deuda con el CRIM frecuentemente se liquida al momento del cierre con fondos de la propia venta. Cada situación es diferente y hay que evaluarla individualmente. Podemos discutir los detalles de tu caso durante la orientación.",
  },
  {
    question: "¿Qué pasa si heredé una propiedad?",
    answer:
      "Una propiedad heredada tiene consideraciones adicionales relacionadas al título y la sucesión. Antes de proceder a la venta, es importante entender el estatus legal de la propiedad. Puedo orientarte sobre los pasos generales y referirte a los profesionales adecuados cuando sea necesario.",
  },
  {
    question: "¿Necesito reparar la propiedad antes de vender?",
    answer:
      "Depende. En algunos casos las reparaciones pueden aumentar el valor de venta y facilitar el proceso; en otros, es más conveniente vender en el estado actual. Esto se analiza caso por caso tomando en cuenta el costo de las mejoras y el mercado actual.",
  },
  {
    question: "¿Cómo se determina el precio de venta?",
    answer:
      "El precio se establece con base en un análisis de propiedades comparables vendidas recientemente en el área, la condición del inmueble y la demanda actual. El objetivo es encontrar un precio que sea competitivo y realista para el mercado de hoy.",
  },
  {
    question: "¿Puedo vender una propiedad vacía?",
    answer:
      "Sí. Las propiedades vacías tienen sus particularidades, pero se venden con regularidad. Durante la orientación podemos discutir cómo presentar mejor tu propiedad y qué esperar del proceso.",
  },
  {
    question: "¿Qué servicios incluye la representación como vendedor?",
    answer:
      "La representación incluye análisis del mercado, estrategia de precio, gestión del proceso de venta, coordinación de visitas, negociación en tu beneficio y acompañamiento hasta el cierre. Cada transacción es diferente. Durante la orientación inicial podemos discutir los costos, responsabilidades y gastos asociados a la venta.",
  },
  {
    question: "¿Cómo puedo hablar directamente con Christian?",
    answer:
      "Puedes contactarme directamente por WhatsApp, llamada o completando el formulario de esta página. Prefiero tener una conversación inicial para entender bien tu situación antes de hacer ningún planteamiento formal.",
  },
];

export default function SellerFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="preguntas-frecuentes" className="bg-white py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
            Preguntas frecuentes de vendedores
          </h2>
          <p className="text-gray-600">
            Respuestas directas a las dudas más comunes antes de vender.
          </p>
        </div>

        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index}>
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 focus-visible:ring-offset-2 rounded"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-medium leading-snug transition-colors ${
                      isOpen ? "text-navy-900" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 mt-0.5 w-5 h-5 text-navy-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDownIcon />
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-5 pr-9">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            ¿Tienes alguna otra pregunta?
          </p>
          <a
            href="#contacto"
            className="btn-primary"
          >
            Solicitar orientación
          </a>
        </div>
      </div>
    </section>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
