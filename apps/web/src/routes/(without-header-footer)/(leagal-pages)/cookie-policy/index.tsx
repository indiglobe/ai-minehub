import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(without-header-footer)/(leagal-pages)/cookie-policy/",
)({
  component: RouteComponent,

  head: () => {
  const title = "Cookie Policy | AI Minehub";
  const description =
    "Learn how AI Minehub uses cookies and similar technologies to provide, improve, and secure our website and services.";

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
        content: `${env.VITE_WEB_APP_HOST}/cookie-policy`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/cookie-policy`,
      },
    ],
  };
},

});

function RouteComponent() {
  return (
    <div>Hello "/(without-header-footer)/(leagal-pages)/cookie-policy/"!</div>
  );
}
