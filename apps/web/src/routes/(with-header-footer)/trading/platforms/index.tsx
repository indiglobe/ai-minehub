import { Platforms } from "@/components/main/trading/platforms/platforms";
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
  return (
    <>
      <Platforms />
    </>
  );
}
