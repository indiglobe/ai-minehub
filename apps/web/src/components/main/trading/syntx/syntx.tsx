import Main from "@/components/main/main.tsx";
import { cn } from "@repo/styles/cn";
import {
  ArrowLeftRight,
  Bitcoin,
  ChartColumn,
  Clock,
  DollarSign,
  Gem,
  Grid3x3,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { ComponentProps } from "react";
import { Separator } from "@repo/ui/separator";
import {
  HowSyntxWorksCard,
  HowSyntxWorksCardDescription,
  HowSyntxWorksCardHeading,
  HowSyntxWorksCardIcon,
  IndeciesTableTag,
  StatCard,
  StatCardDescription,
  StatCardHeading,
  StatCardIcon,
} from "@/components/main/trading/syntx/page-ui";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";
import { Button } from "@repo/ui/button";
import {
  useCommodityIndeciesMarket,
  useCryptoIndeciesMarket,
  useForexIndeciesMarket,
  useStockIndeciesMarket,
} from "@/hooks/use-syntax";

export function SyntX() {
  return (
    <Main>
      <PageHero />
      <HowSyntxWorks />
      <AvailableSyntxIndecies />
      <StatCardList />
      <BottomCTA />
      {/* <ChatWithExpert /> */}
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
          `inline-block max-w-max rounded-full border border-purple-500/50 bg-purple-500/10 px-6 py-2 text-sm font-semibold text-purple-600`,
        )}
      >
        <Grid3x3 className={cn(`inline-block size-4`)} /> Exclusive Product
      </div>

      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>SyntX </span>
        <span
          className={cn(
            `bg-linear-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent`,
          )}
        >
          Synthetic Indices
        </span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Our proprietary indices replicate real market movements. Trade Forex,
        Crypto, Stocks & Commodities — 24 hours, 7 days a week.
      </p>

      <div
        className={cn(
          `w-full gap-4 max-md:grid max-md:grid-cols-2 md:flex md:flex-wrap md:items-stretch md:justify-center`,
        )}
      >
        <div className={cn(`px-8 py-2`)}>
          <h2 className={cn(`text-2xl font-black`)}>24/7</h2>
          <p className={cn(`text-foreground/50 text-xs uppercase md:text-sm`)}>
            Trading Hours
          </p>
        </div>

        <Separator
          orientation="vertical"
          className={cn(`w-px bg-slate-600 max-md:hidden`)}
        />

        <div className={cn(`px-8 py-2`)}>
          <h2 className={cn(`text-2xl font-black`)}>0.0</h2>
          <p className={cn(`text-foreground/50 text-xs uppercase md:text-sm`)}>
            Pips Spread
          </p>
        </div>

        <Separator
          orientation="vertical"
          className={cn(`w-px bg-slate-600 max-md:hidden`)}
        />

        <div className={cn(`px-8 py-2`)}>
          <h2 className={cn(`text-2xl font-black`)}>0%</h2>
          <p className={cn(`text-foreground/50 text-xs uppercase md:text-sm`)}>
            Gaps
          </p>
        </div>

        <Separator
          orientation="vertical"
          className={cn(`w-px bg-slate-600 max-md:hidden`)}
        />

        <div className={cn(`px-8 py-2`)}>
          <h2 className={cn(`text-2xl font-black`)}>1:100</h2>
          <p className={cn(`text-foreground/50 text-xs uppercase md:text-sm`)}>
            Leverage
          </p>
        </div>
      </div>
    </section>
  );
}

