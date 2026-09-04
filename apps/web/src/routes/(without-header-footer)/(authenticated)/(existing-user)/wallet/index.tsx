import { Wallet } from "@/components/main/wallet/wallet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/wallet/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Wallet/>
    </>
  );
}
