import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSite } from "@/lib/site-query";
import { Monogram, WhatsAppIcon } from "./brand";
import { NAV_ITEMS } from "./nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { c, wa } = useSite();
  const [open, setOpen] = useState(false);
  const link = wa();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Monogram />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-semibold text-navy md:text-xl">
              {c("doctor_name")}
            </span>
            <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Cirurgia Vascular & Endovascular
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {link && (
            <Button asChild variant="wine" size="sm" className="hidden h-10 rounded-full px-5 sm:inline-flex">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Agendar consulta
              </a>
            </Button>
          )}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border text-navy lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border/70 bg-background transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent",
        )}
      >
        <nav aria-label="Menu móvel" className="min-h-0">
          <div className="container-page flex flex-col py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 font-display text-xl text-foreground last:border-0"
                activeProps={{ className: "text-wine" }}
              >
                {item.label}
              </Link>
            ))}
            {link && (
              <Button asChild variant="wine" size="xl" className="mt-4 w-full">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Agendar pelo WhatsApp
                </a>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
