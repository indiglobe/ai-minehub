import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(without-header-footer)/(leagal-pages)")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
