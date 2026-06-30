import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/education/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/education/"!</div>;
}
