import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  console.log("API KEY:", process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "NO HAY API KEY" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { tipo, asunto, mensaje } = req.body;

  if (!tipo || !asunto || !mensaje) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const response = await resend.emails.send({
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

    console.log("RESPUESTA RESEND:", response);

    return res.status(200).json({ ok: true });

  } catch (error: any) {
    console.error("ERROR REAL:", error);

    return res.status(500).json({
      error: error?.message || "Error enviando correo",
    });
  }
}