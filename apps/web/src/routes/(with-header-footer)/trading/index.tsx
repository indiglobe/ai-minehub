import { createFileRoute } from "@tanstack/react-router";
import { TradingHome } from "@/components/main/trading/trading";

export const Route = createFileRoute("/(with-header-footer)/trading/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <TradingHome />
    </>
  );
}
