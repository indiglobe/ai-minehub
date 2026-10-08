import { CompanyHome } from "@/components/main/company/company";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/")({
  component: RouteComponent,

head: () => {
  const title = "About AI Mine Hub | Company";
  const description =
    "Learn more about AI Mine Hub, our company, vision, values, and approach to providing innovative mining and trading solutions.";

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
        content: `${env.VITE_WEB_APP_HOST}/company`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/company`,
      },
    ],
  };
},


});

function RouteComponent() {
  return (
    <>
      <CompanyHome />
    </>
  );
}
