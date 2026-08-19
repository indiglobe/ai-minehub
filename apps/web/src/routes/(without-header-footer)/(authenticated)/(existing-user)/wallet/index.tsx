import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/wallet/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/(without-header-footer)/(authenticated)/(existing-user)/wallet/"!
    </div>
  );
}
