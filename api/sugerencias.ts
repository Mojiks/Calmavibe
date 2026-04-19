import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { tipo, asunto, mensaje } = req.body;

  if (!tipo || !asunto || !mensaje) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    await resend.emails.send({
from: "CalmaVibe <noreply@calmavibe.com>",
      to: ["calmavibe.app@gmail.com"],
      subject: `[${tipo}] ${asunto}`,
      html: `
        <h2>Nuevo mensaje</h2>
        <p><b>Tipo:</b> ${tipo}</p>
        <p><b>Asunto:</b> ${asunto}</p>
        <p>${mensaje}</p>
      `,
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    return res.status(500).json({ error: "Error enviando correo" });
  }
}