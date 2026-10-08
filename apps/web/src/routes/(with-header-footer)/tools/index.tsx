import Tool from "@/components/main/tool/tool";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/tools/")({
  component: RouteComponent,

head: () => {
  const title = "Trading Tools & Calculators | AI Mine Hub";
  const description =
    "Explore AI Mine Hub's trading tools and calculators to analyze markets, evaluate trading opportunities, and support informed trading decisions.";

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
        content: `${env.VITE_WEB_APP_HOST}/tools`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/tools`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <>
      <Tool />
    </>
  );
}
