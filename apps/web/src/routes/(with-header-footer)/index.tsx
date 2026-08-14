import Home from "@/components/main/home/home";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "AI Mine Hub — The World's Markets, One Platform" }],
  }),

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
