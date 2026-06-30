import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(with-header-footer)/education/webinars/",
)({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Trading Guides & Books | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/education/webinars/"!</div>;
}
