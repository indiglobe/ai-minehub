import { About } from "@/components/main/company/about/about";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function AboutComp() {
  return <About />;
}

const meta: Meta<typeof AboutComp> & TypedMetaOptions = {
  component: AboutComp,
};

export default meta;

type Story = StoryObj<typeof AboutComp> & TypedStoryOptions;

export const AboutCompStory: Story = {
  args: {},
};
