import { type ReactNode } from "react";

type Situation = {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
};

const situations: Situation[] = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Propiedad heredada",
    description: "Si heredaste una propiedad y no sabes cómo proceder, podemos orientarte sobre el proceso y las opciones disponibles antes de tomar cualquier decisión.",
    ctaLabel: "Hablar sobre esto",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Propiedad con deuda CRIM",
    description: "Una deuda pendiente con el CRIM no necesariamente impide la venta. Podemos analizar tu situación y explicarte cómo se maneja esto en el proceso.",
    ctaLabel: "Hablar sobre esto",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    title: "Propiedad vacía",
    description: "Una propiedad que no utilizas puede representar costos continuos. Podemos evaluar tu situación y discutir las opciones que tienes disponibles.",
    ctaLabel: "Hablar sobre esto",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Propiedad que necesita reparaciones",
    description: "No siempre es necesario invertir en reparaciones antes de vender. Podemos analizar lo que tiene más sentido para tu situación específica.",
    ctaLabel: "Hablar sobre esto",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Necesito vender rápido",
    description: "Si necesitas resolver una situación con cierta urgencia, podemos discutir tus opciones de manera honesta para que tomes la mejor decisión posible.",
    ctaLabel: "Hablar sobre esto",
  },
];

export default function SellerSituations() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
            ¿Cuál es tu situación?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Cada situación es diferente. Selecciona la que más se acerca a la
            tuya para entender cómo podemos ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {situations.map((situation, index) => (
            <a
              key={index}
              href="#contacto"
              className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-navy-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 bg-navy-50 rounded-lg flex items-center justify-center text-navy-700 group-hover:bg-navy-100 transition-colors">
                  {situation.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-navy-900 mb-2 leading-snug">
                    {situation.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {situation.description}
                  </p>
                  <span className="text-sm font-medium text-navy-700 group-hover:text-navy-900 inline-flex items-center gap-1 transition-colors">
                    {situation.ctaLabel}
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
