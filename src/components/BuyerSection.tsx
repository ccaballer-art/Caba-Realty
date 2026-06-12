import { type ReactNode } from "react";

type BuyerSituation = { icon: ReactNode; title: string; description: string };

const situations: BuyerSituation[] = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Primera vivienda",
    description: "Si vas a comprar tu primera propiedad, podemos orientarte sobre el proceso paso a paso para que tomes una decisión informada.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Propiedad de inversión",
    description: "Si buscas una propiedad como inversión, podemos analizar opciones según tu presupuesto y los objetivos que tienes en mente.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Relocalización a Puerto Rico",
    description: "Si te estás mudando a Puerto Rico, podemos ayudarte a entender el mercado local y encontrar una propiedad que se ajuste a tus necesidades.",
  },
];

export default function BuyerSection() {
  return (
    <section id="compradores" className="bg-gray-50 border-t border-gray-200 py-14 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            También para compradores
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
            ¿Estás buscando comprar una propiedad?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            También represento compradores. Si estás buscando una propiedad en
            Puerto Rico, puedo orientarte sobre el proceso y ayudarte a
            encontrar opciones que se ajusten a tu situación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {situations.map((situation, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-700 mb-3">
                {situation.icon}
              </div>
              <h3 className="text-sm font-semibold text-navy-900 mb-1.5">
                {situation.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {situation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#contacto" className="btn-primary">
            Contactar sobre una compra
          </a>
        </div>
      </div>
    </section>
  );
}
