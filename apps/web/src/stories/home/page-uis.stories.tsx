import {
  SectionHeading,
  SectionIdentifier,
  SectionSubHeading,
  WhyChooseCardDetails,
  WhyChooseCardHeading,
  WhyChooseCardIcon,
  WhyChooseCards,
  RatingError,
  RatingLoading,
  AccountType,
  AccountTypeHeader,
  AccountTypeTitle,
  AccountTypeHeading,
  AccountTypeDescription,
  AccountTypeCardOfferingList,
  AccountTypeCardOfferingItem,
  AccountTypeCardOfferingItemDetails,
  AccountTypeCardOfferingItemTopic,
  PopularAccountType,
  AccountTypeFooter,
  AccountTypeIcon,
  BouncingBox,
  PromotionBonus,
  PromotionBonusIcon,
  PromotionBonusTitle,
  PromotionBonusDescription,
  PaymentVisual,
  PassiveIncome,
  PassiveIncomeIcon,
  PassiveIncomeTitle,
  PassiveIncomeDescription,
  PassiveIncomeReturn,
  PassiveIncomeDescriptionItem,
} from "@/components/main/home/page-uis";
import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import { cn } from "@repo/styles/cn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, Home } from "lucide-react";

function Comp() {
  return (
    <div>
      <SectionIdentifier>SectionIdentifier</SectionIdentifier>
      <SectionHeading>Why Traders Choose Us</SectionHeading>
      <SectionSubHeading>
        Built for serious traders. Institutional-grade conditions, accessible to
        everyone.
      </SectionSubHeading>
      <RatingError />
      <RatingLoading />
    </div>
  );
}

const meta: Meta<typeof Comp> & TypedMetaOptions = {
  component: Comp,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Comp>;

export const CompStory: Story = {
  args: {},
};

function WhyChooseCardsComp() {
  return (
    <div className={cn(`m-auto max-w-100`)}>
      <WhyChooseCards>
        <WhyChooseCardIcon>
          <Activity />
        </WhyChooseCardIcon>
        <WhyChooseCardHeading>Tight Spreads</WhyChooseCardHeading>
        <WhyChooseCardDetails>
          Turn your trading activity into real rewards. Earn Welcoins with every
          executed order and redeem them for cashbacks, bonuses, and exclusive
          perks.
        </WhyChooseCardDetails>
      </WhyChooseCards>
    </div>
  );
}

export const WhyChooseCardsStory: Story = {
  args: {},
  render: WhyChooseCardsComp,
};

function RatingWappers() {
  return (
    <>
      <RatingError />
      <RatingLoading />
    </>
  );
}

export const RatingWappersStory: Story = {
  args: {},
  render: () => <RatingWappers />,
};

function BouncingBoxWappers() {
  return (
    <div className={cn(`max-w-60`)}>
      <BouncingBox>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
        earum, odio nulla illo consequuntur dignissimos maiores? Ad ea
        reiciendis repellat quas quibusdam? Accusamus obcaecati unde eum quam
        excepturi nihil repellendus.
      </BouncingBox>
    </div>
  );
}

export const BouncingBoxWappersStory: Story = {
  args: {},
  render: () => <BouncingBoxWappers />,
};

function AccountTypesWappers() {
  return (
    <AccountType>
      <AccountTypeHeader>
        <AccountTypeIcon>
          <Home />
        </AccountTypeIcon>
        <AccountTypeHeading>
          <AccountTypeTitle>Pro</AccountTypeTitle>
          <AccountTypeDescription>
            Trade with precision. Get institutional-grade conditions with raw
            spreads and superior execution for serious traders.
          </AccountTypeDescription>
        </AccountTypeHeading>
        <PopularAccountType />
      </AccountTypeHeader>

      <AccountTypeCardOfferingList>
        <AccountTypeCardOfferingItem>
          <AccountTypeCardOfferingItemTopic>
            Account Currency
          </AccountTypeCardOfferingItemTopic>
          <AccountTypeCardOfferingItemDetails>
            USD
          </AccountTypeCardOfferingItemDetails>
        </AccountTypeCardOfferingItem>
        <AccountTypeCardOfferingItem>
          <AccountTypeCardOfferingItemTopic>
            Starting Deposit
          </AccountTypeCardOfferingItemTopic>
          <AccountTypeCardOfferingItemDetails>
            $10 USD
          </AccountTypeCardOfferingItemDetails>
        </AccountTypeCardOfferingItem>
        <AccountTypeCardOfferingItem>
          <AccountTypeCardOfferingItemTopic>
            No-Commission Deposit
          </AccountTypeCardOfferingItemTopic>
          <AccountTypeCardOfferingItemDetails>
            MT4, MT5
          </AccountTypeCardOfferingItemDetails>
        </AccountTypeCardOfferingItem>
      </AccountTypeCardOfferingList>

      <AccountTypeFooter>
        <button>lorem</button>
      </AccountTypeFooter>
    </AccountType>
  );
}

export const AccountTypesWappersStory: Story = {
  args: {},
  render: () => <AccountTypesWappers />,
};

function PromotionBonusWappers() {
  return (
    <PromotionBonus offer>
      <PromotionBonusIcon
        className={cn(`rounded-2xl border border-red-500 bg-red-500/10`)}
      >
        <Home className={cn(`text-red-500`)} />
      </PromotionBonusIcon>
      <PromotionBonusTitle>Welcoins</PromotionBonusTitle>
      <PromotionBonusDescription>
        Welcoins are our digital currency, part of our loyalty program. Trade
        and effortlessly earn Welcoins, then exchange them for cash rewards or
        exciting items in Welshop.
      </PromotionBonusDescription>
    </PromotionBonus>
  );
}

export const PromotionBonusWappersStory: Story = {
  args: {},
  render: () => <PromotionBonusWappers />,
};

function EverythingYouNeedWappers() {
  return (
    <>
      <PaymentVisual />
    </>
  );
}

export const EverythingYouNeedWappersStory: Story = {
  args: {},
  render: () => <EverythingYouNeedWappers />,
};

function PassiveIncomeWappers() {
  return (
    <>
      <PassiveIncome popular className={cn(`min-w-60`)}>
        <PassiveIncomeIcon className={cn(`rounded-2xl bg-red-500/20`)}>
          ⛏️
        </PassiveIncomeIcon>
        <PassiveIncomeTitle>Starter</PassiveIncomeTitle>
        <PassiveIncomeReturn>+15%</PassiveIncomeReturn>
        <PassiveIncomeDescription>
          <PassiveIncomeDescriptionItem>Min: $50</PassiveIncomeDescriptionItem>
          <PassiveIncomeDescriptionItem>Max: $500</PassiveIncomeDescriptionItem>
          <PassiveIncomeDescriptionItem>
            0.5% Daily
          </PassiveIncomeDescriptionItem>
          <PassiveIncomeDescriptionItem>
            30 Days Lock
          </PassiveIncomeDescriptionItem>
        </PassiveIncomeDescription>
      </PassiveIncome>
    </>
  );
}

export const PassiveIncomeWappersStory: Story = {
  args: {},
  render: () => <PassiveIncomeWappers />,
};
