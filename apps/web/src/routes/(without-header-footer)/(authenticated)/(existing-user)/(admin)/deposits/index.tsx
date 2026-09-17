import { AllDeposits } from "@/components/main/dashboard-groups/admin-dashboard/deposits/deposits";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/deposits/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AllDeposits />
    </>
  );
}
