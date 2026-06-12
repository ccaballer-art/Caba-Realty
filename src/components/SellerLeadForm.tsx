import { useState, type FormEvent } from "react";

type FormState = {
  nombre: string;
  telefono: string;
  email: string;
  municipio: string;
  situacion: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const situacionOptions = [
  { value: "", label: "Seleccionar situación (opcional)" },
  { value: "Propiedad heredada", label: "Propiedad heredada" },
  { value: "Deuda CRIM", label: "Deuda CRIM" },
  { value: "Propiedad vacía", label: "Propiedad vacía" },
  { value: "Necesita reparaciones", label: "Necesita reparaciones" },
  { value: "Venta rápida", label: "Venta rápida" },
  { value: "Otro", label: "Otro" },
];

const initialState: FormState = {
  nombre: "",
  telefono: "",
  email: "",
  municipio: "",
  situacion: "",
};

export default function SellerLeadForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const errors: Partial<FormState> = {};
    if (!form.nombre.trim()) errors.nombre = "El nombre es requerido.";
    if (!form.telefono.trim()) errors.telefono = "El teléfono es requerido.";
    if (!form.email.trim()) {
      errors.email = "El correo electrónico es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "El correo electrónico no es válido.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const payload = {
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      ...(form.municipio.trim() && { municipio: form.municipio.trim() }),
      ...(form.situacion && { situacion: form.situacion }),
      source: "homepage",
    };

    const apiUrl = import.meta.env.VITE_LEADS_API_URL;

    try {
      if (apiUrl) {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("API error");
      } else {
        // No API configured — log for development
        console.log("[Lead]", payload);
      }
      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-xl border border-green-200 p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Información recibida
        </h3>
        <p className="text-gray-600">
          Gracias. Recibí tu información y me comunicaré contigo para discutir
          tu situación y próximos pasos.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="nombre" className="form-label">
            Nombre <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className={`form-input ${fieldErrors.nombre ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
            aria-describedby={fieldErrors.nombre ? "nombre-error" : undefined}
          />
          {fieldErrors.nombre && (
            <p id="nombre-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="telefono" className="form-label">
            Teléfono <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            value={form.telefono}
            onChange={handleChange}
            placeholder="787-000-0000"
            className={`form-input ${fieldErrors.telefono ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
            aria-describedby={fieldErrors.telefono ? "telefono-error" : undefined}
          />
          {fieldErrors.telefono && (
            <p id="telefono-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.telefono}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Correo electrónico <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            className={`form-input ${fieldErrors.email ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="municipio" className="form-label">
            Municipio / Urbanización{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <input
            id="municipio"
            name="municipio"
            type="text"
            value={form.municipio}
            onChange={handleChange}
            placeholder="Ej. San Juan, Bayamón, Ponce…"
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="situacion" className="form-label">
            Situación{" "}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </label>
          <select
            id="situacion"
            name="situacion"
            value={form.situacion}
            onChange={handleChange}
            className="form-input bg-white"
          >
            {situacionOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
          Hubo un error al enviar tu información. Por favor intenta nuevamente o
          contáctame directamente por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full btn-primary py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Enviando…" : "Solicitar orientación"}
      </button>

      <p className="mt-4 text-xs text-gray-500 text-center">
        Me comunicaré contigo para entender tu situación y discutir próximos pasos.
      </p>
    </form>
  );
}
