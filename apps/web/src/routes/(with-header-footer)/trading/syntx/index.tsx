import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/trading/syntx/")({
  component: RouteComponent,

  head: () => ({
    meta: [
      { title: "SyntX Indices — Trade 24/7 Synthetic Indices | AI Mine Hub" },
    ],
  }),
});

function RouteComponent() {
  return <div>Hello "/(with-header-footer)/trading/syntx/"!</div>;
}