export function HowSyntxWorks({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-10 text-center`,
        className,
      )}
      data-slot={`how-syntx-works`}
      {...props}
    >
      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>How </span>
        <span>SyntX Works</span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Our proprietary indices replicate real market movements. Trade Forex,
        Crypto, Stocks & Commodities — 24 hours, 7 days a week.
      </p>

      <div
        className={cn(
          `flex flex-col items-stretch justify-center gap-4 text-left lg:flex-row`,
        )}
      >
        <HowSyntxWorksCard>
          <HowSyntxWorksCardIcon>
            <ArrowLeftRight />
          </HowSyntxWorksCardIcon>
          <HowSyntxWorksCardHeading>Price Mirroring</HowSyntxWorksCardHeading>
          <HowSyntxWorksCardDescription>
            SyntX indices track real market prices from multiple liquidity
            providers, ensuring accurate price discovery at all times.
          </HowSyntxWorksCardDescription>
        </HowSyntxWorksCard>

        <HowSyntxWorksCard>
          <HowSyntxWorksCardIcon>
            <Clock />
          </HowSyntxWorksCardIcon>
          <HowSyntxWorksCardHeading>24/7 Trading</HowSyntxWorksCardHeading>
          <HowSyntxWorksCardDescription>
            Trade even when traditional markets are closed. No gaps, no requotes
            — pure execution around the clock.
          </HowSyntxWorksCardDescription>
        </HowSyntxWorksCard>

        <HowSyntxWorksCard>
          <HowSyntxWorksCardIcon>
            <ShieldCheck />
          </HowSyntxWorksCardIcon>
          <HowSyntxWorksCardHeading>Risk Management</HowSyntxWorksCardHeading>
          <HowSyntxWorksCardDescription>
            Advanced stop-loss and take-profit with guaranteed execution no
            matter the market conditions.
          </HowSyntxWorksCardDescription>
        </HowSyntxWorksCard>
      </div>
    </section>
  );
}

export function AvailableSyntxIndecies({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 bg-slate-400/20 py-10 dark:bg-slate-700/20`,
        className,
      )}
      data-slot={`available-syntx-indecies`}
      {...props}
    >
      <div data-slot={`headings`} className={cn(`space-y-6 text-center`)}>
        <h1
          className={cn(
            `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
          )}
        >
          <span>Available SyntX Indices </span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 mx-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Choose from 50+ synthetic indices across all asset classes
        </p>
      </div>

      <div className={cn(`space-y-8`)}>
        <CryptoIndeciesTable />

        <ForexIndeciesTable />

        <StockIndeciesTable />

        <CommodityIndeciesTable />
      </div>
    </section>
  );
}

export function CryptoIndeciesTable({
  className,
  ...props
}: ComponentProps<"div">) {
  const { assets } = useCryptoIndeciesMarket([
    {
      asset: "SyntX BTC",
      price: 84250,
      change24h: 2.14,
      hours: "24/7",
    },
    {
      asset: "SyntX ETH",
      price: 3520,
      change24h: -0.82,
      hours: "24/7",
    },
    {
      asset: "SyntX BNB",
      price: 423.1,
      change24h: 1.55,
      hours: "24/7",
    },
    {
      asset: "SyntX SOL",
      price: 148.5,
      change24h: 3.87,
      hours: "24/7",
    },
  ]);

  return (
    <div className={cn(`space-y-4`, className)} {...props}>
      <div>
        <IndeciesTableTag className={cn(`text-purple-500`)}>
          <Bitcoin className={cn(`inline-block size-4`)} /> Crypto Indices
        </IndeciesTableTag>
      </div>

      <div>
        <Table
          className={cn(
            `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
          )}
        >
          <Thead className={cn(`uppercase`)}>
            <Tr
              className={cn(
                `text-background/50 dark:text-foreground/50 bg-slate-900 text-left uppercase *:font-normal dark:bg-slate-800`,
              )}
            >
              <Th>Index name</Th>
              <Th>Current Price</Th>
              <Th>24h Change</Th>
              <Th>Hours</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(`*:even:bg-slate-800/30`)}>
            {assets.map(({ asset, change24h, hours, price }) => {
              return (
                <Tr
                  key={asset}
                  className={cn(
                    `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                  )}
                >
                  <Td
                    data-table-cell="asset"
                    className={cn(`text-xs font-medium md:text-sm`)}
                  >
                    {asset}
                  </Td>
                  <Td
                    data-table-cell="price"
                    data-table-cell-amount={price}
                    className={cn(`flex items-center text-xs md:text-sm`)}
                  >
                    <DollarSign className={cn(`inline-block size-4`)} />{" "}
                    {numberFormatter(price)}
                  </Td>
                  <Td data-table-cell="change24h">
                    <span
                      className={cn(
                        `inline-block rounded-sm px-2 py-1 font-mono text-sm`,
                        {
                          "bg-red-500/15 text-red-500 dark:bg-red-600/15 dark:text-red-600":
                            change24h < 0,
                          "bg-green-500/15 text-green-500 dark:bg-green-600/15 dark:text-green-600":
                            change24h > 0,
                          "bg-blue-500/15 text-blue-500 dark:bg-blue-600/15 dark:text-blue-600":
                            change24h === 0,
                        },
                      )}
                    >
                      {change24h === 0 && "0%"}
                      {change24h < 0 && `${change24h}%`}
                      {change24h > 0 && `+${change24h}%`}
                    </span>
                  </Td>
                  <Td data-table-cell="hours" className={cn(``)}>
                    <span
                      className={cn(
                        `flex max-w-max items-center gap-2 rounded-sm border border-purple-500/50 bg-purple-500/10 px-2 py-0.5 text-sm text-purple-500`,
                      )}
                    >
                      <Clock className={cn(`inline-block size-3`)} /> {hours}
                    </span>
                  </Td>
                  <Td data-table-cell="action">
                    <Button
                      corner={"rounded"}
                      variant={"ghost"}
                      className={cn(
                        `bg-purple-500 text-sm text-white hover:bg-purple-600`,
                      )}
                    >
                      Trade
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export function ForexIndeciesTable({
  className,
  ...props
}: ComponentProps<"div">) {
  const { assets } = useForexIndeciesMarket([
    {
      asset: "SyntX USD",
      price: 105.2,
      change24h: 0.15,
      hours: "24/7",
    },
    {
      asset: "SyntX EUR",
      price: 108.5,
      change24h: 0.08,
      hours: "24/7",
    },
    {
      asset: "SyntX GBP",
      price: 128.4,
      change24h: -0.12,
      hours: "24/7",
    },
    {
      asset: "SyntX JPY",
      price: 72.5,
      change24h: 0.05,
      hours: "24/7",
    },
  ]);

  return (
    <div className={cn(`space-y-4`, className)} {...props}>
      <div>
        <IndeciesTableTag className={cn(`text-secondary-500`)}>
          <RefreshCcw className={cn(`inline-block size-4`)} /> Forex Indices
        </IndeciesTableTag>
      </div>

      <div>
        <Table
          className={cn(
            `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
          )}
        >
          <Thead className={cn(`uppercase`)}>
            <Tr
              className={cn(
                `text-background/50 dark:text-foreground/50 bg-slate-900 text-left uppercase *:font-normal dark:bg-slate-800`,
              )}
            >
              <Th>Index name</Th>
              <Th>Current Price</Th>
              <Th>24h Change</Th>
              <Th>Hours</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(`*:even:bg-slate-800/30`)}>
            {assets.map(({ asset, change24h, hours, price }) => {
              return (
                <Tr
                  key={asset}
                  className={cn(
                    `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                  )}
                >
                  <Td
                    data-table-cell="asset"
                    className={cn(`text-xs font-medium md:text-sm`)}
                  >
                    {asset}
                  </Td>
                  <Td
                    data-table-cell="price"
                    data-table-cell-amount={price}
                    className={cn(`flex items-center text-xs md:text-sm`)}
                  >
                    <DollarSign className={cn(`inline-block size-4`)} />{" "}
                    {numberFormatter(price)}
                  </Td>
                  <Td data-table-cell="change24h">
                    <span
                      className={cn(
                        `inline-block rounded-sm px-2 py-1 font-mono text-sm`,
                        {
                          "bg-red-500/15 text-red-500 dark:bg-red-600/15 dark:text-red-600":
                            change24h < 0,
                          "bg-green-500/15 text-green-500 dark:bg-green-600/15 dark:text-green-600":
                            change24h > 0,
                          "bg-blue-500/15 text-blue-500 dark:bg-blue-600/15 dark:text-blue-600":
                            change24h === 0,
                        },
                      )}
                    >
                      {change24h === 0 && "0%"}
                      {change24h < 0 && `${change24h}%`}
                      {change24h > 0 && `+${change24h}%`}
                    </span>
                  </Td>
                  <Td data-table-cell="hours" className={cn(``)}>
                    <span
                      className={cn(
                        `flex max-w-max items-center gap-2 rounded-sm border border-purple-500/50 bg-purple-500/10 px-2 py-0.5 text-sm text-purple-500`,
                      )}
                    >
                      <Clock className={cn(`inline-block size-3`)} /> {hours}
                    </span>
                  </Td>
                  <Td data-table-cell="action">
                    <Button
                      corner={"rounded"}
                      variant={"ghost"}
                      className={cn(
                        `bg-purple-500 text-sm text-white hover:bg-purple-600`,
                      )}
                    >
                      Trade
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export function StockIndeciesTable({
  className,
  ...props
}: ComponentProps<"div">) {
  const { assets } = useStockIndeciesMarket([
    {
      asset: "SyntX US500",
      price: 5420.5,
      change24h: 0.55,
      hours: "24/7",
    },
    {
      asset: "SyntX NAS100",
      price: 18850.0,
      change24h: 0.72,
      hours: "24/7",
    },
    {
      asset: "SyntX DOW30",
      price: 39142.0,
      change24h: 0.33,
      hours: "24/7",
    },
    {
      asset: "SyntX GER40",
      price: 17850.0,
      change24h: -0.25,
      hours: "24/7",
    },
  ]);

  return (
    <div className={cn(`space-y-4`, className)} {...props}>
      <div>
        <IndeciesTableTag className={cn(`text-accent-500`)}>
          <ChartColumn className={cn(`inline-block size-4`)} /> Stock Indices
        </IndeciesTableTag>
      </div>

      <div>
        <Table
          className={cn(
            `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
          )}
        >
          <Thead className={cn(`uppercase`)}>
            <Tr
              className={cn(
                `text-background/50 dark:text-foreground/50 bg-slate-900 text-left uppercase *:font-normal dark:bg-slate-800`,
              )}
            >
              <Th>Index name</Th>
              <Th>Current Price</Th>
              <Th>24h Change</Th>
              <Th>Hours</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(`*:even:bg-slate-800/30`)}>
            {assets.map(({ asset, change24h, hours, price }) => {
              return (
                <Tr
                  key={asset}
                  className={cn(
                    `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                  )}
                >
                  <Td
                    data-table-cell="asset"
                    className={cn(`text-xs font-medium md:text-sm`)}
                  >
                    {asset}
                  </Td>
                  <Td
                    data-table-cell="price"
                    data-table-cell-amount={price}
                    className={cn(`flex items-center text-xs md:text-sm`)}
                  >
                    <DollarSign className={cn(`inline-block size-4`)} />{" "}
                    {numberFormatter(price)}
                  </Td>
                  <Td data-table-cell="change24h">
                    <span
                      className={cn(
                        `inline-block rounded-sm px-2 py-1 font-mono text-sm`,
                        {
                          "bg-red-500/15 text-red-500 dark:bg-red-600/15 dark:text-red-600":
                            change24h < 0,
                          "bg-green-500/15 text-green-500 dark:bg-green-600/15 dark:text-green-600":
                            change24h > 0,
                          "bg-blue-500/15 text-blue-500 dark:bg-blue-600/15 dark:text-blue-600":
                            change24h === 0,
                        },
                      )}
                    >
                      {change24h === 0 && "0%"}
                      {change24h < 0 && `${change24h}%`}
                      {change24h > 0 && `+${change24h}%`}
                    </span>
                  </Td>
                  <Td data-table-cell="hours" className={cn(``)}>
                    <span
                      className={cn(
                        `flex max-w-max items-center gap-2 rounded-sm border border-purple-500/50 bg-purple-500/10 px-2 py-0.5 text-sm text-purple-500`,
                      )}
                    >
                      <Clock className={cn(`inline-block size-3`)} /> {hours}
                    </span>
                  </Td>
                  <Td data-table-cell="action">
                    <Button
                      corner={"rounded"}
                      variant={"ghost"}
                      className={cn(
                        `bg-purple-500 text-sm text-white hover:bg-purple-600`,
                      )}
                    >
                      Trade
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export function CommodityIndeciesTable({
  className,
  ...props
}: ComponentProps<"div">) {
  const { assets } = useCommodityIndeciesMarket([
    {
      asset: "SyntX GOLD",
      price: 2330.0,
      change24h: 0.38,
      hours: "24/7",
    },
    {
      asset: "SyntX SILVER",
      price: 28.5,
      change24h: 0.85,
      hours: "24/7",
    },
    {
      asset: "SyntX OIL",
      price: 78.42,
      change24h: -0.44,
      hours: "24/7",
    },
    {
      asset: "SyntX NATGAS",
      price: 2.85,
      change24h: 1.52,
      hours: "24/7",
    },
  ]);

  return (
    <div className={cn(`space-y-4`, className)} {...props}>
      <div>
        <IndeciesTableTag className={cn(`text-pink-500`)}>
          <ChartColumn className={cn(`inline-block size-4`)} /> Commodity
          Indices
        </IndeciesTableTag>
      </div>

      <div>
        <Table
          className={cn(
            `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
          )}
        >
          <Thead className={cn(`uppercase`)}>
            <Tr
              className={cn(
                `text-background/50 dark:text-foreground/50 bg-slate-900 text-left uppercase *:font-normal dark:bg-slate-800`,
              )}
            >
              <Th>Index name</Th>
              <Th>Current Price</Th>
              <Th>24h Change</Th>
              <Th>Hours</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(`*:even:bg-slate-800/30`)}>
            {assets.map(({ asset, change24h, hours, price }) => {
              return (
                <Tr
                  key={asset}
                  className={cn(
                    `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                  )}
                >
                  <Td
                    data-table-cell="asset"
                    className={cn(`text-xs font-medium md:text-sm`)}
                  >
                    {asset}
                  </Td>
                  <Td
                    data-table-cell="price"
                    data-table-cell-amount={price}
                    className={cn(`flex items-center text-xs md:text-sm`)}
                  >
                    <DollarSign className={cn(`inline-block size-4`)} />{" "}
                    {numberFormatter(price)}
                  </Td>
                  <Td data-table-cell="change24h">
                    <span
                      className={cn(
                        `inline-block rounded-sm px-2 py-1 font-mono text-sm`,
                        {
                          "bg-red-500/15 text-red-500 dark:bg-red-600/15 dark:text-red-600":
                            change24h < 0,
                          "bg-green-500/15 text-green-500 dark:bg-green-600/15 dark:text-green-600":
                            change24h > 0,
                          "bg-blue-500/15 text-blue-500 dark:bg-blue-600/15 dark:text-blue-600":
                            change24h === 0,
                        },
                      )}
                    >
                      {change24h === 0 && "0%"}
                      {change24h < 0 && `${change24h}%`}
                      {change24h > 0 && `+${change24h}%`}
                    </span>
                  </Td>
                  <Td data-table-cell="hours" className={cn(``)}>
                    <span
                      className={cn(
                        `flex max-w-max items-center gap-2 rounded-sm border border-purple-500/50 bg-purple-500/10 px-2 py-0.5 text-sm text-purple-500`,
                      )}
                    >
                      <Clock className={cn(`inline-block size-3`)} /> {hours}
                    </span>
                  </Td>
                  <Td data-table-cell="action">
                    <Button
                      corner={"rounded"}
                      variant={"ghost"}
                      className={cn(
                        `bg-purple-500 text-sm text-white hover:bg-purple-600`,
                      )}
                    >
                      Trade
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
}

export function StatCardList({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding relative space-y-6`, className)}
      data-slot={`stat-card-list`}
      {...props}
    >
      <div
        className={cn(
          `grid grid-cols-1 gap-4 py-20 md:grid-cols-2 lg:grid-cols-4`,
        )}
      >
        <StatCard>
          <StatCardIcon>
            <Clock />
          </StatCardIcon>
          <StatCardHeading>24/7 Access</StatCardHeading>
          <StatCardDescription>
            Trade any time — even on weekends and holidays
          </StatCardDescription>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <Zap />
          </StatCardIcon>
          <StatCardHeading>Instant Execution</StatCardHeading>
          <StatCardDescription>
            No requotes, executed at exact requested price
          </StatCardDescription>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <Gem />
          </StatCardIcon>
          <StatCardHeading>Tight Spreads</StatCardHeading>
          <StatCardDescription>
            Spreads starting from 0.0 pips
          </StatCardDescription>
        </StatCard>

        <StatCard>
          <StatCardIcon>
            <ShieldCheck />
          </StatCardIcon>
          <StatCardHeading>No Gaps</StatCardHeading>
          <StatCardDescription>
            Advanced slippage protection built-in
          </StatCardDescription>
        </StatCard>
      </div>
    </section>
  );
}

export function BottomCTA({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding bg-slate-400/20 py-20 dark:bg-slate-700/20`,
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          `flex flex-col gap-4 rounded-2xl border border-slate-400/50 bg-slate-500/10 p-20 lg:flex-row lg:items-center dark:border-slate-700/50`,
        )}
      >
        <div className={cn(`grow space-y-4`)}>
          <h2
            className={cn(
              `text-center text-2xl font-semibold md:text-4xl lg:text-left`,
            )}
          >
            Get 50% Bonus on First Deposit
          </h2>
          <p
            className={cn(
              `text-foreground/50 text-center text-xs md:text-sm lg:text-left`,
            )}
          >
            Start trading SyntX indices today and get a 50% deposit bonus up to
            $5,000.
          </p>
        </div>
        <div>
          <Button
            className={cn(
              `mx-auto h-16 rounded-full px-10 max-lg:flex max-md:w-full`,
            )}
          >
            <span>
              <Rocket className={cn(`inline-block size-5`)} />
            </span>
            <span className={cn(`text-lg`)}>Start Trading</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function numberFormatter(number: number) {
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formater.format(number);
}
