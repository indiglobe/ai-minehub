import { Footer } from "@/components/footer/footer";
import { UnauthenticatedHeader } from "@/components/header/unauthenticated-header";
import { fetchSession } from "@/lib/auth/session";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)")({
  component: RouteComponent,

  beforeLoad: async () => {
    const session = await fetchSession();

    return { session };
  },
});

function RouteComponent() {
  return (
    <>
      <UnauthenticatedHeader />
      <Outlet />
      <Footer />
    </>
  );
}
