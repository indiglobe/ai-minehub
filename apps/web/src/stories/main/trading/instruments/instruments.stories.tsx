import { Instruments } from "@/components/main/trading/instruments/instruments";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Instruments> & TypedMetaOptions = {
  component: Instruments,
};

export default meta;

type Story = StoryObj<typeof Instruments> & TypedStoryOptions;

export const InstrumentsStory: Story = {
  args: {},
};
