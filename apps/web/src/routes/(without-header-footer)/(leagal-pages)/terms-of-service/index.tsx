import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(leagal-pages)/terms-of-service/",
)({
  component: RouteComponent,

  head: () => {
  const title = "Terms of Service | AI Minehub";
  const description =
    "Review the terms and conditions governing your use of AI Minehub, including account responsibilities, services, transactions, and user obligations.";

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
        content: `${env.VITE_WEB_APP_HOST}/terms-of-service`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/terms-of-service`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <div>
      Hello "/(without-header-footer)/(leagal-pages)/terms-of-service/"!
    </div>
  );
}
