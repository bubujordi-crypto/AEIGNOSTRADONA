import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const TO_EMAIL = "albergueria.nostradonadelasalut@escoltesiguies.cat";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El servei d'email no està configurat. Afegeix RESEND_API_KEY a les variables d'entorn." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const body = await request.json();
    const { nom, email, motiu, missatge } = body;

    if (!nom || !email || !missatge) {
      return NextResponse.json(
        { error: "Falten camps obligatoris (nom, correu, missatge)" },
        { status: 400 }
      );
    }

    const subject = `Contacte lloguer: ${motiu || "Consulta"} - ${nom}`;
    const textContent = `Nom: ${nom}\nCorreu: ${email}\n\nMotiu de contacte: ${motiu || "-"}\n\nMissatge:\n${missatge}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #2D5A27;">Nou contacte des del formulari</h2>
        <p><strong>Nom:</strong> ${escapeHtml(nom)}</p>
        <p><strong>Correu:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Motiu:</strong> ${escapeHtml(motiu || "-")}</p>
        <p><strong>Missatge:</strong></p>
        <p style="white-space: pre-wrap; background: #f5f5f5; padding: 1rem; border-radius: 8px;">${escapeHtml(missatge)}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;">
        <p style="font-size: 12px; color: #666;">AEIG Nostra Dona de la Salut - Vine a dormir al cau</p>
      </div>
    `.trim();

    const { data, error } = await resend.emails.send({
      from: `AEIG Nostra Dona de la Salut <${fromEmail}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    return NextResponse.json(
      { error: "Error en enviar el missatge" },
      { status: 500 }
    );
  }
}
