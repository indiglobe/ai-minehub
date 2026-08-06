import { UnauthenticatedHeader } from "@/components/header/unauthenticated-header";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: UnauthenticatedHeader,
} satisfies Meta<typeof UnauthenticatedHeader> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof UnauthenticatedHeader> & TypedStoryOptions;

export const UnauthenticatedHeaderStory: Story = {
  args: {},
};
