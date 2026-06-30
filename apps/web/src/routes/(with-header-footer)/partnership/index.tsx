import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/partnership/"!</div>;
}
