import { CompanyHome } from "@/components/main/company/company";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function CompanyHomeComp() {
  return <CompanyHome />;
}

const meta: Meta<typeof CompanyHomeComp> & TypedMetaOptions = {
  component: CompanyHomeComp,
};

export default meta;

type Story = StoryObj<typeof CompanyHomeComp> & TypedStoryOptions;

export const CompanyHomeCompStory: Story = {
  args: {},
};
