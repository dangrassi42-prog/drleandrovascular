import { useSite } from "@/lib/site-query";
import { WhatsAppIcon } from "./brand";

export function WhatsAppFloat() {
  const { wa } = useSite();
  const link = wa();
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="animate-pulse-ring fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant transition-transform hover:scale-105 md:bottom-8 md:right-8"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
