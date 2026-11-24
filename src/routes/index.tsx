import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, ArrowRight, Award, CalendarDays, CheckCircle2, Clock3,
  HeartPulse, MapPin, Menu, MessageCircle, ShieldCheck, Stethoscope, X,
} from "lucide-react";

const whatsapp = "https://wa.me/5574999331012?text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20consulta%20com%20o%20Dr.%20Leandro%20Fernandes.";
const instagram = "https://instagram.com/drleandro.vascular";
const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Varizes", href: "#varizes" },
  { label: "Atendimento", href: "#atendimento" },
  { label: "Contato", href: "#contato" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Leandro Fernandes | Angiologia e Cirurgia Vascular em Irecê - BA" },
      { name: "description", content: "Dr. Leandro Fernandes — Angiologia, Cirurgia Vascular e Endovascular. Atendimento em Irecê, Bahia. Entre em contato para informações e agendamento." },
      { name: "theme-color", content: "#10243d" },
      { property: "og:title", content: "Dr. Leandro Fernandes | Cirurgia Vascular" },
      { property: "og:description", content: "Cuidado especializado em saúde vascular em Irecê, Bahia." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-700">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="container-page flex min-h-[78px] items-center justify-between gap-4">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Dr. Leandro Fernandes - início">
            <span className="grid size-12 place-items-center rounded-full border border-[#c5a15c]/60 bg-[#f8f4eb] font-serif text-xl font-bold text-[#10243d]">LF</span>
            <span className="leading-tight">
              <strong className="block font-serif text-lg text-[#10243d] sm:text-xl">Dr. Leandro Fernandes</strong>
              <small className="text-[9px] font-semibold uppercase tracking-[.13em] text-slate-500 sm:text-[10px]">Angiologia e Cirurgia Vascular</small>
            </span>
          </a>
          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map((item) => <a key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-[#a98239]">{item.label}</a>)}
          </nav>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="hidden items-center rounded-full bg-[#10243d] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1b385b] sm:inline-flex">
            <MessageCircle className="mr-2 size-4" /> Agendar consulta
          </a>
          <button className="grid size-10 place-items-center rounded-lg border border-slate-200 text-[#10243d] xl:hidden" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-slate-100 bg-white px-5 py-3 xl:hidden">
          {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-medium last:border-0">{item.label}</a>)}
          <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 block rounded-full bg-[#10243d] px-4 py-3 text-center font-semibold text-white">Agendar pelo WhatsApp</a>
        </nav>}
      </header>

      <section id="inicio" className="relative scroll-mt-24 bg-[#f5f7fa]">
        <div className="pointer-events-none absolute -right-32 -top-28 size-[30rem] rounded-full border border-[#c5a15c]/20" />
        <div className="container-page grid min-h-[610px] items-center gap-12 py-16 md:grid-cols-[1.1fr_.9fr] md:py-20">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d9c99f] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.13em] text-[#8b6a2e]"><Activity className="size-4" /> Saúde vascular e cuidado especializado</span>
            <h1 className="mt-7 font-serif text-5xl font-semibold leading-[1.06] tracking-tight text-[#10243d] md:text-6xl">Cuidado especializado para a <span className="text-[#a98239]">saúde vascular</span>.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Atendimento em Angiologia, Cirurgia Vascular e Endovascular, com avaliação individual e atenção às necessidades de cada paciente.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-[#10243d] px-6 py-4 font-semibold text-white shadow-lg shadow-[#10243d]/15 transition hover:-translate-y-0.5 hover:bg-[#1b385b]"><MessageCircle className="mr-2 size-5" /> Fale pelo WhatsApp</a>
              <a href="#sobre" className="inline-flex items-center rounded-full border border-[#10243d]/20 bg-white px-6 py-4 font-semibold text-[#10243d] transition hover:bg-slate-50">Conheça o médico <ArrowRight className="ml-2 size-4" /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-[#a98239]" /> Irecê – Bahia</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-[#a98239]" /> CRM/BA 27444</span>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-[450px] items-center justify-center py-8">
            <div className="absolute size-[min(78vw,390px)] rounded-full border border-[#c5a15c]/50" />
            <div className="absolute size-[min(66vw,330px)] rounded-full bg-[#e8edf2]" />
            <div className="relative grid aspect-[4/5] w-[min(70%,310px)] place-items-center overflow-hidden rounded-[48%_48%_26px_26px] border-[7px] border-white bg-gradient-to-b from-[#dfe6ed] to-[#bfcbd8] shadow-2xl">
              <div className="text-center">
                <span className="font-serif text-7xl font-semibold tracking-tight text-[#10243d]">LF</span>
                <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[.22em] text-[#8b6a2e]">Angiologia • Vascular</span>
              </div>
            </div>
            <div className="absolute bottom-5 left-0 rounded-2xl border border-white/20 bg-[#10243d]/95 px-5 py-4 text-white shadow-xl">
              <p className="font-serif text-xl font-semibold">Dr. Leandro Fernandes</p>
              <p className="mt-1 text-xs text-slate-300">Angiologia • Cirurgia Vascular</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="container-page grid gap-6 py-7 sm:grid-cols-3">
          <Info icon={<Award />} title="Registro profissional" text="CRM/BA 27444" />
          <Info icon={<ShieldCheck />} title="Registros de especialista" text="RQE 22658 · RQE 22675" />
          <Info icon={<MapPin />} title="Localização" text="Irecê – Bahia" />
        </div>
      </section>

      <section id="sobre" className="container-page grid scroll-mt-24 items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="relative mx-auto grid aspect-[4/4.5] w-full max-w-[430px] place-items-center overflow-hidden rounded-[30px] bg-[#edf1f5]">
          <div className="absolute inset-5 rounded-[24px] border border-[#c5a15c]/50" />
          <div className="text-center"><span className="font-serif text-8xl font-semibold text-[#10243d]">LF</span><p className="mt-2 text-xs font-bold uppercase tracking-[.2em] text-[#8b6a2e]">Dr. Leandro Fernandes</p></div>
        </div>
        <div>
          <Eyebrow>Sobre o médico</Eyebrow>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#10243d] md:text-5xl">Medicina vascular com escuta, cuidado e atenção.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">O Dr. Leandro Fernandes atua nas áreas de Angiologia, Cirurgia Vascular e Endovascular, com atendimento em Irecê, Bahia.</p>
          <p className="mt-4 leading-7 text-slate-600">Cada paciente deve receber uma avaliação individual, considerando seu histórico, suas necessidades e as possibilidades de cuidado. O primeiro passo é uma conversa atenta e uma consulta especializada.</p>
          <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center font-semibold text-[#8b6a2e] hover:underline">Entre em contato <ArrowRight className="ml-2 size-4" /></a>
        </div>
      </section>

      <section id="especialidades" className="scroll-mt-24 bg-[#f5f7fa] py-20 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center"><Eyebrow>Áreas de atuação</Eyebrow><h2 className="mt-3 font-serif text-4xl font-semibold text-[#10243d] md:text-5xl">Cuidado em diferentes áreas da saúde vascular</h2><p className="mt-4 leading-7 text-slate-600">Conheça as áreas de atuação e converse com o médico para entender qual avaliação é adequada ao seu caso.</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Service icon={<HeartPulse />} title="Angiologia" text="Avaliação clínica das doenças que afetam artérias, veias e vasos linfáticos." />
            <Service icon={<Activity />} title="Cirurgia Vascular" text="Avaliação e acompanhamento de condições que podem exigir tratamento vascular." />
            <Service icon={<Stethoscope />} title="Cirurgia Endovascular" text="Área da cirurgia vascular que utiliza técnicas minimamente invasivas, conforme indicação médica." />
          </div>
        </div>
      </section>

      <section id="varizes" className="container-page grid scroll-mt-24 items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <div><Eyebrow>Saúde das pernas</Eyebrow><h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#10243d] md:text-5xl">Varizes: informação e avaliação especializada.</h2><p className="mt-5 text-lg leading-8 text-slate-600">As varizes são veias dilatadas e podem estar associadas a sintomas e desconfortos. A avaliação médica ajuda a compreender cada situação e discutir as opções de cuidado.</p><p className="mt-4 leading-7 text-slate-600">A indicação de tratamento depende de exame clínico e, quando necessário, de exames complementares. Não existe uma abordagem única para todas as pessoas.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center rounded-full bg-[#10243d] px-6 py-4 font-semibold text-white hover:bg-[#1b385b]">Agendar avaliação <ArrowRight className="ml-2 size-4" /></a></div>
        <div className="grid aspect-[5/4] place-items-center overflow-hidden rounded-[28px] border border-[#e4e9ef] bg-gradient-to-br from-[#edf1f5] to-[#d9e1e9]"><div className="text-center"><Activity className="mx-auto size-20 text-[#a98239]" strokeWidth={1.2} /><p className="mt-4 font-serif text-2xl text-[#10243d]">Saúde vascular</p><p className="mt-1 text-sm text-slate-500">Informação e cuidado individualizado</p></div></div>
      </section>

      <section id="atendimento" className="scroll-mt-24 bg-[#10243d] py-20 text-white md:py-24">
        <div className="container-page">
          <div className="max-w-2xl"><Eyebrow light>Atendimento</Eyebrow><h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Atendimento em Irecê, Bahia.</h2><p className="mt-5 leading-7 text-slate-300">Para confirmar endereço, disponibilidade de horários e orientações sobre o atendimento, entre em contato diretamente pelo WhatsApp.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6"><MapPin className="size-6 text-[#d7bd83]" /><h3 className="mt-4 font-serif text-2xl">Irecê – BA</h3><p className="mt-2 text-sm leading-6 text-slate-300">Consulte pelo WhatsApp os locais de atendimento e os endereços atualizados.</p></div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6"><Clock3 className="size-6 text-[#d7bd83]" /><h3 className="mt-4 font-serif text-2xl">Agendamento</h3><p className="mt-2 text-sm leading-6 text-slate-300">Entre em contato para verificar os horários disponíveis.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center font-semibold text-[#e7d4a8]">Consultar horários <ArrowRight className="ml-2 size-4" /></a></div>
          </div>
        </div>
      </section>

      <section id="contato" className="container-page scroll-mt-24 py-20 text-center md:py-24">
        <Eyebrow>Fale conosco</Eyebrow><h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-semibold text-[#10243d] md:text-5xl">Agende sua consulta</h2><p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">Para informações sobre consultas, locais de atendimento e disponibilidade, fale com a equipe pelo WhatsApp.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-[#10243d] px-7 py-4 font-semibold text-white transition hover:bg-[#1b385b]"><MessageCircle className="mr-2 size-5" /> WhatsApp: (74) 99933-1012</a><a href={instagram} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-slate-300 px-7 py-4 font-semibold text-[#10243d] hover:bg-slate-50">Instagram @drleandro.vascular</a></div>
        <p className="mt-5 text-sm text-slate-500">CRM/BA 27444 · RQE 22658 · RQE 22675</p>
      </section>

      <footer className="bg-[#0a192b] py-10 text-slate-300">
        <div className="container-page"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="font-serif text-2xl font-semibold text-white">Dr. Leandro Fernandes</p><p className="mt-1 text-sm">Angiologia, Cirurgia Vascular e Endovascular</p><p className="mt-2 text-xs text-slate-400">CRM/BA 27444 · RQE 22658 · RQE 22675 · Irecê – Bahia</p></div><div className="flex flex-wrap gap-5 text-sm"><a href={whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a><a href="#inicio" className="hover:text-white">Voltar ao topo ↑</a></div></div><div className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-slate-400">As informações deste site têm caráter informativo e não substituem uma consulta médica. Diagnóstico e tratamento dependem de avaliação individual. Em caso de urgência, procure um serviço de saúde.</div><p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} Dr. Leandro Fernandes. Todos os direitos reservados.</p></div>
      </footer>
      <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Fale pelo WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#20b86a] text-white shadow-xl transition hover:scale-105"><MessageCircle className="size-7" /></a>
    </main>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-xs font-bold uppercase tracking-[.2em] ${light ? "text-[#e3cf9e]" : "text-[#987333]"}`}>{children}</p>;
}
function Info({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#f8f4eb] text-[#987333]">{icon}</span><span><strong className="block text-sm text-[#10243d]">{title}</strong><small className="text-slate-500">{text}</small></span></div>;
}
function Service({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span className="grid size-12 place-items-center rounded-xl bg-[#f8f4eb] text-[#987333]">{icon}</span><h3 className="mt-5 font-serif text-2xl font-semibold text-[#10243d]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p><CheckCircle2 className="mt-5 size-5 text-[#b18b46]" /></article>;
}
