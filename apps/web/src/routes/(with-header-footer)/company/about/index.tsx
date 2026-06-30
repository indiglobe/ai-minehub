import { About } from "@/components/main/company/about/about";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/about/")({
  component: RouteComponent,

  head: () => ({
    meta: [
      {
        title:
          "Account Types — Micro, Pro, SyntX Trading Accounts | AI Mine Hub",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <>
      <About />
    </>
  );
}
