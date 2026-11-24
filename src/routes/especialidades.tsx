import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ServicesGrid, CtaBand } from "@/components/site/sections";

export const Route = createFileRoute("/especialidades")({
  component: Especialidades,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Especialidades do Dr. Leandro Fernandes: avaliação e tratamento vascular, varizes, circulacao e saúde das pernas em Irecê - Bahia.",
      },
    ],
  }),
});

function Especialidades() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Especialidades"
        title="Avaliação e tratamento vascular"
        text="Cuidado especializado para veias, artérias e circulação, sempre a partir de uma avaliação individual."
      />
      <ServicesGrid />
      <CtaBand />
    </div>
  );
}
