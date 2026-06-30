import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/promotions/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Bonus & Promotions | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return <div>Hello /(with-header-footer)/promotions/!</div>;
}
