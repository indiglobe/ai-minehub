import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/dashboard/index";
import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";
import { beforeEach } from "@/integrations/storybook/mock";

const meta = {
  beforeEach: beforeEach,

  parameters: {
    tanstack: {
      router: {
        // @ts-ignore no-need to check working just fine
        route: Route,
        routeOverrides: {
          "/(without-header-footer)/(authenticated)/(existing-user)": {
            context: () => ({
              userDetailsFromCookie: contextData__userDetailsFromCookies(),
            }),
          },
        },
      },
    },
  },
} satisfies Meta<typeof Route>;

export default meta;

type Story = StoryObj<typeof meta>;

// =========================================================
// =========================================================
// STORIES
// =========================================================
// =========================================================

export const DashboardStory: Story = {
  args: {},
};

function contextData__userDetailsFromCookies() {
  return {
    userId: "some-id",
    fullName: "Indiglobe IT",
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}
