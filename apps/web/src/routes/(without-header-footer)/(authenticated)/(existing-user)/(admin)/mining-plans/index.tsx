import { MiningPlans } from "@/components/main/dashboard-groups/admin-dashboard/mining-plans/mining-plans";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/mining-plans/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <MiningPlans />
    </>
  );
}
