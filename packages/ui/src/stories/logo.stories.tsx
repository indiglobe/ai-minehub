import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoIconFilled, LogoIconOutlined } from "../components/logo";
import { cn } from "@repo/styles/cn";

function Logo() {
  return (
    <>
      <div className={cn(`flex gap-4`)}>
        <LogoIconFilled />
        <LogoIconOutlined />
      </div>
    </>
  );
}

const meta: Meta<typeof Logo> & TypedMetaOptions = {
  component: Logo,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const LogoStory: Story = {
  args: {},
};

export const LogoIconFilledStory: Story = {
  args: {},
  render: () => (
    <>
      <LogoIconFilled />
    </>
  ),
};

export const LogoIconOutlinedStory: Story = {
  args: {},
  render: () => (
    <>
      <LogoIconOutlined />
    </>
  ),
};
