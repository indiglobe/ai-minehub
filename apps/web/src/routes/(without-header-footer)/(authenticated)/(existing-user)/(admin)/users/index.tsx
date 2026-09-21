import { AllUsers } from '@/components/main/dashboard-groups/admin-dashboard/users/users'
import { env } from '@repo/env/client';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/',
)({
  component: RouteComponent,

  head: () => {
  const title = "Users | AI Minehub Admin";
  const description =
    "Manage user accounts, review user activity, and oversee registered users from the AI Minehub admin dashboard.";

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
        content: `${env.VITE_WEB_APP_HOST}/users`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/users`,
      },
    ],
  };
},

})

function RouteComponent() {
  return (
    <>
      <AllUsers/>
    </>
  )
}
