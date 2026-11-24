import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSiteData } from "./site.functions";
import { DEFAULT_CONTENT, type ContentKey } from "./site-defaults";
import { whatsappLink } from "./whatsapp";

export const siteDataQuery = () =>
  queryOptions({
    queryKey: ["site-data"],
    queryFn: () => getSiteData(),
    staleTime: 60_000,
  });

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;

export function useSite() {
  const { data } = useSuspenseQuery(siteDataQuery());
  const c = (key: ContentKey) => {
    const v = data.content[key];
    return v && v.trim() ? v : DEFAULT_CONTENT[key];
  };
  const wa = (message?: string) =>
    whatsappLink(c("whatsapp_number"), message ?? c("whatsapp_message"));
  return { ...data, c, wa };
}
