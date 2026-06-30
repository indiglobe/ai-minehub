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
  return <div>Hello "/(with-header-footer)/partnership/affiliate/"!</div>;
}
