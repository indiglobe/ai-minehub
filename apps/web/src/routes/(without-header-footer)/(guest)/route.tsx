import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(without-header-footer)/(guest)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
