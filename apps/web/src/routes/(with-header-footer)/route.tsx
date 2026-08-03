import { Footer } from "@/components/footer/footer";
import { UnauthenticatedHeader } from "@/components/header/unauthenticated-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)")({
  component: RouteComponent,
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
