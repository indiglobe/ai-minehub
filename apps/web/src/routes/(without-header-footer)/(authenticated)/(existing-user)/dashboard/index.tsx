import { Dashboard } from "@/components/main/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Dashboard />
    </>
  );
}
