import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  HeartHandshake,
  MapPin,
  Phone,
  Quote,
  Star,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="mt-0 text-[2.5rem] font-semibold leading-[1.02] text-navy md:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {text}
        </p>
      )}
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
      <VeinLines className="absolute inset-0 h-full w-full text-wine-soft/35" />
      <div className="container-page relative grid items-end gap-8 pt-10 md:grid-cols-12 md:gap-6 md:pt-20">
        <div className="animate-fade-up md:col-span-7 md:pb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-muted">
            <span className="size-1.5 rounded-full bg-wine-soft" />
            Angiologia · Cirurgia Vascular e Endovascular
          </div>
          <h1 className="mt-6 text-[3rem] font-semibold leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
            {c("hero_title")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-muted md:text-lg">
            {c("hero_subtitle")}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
            {link && (
              <Button asChild variant="wine" size="xl" className="w-full sm:w-auto">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" />
                  Agendar consulta pelo WhatsApp
                </a>
              </Button>
            )}
            <Button asChild variant="ghostLight" size="xl" className="w-full sm:w-auto">
              <Link to="/sobre">
                Conheça o médico
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-navy-foreground/10 pt-8 text-sm sm:max-w-lg">
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase tracking-[0.16em] text-navy-muted">
                Registro
              </dt>
              <dd className="font-medium">{c("crm")}</dd>
              <dd className="text-navy-muted">{c("rqe")}</dd>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 size-4 rounded-full bg-wine-soft" />
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-[0.16em] text-navy-muted">
                  Atendimento
                </dt>
                <dd className="mt-0.5 inline-flex items-center gap-1.5 font-medium">
                  <MapPin className="size-3.5 text-wine-soft" />
                  {c("city")}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
          <div className="absolute inset-0 rounded-[2rem] border border-navy-foreground/10 bg-navy-foreground/5" />
          <img
            src={img}
            alt={`Foto de ${c("doctor_name")}, angiologista e cirurgião vascular`}
            width={880}
            height={1100}
            fetchPriority="high"
            loading="eager"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-elegant [mask-image:linear-gradient(to_bottom,black_80%,transparent_60%)]"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <div className="relative z-10 rounded-2xl border border-navy-foreground/15 bg-navy-deep/75 px-5 py-3 backdrop-blur-md shadow-elegant">
              <p className="font-display text-lg font-semibold leading-none">{c("doctor_name")}</p>
              <p className="mt-1 text-xs text-navy-muted">
                Angiologista e Cirurgião Vascular
              </p>
            </div>
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
      <div className="container-page relative animate-fade-up py-16 md:py-24">
        <p className="eyebrow text-wine-soft">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl text-[2.75rem] font-semibold leading-[1.02] tracking-tight md:text-5xl">
          {title}
        </h1>
        {text && <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-muted md:text-lg">{text}</p>}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
const VALUES = [
  {
    icon: BadgeCheck,
    title: "Angiologia e Cirurgia Vascular",
    text: "Atuação em cirurgia vascular e endovascular.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    text: "Escuta atenta e explicações claras em cada etapa.",
  },
  {
    icon: UserRound,
    title: "Cuidado individualizado",
    text: "Cada plano é pensado para a realidade do paciente.",
  },
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
    <section className="py-24 md:py-32">
      <div className="container-page grid items-center gap-16 md:grid-cols-12 md:gap-20">
        <div className="animate-reveal relative md:col-span-5">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] border border-wine/30" aria-hidden="true" />
          <img
            src={img}
            alt={`${c("doctor_name")} de jaleco no consultório`}
            loading="lazy"
            width={880}
            height={1100}
            className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-elegant border border-border/60"
          />
        </div>
        <div className="md:col-span-7">
          <SectionHeading eyebrow="Sobre o médico" title={c("about_title")} />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {shown.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <li key={v.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-md transition-shadow">
                <v.icon className="size-5 text-wine" strokeWidth={1.6} />
                <p className="mt-3 text-sm font-semibold text-navy">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
          {!full && (
            <Button asChild variant="outlineNavy" size="xl" className="mt-10 w-full">
              <Link to="/sobre">
                Conheça o Dr. Leandro
                <ArrowRight className="ml-2 size-4" />
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
    <section className="bg-surface py-24 md:py-32">
      <div className="container-page">
        {withHeading && (
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Especialidades"
              title="Avaliação e tratamento vascular"
              text="Cuidado especializado para veias, artérias e circulação, sempre a partir de uma avaliação individual."
            />
            {limit && services.length > limit && (
              <Button asChild variant="outlineNavy" size="xl" className="self-start md:self-auto w-full sm:w-auto">
                <Link to="/especialidades">
                  Ver todas as especialidades
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            )}
          </div>
        )}
        <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", withHeading && "mt-14")}>
          {list.map((s, i) => {
            const link = wa(`Olá! Gostaria de agendar uma avaliação sobre: ${s.title}.`);
            return (
              <li
                key={s.id}
                className="animate-reveal group relative flex flex-col rounded-[2rem] border border-border bg-card p-7 shadow-soft transition-all hover:shadow-md hover:-translate-y-1 md:p-8"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="grid size-14 place-items-center rounded-[1.5rem] bg-navy text-navy-foreground transition-colors group-hover:bg-wine">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="font-display text-xl text-muted-foreground/50">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-7 text-2xl font-semibold leading-tight text-navy group-hover:text-navy/90 transition-colors">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-wine transition-transform hover:translate-x-1"
                  >
                    Agendar atendimento
                    <ArrowRight className="size-4" />
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
    <section className="py-24 md:py-32">
      <div className="container-page">
        <div className="relative grid overflow-hidden rounded-[3rem] border border-border bg-card shadow-soft md:grid-cols-2">
          <div className="relative z-10 p-8 md:p-16">
            <p className="eyebrow">Tratamento de varizes</p>
            <h2 className="mt-4 text-[2.75rem] font-semibold leading-[1.02] tracking-tight text-navy md:text-5xl">
              {c("varizes_title")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {c("varizes_text")}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-foreground/80">
              {["Avaliação clínica das veias das pernas", "Exames complementares quando indicados", "Plano de cuidado individualizado"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="size-1.5 rounded-full bg-wine" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
              {link && (
                <Button asChild variant="wine" size="xl" className="w-full sm:w-auto">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Agende sua avaliação
                  </a>
                </Button>
              )}
              {showMore && (
                <Button asChild variant="outlineNavy" size="xl" className="w-full sm:w-auto">
                  <Link to="/varizes">Saiba mais sobre varizes</Link>
                </Button>
              )}
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              A indicação de qualquer tratamento depende de avaliação médica individual.
            </p>
          </div>
          <div className="relative min-h-[24rem] bg-surface md:min-h-full">
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
    <section className="bg-surface py-24 md:py-32">
      <div className="container-page">
        {withHeading && (
          <SectionHeading
            eyebrow="Locais de atendimento"
            title="Onde o Dr. Leandro atende"
            text="Atendimentos em clínicas parceiras de Irecê – Bahia."
          />
        )}
        <ul className={cn("grid gap-5 md:grid-cols-2", withHeading && "mt-14")}>
          {locations.map((l) => (
            <li key={l.id} className="animate-reveal flex flex-col rounded-[2rem] border border-border bg-card p-7 shadow-soft md:p-9">
              <div className="flex items-center gap-4 mb-1">
                {l.logo_url ? (
                  <img src={l.logo_url} alt={`Logotipo ${l.name}`} className="size-16 rounded-2xl border border-border object-contain p-1" loading="lazy" />
                ) : (
                  <span className="grid size-16 shrink-0 place-items-center rounded-[1.5rem] bg-wine-soft font-display text-xl font-semibold text-wine">
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
              <dl className="mt-7 flex-1 space-y-4 text-sm">
                <InfoRow icon={MapPin} label="Endereço" value={l.address} />
                <InfoRow icon={Clock} label="Dias e horários" value={l.schedule} />
                <InfoRow icon={Phone} label="Telefone" value={l.phone ? formatPhoneBR(l.phone) : ""} />
              </dl>
              {l.maps_url ? (
                <Button asChild variant="outlineNavy" size="xl" className="mt-8 self-start w-full sm:w-auto">
                  <a href={l.maps_url} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 size-4" />
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
    <section className="py-24 md:py-32">
      <div className="container-page grid gap-12 md:grid-cols-12">
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
          <Accordion type="single" collapsible className="rounded-[2rem] border border-border bg-card shadow-soft">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="border-border">
                <AccordionTrigger className="py-6 text-left font-display text-xl font-semibold text-navy hover:no-underline transition-colors">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="pb-7 text-base leading-relaxed text-muted-foreground">
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
    <section className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="Depoimentos" title="A experiência de quem foi atendido" align="center" />
        {testimonials.length ? (
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.id} className="animate-reveal rounded-[2rem] border border-border bg-card p-8 shadow-soft">
                <div className="flex items-center gap-2">
                  <Quote className="size-8 text-wine/40" />
                </div>
                <div className="mt-5 flex gap-1" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("size-5", i < t.rating ? "text-wine" : "text-border")} />
                  ))}
                </div>
                <p className="mt-6 text-base leading-relaxed text-foreground/85">“{t.content}”</p>
                <p className="mt-7 text-sm font-semibold text-navy">{t.author_name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-10 max-w-md text-center text-muted-foreground">
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
    <section className="pb-24 md:pb-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-navy px-7 py-14 text-navy-foreground md:px-12 md:py-20">
          <VeinLines className="absolute inset-0 h-full w-full text-wine-soft/30" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[2.5rem] font-semibold leading-[1.02] tracking-tight md:text-4xl">
                Agende sua consulta
              </h2>
              <p className="mt-4 text-navy-muted">
                Fale com a equipe pelo WhatsApp e escolha o local e horário mais convenientes.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {link && (
                <Button asChild variant="wine" size="xl" className="w-full sm:w-auto">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-5" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              )}
              <Button asChild variant="ghostLight" size="xl" className="w-full sm:w-auto">
                <Link to="/contato">Enviar mensagem</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
