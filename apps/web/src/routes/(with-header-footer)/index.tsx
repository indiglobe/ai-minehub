import Home from "@/components/main/home/home";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "@repo/env/client";

export const Route = createFileRoute("/(with-header-footer)/")({
  component: RouteComponent,

  head: () => {
    const title = "AI Mine Hub — The World's Markets, One Platform";
    const description =
      "Explore AI Mine Hub's platform for mining opportunities, flexible mining plans, digital assets, and tools designed to help you manage your mining journey.";

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
          content: `${env.VITE_WEB_APP_HOST}/`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/`,
        },
      ],
    };
  },

  loader: async () => {
    return {
      allRatings: serverFn__readAllRatings(),
      allMiningProfiles: serverFn__readAllMiningProfiles(),
      allMiningOrders: serverFn__readAllMiningOrders(),
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Home />
    </>
  );
}
