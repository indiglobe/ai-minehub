import { UserDetailsFromDashboard } from "@/components/main/admin-dashboard/users/user-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <UserDetailsFromDashboard />
    </>
  );
}
