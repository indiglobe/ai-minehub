import { createFileRoute, redirect } from "@tanstack/react-router";
import z from "zod";
import type { FileRouteTypes } from "@/routeTree.gen";
import { signOut } from "@/lib/auth/session";

export const routeSearchParamsSchema = z.object({
  "redirect-url": z
    .union([z.custom<FileRouteTypes["to"] | (string & {})>()])
    .catch("/")
    .default("/"),
});

export const Route = createFileRoute("/logout/")({
  component: RouteComponent,

  beforeLoad: async ({ search }) => {
    const { "redirect-url": redirectUrl } = search;

    await signOut();

    if (redirectUrl.startsWith("/")) {
      throw redirect({ to: redirectUrl });
    }

    throw redirect({ href: redirectUrl });
  },

  validateSearch: routeSearchParamsSchema,
});

function RouteComponent() {
  return null;
}
