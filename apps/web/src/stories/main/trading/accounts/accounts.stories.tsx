import { Accounts } from "@/components/main/trading/accounts/accounts";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Accounts> & TypedMetaOptions = {
  component: Accounts,
};

export default meta;

type Story = StoryObj<typeof Accounts> & TypedStoryOptions;

export const AccountsStory: Story = {
  args: {},
};
