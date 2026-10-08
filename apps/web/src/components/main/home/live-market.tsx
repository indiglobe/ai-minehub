import { cn } from "@repo/styles/cn";
import { ArrowRight, Globe2, Smartphone } from "lucide-react";
import { useState } from "react";
import type { ComponentProps } from "react";

type MarketTab = "all" | "crypto" | "forex";

const markets = [
  {
    symbol: "₿",
    pair: "BTC/USD",
    name: "Bitcoin",
    price: "84,250",
    change: "+2.14%",
    positive: true,
  },
  {
    symbol: "Ξ",
    pair: "ETH/USD",
    name: "Ethereum",
    price: "3,520",
    change: "-0.82%",
    positive: false,
  },
  {
    symbol: "€",
    pair: "EUR/USD",
    name: "Forex",
    price: "1.0842",
    change: "+0.13%",
    positive: true,
  },
  {
    symbol: "Au",
    pair: "XAU/USD",
    name: "Gold",
    price: "2,330",
    change: "+0.38%",
    positive: true,
  },
  {
    symbol: "📈",
    pair: "S&P 500",
    name: "Index",
    price: "5,420",
    change: "+0.55%",
    positive: true,
  },
];

export function LiveMarkets({
  className,
  ...props
}: ComponentProps<"section">) {
  const [activeTab, setActiveTab] = useState<MarketTab>("crypto");

  return (
    <section
      className={cn(
        `relative w-full pt-14 pb-10 sm:pt-16 md:max-w-140 md:pt-14`,
        className,
      )}
      {...props}
    >
      <div className={cn(`relative w-full`)}>
        {/* TODAY'S VOLUME */}
        <div
          className={cn(
            `border-secondary-600/30 bg-background animate-volume-dance absolute -top-14 right-2 z-30 hidden min-w-38 rounded-2xl border px-5 py-4 shadow-xl sm:block`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-2.5 text-foreground/40 font-medium tracking-wide uppercase`,
            )}
          >
            Today's Volume
          </p>

          <p
            className={cn(
              `font-brand-primary text-primary-400 mt-1 text-xl font-bold`,
            )}
          >
            $6.2B
          </p>
        </div>

        {/* MAIN MARKET CARD */}
        <div
          className={cn(
            `border-secondary-200/20 bg-secondary-100/10 relative w-full overflow-hidden rounded-3xl border backdrop-blur-md`,
          )}
        >
          {/* HEADER */}
          <div
            className={cn(
              `border-secondary-200/25 3xs:flex-row 3xs:items-center 3xs:justify-between flex flex-col gap-4 border-b px-5 py-5`,
            )}
          >
            <div className={cn(`flex items-center gap-2`)}>
              <span
                className={cn(
                  `bg-accent-500/10 flex size-7 items-center justify-center rounded-full`,
                )}
              >
                <span className={cn(`bg-accent-500 size-2 rounded-full`)} />
              </span>

              <h2
                className={cn(
                  `font-brand-primary text-foreground text-sm font-bold sm:text-base`,
                )}
              >
                Live Markets
              </h2>
            </div>

            <div className={cn(`flex items-center gap-1`)}>
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  `font-brand-primary rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200`,
                  activeTab === "all"
                    ? `bg-secondary-500/15 text-secondary-500`
                    : `text-foreground/40 hover:text-foreground`,
                )}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("crypto")}
                className={cn(
                  `font-brand-primary rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200`,
                  activeTab === "crypto"
                    ? `bg-secondary-500/15 text-secondary-500`
                    : `text-foreground/40 hover:text-foreground`,
                )}
              >
                Crypto
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("forex")}
                className={cn(
                  `font-brand-primary rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200`,
                  activeTab === "forex"
                    ? `bg-secondary-500/15 text-secondary-500`
                    : `text-foreground/40 hover:text-foreground`,
                )}
              >
                Forex
              </button>
            </div>
          </div>

          {/* TOP MARKET AREA */}
          <div
            className={cn(`border-secondary-200/25 border-b px-5 py-5 pb-10`)}
          >
            <div className={cn(`flex items-start justify-between gap-4`)}>
              <div>
                <p
                  className={cn(
                    `font-brand-primary text-foreground/50 text-sm`,
                  )}
                >
                  BTC / USD
                </p>

                <h3
                  className={cn(
                    `font-brand-primary text-foreground mt-1 text-xl font-bold tracking-wide sm:text-2xl`,
                  )}
                >
                  $84,250.00
                </h3>
              </div>

              <span
                className={cn(
                  `bg-accent-500/10 font-brand-primary text-accent-500 rounded-sm px-2 py-1 text-xs font-semibold`,
                )}
              >
                +2.14% ↑
              </span>
            </div>
          </div>

          {/* MARKET LIST */}
          <div className={cn(`px-5 py-2`)}>
            {markets.map((market) => (
              <div
                key={market.pair}
                className={cn(`flex items-center justify-between gap-4 py-3`)}
              >
                <div className={cn(`flex min-w-0 items-center gap-3`)}>
                  <div
                    className={cn(
                      `border-secondary-200/30 bg-secondary-50 font-brand-primary text-foreground flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm`,
                    )}
                  >
                    {market.symbol}
                  </div>

                  <div className={cn(`min-w-0`)}>
                    <p
                      className={cn(
                        `font-brand-primary text-foreground truncate text-sm font-bold`,
                      )}
                    >
                      {market.pair}
                    </p>

                    <p
                      className={cn(
                        `font-brand-primary text-foreground/35 mt-0.5 text-xs`,
                      )}
                    >
                      {market.name}
                    </p>
                  </div>
                </div>

                <div className={cn(`shrink-0 text-right`)}>
                  <p
                    className={cn(
                      `font-brand-primary text-foreground text-sm font-bold`,
                    )}
                  >
                    {market.price}
                  </p>

                  <span
                    className={cn(
                      `fs-2.5 bg-accent-500/10 font-brand-primary text-accent-500 mt-1 inline-block rounded-sm px-2 py-1 font-semibold`,
                      market.positive
                        ? `bg-accent-500/10 text-accent-500`
                        : `bg-primary-500/10 text-primary-500`,
                    )}
                  >
                    {market.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* VIEW ALL */}
          <div
            className={cn(
              `border-secondary-200/25 flex h-12 items-center justify-center border-t`,
            )}
          >
            <button
              type="button"
              className={cn(
                `font-brand-primary text-secondary-500 hover:text-secondary-400 flex items-center gap-1 text-xs font-semibold transition-colors`,
              )}
            >
              <span>View All Markets</span>

              <ArrowRight className={cn(`size-3.5`)} />
            </button>
          </div>
        </div>

        {/* NEW TRADER BONUS */}
        <div
          className={cn(
            `border-secondary-200/30 bg-background animate-bonus-dance absolute -bottom-1 -left-15 z-30 hidden min-w-39 rounded-2xl border px-4 py-4 shadow-xl sm:block`,
          )}
        >
          <p
            className={cn(
              `font-brand-primary text-2.5 text-foreground/35 font-medium tracking-wide uppercase`,
            )}
          >
            New Trader Bonus
          </p>

          <p
            className={cn(
              `font-brand-primary text-accent-500 mt-1 text-xl font-bold`,
            )}
          >
            2× Deposit
          </p>
        </div>

        {/* PLATFORM BUTTONS */}
        <div
          className={cn(
            `mt-4 flex flex-wrap items-center justify-center gap-2`,
          )}
        >
          <button
            type="button"
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 font-brand-primary text-foreground/60 flex h-9 items-center gap-2 rounded-lg border px-3 text-xs`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500 text-2.25 flex size-4 items-center justify-center rounded-full font-bold text-white`,
              )}
            >
              4
            </span>

            <span>MT4</span>
          </button>

          <button
            type="button"
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 font-brand-primary text-foreground/60 flex h-9 items-center gap-2 rounded-lg border px-3 text-xs`,
            )}
          >
            <span
              className={cn(
                `bg-secondary-500 text-2.25 flex size-4 items-center justify-center rounded-full font-bold text-white`,
              )}
            >
              5
            </span>

            <span>MT5</span>
          </button>

          <button
            type="button"
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 font-brand-primary text-foreground/60 flex h-9 items-center gap-2 rounded-lg border px-3 text-xs`,
            )}
          >
            <Globe2 className={cn(`size-3.5`)} />

            <span>Web</span>
          </button>

          <button
            type="button"
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 font-brand-primary text-foreground/60 flex h-9 items-center gap-2 rounded-lg border px-3 text-xs`,
            )}
          >
            <Smartphone className={cn(`size-3.5`)} />

            <span>Mobile</span>
          </button>
        </div>

        {/* MOBILE STATS */}
        <div className={cn(`mt-4 grid grid-cols-2 gap-3 sm:hidden`)}>
          {/* TODAY'S VOLUME */}
          <div
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 relative -top-2 rounded-xl border p-3`,
            )}
          >
            <p
              className={cn(
                `font-brand-primary text-2.25 text-foreground/35 uppercase`,
              )}
            >
              Today's Volume
            </p>

            <p
              className={cn(
                `font-brand-primary text-primary-400 mt-1 font-bold`,
              )}
            >
              $6.2B
            </p>
          </div>

          {/* NEW TRADER BONUS */}
          <div
            className={cn(
              `border-secondary-200/30 bg-secondary-50/70 rounded-xl border p-3`,
            )}
          >
            <p
              className={cn(
                `font-brand-primary text-2.25 text-foreground/35 uppercase`,
              )}
            >
              New Trader Bonus
            </p>

            <p
              className={cn(
                `font-brand-primary text-accent-500 mt-1 font-bold`,
              )}
            >
              2× Deposit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
