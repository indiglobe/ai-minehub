import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/education/guides/")(
  {
    component: RouteComponent,

    head: () => ({
      meta: [{ title: "Exclusive Trading Webinars | AI Mine Hub" }],
    }),
  },
);

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/education/guides/"!</div>;
}
