import Award from "@/components/main/company/award/award";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/awards/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Awards & Licenses — Trusted Worldwide | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <Award />
    </>
  );
}
