import AuthenticatedHeader from "@/components/header/authenticated-header";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  component: AuthenticatedHeader,
} satisfies Meta<typeof AuthenticatedHeader> & TypedMetaOptions;

export default meta;

type Story = StoryObj<typeof AuthenticatedHeader> & TypedStoryOptions;

export const AuthenticatedHeaderStory: Story = {
  args: {},
};
