import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import {
  AccountType,
  AccountTypeCardOfferingItem,
  AccountTypeCardOfferingItemDetails,
  AccountTypeCardOfferingItemTopic,
  AccountTypeCardOfferingList,
  AccountTypeDescription,
  AccountTypeFooter,
  AccountTypeHeader,
  AccountTypeHeading,
  AccountTypeIcon,
  AccountTypeTitle,
  PopularAccountType,
  RatingError,
  RatingLoading,
  SectionHeading,
  SectionIdentifier,
  SectionSubHeading,
  WhyChooseCardDetails,
  WhyChooseCardHeading,
  WhyChooseCardIcon,
  WhyChooseCards,
} from "@/components/main/home/page-uis";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { env } from "@repo/env/client";
import {
  LayoutPanelLeft,
  Shield,
  Star,
  TrendingDown,
  Trophy,
  TrendingUp,
  InfinityIcon,
  ChartColumnStacked,
  ArrowRight,
} from "lucide-react";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@repo/types/socket/active-traders";
import { Await, useLoaderData } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

const activeTradersSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(`${env.VITE_SOCKET_APP_HOST}/active-traders`);

export default function Home() {
  return (
    <Main>
      <HeroSection />
      <TrustStatSection />
      <WhyUsSection />
      <AccountTypesSection />
      <ExclusiveOffersSection />
      <EverythingYouNeedSection />
    </Main>
  );
}

