import { PartnershipHome } from "@/components/main/partnership/partnership";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <PartnershipHome />
    </>
  );
}
