import { WelcomeComp } from "@/components/main/welcome/welcome";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { welcomePageSearchParams } from "@/utils/zod-schema/search-params-schema/welcome-page";
import { env } from "@repo/env/client";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute(
  "/(without-header-footer)/(authenticated)/(new-user)/welcome/",
)({
  component: RouteComponent,

  head: () => {
    const title = "Welcome | AI Minehub";
    const description =
      "Welcome to AI Minehub. Complete your account setup and get started with your AI-powered mining experience.";

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
          content: `${env.VITE_WEB_APP_HOST}/welcome`,
        },
        {
          name: "og:url",
          content: `${env.VITE_WEB_APP_HOST}/welcome`,
        },
      ],
    };
  },

  /**
   * Search Params Validation
   *
   * Ensures URL query params match expected schema before rendering.
   */
  validateSearch: zodValidator(welcomePageSearchParams),

  /**
   * Loader
   *
   * Runs before the route renders.
   * Responsible for resolving and validating the referral code (if any).
   *
   * This data is passed into the route context.
   */
  loader: async ({ location }) => {
    const { search } = location;

    /**
     * Safely validate search params again at runtime.
     * (acts as a defensive check in addition to zodValidator)
     */
    const parsedWelcomePageSearchParams =
      welcomePageSearchParams.safeParse(search);

    /**
     * If parsing fails, fallback to empty referral state.
     */
    if (parsedWelcomePageSearchParams.error) {
      return {
        referralCode: "",
      };
    }

    const {
      data: { referralCode },
    } = parsedWelcomePageSearchParams;

    /**
     * If no referral code is provided, treat as a normal welcome flow.
     */
    if (!referralCode) {
      return {
        referralCode: "",
      };
    }

    /**
     * Validate referral code against backend user records.
     * The referral code is treated as a user ID here.
     */
    const referredUserDetails = await serverFn__readOneUser({
      data: { identifier: { id: referralCode } },
    });

    /**
     * If referral code does not match any user,
     * ignore it and proceed without referral data.
     */
    if (!referredUserDetails) {
      return {
        referralCode: "",
      };
    }

    /**
     * Valid referral found — return normalized referral user ID.
     */
    return {
      referralCode: referredUserDetails.id,
    };
  },
});

function RouteComponent() {
  return (
    <>
      <WelcomeComp />
    </>
  );
}
