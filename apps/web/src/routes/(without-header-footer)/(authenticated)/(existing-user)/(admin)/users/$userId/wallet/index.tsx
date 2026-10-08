import { WalletManagement } from "@/components/main/dashboard-groups/admin-dashboard/users/user-wallet";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
)({
  component: RouteComponent,

  head: ({ params }) => {
    const { userId } = params;

    const title = "User Wallet | AI Minehub Admin";
    const description =
      "View and manage a user's wallet, review balances and transactions, and oversee wallet activity from the AI Minehub admin dashboard.";

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
          content: `${env.VITE_WEB_APP_HOST}/users/${userId}/wallet`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/users/${userId}/wallet`,
        },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <>
      <WalletManagement />
    </>
  );
}
