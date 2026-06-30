import Footer from "@/components/footer/footer";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function FooterComp() {
  return <Footer />;
}

const meta: Meta<typeof FooterComp> & TypedMetaOptions = {
  component: FooterComp,
};

export default meta;

type Story = StoryObj<typeof FooterComp>;

export const FooterCompStory: Story = {
  args: {},
};
