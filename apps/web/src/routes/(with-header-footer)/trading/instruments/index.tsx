import { Instruments } from "@/components/main/trading/instruments/instruments";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/trading/instruments/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Trading Instruments — Forex, Crypto, Stocks | AI Mine Hub";
    const description =
      "Explore trading instruments available on AI Mine Hub, including forex, cryptocurrencies, stocks, and other markets for your trading needs.";

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
          content: `${env.VITE_WEB_APP_HOST}/trading/instruments`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/trading/instruments`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Instruments />
    </>
  );
}
