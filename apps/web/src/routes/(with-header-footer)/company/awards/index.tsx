import Award from "@/components/main/company/award/award";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/awards/")({
  component: RouteComponent,

  head: () => {
    const title = "Awards & Licenses — Trusted Worldwide | AI Mine Hub";
    const description =
      "Explore AI Mine Hub's awards, licenses, certifications, and industry recognition that highlight our commitment to transparency, quality, and trusted services.";

    return {
      meta: [
        { title },
        {
          name: "description",
          content: description,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "og:description",
          content: description,
        },
        {
          name: "twitter:url",
          content: `${env.VITE_WEB_APP_HOST}/company/awards`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/company/awards`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Award />
    </>
  );
}
