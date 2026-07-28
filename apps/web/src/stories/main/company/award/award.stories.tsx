import Award from "@/components/main/company/award/award";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Award> & TypedMetaOptions = {
  component: Award,
};

export default meta;

type Story = StoryObj<typeof Award> & TypedStoryOptions;

export const AwardStory: Story = {
  args: {},
};
