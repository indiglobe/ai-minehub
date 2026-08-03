import Affiliate from "@/components/main/partnership/affiliate/affiliate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/partnership/affiliate/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Affiliate Program — CPA & Revenue Share | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <Affiliate />
    </>
  );
}
