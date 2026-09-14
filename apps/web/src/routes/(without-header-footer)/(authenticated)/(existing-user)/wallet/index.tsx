import { Wallet } from "@/components/main/user-dashboard/wallet/wallet";
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
