import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  AboutSection,
  ServicesGrid,
  VarizesFeature,
  LocationsGrid,
  FaqList,
  Testimonials,
  CtaBand,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Dr. Leandro Fernandes - Angiologista e Cirurgião Vascular em Irecê - Bahia. Avaliação e tratamento de varizes, circulacao e saúde vascular. Agende sua consulta pelo WhatsApp.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <AboutSection />
      <ServicesGrid limit={3} />
      <VarizesFeature />
      <LocationsGrid />
      <FaqList />
      <Testimonials />
      <CtaBand />
    </div>
  );
}
