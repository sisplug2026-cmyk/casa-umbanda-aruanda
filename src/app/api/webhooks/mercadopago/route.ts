import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";
import crypto from "crypto";

const webhookSchema = z.object({
  action: z.string(),
  data: z.object({ id: z.union([z.string(), z.number()]) }),
});

export async function POST(request: NextRequest) {
  const body = await request.text();

  // Validar assinatura HMAC-SHA256
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (secret) {
    const signature = request.headers.get("x-signature");
    const requestId = request.headers.get("x-request-id");
    const dataId = new URL(request.url).searchParams.get("data.id");

    if (signature && requestId && dataId) {
      const manifest = `id:${dataId};request-id:${requestId};ts:${signature.split(",").find((s) => s.startsWith("ts="))?.split("=")[1]};`;
      const ts = signature.split(",").find((s) => s.startsWith("ts="))?.split("=")[1];
      const expectedSig = crypto
        .createHmac("sha256", secret)
        .update(`id:${dataId};request-id:${requestId};ts:${ts};`)
        .digest("hex");
      const receivedSig = signature.split(",").find((s) => s.startsWith("v1="))?.split("=")[1];
      if (receivedSig !== expectedSig) {
        return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
      }
    }
  }

  let parsed: z.infer<typeof webhookSchema>;
  try {
    parsed = webhookSchema.parse(JSON.parse(body));
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  if (!parsed.action.includes("payment")) {
    return NextResponse.json({ ok: true });
  }

  const paymentId = String(parsed.data.id);

  // Buscar detalhes do pagamento na API do Mercado Pago
  const mpRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!mpRes.ok) {
    return NextResponse.json({ error: "Erro ao consultar MP" }, { status: 500 });
  }

  const payment = await mpRes.json();

  if (payment.status !== "approved") {
    return NextResponse.json({ ok: true });
  }

  const supabase = await createServiceClient();

  // Tentar atualizar rifa_numeros primeiro
  const { data: rifaNum } = await supabase
    .from("rifa_numeros")
    .select("id")
    .eq("payment_id", paymentId)
    .single();

  if (rifaNum) {
    await supabase
      .from("rifa_numeros")
      .update({ status: "pago", paid_at: new Date().toISOString() })
      .eq("payment_id", paymentId);
    return NextResponse.json({ ok: true });
  }

  // Caso contrário, atualizar doação
  await supabase
    .from("doacoes")
    .update({ status: "approved", paid_at: new Date().toISOString() })
    .eq("payment_id", paymentId);

  return NextResponse.json({ ok: true });
}
