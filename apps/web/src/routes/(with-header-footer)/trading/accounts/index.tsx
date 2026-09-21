import { Accounts } from "@/components/main/trading/accounts/accounts";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/trading/accounts/")(
  {
    component: RouteComponent,

    head: () => {
      const title =
        "Account Types — Micro, Pro, SyntX Trading Accounts | AI Mine Hub";
      const description =
        "Explore AI Mine Hub trading account types, including Micro, Pro, and SyntX accounts, and find the account features suited to your trading needs.";

      return {
        meta: [
          { title },
          {
            name: "description",
            content: description,
          },
          {
            name: "twitter:title",
            content: title,
          },
          {
            name: "og:title",
            content: title,
          },
          {
            name: "twitter:description",
            content: description,
          },
          {
            name: "og:description",
            content: description,
          },
          {
            name: "twitter:url",
            content: `${env.VITE_WEB_APP_HOST}/trading/accounts`,
          },
          {
            name: "og:url",
            content: `${env.VITE_WEB_APP_HOST}/trading/accounts`,
          },
        ],
      };
    },
  },
);

function RouteComponent() {
  return (
    <>
      <Accounts />
    </>
  );
}
