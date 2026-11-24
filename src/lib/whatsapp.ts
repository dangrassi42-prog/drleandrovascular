/** Builds a wa.me link from any phone format. Returns null when no number is set. */
export function whatsappLink(phone: string, message?: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Formats Brazilian numbers like 5574999331012 as "(74) 99933-1012". */
export function formatPhoneBR(phone: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
}

export function contactWhatsappMessage(input: { name: string; phone: string; reason: string }) {
  return [
    "Olá! Vim pelo site e gostaria de atendimento com o Dr. Leandro Fernandes.",
    "",
    `Nome: ${input.name}`,
    `Telefone: ${input.phone}`,
    `Motivo: ${input.reason}`,
  ].join("\n");
}

export function instagramLink(handle: string): string {
  return `https://instagram.com/${handle.replace(/^@/, "").trim()}`;
}
