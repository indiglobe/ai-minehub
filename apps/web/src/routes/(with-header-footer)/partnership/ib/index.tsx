import IB from "@/components/main/partnership/ib/ib";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/partnership/ib/")({
  component: RouteComponent,

  head: () => ({
    meta: [{ title: "Introducing Broker (IB) Program | AI Mine Hub" }],
  }),
});

function RouteComponent() {
  return (
    <>
      <IB />
    </>
  );
}
