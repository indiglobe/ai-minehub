import Home from "@/components/main/home/home";
import { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "AI Mine Hub — The World's Markets, One Platform" }],
  }),

  loader: async () => {
    return {
      allRatings: serverFn__readAllRatings(),
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
