import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/ib/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Introducing Broker (IB) Program | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/partnership/ib/"!</div>;
}
