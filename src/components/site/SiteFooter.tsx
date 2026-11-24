import suit from "@/assets/dr-leandro-terno.webp.asset.json";
import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useSite } from "@/lib/site-query";
import { formatPhoneBR, instagramLink } from "@/lib/whatsapp";
import { InstagramIcon, Monogram, WhatsAppIcon } from "./brand";
import { NAV_ITEMS } from "./nav";

export function SiteFooter() {
  const { c, wa, locations } = useSite();
  const link = wa();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-16 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Monogram className="border-navy-foreground/20 bg-navy-foreground/5 text-wine-soft" />
            <div>
              <p className="font-display text-2xl font-semibold">{c("doctor_name")}</p>
              <p className="text-sm text-navy-muted">{c("specialty")}</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-navy-muted">
            {c("crm")} · {c("rqe")}
          </p>
          <p className="mt-1 text-sm text-navy-muted">{c("city")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-navy-foreground/10"
              >
                <WhatsAppIcon className="size-4" />
                {formatPhoneBR(c("whatsapp_number"))}
              </a>
            )}
            <a
              href={instagramLink(c("instagram"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-navy-foreground/10"
            >
              <InstagramIcon className="size-4" />@{c("instagram").replace(/^@/, "")}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-wine-soft mb-4">Navegação</p>
          <ul className="mt-0 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-navy-muted transition-colors hover:text-navy-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-wine-soft mb-4">Locais de atendimento</p>
          <ul className="mt-0 space-y-4 text-sm">
            {locations.map((l) => (
              <li key={l.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-wine-soft" />
                <span>
                  <span className="block text-navy-foreground">{l.name}</span>
                  {l.address && <span className="block text-navy-muted">{l.address}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-page flex flex-col gap-5 py-8 text-xs text-navy-muted md:flex-row md:items-center md:justify-between md:py-10">
          <p className="max-w-2xl leading-relaxed">
            O conteúdo deste site tem caráter exclusivamente informativo e não substitui a consulta médica.
            Diagnóstico e tratamento dependem de avaliação individual.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacidade" className="hover:text-navy-foreground">
              Política de privacidade
            </Link>
            <Link to="/admin" className="hover:text-navy-foreground">
              Área restrita
            </Link>
            <span>© {year} {c("doctor_name")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
