import {
  StatCard,
  StatCardData,
  StatCardFooter,
  StatCardHeader,
  StatCardHeadingIcon,
  StatCardHeadingText,
} from "@/components/main/dashboard/page-ui";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home } from "lucide-react";

function StatCardComp() {
  return (
    <StatCard>
      <StatCardHeader>
        <StatCardHeadingText>Invested</StatCardHeadingText>
        <StatCardHeadingIcon>
          <Home />
        </StatCardHeadingIcon>
      </StatCardHeader>
      <StatCardData>$3,501.00</StatCardData>
      <StatCardFooter>Mining deployed</StatCardFooter>
    </StatCard>
  );
}

const meta = {
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof StatCardComp> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof StatCardComp> & TypedStoryOptions;

export const StatCardCompStory: Story = {
  args: {},
  render: () => <StatCardComp />,
};
