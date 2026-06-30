import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/privacy-policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(without-header-footer)/privacy-policy/"!</div>;
}
