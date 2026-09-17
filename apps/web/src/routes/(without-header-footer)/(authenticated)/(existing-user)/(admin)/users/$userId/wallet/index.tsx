import { WalletManagement } from "@/components/main/dashboard-groups/admin-dashboard/users/user-wallet";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WalletManagement />
    </>
  );
}
