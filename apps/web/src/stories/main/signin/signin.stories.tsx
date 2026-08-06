import { SigninComp } from "@/components/main/signin/signin";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import { Route } from "@/routes/(without-header-footer)/(guest)/signin/index";
import type { TSigninPageSearchParams } from "@/utils/zod-schema/search-params-schema/signin-page";

const meta = {
  parameters: {
    tanstack: {
      router: {
        route: Route,
        query: {} satisfies TSigninPageSearchParams,
      },
    },
  },
} satisfies Meta<typeof Route> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof SigninComp> & TypedStoryOptions;

export const SigninCompStory: Story = {
  args: {},
  render: SigninComp,
};
