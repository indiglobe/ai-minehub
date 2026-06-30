import { Accounts } from "@/components/main/trading/accounts/accounts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/trading/accounts/")(
  {
    component: RouteComponent,

    head: () => ({
      meta: [
        {
          title:
            "Account Types — Micro, Pro, SyntX Trading Accounts | AI Mine Hub",
        },
      ],
    }),
  },
);

function RouteComponent() {
  return (
    <>
      <Accounts />
    </>
  );
}
