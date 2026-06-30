import {
  AccountsCards,
  AccountsCardsIcon,
  AccountsCardsHeading,
  AccountsCardsSubHeading,
  AccountsCardsOfferingItem,
  AccountsCardsOfferingList,
  AccountsCardsPopulerBadge,
} from "@/components/main/trading/accounts/page-uis";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home } from "lucide-react";

function AccountsCardsComp() {
  return (
    <div className={cn(`min-w-100`)}>
      <AccountsCards>
        <AccountsCardsPopulerBadge />
        <AccountsCardsIcon>
          <Home className={cn(`size-8`)}></Home>
        </AccountsCardsIcon>
        <AccountsCardsHeading>Micro Account</AccountsCardsHeading>
        <AccountsCardsSubHeading>
          Perfect for new traders
        </AccountsCardsSubHeading>

        <AccountsCardsOfferingList>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Minimum Deposit
            </span>
            <span className={cn(`text-primary-600 text-sm font-semibold`)}>
              $10
            </span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Spread From
            </span>
            <span className={cn(`text-sm font-semibold`)}>0.5 pips</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Leverage</span>
            <span className={cn(`text-sm font-semibold`)}>1:1000</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Commission</span>
            <span className={cn(`text-secondary-600 text-sm font-semibold`)}>
              $4/lot
            </span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Instruments
            </span>
            <span className={cn(`text-sm font-semibold`)}>200+</span>
          </AccountsCardsOfferingItem>
        </AccountsCardsOfferingList>
        <Button className={cn(`h-12 w-full`)} corner={"rounded"}>
          Do some stuff
        </Button>
      </AccountsCards>
    </div>
  );
}

const meta: Meta<typeof AccountsCardsComp> & TypedMetaOptions = {
  component: AccountsCardsComp,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AccountsCardsComp> & TypedStoryOptions;

export const AccountsCardsCompStory: Story = {
  args: {},
};
