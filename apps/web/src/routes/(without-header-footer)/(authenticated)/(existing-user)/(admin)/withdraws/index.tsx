import { AllWithdrawals } from "@/components/main/dashboard-groups/admin-dashboard/withdraws/withdraws";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/withdraws/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AllWithdrawals />
    </>
  );
}
