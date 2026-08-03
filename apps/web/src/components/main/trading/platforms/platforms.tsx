import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { DownloadIcon, Globe } from "lucide-react";
import type { ComponentProps } from "react";
import { MetaTraderLogo } from "@repo/ui/meta-trader-logo";
import {
  DownloadAndroid,
  DownloadButtons,
  DownloadIOS,
  DownloadMacOS,
  DownloadWindows,
  PlatformCard,
  PlatformCardHeading,
  PlatformCardRecomendation,
  PlatformCardSubHeading,
  StatRow,
  StatRowItem,
  StatRowItemLabel,
  StatRowItemValue,
} from "@/components/main/trading/platforms/page-ui";

export function Platforms() {
  return (
    <Main>
      <PageHero />

      <ChoosePlatform />
    </Main>
  );
}

export function PageHero({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-10 text-center`,
        className,
      )}
      data-slot={`page-hero`}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[56px_56px]`,
        )}
      />

      <div
        className={cn(
          `bg-accent-500/20 border-accent-500/50 text-accent-600 inline-block max-w-max rounded-full border px-6 py-2 text-sm font-semibold`,
        )}
      >
        <DownloadIcon className={cn(`inline-block size-4`)} /> 300+ Instruments
      </div>

      <div className={cn(`space-y-6`)}>
        <h1
          className={cn(
            `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
          )}
        >
          <span>Trading </span>
          <span
            className={cn(
              `from-secondary-500 to-accent-500 bg-linear-to-r bg-clip-text text-transparent`,
            )}
          >
            Platforms{" "}
          </span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Download MetaTrader 4 & MetaTrader 5. <br /> Available on Desktop, Web
          & Mobile.
        </p>

        <div
          className={cn(
            `flex w-full flex-wrap items-center justify-center gap-4`,
          )}
        >
          <Button
            variant={"primary"}
            className={cn(`flex h-14 items-center gap-2 rounded-full px-10`)}
          >
            <span>
              <DownloadIcon className={cn(`inline-block size-5`)} />
            </span>
            <span>Download for all platform</span>
          </Button>

          <Button
            variant={"outline"}
            className={cn(`flex h-14 items-center gap-2 rounded-full px-10`)}
          >
            <span>
              <Globe className={cn(`inline-block size-5`)} />
            </span>
            <span>Webtrader</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ChoosePlatform({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-10 text-center`,
        className,
      )}
      data-slot={`choose-platform`}
      {...props}
    >
      <div className={cn(`space-y-6`)}>
        <h1
          className={cn(
            `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
          )}
        >
          <span>Choose Your Platform </span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Compare MT4 and MT5 features side by side
        </p>

        <TradingPlatforms />
      </div>
    </section>
  );
}

export function TradingPlatforms({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`px-6 py-20`, className)}
      {...props}
      data-slot={`trading-platforms`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <PlatformCard>
          <PlatformCardRecomendation />
          <MetaTraderLogo className={cn(`mt-4 w-full text-emerald-500`)} />
          <PlatformCardHeading>MetaTrader 5</PlatformCardHeading>
          <PlatformCardSubHeading>
            The next generation trading platform
          </PlatformCardSubHeading>
          <StatRow
            className={cn(
              `**:data-[slot=stat-row-item-value]:text-emerald-500`,
            )}
          >
            <StatRowItem>
              <StatRowItemLabel>Programming</StatRowItemLabel>
              <StatRowItemValue>MQL5</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Timeframes</StatRowItemLabel>
              <StatRowItemValue>21</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Order Types</StatRowItemLabel>
              <StatRowItemValue>6 pending</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Hedging</StatRowItemLabel>
              <StatRowItemValue>Allowed</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Economic Cal.</StatRowItemLabel>
              <StatRowItemValue>Built-in</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Copy Trading</StatRowItemLabel>
              <StatRowItemValue>Supported</StatRowItemValue>
            </StatRowItem>
          </StatRow>

          <DownloadButtons>
            <DownloadWindows className={cn(`bg-emerald-500`)} />
            <DownloadMacOS className={cn(`bg-emerald-500`)} />
            <DownloadIOS className={cn(`bg-emerald-500`)} />
          </DownloadButtons>
        </PlatformCard>

        <PlatformCard>
          <MetaTraderLogo className={cn(`mt-4 w-full text-indigo-500`)} />
          <PlatformCardHeading>MetaTrader 4</PlatformCardHeading>
          <PlatformCardSubHeading>
            The industry standard platform
          </PlatformCardSubHeading>
          <StatRow
            className={cn(`**:data-[slot=stat-row-item-value]:text-indigo-500`)}
          >
            <StatRowItem>
              <StatRowItemLabel>Programming</StatRowItemLabel>
              <StatRowItemValue>MQL5</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Timeframes</StatRowItemLabel>
              <StatRowItemValue>9</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Order Types</StatRowItemLabel>
              <StatRowItemValue>4 pending</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Hedging</StatRowItemLabel>
              <StatRowItemValue>Allowed</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Custom Indicators</StatRowItemLabel>
              <StatRowItemValue>Limited</StatRowItemValue>
            </StatRowItem>
            <StatRowItem>
              <StatRowItemLabel>Copy Trading</StatRowItemLabel>
              <StatRowItemValue>Available</StatRowItemValue>
            </StatRowItem>
          </StatRow>

          <DownloadButtons>
            <DownloadWindows className={cn(`bg-indigo-500`)} />
            <DownloadMacOS className={cn(`bg-indigo-500`)} />
            <DownloadAndroid className={cn(`bg-indigo-500`)} />
          </DownloadButtons>
        </PlatformCard>
      </div>
    </section>
  );
}
