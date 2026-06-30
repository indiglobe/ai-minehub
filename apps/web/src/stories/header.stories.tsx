import Header from "@/components/header/header";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function HeaderComp() {
  return <Header />;
}

const meta: Meta<typeof HeaderComp> & TypedMetaOptions = {
  component: HeaderComp,
};

export default meta;

type Story = StoryObj<typeof HeaderComp>;

export const HeaderCompStory: Story = {
  args: {},
};
