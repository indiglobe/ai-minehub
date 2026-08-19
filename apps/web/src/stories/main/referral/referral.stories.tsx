import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/referral";
import Referral from "@/components/main/referral/referral";
import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";

const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        context: {
          userDetailsFromCookie: contextData__userDetailsFromCookies(),
        },
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof meta> & TypedStoryOptions;

export const ReferralStory: Story = {
  args: {},
  render: () => <Referral />,
};

function contextData__userDetailsFromCookies() {
  return {
    userId: "someid",
    fullName: "Indiglobe IT",
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}
