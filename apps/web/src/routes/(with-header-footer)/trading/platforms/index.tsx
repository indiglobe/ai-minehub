import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/trading/platforms/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Trading Platforms — MT4 & MT5 Download | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/trading/platforms/"!</div>;
}
