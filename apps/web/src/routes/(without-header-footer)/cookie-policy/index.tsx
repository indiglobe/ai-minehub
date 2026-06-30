import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(without-header-footer)/cookie-policy/")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <div>Hello "/(without-header-footer)/cookie-policy/"!</div>;
}
