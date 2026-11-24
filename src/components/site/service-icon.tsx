import {
  Activity,
  ClipboardList,
  HeartPulse,
  Scissors,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Footprints,
  Syringe,
  Droplets,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  sparkles: { icon: Sparkles, label: "Brilho" },
  stethoscope: { icon: Stethoscope, label: "Estetoscópio" },
  scissors: { icon: Scissors, label: "Cirurgia" },
  activity: { icon: Activity, label: "Atividade" },
  "heart-pulse": { icon: HeartPulse, label: "Circulação" },
  "shield-check": { icon: ShieldCheck, label: "Prevenção" },
  "clipboard-list": { icon: ClipboardList, label: "Acompanhamento" },
  footprints: { icon: Footprints, label: "Pernas" },
  syringe: { icon: Syringe, label: "Procedimento" },
  droplets: { icon: Droplets, label: "Veias" },
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = SERVICE_ICONS[name]?.icon ?? Activity;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
