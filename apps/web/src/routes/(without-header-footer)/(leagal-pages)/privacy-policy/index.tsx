import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(leagal-pages)/privacy-policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/(without-header-footer)/(leagal-pages)/privacy-policy/"!</div>
  );
}
