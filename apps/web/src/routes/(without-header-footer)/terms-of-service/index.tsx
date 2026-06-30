import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/terms-of-service/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(without-header-footer)/terms-of-service/"!</div>;
}
