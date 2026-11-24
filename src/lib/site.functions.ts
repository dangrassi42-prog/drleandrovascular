import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Backend not configured");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [content, services, locations, faqs, testimonials] = await Promise.all([
    sb.from("site_content").select("key, value"),
    sb.from("services").select("*").order("sort_order"),
    sb.from("locations").select("*").order("sort_order"),
    sb.from("faqs").select("*").order("sort_order"),
    sb.from("testimonials").select("id, author_name, content, rating, sort_order").eq("published", true).order("sort_order"),
  ]);
  const err = content.error ?? services.error ?? locations.error ?? faqs.error ?? testimonials.error;
  if (err) throw new Error(err.message);
  const map: Record<string, string> = {};
  for (const row of content.data ?? []) map[row.key] = row.value;
  return {
    content: map,
    services: services.data ?? [],
    locations: locations.data ?? [],
    faqs: faqs.data ?? [],
    testimonials: testimonials.data ?? [],
  };
});
