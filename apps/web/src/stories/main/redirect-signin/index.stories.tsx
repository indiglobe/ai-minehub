import { RedirectOnlyPage } from "@/components/main/redirect-signin";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RedirectOnlyPage> & TypedMetaOptions = {
  component: RedirectOnlyPage,
};

export default meta;

type Story = StoryObj<typeof RedirectOnlyPage> & TypedStoryOptions;

export const RedirectOnlyPageStory: Story = {
  args: {},
};
