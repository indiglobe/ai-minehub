import { CompanyHome } from "@/components/main/company/company";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof CompanyHome> & TypedMetaOptions = {
  component: CompanyHome,
};

export default meta;

type Story = StoryObj<typeof CompanyHome> & TypedStoryOptions;

export const CompanyHomeStory: Story = {
  args: {},
};
