import News from "@/components/main/company/news/news";
import { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(with-header-footer)/company/news/")({
  component: RouteComponent,
head: () => {
  const title = "Company News & Updates | AI Mine Hub";
  const description =
    "Stay informed with the latest AI Mine Hub company news, announcements, updates, and developments across our platform.";

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
        content: `${env.VITE_WEB_APP_HOST}/company/news`,
      },
      {
        name: "og:url",
        content: `${env.VITE_WEB_APP_HOST}/company/news`,
      },
    ],
  };
},


  loader: async () => {
    return {
      newsData: serverFn__readAllNewsSchema({
        data: { queryOptions: { limit: 4 } },
      }),
    };
  },
});

function RouteComponent() {
  return (
    <>
      <News />
    </>
  );
}
