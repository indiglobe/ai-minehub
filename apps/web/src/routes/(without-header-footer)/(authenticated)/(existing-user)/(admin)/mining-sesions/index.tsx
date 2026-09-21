import { MiningSessions } from '@/components/main/dashboard-groups/admin-dashboard/mining-sesions/mining-sesions'
import { env } from '@repo/env/client';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(without-header-footer)/(authenticated)/(existing-user)/(admin)/mining-sesions/',
)({
  component: RouteComponent,

  head: () => {
  const title = "Mining Sessions | AI Minehub Admin";
  const description =
    "Monitor and manage active and completed mining sessions, review session activity, and oversee mining operations from the AI Minehub admin dashboard.";

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
        content: `${env.VITE_WEB_APP_HOST}/mining-sesions`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/mining-sesions`,
      },
    ],
  };
},

})

function RouteComponent() {
  return (
    <>
      <MiningSessions/>
    </>
  )
}
