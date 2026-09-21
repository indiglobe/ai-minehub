import { createFileRoute } from "@tanstack/react-router";
import { TradingHome } from "@/components/main/trading/trading";
import { env } from "@repo/env/client";

export const Route = createFileRoute("/(with-header-footer)/trading/")({
  component: RouteComponent,

  head: () => {
  const title = "Trading | AI Mine Hub";
  const description =
    "Explore trading opportunities on AI Mine Hub with tools and resources designed to help you monitor markets and manage your trading activity.";

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
        content: `${env.VITE_WEB_APP_HOST}/trading`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/trading`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <>
      <TradingHome />
    </>
  );
}
