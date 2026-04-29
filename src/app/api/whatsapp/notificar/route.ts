import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  telefone: z.string(),
  nome: z.string(),
  numero: z.number(),
  rifa_id: z.string(),
});

export async function POST(request: NextRequest) {
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const phoneId = process.env.META_PHONE_NUMBER_ID;
  const token = process.env.META_WHATSAPP_TOKEN;
  const templateName = process.env.META_WHATSAPP_TEMPLATE_NAME ?? "sorteio_resultado";

  if (!phoneId || !token) {
    return NextResponse.json({ error: "WhatsApp não configurado" }, { status: 500 });
  }

  // Formatar número: remover não-dígitos, garantir prefixo 55 (Brasil)
  const digits = body.telefone.replace(/\D/g, "");
  const to = digits.startsWith("55") ? digits : `55${digits}`;

  const res = await fetch(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: "pt_BR" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: body.nome },
                { type: "text", text: body.rifa_id },
                { type: "text", text: String(body.numero).padStart(3, "0") },
              ],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    console.error("WhatsApp API error:", err);
    return NextResponse.json({ error: "Erro ao enviar mensagem" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json({ message_id: data.messages?.[0]?.id });
}
