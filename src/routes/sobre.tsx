import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, AboutSection, CtaBand } from "@/components/site/sections";

export const Route = createFileRoute("/sobre")({
  component: Sobre,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Conheça o Dr. Leandro Fernandes, angiologista e cirurgião vascular em Irecê - Bahia. Medicina vascular com escuta, cuidado e precisão.",
      },
    ],
  }),
});

function Sobre() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Sobre o médico"
        title="Quem é o Dr. Leandro Fernandes"
        text="Medicina vascular com escuta, cuidado e precisão. Atendimento humanizado em Angiologia e Cirurgia Vascular e Endovascular."
      />
      <AboutSection full />
      <CtaBand />
    </div>
  );
}
