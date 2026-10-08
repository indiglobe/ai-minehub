import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(leagal-pages)/privacy-policy/",
)({
  component: RouteComponent,

  head: () => {
  const title = "Privacy Policy | AI Minehub";
  const description =
    "Learn how AI Minehub collects, uses, protects, and manages your personal information when you use our website and services.";

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
        content: `${env.VITE_WEB_APP_HOST}/privacy-policy`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/privacy-policy`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <div>Hello "/(without-header-footer)/(leagal-pages)/privacy-policy/"!</div>
  );
}
