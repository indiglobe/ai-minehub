import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)",
)({
  component: RouteComponent,

  beforeLoad: async ({ context }) => {
    console.log(context);

    const {
      userDetailsFromCookie: { role },
    } = context;

    if (role === "admin") {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
