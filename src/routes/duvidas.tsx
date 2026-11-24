import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, FaqList, CtaBand } from "@/components/site/sections";

export const Route = createFileRoute("/duvidas")({
  component: Duvidas,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Dúvidas frequentes sobre Angiologia e Cirurgia Vascular com o Dr. Leandro Fernandes em Irecê - Bahia.",
      },
    ],
  }),
});

function Duvidas() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Dúvidas frequentes"
        title="Perguntas comuns"
        text="Informações educativas, que não substituem uma avaliação médica individual."
      />
      <FaqList />
      <CtaBand />
    </div>
  );
}
