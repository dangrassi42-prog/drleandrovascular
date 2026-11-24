import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock, HeartHandshake, MapPin, Phone, Quote, Star, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSite } from "@/lib/site-query";
import { formatPhoneBR } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { VeinLines, WhatsAppIcon } from "./brand";
import { DEFAULT_IMAGES } from "./images";
import { ServiceIcon } from "./service-icon";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[2.15rem] font-semibold leading-[1.05] text-navy md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{text}</p>}
    </div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const { c, wa } = useSite();
  const link = wa();
  const img = c("hero_image_url") || DEFAULT_IMAGES.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      <VeinLines className="absolute inset-0 h-full w-full text-wine-soft/40" />
      <div className="container-page relative grid items-end gap-8 pt-10 md:grid-cols-12 md:gap-6 md:pt-16">
        <div className="animate-fade-up pb-2 md:col-span-7 md:pb-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-muted">
            <span className="size-1.5 rounded-full bg-wine-soft" />
            Angiologia · Cirurgia Vascular e Endovascular
          </p>
          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] md:text-6xl lg:text-7xl">
            {c("hero_title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-muted md:text-lg">{c("hero_subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {link && (
              <Button asChild variant="wine" size="xl">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Agendar consulta
                </a>
              </Button>
            )}
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/sobre">
                Conheça o médico
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-navy-foreground/10 pt-6 text-sm sm:max-w-lg">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-navy-muted">Registro</dt>
              <dd className="mt-1 font-medium">{c("crm")}</dd>
              <dd className="text-navy-muted">{c("rqe")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-navy-muted">Atendimento</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 font-medium">
                <MapPin className="size-3.5 text-wine-soft" />
                {c("city")}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
          <div className="absolute inset-x-6 bottom-0 top-16 rounded-t-full border border-navy-foreground/10 bg-navy-foreground/5" />
          <img
            src={img}
            alt={`Foto de ${c("doctor_name")}, angiologista e cirurgião vascular`}
            width={880}
            height={1100}
            fetchPriority="high"
            className="relative mx-auto aspect-[4/5] w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
          />
          <div className="absolute bottom-8 left-0 rounded-2xl border border-navy-foreground/15 bg-navy-deep/70 px-4 py-3 backdrop-blur-md md:-left-6">
            <p className="font-display text-lg font-semibold leading-none">{c("doctor_name")}</p>
            <p className="mt-1 text-xs text-navy-muted">Angiologista e Cirurgião Vascular</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page header for inner pages ---------------- */
export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-navy-foreground">
      <VeinLines className="absolute inset-0 h-full w-full text-wine-soft/35" />
      <div className="container-page relative animate-fade-up py-14 md:py-20">
        <p className="eyebrow text-wine-soft">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[2.4rem] font-semibold leading-[1.04] md:text-6xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-muted md:text-lg">{text}</p>}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
const VALUES = [
  { icon: BadgeCheck, title: "Angiologia e Cirurgia Vascular", text: "Atuação em cirurgia vascular e endovascular." },
  { icon: HeartHandshake, title: "Atendimento humanizado", text: "Escuta atenta e explicações claras em cada etapa." },
  { icon: UserRound, title: "Cuidado individualizado", text: "Cada plano é pensado para a realidade do paciente." },
];

export function AboutSection({ full = false }: { full?: boolean }) {
  const { c } = useSite();
  const img = c("about_image_url") || DEFAULT_IMAGES.about;
  const paragraphs = c("about_text")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const shown = full ? paragraphs : paragraphs.slice(0, 2);

  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="animate-reveal relative md:col-span-5">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border border-wine/25" aria-hidden="true" />
          <img
            src={img}
            alt={`${c("doctor_name")} de jaleco no consultório`}
            loading="lazy"
            width={880}
            height={1100}
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-elegant"
          />
        </div>
        <div className="md:col-span-7">
          <SectionHeading eyebrow="Sobre o médico" title={c("about_title")} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {shown.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-2xl border border-border bg-card p-4">
                <v.icon className="size-5 text-wine" strokeWidth={1.6} />
                <p className="mt-3 text-sm font-semibold text-navy">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
          {!full && (
            <Button asChild variant="outlineNavy" size="xl" className="mt-8">
              <Link to="/sobre">
                Conheça o Dr. Leandro
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
export function ServicesGrid({ limit, withHeading = true }: { limit?: number; withHeading?: boolean }) {
  const { services, wa } = useSite();
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page">
        {withHeading && (
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Especialidades"
              title="Avaliação e tratamento vascular"
              text="Cuidado especializado para veias, artérias e circulação, sempre a partir de uma avaliação individual."
            />
            {limit && services.length > limit && (
              <Button asChild variant="outlineNavy" size="xl" className="self-start md:self-auto">
                <Link to="/especialidades">
                  Ver todas
                  <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        )}
        <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", withHeading && "mt-12")}>
          {list.map((s, i) => {
            const link = wa(`Olá! Gostaria de agendar uma avaliação sobre: ${s.title}.`);
            return (
              <li
                key={s.id}
                className="animate-reveal group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elegant md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-navy text-navy-foreground transition-colors group-hover:bg-wine">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="font-display text-lg text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold leading-tight text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine"
                  >
                    Agendar atendimento
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Varizes feature ---------------- */
export function VarizesFeature({ showMore = true }: { showMore?: boolean }) {
  const { c, wa } = useSite();
  const img = c("varizes_image_url") || DEFAULT_IMAGES.varizes;
  const link = wa("Olá! Gostaria de agendar uma avaliação de varizes.");

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="relative grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-elegant md:grid-cols-2">
          <div className="relative z-10 p-7 md:p-14">
            <p className="eyebrow">Tratamento de varizes</p>
            <h2 className="mt-3 text-[2.3rem] font-semibold leading-[1.03] text-navy md:text-6xl">{c("varizes_title")}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{c("varizes_text")}</p>
            <ul className="mt-6 space-y-2 text-sm text-foreground/80">
              {["Avaliação clínica das veias das pernas", "Exames complementares quando indicados", "Plano de cuidado individualizado"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-wine" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {link && (
                <Button asChild variant="wine" size="xl">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Agende sua avaliação
                  </a>
                </Button>
              )}
              {showMore && (
                <Button asChild variant="outlineNavy" size="xl">
                  <Link to="/varizes">Saiba mais</Link>
                </Button>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              A indicação de qualquer tratamento depende de avaliação médica individual.
            </p>
          </div>
          <div className="relative min-h-[22rem] bg-surface md:min-h-full">
            <img
              src={img}
              alt="Ilustração médica da circulação venosa das pernas"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-card via-transparent to-transparent md:bg-gradient-to-r" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Locations ---------------- */
export function LocationsGrid({ withHeading = true }: { withHeading?: boolean }) {
  const { locations } = useSite();
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-page">
        {withHeading && (
          <SectionHeading
            eyebrow="Locais de atendimento"
            title="Onde o Dr. Leandro atende"
            text="Atendimentos em clínicas parceiras de Irecê – Bahia."
          />
        )}
        <ul className={cn("grid gap-4 md:grid-cols-2", withHeading && "mt-12")}>
          {locations.map((l) => (
            <li key={l.id} className="animate-reveal flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="flex items-center gap-4">
                {l.logo_url ? (
                  <img src={l.logo_url} alt={`Logotipo ${l.name}`} className="size-14 rounded-2xl border border-border object-contain p-1" loading="lazy" />
                ) : (
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-wine-soft font-display text-xl font-semibold text-wine">
                    {l.name
                      .replace(/\(.*\)/, "")
                      .split(/\s+/)
                      .filter((w) => w.length > 2)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                )}
                <h3 className="text-2xl font-semibold leading-tight text-navy">{l.name}</h3>
              </div>
              <dl className="mt-6 flex-1 space-y-3 text-sm">
                <InfoRow icon={MapPin} label="Endereço" value={l.address} />
                <InfoRow icon={Clock} label="Dias e horários" value={l.schedule} />
                <InfoRow icon={Phone} label="Telefone" value={l.phone ? formatPhoneBR(l.phone) : ""} />
              </dl>
              {l.maps_url ? (
                <Button asChild variant="outlineNavy" size="xl" className="mt-6 self-start">
                  <a href={l.maps_url} target="_blank" rel="noopener noreferrer">
                    <MapPin />
                    Ver no Google Maps
                  </a>
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-wine" strokeWidth={1.8} />
      <div>
        <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
        <dd className={cn("mt-0.5 whitespace-pre-line", value ? "text-foreground" : "italic text-muted-foreground")}>
          {value || "Consulte pelo WhatsApp"}
        </dd>
      </div>
    </div>
  );
}

/* ---------------- FAQ ---------------- */
export function FaqList({ withHeading = true }: { withHeading?: boolean }) {
  const { faqs } = useSite();
  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid gap-10 md:grid-cols-12">
        {withHeading && (
          <div className="md:col-span-4">
            <SectionHeading
              eyebrow="Dúvidas frequentes"
              title="Perguntas comuns"
              text="Informações educativas, que não substituem uma avaliação médica individual."
            />
          </div>
        )}
        <div className={withHeading ? "md:col-span-8" : "md:col-span-12 md:mx-auto md:max-w-3xl md:w-full"}>
          <Accordion type="single" collapsible className="rounded-3xl border border-border bg-card px-5 shadow-soft md:px-8">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="border-border">
                <AccordionTrigger className="py-5 text-left font-display text-xl font-semibold text-navy hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials({ showEmpty = false }: { showEmpty?: boolean }) {
  const { testimonials } = useSite();
  if (!testimonials.length && !showEmpty) return null;
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Depoimentos" title="A experiência de quem foi atendido" align="center" />
        {testimonials.length ? (
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.id} className="animate-reveal rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="size-6 text-wine/60" />
                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("size-4", i < t.rating ? "fill-wine text-wine" : "text-border")} />
                  ))}
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/85">“{t.content}”</p>
                <p className="mt-5 text-sm font-semibold text-navy">{t.author_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-8 max-w-md text-center text-muted-foreground">
            Em breve, depoimentos de pacientes publicados com autorização.
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
export function CtaBand() {
  const { wa } = useSite();
  const link = wa();
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-navy px-6 py-12 text-navy-foreground md:px-14 md:py-16">
          <VeinLines className="absolute inset-0 h-full w-full text-wine-soft/30" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[2.1rem] font-semibold leading-[1.05] md:text-5xl">Agende sua consulta</h2>
              <p className="mt-3 text-navy-muted">
                Fale com a equipe pelo WhatsApp e escolha o local e horário mais convenientes.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {link && (
                <Button asChild variant="whatsapp" size="xl">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-4" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              )}
              <Button asChild variant="ghostLight" size="xl">
                <Link to="/contato">Enviar mensagem</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
