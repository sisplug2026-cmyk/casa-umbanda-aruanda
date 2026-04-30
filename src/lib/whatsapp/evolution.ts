// Configuração da Evolution API
const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL || "";
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || "";
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || "casa-aruanda";

export async function enviarMensagemWhatsApp(
  telefone: string,
  mensagem: string
) {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
    console.warn("Evolution API não configurada");
    return { success: false, error: "API não configurada" };
  }

  // Limpar número (remover não-dígitos)
  const numeroLimpo = telefone.replace(/\D/g, "");

  try {
    const res = await fetch(
      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number: `55${numeroLimpo}`,
          text: mensagem,
          delay: 1200,
        }),
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Erro Evolution API:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (e: any) {
    console.error("Exception Evolution API:", e);
    return { success: false, error: e.message };
  }
}

export function formatarMensagemSorteio(
  nome: string,
  tituloRifa: string,
  numeroSorteado: number
) {
  return `🎉 *Parabéns ${nome}!* 🎉

Você foi o ganhador(a) da rifa *"${tituloRifa}"* com o número *${numeroSorteado.toString().padStart(3, "0")}*!

Entre em contato com a Casa de Umbanda Aruanda para retirar seu prêmio.

📞 (11) 99214-3492`;
}
