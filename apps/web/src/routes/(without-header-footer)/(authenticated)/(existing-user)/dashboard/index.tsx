import AdminDashboard from "@/components/main/admin-dashboard/dashboard/dashboard";
import { UserDashboard } from "@/components/main/user-dashboard/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
)({
  component: RouteComponent,

});

function RouteComponent() {
  const {
    userDetailsFromCookie: { role },
  } = Route.useRouteContext();
  return (
    <>
      {role === "basic" && <UserDashboard />}
      {role === "admin" && <AdminDashboard />}
    </>
  );
}
