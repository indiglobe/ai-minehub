import { CompanyHome } from "@/components/main/company/company";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Explore Company | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <CompanyHome />
    </>
  );
}
