import {
  Accounts,
  ChatWithExpert,
  ChooseAccountType,
  CompareAcconts,
} from "@/components/main/trading/accounts/accounts";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

function AccountsComp() {
  return <Accounts />;
}

const meta: Meta<typeof AccountsComp> & TypedMetaOptions = {
  component: AccountsComp,
};

export default meta;

type Story = StoryObj<typeof AccountsComp> & TypedStoryOptions;

export const AccountsCompStory: Story = {
  args: {},
};

function ChooseAccountTypeComp() {
  return <ChooseAccountType />;
}

export const ChooseAccountTypeCompStory: Story = {
  args: {},
  render: ChooseAccountTypeComp,
};

function CompareAccontsComp() {
  return <CompareAcconts />;
}

export const CompareAccontsCompStory: Story = {
  args: {},
  render: CompareAccontsComp,
};

function ChatWithExpertComp() {
  return <ChatWithExpert />;
}

export const ChatWithExpertCompStory: Story = {
  args: {},
  render: ChatWithExpertComp,
};
