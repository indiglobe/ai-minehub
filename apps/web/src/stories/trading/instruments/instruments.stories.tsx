import {
  CryptocurrencyTrading,
  ForexTrading,
  Instruments,
  StockTrading,
} from "@/components/main/trading/instruments/instruments";
import {
  InstrumentStatCard,
  SectionDescription,
  SectionHeading,
  SectionIcon,
  SectionMetadata,
  SectionTitle,
  InstrumentStatText,
  InstrumentStatTitle,
} from "@/components/main/trading/instruments/page-ui";
import type {
  TypedMetaOptions,
  TypedStoryOptions,
} from "@/integrations/storybook/sb.types";
import { cn } from "@repo/styles/cn";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home } from "lucide-react";

function InstrumentsComp() {
  return <Instruments />;
}

const meta: Meta<typeof InstrumentsComp> & TypedMetaOptions = {
  component: InstrumentsComp,
};

export default meta;

type Story = StoryObj<typeof InstrumentsComp> & TypedStoryOptions;

export const InstrumentsCompStory: Story = {
  args: {},
};

function SectionMetadataComp() {
  return (
    <SectionMetadata>
      <SectionIcon>
        <Home />
      </SectionIcon>
      <SectionHeading>
        <SectionTitle>Some title</SectionTitle>
        <SectionDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus,
          fugiat.
        </SectionDescription>
      </SectionHeading>
    </SectionMetadata>
  );
}

export const SectionMetadataCompStory: Story = {
  args: {},
  render: SectionMetadataComp,
};

export const ForexTradingCompStory: Story = {
  args: {},
  render: ForexTrading,
};

export const CryptocurrencyTradingCompStory: Story = {
  args: {},
  render: CryptocurrencyTrading,
};

export const StockTradingCompStory: Story = {
  args: {},
  render: StockTrading,
};

function InstrumentStatCardComp() {
  return (
    <div className={`min-w-200`}>
      <InstrumentStatCard className={cn(``)}>
        <InstrumentStatTitle className={cn(``)}>1:10</InstrumentStatTitle>
        <InstrumentStatText className={cn(``)}>Leverage</InstrumentStatText>
      </InstrumentStatCard>
    </div>
  );
}

export const InstrumentStatCardCompStory: Story = {
  args: {},
  parameters: { layout: "centered" },
  render: InstrumentStatCardComp,
};
