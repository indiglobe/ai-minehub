import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/tools/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Trading Tools & Calculators | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/tools/"!</div>;
}
