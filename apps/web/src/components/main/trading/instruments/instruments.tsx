import { cn } from "@repo/styles/cn";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";
import {
  BadgeDollarSign,
  Bitcoin,
  Grid3x3,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import type { ComponentProps } from "react";
import {
  SectionDescription,
  SectionHeading,
  SectionIcon,
  SectionMetadata,
  InstrumentStatCard,
  InstrumentStatText,
  InstrumentStatTitle,
  SectionTitle,
} from "@/components/main/trading/instruments/page-ui";
import { Button } from "@repo/ui/button";
import { useForex } from "@/hooks/use-forex";
import { useCrypto } from "@/hooks/use-crypto";
import { useStock } from "@/hooks/use-stock";

export function Instruments() {
  return (
    <>
      <PageHeading />
      <ForexTrading />
      <CryptocurrencyTrading />
      <StockTrading />
      <ChatWithExpert />
    </>
  );
}

export function PageHeading({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative space-y-6 py-10 text-center`,
        className,
      )}
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
        <Grid3x3 className={cn(`inline-block size-4`)} /> 300+ Instruments
      </div>

      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>Trading </span>
        <span
          className={cn(
            `from-accent-500 to-secondary-500 bg-linear-to-r bg-clip-text text-transparent`,
          )}
        >
          Instruments{" "}
        </span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Trade Forex, Crypto, Stocks & Commodities. One account, unlimited
        possibilities.
      </p>
    </section>
  );
}

export function ForexTrading() {
  const { pairs } = useForex([
    {
      pair: "EUR/USD",
      bid: 1.0842,
      ask: 1.0843,
      change: 0.13,
    },
    {
      pair: "GBP/USD",
      bid: 1.2645,
      ask: 1.2647,
      change: -0.21,
    },
    {
      pair: "USD/JPY",
      bid: 149.85,
      ask: 149.87,
      change: 0.08,
    },
    {
      pair: "USD/CHF",
      bid: 0.8842,
      ask: 0.8845,
      change: -0.05,
    },
    {
      pair: "AUD/USD",
      bid: 0.6542,
      ask: 0.6545,
      change: 0.32,
    },
    {
      pair: "USD/CAD",
      bid: 1.3542,
      ask: 1.3545,
      change: -0.15,
    },
  ]);

  return (
    <section
      className={cn(
        `default-padding space-y-4 bg-slate-200 py-20 dark:bg-slate-900`,
      )}
    >
      <div>
        <SectionMetadata>
          <SectionIcon>
            <BadgeDollarSign />
          </SectionIcon>
          <SectionHeading>
            <SectionTitle>Forex Trading</SectionTitle>
            <SectionDescription>
              Trade 50+ major, minor and exotic currency pairs
            </SectionDescription>
          </SectionHeading>
        </SectionMetadata>
      </div>

      <div
        className={cn(
          `flex w-full flex-wrap items-center justify-center gap-4 py-6 *:grow *:basis-80 lg:py-10`,
        )}
      >
        <InstrumentStatCard>
          <InstrumentStatTitle>0.0</InstrumentStatTitle>
          <InstrumentStatText>Pips Spread</InstrumentStatText>
        </InstrumentStatCard>
        <InstrumentStatCard>
          <InstrumentStatTitle>1:1000</InstrumentStatTitle>
          <InstrumentStatText>Max Leverage</InstrumentStatText>
        </InstrumentStatCard>
        <InstrumentStatCard>
          <InstrumentStatTitle>24/5</InstrumentStatTitle>
          <InstrumentStatText>Trading Hours</InstrumentStatText>
        </InstrumentStatCard>
        <InstrumentStatCard>
          <InstrumentStatTitle>50+</InstrumentStatTitle>
          <InstrumentStatText>Currency Pairs</InstrumentStatText>
        </InstrumentStatCard>
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
                `text-background dark:text-foreground bg-slate-900 text-left dark:bg-slate-800`,
              )}
            >
              <Th>Pair</Th>
              <Th>Bid</Th>
              <Th>Ask</Th>
              <Th>Change</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(`*:even:bg-slate-800/30`)}>
            {pairs.map(({ pair, ask, bid, change }) => {
              return (
                <Tr
                  key={pair}
                  className={cn(
                    `*:data-[table-cell=ask]:text-sm *:data-[table-cell=bid]:text-sm *:data-[table-cell=change]:text-sm`,
                  )}
                >
                  <Td data-table-cell="pair" className={cn(`font-medium`)}>
                    {pair}
                  </Td>
                  <Td data-table-cell="bid">{bid}</Td>
                  <Td data-table-cell="ask">{ask}</Td>
                  <Td data-table-cell="change">
                    <span
                      className={cn(
                        `inline-block rounded-sm border px-2 py-1`,
                        {
                          "border-red-500 bg-red-500/15 text-red-500 dark:border-red-600 dark:bg-red-600/15 dark:text-red-600":
                            change < 0,
                          "border-green-500 bg-green-500/15 text-green-500 dark:border-green-600 dark:bg-green-600/15 dark:text-green-600":
                            change > 0,
                          "border-blue-500 bg-blue-500/15 text-blue-500 dark:border-blue-600 dark:bg-blue-600/15 dark:text-blue-600":
                            change === 0,
                        },
                      )}
                    >
                      {change === 0 && "0%"}
                      {change < 0 && `${change}%`}
                      {change > 0 && `+${change}%`}
                    </span>
                  </Td>
                  <Td data-table-cell="action">
                    <Button
                      corner={"rounded"}
                      variant={"outline"}
                      className={cn(`bg-transparent text-sm`)}
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
    </section>
  );
}

export function CryptocurrencyTrading() {
  const { assets } = useCrypto([
    {
      asset: "BTC/USD",
      price: 84250.0,
      high24h: 86100.0,
      change: 2.14,
    },
    {
      asset: "ETH/USD",
      price: 3520.0,
      high24h: 3610.0,
      change: -0.82,
    },
    {
      asset: "XRP/USD",
      price: 0.5842,
      high24h: 0.612,
      change: -1.24,
    },
    {
      asset: "SOL/USD",
      price: 148.5,
      high24h: 158.2,
      change: 3.87,
    },
    {
      asset: "BNB/USD",
      price: 423.1,
      high24h: 445.6,
      change: 1.55,
    },
    {
      asset: "ADA/USD",
      price: 0.5842,
      high24h: 0.612,
      change: -0.45,
    },
  ]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2,
    }).format(value);

  return (
    <section className={cn("default-padding space-y-4 py-20")}>
      <div>
        <SectionMetadata>
          <SectionIcon>
            <Bitcoin />
          </SectionIcon>

          <SectionHeading>
            <SectionTitle>Cryptocurrency Trading</SectionTitle>

            <SectionDescription>
              Trade the world's most popular cryptocurrencies with tight spreads
            </SectionDescription>
          </SectionHeading>
        </SectionMetadata>
      </div>

      <div
        className={cn(
          "flex w-full flex-wrap items-center justify-center gap-4 py-6 *:grow *:basis-80 lg:py-10",
        )}
      >
        <InstrumentStatCard>
          <InstrumentStatTitle>0.01%</InstrumentStatTitle>
          <InstrumentStatText>Trading Fee</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>1:10</InstrumentStatTitle>
          <InstrumentStatText>Leverage</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>24/7</InstrumentStatTitle>
          <InstrumentStatText>Trading Hours</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>100+</InstrumentStatTitle>
          <InstrumentStatText>Crypto Assets</InstrumentStatText>
        </InstrumentStatCard>
      </div>

      <div>
        <Table
          className={cn(
            "w-full overflow-hidden rounded-xl border border-slate-700",
          )}
        >
          <Thead className="uppercase">
            <Tr
              className={cn(
                "text-background dark:text-foreground bg-slate-900 text-left dark:bg-slate-800",
              )}
            >
              <Th>Asset</Th>
              <Th>Price</Th>
              <Th>24h High</Th>
              <Th>24h Change</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className="*:even:bg-slate-800/30">
            {assets.map(({ asset, price, high24h, change }) => (
              <Tr
                key={asset}
                className={cn(
                  "*:data-[table-cell=change]:text-sm *:data-[table-cell=high]:text-sm *:data-[table-cell=price]:text-sm",
                )}
              >
                <Td data-table-cell="asset" className={cn("font-medium")}>
                  {asset}
                </Td>

                <Td data-table-cell="price">{formatPrice(price)}</Td>

                <Td data-table-cell="high">{formatPrice(high24h)}</Td>

                <Td data-table-cell="change">
                  <span
                    className={cn("inline-block rounded-sm border px-2 py-1", {
                      "border-red-500 bg-red-500/15 text-red-500": change < 0,
                      "border-green-500 bg-green-500/15 text-green-500":
                        change > 0,
                      "border-blue-500 bg-blue-500/15 text-blue-500":
                        change === 0,
                    })}
                  >
                    {change > 0 && `+${change}%`}
                    {change < 0 && `${change}%`}
                    {change === 0 && "0%"}
                  </span>
                </Td>

                <Td data-table-cell="action">
                  <Button
                    corner="rounded"
                    variant="outline"
                    className="bg-transparent text-sm"
                  >
                    Trade
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </section>
  );
}

export function StockTrading() {
  const { stocks } = useStock([
    {
      company: "AAPL",
      price: 178.5,
      dayHigh: 180.2,
      change: 1.24,
    },
    {
      company: "GOOGL",
      price: 142.8,
      dayHigh: 144.5,
      change: 0.85,
    },
    {
      company: "MSFT",
      price: 378.5,
      dayHigh: 382.1,
      change: 1.56,
    },
    {
      company: "AMZN",
      price: 178.2,
      dayHigh: 180.8,
      change: 2.14,
    },
    {
      company: "TSLA",
      price: 198.5,
      dayHigh: 205.2,
      change: -1.85,
    },
    {
      company: "NVDA",
      price: 785.2,
      dayHigh: 798.5,
      change: 3.45,
    },
  ]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <section
      className={cn(
        "default-padding space-y-4 bg-slate-200 py-20 dark:bg-slate-900",
      )}
    >
      <div>
        <SectionMetadata>
          <SectionIcon>
            <TrendingUp />
          </SectionIcon>

          <SectionHeading>
            <SectionTitle>Stock Trading</SectionTitle>

            <SectionDescription>
              Trade leading global stocks with competitive pricing
            </SectionDescription>
          </SectionHeading>
        </SectionMetadata>
      </div>

      <div
        className={cn(
          "flex w-full flex-wrap items-center justify-center gap-4 py-6 *:grow *:basis-80 lg:py-10",
        )}
      >
        <InstrumentStatCard>
          <InstrumentStatTitle>0.01%</InstrumentStatTitle>
          <InstrumentStatText>Commission</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>1:20</InstrumentStatTitle>
          <InstrumentStatText>Leverage</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>24/5</InstrumentStatTitle>
          <InstrumentStatText>Trading Hours</InstrumentStatText>
        </InstrumentStatCard>

        <InstrumentStatCard>
          <InstrumentStatTitle>150+</InstrumentStatTitle>
          <InstrumentStatText>Stocks</InstrumentStatText>
        </InstrumentStatCard>
      </div>

      <div>
        <Table
          className={cn(
            "w-full overflow-hidden rounded-xl border border-slate-700",
          )}
        >
          <Thead className="uppercase">
            <Tr
              className={cn(
                "text-background dark:text-foreground bg-slate-900 text-left dark:bg-slate-800",
              )}
            >
              <Th>Company</Th>
              <Th>Price</Th>
              <Th>Day High</Th>
              <Th>Change</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody className="*:even:bg-slate-800/30">
            {stocks.map(({ company, price, dayHigh, change }) => (
              <Tr
                key={company}
                className={cn(
                  "*:data-[table-cell=change]:text-sm *:data-[table-cell=high]:text-sm *:data-[table-cell=price]:text-sm",
                )}
              >
                <Td data-table-cell="company" className="font-medium">
                  {company}
                </Td>

                <Td data-table-cell="price">{formatPrice(price)}</Td>

                <Td data-table-cell="high">{formatPrice(dayHigh)}</Td>

                <Td data-table-cell="change">
                  <span
                    className={cn("inline-block rounded-sm border px-2 py-1", {
                      "border-red-500 bg-red-500/15 text-red-500": change < 0,
                      "border-green-500 bg-green-500/15 text-green-500":
                        change > 0,
                      "border-blue-500 bg-blue-500/15 text-blue-500":
                        change === 0,
                    })}
                  >
                    {change > 0 && `+${change}%`}
                    {change < 0 && `${change}%`}
                    {change === 0 && "0%"}
                  </span>
                </Td>

                <Td data-table-cell="action">
                  <Button
                    corner="rounded"
                    variant="outline"
                    className="bg-transparent text-sm"
                  >
                    Trade
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </section>
  );
}

export function ChatWithExpert({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding space-y-6 bg-slate-900 py-20`, className)}
      {...props}
    >
      <div
        className={cn(
          `space-y-4 rounded-4xl border border-slate-700 bg-slate-700/30 px-6 py-10`,
        )}
      >
        <div className={cn(`text-center`)}>
          <h1
            className={cn(
              `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
            )}
          >
            <span>Ready to Start Trading?</span>
          </h1>

          <p
            className={cn(
              `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
            )}
          >
            Open your free account and access 300+ instruments instantly.
          </p>
        </div>

        <div className={cn(`flex items-center justify-center`)}>
          <Button corner={"circle"} className={cn(`h-12 px-8`)}>
            <span>
              <UserPlus className={cn(`fill-foreground`)} />
            </span>
            <span>Create Account</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
