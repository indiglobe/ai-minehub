import { PartnershipHome } from "@/components/main/partnership/partnership";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/")({
  component: RouteComponent,

  head: () => {
  const title = "Partnership | AI Mine Hub";
  const description =
    "Explore partnership opportunities with AI Mine Hub and discover ways to build, collaborate, and grow together through our partnership program.";

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
        content: `${env.VITE_WEB_APP_HOST}/partnership`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/partnership`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <>
      <PartnershipHome />
    </>
  );
}
