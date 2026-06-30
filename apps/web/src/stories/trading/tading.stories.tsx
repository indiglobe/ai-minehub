import { TradingHome } from "@/components/main/trading/trading";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function TradingHomeComp() {
  return <TradingHome />;
}

const meta: Meta<typeof TradingHomeComp> & TypedMetaOptions = {
  component: TradingHomeComp,
};

export default meta;

type Story = StoryObj<typeof TradingHomeComp> & TypedStoryOptions;

export const TradingHomeCompStory: Story = {
  args: {},
};
