import Award from "@/components/main/company/award/award";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function AwardComp() {
  return <Award />;
}

const meta: Meta<typeof AwardComp> & TypedMetaOptions = {
  component: AwardComp,
};

export default meta;

type Story = StoryObj<typeof AwardComp> & TypedStoryOptions;

export const AwardCompStory: Story = {
  args: {},
};
