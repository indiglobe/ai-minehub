import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(authenticated)/(existing-user)/(basic)/referral";
import {
  Referral,
  ReferralStats,
  ReferralCode,
  YourReferrals,
} from "@/components/main/dashboard-groups/user-dashboard/referral/referral";
import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";
import { mocked } from "storybook/test";
import { serverFn__readOneUser } from "@/integrations/server-function/user";

const meta = {
  beforeEach: () => {
    mocked(serverFn__readOneUser).mockResolvedValue(
      mocked__serverFn__readOneUser() as any,
    );
  },
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

export const ReferralCodeStory: Story = {
  args: {},
  render: () => <ReferralCode />,
};

export const ReferralStatsStory: Story = {
  args: {},
  render: () => <ReferralStats />,
};

export const YourReferralsStory: Story = {
  args: {},
  render: () => <YourReferrals />,
};

function contextData__userDetailsFromCookies() {
  return {
    userId: "someid",
    fullName: "Indiglobe IT",
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}

function mocked__serverFn__readOneUser() {
  return {
    referrals: [
      {
        avatarUrl: "https://avatars.githubusercontent.com/u/93200363",
        fullName: "Some Name",
        email: "somename@email.com",
      },
    ],
  } satisfies DeepPartial<Awaited<ReturnType<typeof serverFn__readOneUser>>>;
}
