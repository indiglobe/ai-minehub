import { Wallet } from "@/components/main/dashboard-groups/user-dashboard/wallet/wallet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/wallet/",
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
