import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const schema = z.object({
  amount: z.number().positive(),
  type: z.enum(["unica", "recorrente"]),
  payment_method: z.enum(["pix", "credit_card"]),
  donor_name: z.string().optional(),
  donor_email: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // Usuário pode estar logado ou não
  const supabaseAuth = await createClient();
  const { data: { user } } = await supabaseAuth.auth.getUser();

  const supabase = await createServiceClient();

  if (body.payment_method === "pix") {
    // Criar pagamento PIX
    const mpRes = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "X-Idempotency-Key": `doacao-${Date.now()}`,
      },
      body: JSON.stringify({
        transaction_amount: body.amount,
        description: `Doação Casa de Umbanda Aruanda — ${body.type}`,
        payment_method_id: "pix",
        payer: {
          email: body.donor_email ?? user?.email ?? "doador@aruanda.org",
          first_name: body.donor_name?.split(" ")[0] ?? "Doador",
        },
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      }),
    });

    if (!mpRes.ok) {
      return NextResponse.json({ error: "Erro ao criar PIX" }, { status: 500 });
    }

    const mpData = await mpRes.json();

    const { data: doacao } = await supabase
      .from("doacoes")
      .insert({
        donor_id: user?.id ?? null,
        donor_name: body.donor_name ?? null,
        donor_email: body.donor_email ?? null,
        amount: body.amount,
        type: body.type,
        status: "pending",
        payment_method: "pix",
        payment_id: String(mpData.id),
      })
      .select()
      .single();

    return NextResponse.json({
      doacao_id: doacao?.id,
      payment_id: mpData.id,
      qr_code_base64: mpData.point_of_interaction?.transaction_data?.qr_code_base64,
      pix_copia_cola: mpData.point_of_interaction?.transaction_data?.qr_code,
    });
  }

  // Cartão — Checkout Pro
  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [
        {
          title: `Doação Casa de Umbanda Aruanda — ${body.type}`,
          unit_price: body.amount,
          quantity: 1,
          currency_id: "BRL",
        },
      ],
      payer: {
        email: body.donor_email ?? user?.email ?? "",
        name: body.donor_name ?? "",
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/membro/historico-doacoes`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/doacoes`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/doacoes`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
    }),
  });

  if (!mpRes.ok) {
    return NextResponse.json({ error: "Erro ao criar checkout" }, { status: 500 });
  }

  const mpData = await mpRes.json();

  const { data: doacao } = await supabase
    .from("doacoes")
    .insert({
      donor_id: user?.id ?? null,
      donor_name: body.donor_name ?? null,
      donor_email: body.donor_email ?? null,
      amount: body.amount,
      type: body.type,
      status: "pending",
      payment_method: "credit_card",
      payment_url: mpData.init_point,
    })
    .select()
    .single();

  return NextResponse.json({
    doacao_id: doacao?.id,
    checkout_url: mpData.init_point,
  });
}
