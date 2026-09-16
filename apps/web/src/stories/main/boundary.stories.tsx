import { DashboardStatsLoading} from "@/components/main/boundary";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function Comp() {
  return (
    <>
      <DashboardStatsLoading></DashboardStatsLoading>
    </>
  );
}

const meta: Meta<typeof Comp> & TypedMetaOptions = {
  component: Comp,
};

export default meta;

type Story = StoryObj<typeof Comp> & TypedStoryOptions;

export const CompStory: Story = {
  args: {},
};
