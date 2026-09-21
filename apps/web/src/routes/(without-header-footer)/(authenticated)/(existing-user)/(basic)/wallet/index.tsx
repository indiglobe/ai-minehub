import { Wallet } from "@/components/main/dashboard-groups/user-dashboard/wallet/wallet";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/wallet/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Wallet | AI Minehub";
    const description =
      "Manage your AI Minehub wallet, view your balance, track transactions, and manage your funds securely.";

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
          content: `${env.VITE_WEB_APP_HOST}/wallet`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/wallet`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <Wallet />
    </>
  );
}
