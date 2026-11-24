"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHeader, CtaBand } from "@/components/site/sections";
import { useSite } from "@/lib/site-query";
import { formatPhoneBR, contactWhatsappMessage } from "@/lib/whatsapp";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import sonner from "sonner";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Entre em contato com o Dr. Leandro Fernandes, angiologista e cirurgião vascular em Irecê - Bahia. Agende sua consulta pelo WhatsApp.",
      },
    ],
  }),
});

function Contato() {
  const { c, wa, locations } = useSite();
  const link = wa();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const phone = data.get("phone") as string;
    const reason = data.get("reason") as string;

    const waMessage = contactWhatsappMessage({ name, phone, reason });
    if (link) {
      window.open(`${link}?text=${encodeURIComponent(waMessage)}`, "_blank");
    }
    setSubmitting(true);
    sonner.success("Mensagem aberta no WhatsApp", {
      description: "Clique em enviar no WhatsApp para concluir o agendamento.",
    });
    form.reset();
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Contato"
        title="Fale conosco"
        text={c("contact_intro")}
      />
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-navy">Envie uma mensagem</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Preencha os campos abaixo e entraremos em contato o mais breve possível. Ou fale direto pelo WhatsApp.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      required
                      placeholder="Seu nome"
                      disabled={submitting}
                      className={cn("h-11", submitting && "opacity-70")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone com WhatsApp</Label>
                    <Input
                      id="phone"
                      required
                      type="tel"
                      placeholder="(74) 9 9999-9999"
                      disabled={submitting}
                      className={cn("h-11", submitting && "opacity-70")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo do contato</Label>
                  <Textarea
                    id="reason"
                    required
                    rows={3}
                    placeholder="Ex.: avaliação de varizes, dor nas pernas, consulta de retorno"
                    disabled={submitting}
                    className={cn("min-h-[100px]", submitting && "opacity-70")}
                  />
                </div>
                <Button
                  type="submit"
                  variant="wine"
                  disabled={submitting}
                  className="w-full h-11"
                >
                  {submitting ? "Enviando..." : "Abrir no WhatsApp"}
                </Button>
              </form>
              <p className="mt-6 text-xs text-muted-foreground">
                Ao enviar, você concorda que seus dados serão usados apenas para entrar em contato sobre atendimento.
              </p>
            </div>

            <div className="space-y-6">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface px-6 py-5 transition-colors hover:bg-accent/50"
                >
                  <div className="grid size-10 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
                      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.41 4.41-9.82 9.84-9.82a9.75 9.75 0 0 1 6.95 2.88 9.75 9.75 0 0 1 2.88 6.95c0 5.42-4.41 9.82-9.83 9.82M20.42 3.48A11.75 11.75 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.14 1.59 5.95L.07 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">{formatPhoneBR(c("whatsapp_number"))}</div>
                  </div>
                </a>
              )}
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-wine" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Telefone</div>
                    <div className="text-sm text-muted-foreground">{formatPhoneBR(c("whatsapp_number"))}</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-wine" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">E-mail</div>
                    <div className="text-sm text-muted-foreground">contato@drleandrovascular.com.br</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-navy">Locais de atendimento</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Atendimentos em clínicas parceiras de Irecê – Bahia. Confira endereços e horários abaixo.
              </p>
              <ul className="mt-6 space-y-4">
                {locations.map((l) => (
                  <li key={l.id} className="flex flex-col gap-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-wine" />
                      <div>
                        <div className="text-sm font-semibold text-navy">{l.name}</div>
                        <div className="text-sm text-muted-foreground">{l.address}</div>
                        <div className="text-sm text-muted-foreground">{l.schedule}</div>
                      </div>
                    </div>
                    {l.maps_url && (
                      <a
                        href={l.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-wine hover:underline"
                      >
                        Ver no Google Maps
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold text-navy uppercase tracking-wider">Horário de funcionamento</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Segunda a sexta</dt>
                  <dd className="text-foreground">08h às 18h</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sábado</dt>
                  <dd className="text-foreground">08h às 12h</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <CtaBand />
    </div>
  );
}