export function HeroSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding relative py-20`, className)}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          `absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[56px_56px]`,
        )}
      />
      <div className={cn(`flex flex-col md:flex-row`)}>
        <div className={cn(`md:basis-1/2`)}>
          <div
            className={cn(`flex flex-wrap items-center gap-x-3 gap-y-1 pb-4`)}
          >
            <YearsInMarket />
            <ActiveTraders />
          </div>
          <h1
            className={cn(
              `sm:fs-16 md:fs-20 fs-12 font-brand-secondary leading-16 font-bold tracking-tighter sm:leading-20 md:leading-24`,
            )}
          >
            <span>The World's</span>
            <br />
            <span className={cn(`text-secondary-500`)}>Markets.</span>
            <br />
            <span>One Platform.</span>
          </h1>

          <p
            className={cn(
              `text-secondary-800/50 fs-4 sm:fs-4.5 md:fs-5 max-w-140`,
            )}
          >
            Access Forex, stocks, indices and our exclusive SyntX synthetic
            instruments. Institutional-grade conditions — trade 24/7 with
            spreads from 0.0 pips.
          </p>

          <div className={cn(`flex flex-col flex-wrap gap-4 pt-8 sm:flex-row`)}>
            <Button
              className={cn(
                `relative px-10 py-7 font-semibold transition-all hover:-translate-y-1`,
              )}
              variant={"primary"}
              corner={"circle"}
            >
              Open Free Account
            </Button>

            <Button
              className={cn(
                `hover:border-secondary-500 hover:text-secondary-500 relative px-10 py-7 font-semibold transition-all hover:-translate-y-1`,
              )}
              variant={"outline"}
              corner={"circle"}
            >
              Watch Platform Demo
            </Button>
          </div>

          <div className={cn(`pt-4`)}>
            <Rating />
          </div>
        </div>

        <div className={cn(`md:basis-1/2`)}></div>
      </div>
    </section>
  );
}

export function ActiveTraders({ className, ...props }: ComponentProps<"div">) {
  const [activeTraders, setActiveTraders] = useState(0);

  useEffect(() => {
    const handleTraderJoined = () => {
      setActiveTraders((prev) => prev + 1);
    };

    const handleTraderLeft = () => {
      setActiveTraders((prev) => Math.max(0, prev - 1));
    };

    const intervalId = setInterval(() => {
      Math.random() > 0.7
        ? activeTradersSocket.emit("join-trading")
        : activeTradersSocket.emit("leave-trading");
    }, 1000);

    activeTradersSocket.on("trader-joined", handleTraderJoined);
    activeTradersSocket.on("trader-left", handleTraderLeft);

    return () => {
      activeTradersSocket.off("trader-joined", handleTraderJoined);
      activeTradersSocket.off("trader-left", handleTraderLeft);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={cn(``, className)} {...props}>
      <div
        className={cn(
          `bg-accent-500/20 border-accent-500/60 text-accent-600 flex max-w-max items-center gap-2 rounded-full border py-2 pr-6 pl-4 text-xs font-bold`,
        )}
      >
        <span className={cn(`inline-block size-2 rounded-full bg-green-500`)} />
        <span>{activeTraders} Active Traders</span>
      </div>
    </div>
  );
}

export function YearsInMarket({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn(``, className)} {...props}>
      <div
        className={cn(
          `flex max-w-max items-center gap-2 rounded-full border border-yellow-500/60 bg-yellow-500/20 py-2 pr-6 pl-4 text-xs font-bold text-yellow-600`,
        )}
      >
        <span>&#127942;</span>
        <span>19 Years in market</span>
      </div>
    </div>
  );
}

export function Rating({ className, ...props }: ComponentProps<"div">) {
  const { allRatings: allRatingsProm } = useLoaderData({
    from: "/(with-header-footer)/",
  });

  return (
    <ErrorBoundary fallback={<RatingError />}>
      <Await fallback={<RatingLoading />} promise={allRatingsProm}>
        {(allRatings) => {
          const ratingDetails = allRatings.reduce(
            (curr, next) => {
              return {
                ...curr,
                totalRating: curr.totalRating + next.ratingStar,
                ratingCount: curr.ratingCount + 1,
              };
            },
            { totalRating: 0, ratingCount: 0 },
          );

          const averageRating =
            ratingDetails.totalRating / ratingDetails.ratingCount;

          const starArray = generateRatingStarArray(averageRating, 5);

          return (
            <div className={cn(`flex flex-col gap-2`, className)} {...props}>
              {/* STAR + RATING ROW */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {starArray.map((filledAmount, idx) => (
                    <span key={idx} className="relative inline-block size-6">
                      {/* complete filled stars */}
                      {filledAmount === 1 && (
                        <Star className="fill-secondary-500 text-secondary-500" />
                      )}

                      {/* partial filled stars */}
                      {filledAmount > 0 && filledAmount < 1 && (
                        <>
                          <Star
                            style={{
                              clipPath: `inset(0 ${100 - filledAmount * 100}% 0 0)`,
                            }}
                            className="text-secondary-500 fill-secondary-500"
                          />
                          <Star
                            style={{
                              clipPath: `inset(0 0 0 ${filledAmount * 100}%)`,
                            }}
                            className="text-secondary-500 absolute inset-0 opacity-30"
                          />
                        </>
                      )}

                      {/* empty stars */}
                      {filledAmount === 0 && (
                        <Star className="text-secondary-500 opacity-30" />
                      )}
                    </span>
                  ))}
                </div>

                {/* rating text */}
                <div className="flex items-baseline gap-2">
                  <span className="text-secondary-600 text-sm font-semibold">
                    {averageRating.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">/ 5</span>
                </div>
              </div>

              {/* COUNT ROW */}
              <div className="text-xs text-gray-500">
                Based on {ratingDetails.ratingCount.toLocaleString()} ratings
              </div>
            </div>
          );
        }}
      </Await>
    </ErrorBoundary>
  );
}

export function TrustStatSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `bg-secondary-500/5 border-t-secondary-500/30 border-b-secondary-500/30 text-secondary-500/80 dark:text-secondary-700/30 space-y-6 border-t border-b py-10 text-sm`,
        className,
      )}
      {...props}
    >
      <h2 className={cn(`text-center text-foreground/70 uppercase`)}>
        Trusted & Regulated By
      </h2>
      <ul
        className={cn(
          `flex w-full flex-wrap items-center justify-center gap-y-4`,
        )}
      >
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          FSC Mauritius
        </li>
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          ISO 27001
        </li>
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          Trustpilot ★4.2
        </li>
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          SSL Secured
        </li>
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          PCI DSS
        </li>
        <li
          className={cn(`hover:text-secondary-900/80 px-8 transition-colors`)}
        >
          100K+ Traders
        </li>
      </ul>
    </section>
  );
}

export function WhyUsSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding space-y-8 py-20`, className)}
      {...props}
    >
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Why NexTrade</SectionIdentifier>
        <SectionHeading>
          <span>Why Traders </span>
          <span className={cn(`text-primary-500`)}>Choose Us</span>
        </SectionHeading>
        <SectionSubHeading>
          Built for serious traders. Institutional-grade conditions, accessible
          to everyone.
        </SectionSubHeading>
      </div>

      <div
        className={cn(`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`)}
      >
        <WhyChooseCards className={cn(`md:col-span-2`)}>
          <WhyChooseCardIcon
            className={cn(
              `border-primary-500/60 text-primary-600 bg-primary-500/20`,
            )}
          >
            <Trophy className={cn(`fill-primary-600`)} />
          </WhyChooseCardIcon>
          <WhyChooseCardHeading>Loyalty Program</WhyChooseCardHeading>
          <WhyChooseCardDetails>
            Turn your trading activity into real rewards. Earn Welcoins with
            every executed order and redeem them for cashbacks, bonuses, and
            exclusive perks.
          </WhyChooseCardDetails>
        </WhyChooseCards>

        <WhyChooseCards>
          <WhyChooseCardIcon
            className={cn(
              `border-secondary-500/60 text-secondary-600 bg-secondary-500/20`,
            )}
          >
            <TrendingDown />
          </WhyChooseCardIcon>
          <WhyChooseCardHeading>Tight Spreads</WhyChooseCardHeading>
          <WhyChooseCardDetails>
            Raw spreads from 0.0 pips and transparent pricing. Keep more of your
            profits on every move.
          </WhyChooseCardDetails>
        </WhyChooseCards>

        <WhyChooseCards>
          <WhyChooseCardIcon
            className={cn(
              `border-primary-500/60 text-primary-600 bg-primary-500/20`,
            )}
          >
            <TrendingDown />
          </WhyChooseCardIcon>
          <WhyChooseCardHeading>Ultra-Fast Execution</WhyChooseCardHeading>
          <WhyChooseCardDetails>
            Your orders execute in milliseconds with minimal slippage. Our
            low-latency infrastructure never lets you miss a trade.
          </WhyChooseCardDetails>
        </WhyChooseCards>

        <WhyChooseCards>
          <WhyChooseCardIcon
            className={cn(
              `border-accent-500/60 text-accent-600 bg-accent-500/20`,
            )}
          >
            <Shield className={cn(`fill-accent-600`)} />
          </WhyChooseCardIcon>
          <WhyChooseCardHeading>Regulated & Secure</WhyChooseCardHeading>
          <WhyChooseCardDetails>
            Operate under strict regulatory oversight with segregated client
            accounts, negative balance protection, and SSL-encrypted
            infrastructure.
          </WhyChooseCardDetails>
        </WhyChooseCards>

        <WhyChooseCards>
          <WhyChooseCardIcon
            className={cn(
              `border-primary-500/60 text-primary-600 bg-primary-500/20`,
            )}
          >
            <LayoutPanelLeft className={cn(`fill-primary-600`)} />
          </WhyChooseCardIcon>
          <WhyChooseCardHeading>MT4 & MT5 Platforms</WhyChooseCardHeading>
          <WhyChooseCardDetails>
            Trade on the world's most trusted platforms — desktop, web, and
            mobile. Powerful tools wherever you are.
          </WhyChooseCardDetails>
        </WhyChooseCards>
      </div>
    </section>
  );
}

