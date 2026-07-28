import { About } from "@/components/main/company/about/about";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof About> & TypedMetaOptions = {
  component: About,
};

export default meta;

type Story = StoryObj<typeof About> & TypedStoryOptions;

export const AboutStory: Story = {
  args: {},
};
