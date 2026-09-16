import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AllDeposits,
  DepositError,
  DepositsEmpty,
  DepositsLoading,
} from "@/components/main/admin-dashboard/deposits/deposits";

function Comp() {
  return (
    <>
      <AllDeposits />
      <DepositError />
      <DepositsEmpty />
      <DepositsLoading />
    </>
  );
}

const meta: Meta<typeof Comp> & TypedMetaOptions = {
  component: Comp,
};

export default meta;

type Story = StoryObj<typeof Comp> & TypedStoryOptions;

export const Story: Story = {
  args: {},
};
