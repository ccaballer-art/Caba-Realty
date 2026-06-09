import { NextRequest, NextResponse } from "next/server";

export type LeadPayload = {
  nombre: string;
  telefono: string;
  email: string;
  municipio?: string;
  situacion?: string;
  source?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    if (!body.nombre?.trim() || !body.telefono?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    // TODO: Connect to CRM or email service (e.g., HubSpot, Resend, SendGrid).
    // The payload is validated and ready to forward.
    console.log("[Lead received]", {
      ...body,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
