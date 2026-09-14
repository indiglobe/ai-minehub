import { WalletManagement } from "@/components/main/admin-dashboard/users/user-wallet";
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
