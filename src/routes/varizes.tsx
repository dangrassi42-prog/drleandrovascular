import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, VarizesFeature, CtaBand } from "@/components/site/sections";

export const Route = createFileRoute("/varizes")({
  component: Varizes,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Tratamento de varizes com o Dr. Leandro Fernandes em Irecê - Bahia. Avaliação clínica das veias das pernas e plano de cuidado individualizado.",
      },
    ],
  }),
});

function Varizes() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Tratamento de varizes"
        title="Saúde das suas pernas"
        text="Conheça as possibilidades de avaliação e tratamento das varizes, com uma abordagem individualizada para cada paciente."
      />
      <VarizesFeature showMore={false} />
      <CtaBand />
    </div>
  );
}