export function AccountTypesSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(`default-padding py-20`, className)} {...props}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Account Types</SectionIdentifier>
        <SectionHeading>
          <span>Choose </span>
          <span className={cn(`text-secondary-500`)}>An Account </span>
          <span>to Suit Your Trading</span>
        </SectionHeading>
        <SectionSubHeading>
          Explore our account types and find the perfect fit for your strategy.
        </SectionSubHeading>
      </div>

      <div className={cn(`pt-24`)}>
        <div
          className={cn(`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`)}
        >
          <AccountType className={cn(``)}>
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-secondary-500/10 **:aria-[hidden]:to-accent-500/10`,
              )}
            >
              <AccountTypeIcon className={cn(`text-secondary-500`)}>
                <ChartColumnStacked />
              </AccountTypeIcon>
              <AccountTypeHeading>
                <AccountTypeTitle>Micro</AccountTypeTitle>
                <AccountTypeDescription>
                  Perfect your strategy. Start small and trade with confidence.
                  Ideal for learning the markets with minimal risk.
                </AccountTypeDescription>
              </AccountTypeHeading>
            </AccountTypeHeader>

            <AccountTypeCardOfferingList>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Account Currency
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  USD, EUR
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Starting Deposit
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  $1 USD
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  No-Commission Deposit
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(
                    `bg-accent-500/20 text-accent-500 px-2 border border-accent-500/40 rounded-md`,
                  )}
                >
                  ✓ Yes
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Trading Platform
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  MT4, MT5
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Max Leverage
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  1:500
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Spreads
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  From 1.5 pips
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
            </AccountTypeCardOfferingList>

            <AccountTypeFooter>
              <Button
                corner={"circle"}
                variant={"ghost"}
                className={cn(`w-full py-6`)}
              >
                <span>Start with micro</span>
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </AccountTypeFooter>
          </AccountType>

          <AccountType
            className={cn(
              `md:col-span-2 lg:col-span-1 md:col-start-1 md:row-start-1 lg:col-start-2`,
            )}
          >
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-primary-500/10 **:aria-[hidden]:to-secondary-500/10`,
              )}
            >
              <AccountTypeIcon className={cn(`text-primary-500`)}>
                <TrendingUp />
              </AccountTypeIcon>
              <AccountTypeHeading>
                <AccountTypeTitle>Pro</AccountTypeTitle>
                <AccountTypeDescription>
                  Trade with precision. Get institutional-grade conditions with
                  raw spreads and superior execution for serious traders.
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
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  $10 USD
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  No-Commission Deposit
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(
                    `bg-accent-500/20 text-accent-500 px-2 border border-accent-500/40 rounded-md`,
                  )}
                >
                  ✓ Yes
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Trading Platform
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  MT4, MT5
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Max Leverage
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  1:500
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Spreads
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  From 0.0 pips
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
            </AccountTypeCardOfferingList>

            <AccountTypeFooter>
              <Button
                variant={"secondary"}
                corner={"circle"}
                className={cn(`w-full py-6`)}
              >
                <span>Start with pro</span>
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </AccountTypeFooter>
          </AccountType>

          <AccountType className={cn(``)}>
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-accent-500/10 **:aria-[hidden]:to-primary-500/10`,
              )}
            >
              <AccountTypeIcon className={cn(`text-accent-500`)}>
                <InfinityIcon />
              </AccountTypeIcon>
              <AccountTypeHeading>
                <AccountTypeTitle>SyntX</AccountTypeTitle>
                <AccountTypeDescription>
                  Never miss a moment. Designed for our 24/7 synthetic indices.
                  Trade around the clock, even on weekends.
                </AccountTypeDescription>
              </AccountTypeHeading>
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
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  $1 USD
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  No-Commission Deposit
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(
                    `bg-accent-500/20 text-accent-500 px-2 border border-accent-500/40 rounded-md`,
                  )}
                >
                  ✓ Yes
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Trading Platform
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  MT5
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Max Leverage
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails>
                  1:200
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
              <AccountTypeCardOfferingItem>
                <AccountTypeCardOfferingItemTopic>
                  Spreads
                </AccountTypeCardOfferingItemTopic>
                <AccountTypeCardOfferingItemDetails
                  className={cn(`text-accent-500`)}
                >
                  Fixed spreads
                </AccountTypeCardOfferingItemDetails>
              </AccountTypeCardOfferingItem>
            </AccountTypeCardOfferingList>

            <AccountTypeFooter>
              <Button
                corner={"circle"}
                variant={"ghost"}
                className={cn(`w-full py-6`)}
              >
                <span>Start with SyntX</span>
                <span>
                  <ArrowRight />
                </span>
              </Button>
            </AccountTypeFooter>
          </AccountType>
        </div>
      </div>
    </section>
  );
}

export function ExclusiveOffersSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(`default-padding py-20`, className)} {...props}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Exclusive Offers</SectionIdentifier>
        <SectionHeading>
          <span>Promotions </span>
          <span className={cn(`text-primary-500`)}>& Bonuses </span>
        </SectionHeading>
        <SectionSubHeading>
          Boost your trading capital with exclusive promotions designed for
          every trader.
        </SectionSubHeading>
      </div>
    </section>
  );
}

export function EverythingYouNeedSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(`default-padding py-20`, className)} {...props}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Everything You Need</SectionIdentifier>
        <SectionHeading>
          <span>Trade With </span>
          <span className={cn(`text-secondary-500`)}>Total Confidence </span>
        </SectionHeading>
      </div>
    </section>
  );
}

export function PassiveIncomeSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(`default-padding py-20`, className)} {...props}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Passive Income</SectionIdentifier>
        <SectionHeading>
          <span>Cloud Mining </span>
          <span className={cn(`text-primary-500`)}>& Earn</span>
        </SectionHeading>
        <SectionSubHeading>
          Start earning passive income with our automated cloud mining system.
          No mining equipment needed — just invest and watch your profits grow.
        </SectionSubHeading>
      </div>
    </section>
  );
}

function generateRatingStarArray(
  averageRating: number,
  maxRatingStar = 5,
): number[] {
  const result: number[] = [];

  const full = Math.floor(averageRating);
  const fraction = averageRating - full;

  // push full 1s
  for (let i = 0; i < full && i < maxRatingStar; i++) {
    result.push(1);
  }

  // push fractional part if space allows
  if (result.length < maxRatingStar) {
    const frac = Number(fraction.toFixed(2));
    if (frac > 0) {
      result.push(frac);
    }
  }

  // fill remaining with 0s
  while (result.length < maxRatingStar) {
    result.push(0);
  }

  return result;
}
