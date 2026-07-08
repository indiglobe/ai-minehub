import { Instruments } from "@/components/main/trading/instruments/instruments";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/trading/instruments/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [
      { title: "Trading Instruments — Forex, Crypto, Stocks | AI Mine Hub" },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <Instruments />
    </>
  );
}
