import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, LocationsGrid, CtaBand } from "@/components/site/sections";

export const Route = createFileRoute("/locais")({
  component: Locais,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Locais de atendimento do Dr. Leandro Fernandes em Irecê - Bahia. Clínicas parceiras, endereços, dias e horários.",
      },
    ],
  }),
});

function Locais() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        eyebrow="Locais de atendimento"
        title="Onde o Dr. Leandro atende"
        text="Atendimentos em clínicas parceiras de Irecê – Bahia."
      />
      <LocationsGrid />
      <CtaBand />
    </div>
  );
}
