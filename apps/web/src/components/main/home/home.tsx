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
  PassiveIncome,
  PassiveIncomeCTA,
  PassiveIncomeDescription,
  PassiveIncomeDescriptionItem,
  PassiveIncomeIcon,
  PassiveIncomeReturn,
  PassiveIncomeTitle,
  PaymentVisual,
  PopularAccountType,
  PromotionBonus,
  PromotionBonusDescription,
  PromotionBonusIcon,
  PromotionBonusTitle,
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
  FingerprintIcon,
  RotateCcw,
  Grid2x2,
  Rocket,
  Check,
  Video,
  User,
} from "lucide-react";

import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@repo/types/socket/active-traders";

import { Await, useLoaderData } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

import { LiveMarkets } from "./live-market";

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
      <PassiveIncomeSection />
      <BottomCTASection />
    </Main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */

export function HeroSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `default-padding relative overflow-hidden pt-6 pb-20 md:py-20`,
        className,
      )}
      {...props}
    >
      {/* Background grid */}
      <div
        aria-hidden
        className={cn(
          `pointer-events-none absolute inset-0`,
          `bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)]`,
          `mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]`,
          `bg-size-[56px_56px]`,
        )}
      />

      <div
        className={cn(
          `relative z-10 flex w-full flex-col gap-14`,
          `md:flex-row md:items-center md:gap-8`,
          `lg:gap-12`,
        )}
      >
        {/* LEFT SIDE */}
        <div className={cn(`w-full min-w-0 md:basis-1/2`)}>
          <div
            className={cn(
              `flex flex-wrap items-center gap-x-3 gap-y-2 pb-4`,
            )}
          >
            <YearsInMarket />
            <ActiveTraders />
          </div>

          <h1
            className={cn(
              `fs-12 font-brand-secondary leading-16 font-bold tracking-tighter`,
              `sm:fs-16 sm:leading-20`,
              `md:fs-20 md:leading-24`,
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
              `text-secondary-800/50 fs-4 max-w-140`,
              `sm:fs-4.5`,
              `md:fs-5`,
            )}
          >
            Access Forex, stocks, indices and our exclusive SyntX synthetic
            instruments. Institutional-grade conditions — trade 24/7 with
            spreads from 0.0 pips.
          </p>

          <div
            className={cn(
              `flex flex-col flex-wrap gap-4 pt-8`,
              `sm:flex-row`,
            )}
          >
            <Button
              className={cn(
                `relative px-10 py-7 font-semibold`,
                `transition-all duration-300`,
                `hover:-translate-y-1`,
              )}
              variant={"primary"}
              corner={"circle"}
            >
              <span>
                <User className={cn(`size-6`)} />
              </span>

              <span>Open Free Account</span>
            </Button>

            <Button
              className={cn(
                `relative px-10 py-7 font-semibold`,
                `transition-all duration-300`,
                `hover:-translate-y-1`,
                `hover:border-secondary-500`,
                `hover:text-secondary-500`,
              )}
              variant={"outline"}
              corner={"circle"}
            >
              <span>
                <Video className={cn(`size-6`)} />
              </span>

              <span>Watch Platform Demo</span>
            </Button>
          </div>

          <div className={cn(`pt-4`)}>
            <Rating />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className={cn(
            `relative flex w-full min-w-0 items-center justify-center`,
            `md:basis-1/2 md:justify-end`,
          )}
        >
          <LiveMarkets />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ACTIVE TRADERS                                */
/* -------------------------------------------------------------------------- */

export function ActiveTraders({
  className,
  ...props
}: ComponentProps<"div">) {
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
          `bg-accent-500/20 border-accent-500/60 text-accent-600`,
          `flex max-w-max items-center gap-2 rounded-full border`,
          `py-2 pr-6 pl-4 text-xs font-bold`,
        )}
      >
        <span className={cn(`inline-block size-2 rounded-full bg-accent-500`)} />

        <span>{activeTraders} Active Traders</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              YEARS IN MARKET                               */
/* -------------------------------------------------------------------------- */

export function YearsInMarket({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn(``, className)} {...props}>
      <div
        className={cn(
          `border-primary-500/60 bg-primary-500/20 text-primary-600`,
          `flex max-w-max items-center gap-2 rounded-full border`,
          `py-2 pr-6 pl-4 text-xs font-bold`,
        )}
      >
        <span>🏆</span>

        <span>19 Years in market</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  RATING                                    */
/* -------------------------------------------------------------------------- */

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
            {
              totalRating: 0,
              ratingCount: 0,
            },
          );

          const averageRating =
            ratingDetails.totalRating / ratingDetails.ratingCount;

          const starArray = generateRatingStarArray(averageRating, 5);

          return (
            <div className={cn(`flex flex-col gap-2`, className)} {...props}>
              <div className={cn(`flex flex-wrap items-center gap-3`)}>
                <div className={cn(`flex items-center gap-0.5`)}>
                  {starArray.map((filledAmount, idx) => (
                    <span
                      key={idx}
                      className={cn(`relative inline-block size-6`)}
                    >
                      {filledAmount === 1 && (
                        <Star
                          className={cn(
                            `fill-secondary-500 text-secondary-500`,
                          )}
                        />
                      )}

                      {filledAmount > 0 && filledAmount < 1 && (
                        <>
                          <Star
                            style={{
                              clipPath: `inset(0 ${
                                100 - filledAmount * 100
                              }% 0 0)`,
                            }}
                            className={cn(
                              `fill-secondary-500 text-secondary-500`,
                            )}
                          />

                          <Star
                            style={{
                              clipPath: `inset(0 0 0 ${
                                filledAmount * 100
                              }%)`,
                            }}
                            className={cn(
                              `text-secondary-500 absolute inset-0 opacity-30`,
                            )}
                          />
                        </>
                      )}

                      {filledAmount === 0 && (
                        <Star
                          className={cn(`text-secondary-500 opacity-30`)}
                        />
                      )}
                    </span>
                  ))}
                </div>

                <div className={cn(`flex items-baseline gap-2`)}>
                  <span
                    className={cn(
                      `text-secondary-600 text-sm font-semibold`,
                    )}
                  >
                    {isNaN(averageRating) ? 0 : averageRating.toFixed(2)}
                  </span>

                  <span className={cn(`text-foreground/50 text-xs`)}>
                    / 5
                  </span>
                </div>
              </div>

              <div className={cn(`text-foreground/50 text-xs`)}>
                Based on {ratingDetails.ratingCount.toLocaleString()} ratings
              </div>
            </div>
          );
        }}
      </Await>
    </ErrorBoundary>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TRUST SECTION                                 */
/* -------------------------------------------------------------------------- */

export function TrustStatSection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        `bg-secondary-500/5 border-t-secondary-500/30 border-b-secondary-500/30`,
        `text-secondary-500/80`,
        `space-y-6 border-t border-b py-10 text-sm`,
        className,
      )}
      {...props}
    >
      <h2 className={cn(`text-foreground/70 text-center uppercase`)}>
        Trusted &amp; Regulated By
      </h2>

      <ul
        className={cn(
          `flex w-full flex-wrap items-center justify-center gap-y-4`,
        )}
      >
        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          FSC Mauritius
        </li>

        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          ISO 27001
        </li>

        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          Trustpilot ★4.2
        </li>

        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          SSL Secured
        </li>

        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          PCI DSS
        </li>

        <li
          className={cn(
            `hover:text-secondary-900/80 px-8 transition-colors`,
          )}
        >
          100K+ Traders
        </li>
      </ul>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                WHY US                                      */
/* -------------------------------------------------------------------------- */

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

          <br className={cn(`md:hidden`)} />

          <span className={cn(`text-primary-500`)}>Choose Us</span>
        </SectionHeading>

        <SectionSubHeading>
          Built for serious traders. Institutional-grade conditions, accessible
          to everyone.
        </SectionSubHeading>
      </div>

      <div
        className={cn(
          `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`,
        )}
      >
        <WhyChooseCards className={cn(`md:col-span-2`)}>
          <WhyChooseCardIcon
            className={cn(
              `border-primary-500/60 bg-primary-500/20 text-primary-600`,
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
              `border-secondary-500/60 bg-secondary-500/20 text-secondary-600`,
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
              `border-primary-500/60 bg-primary-500/20 text-primary-600`,
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
              `border-accent-500/60 bg-accent-500/20 text-accent-600`,
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
              `border-primary-500/60 bg-primary-500/20 text-primary-600`,
            )}
          >
            <LayoutPanelLeft className={cn(`fill-primary-600`)} />
          </WhyChooseCardIcon>

          <WhyChooseCardHeading>MT4 &amp; MT5 Platforms</WhyChooseCardHeading>

          <WhyChooseCardDetails>
            Trade on the world's most trusted platforms — desktop, web, and
            mobile. Powerful tools wherever you are.
          </WhyChooseCardDetails>
        </WhyChooseCards>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             ACCOUNT TYPES                                  */
/* -------------------------------------------------------------------------- */

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
          className={cn(
            `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`,
          )}
        >
          {/* MICRO */}

          <AccountType>
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-secondary-500/10`,
                `**:aria-[hidden]:to-accent-500/10`,
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
                    `border-accent-500/40 bg-accent-500/20`,
                    `text-accent-500 rounded-md border px-2`,
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

                <ArrowRight />
              </Button>
            </AccountTypeFooter>
          </AccountType>

          {/* PRO */}

          <AccountType
            className={cn(
              `md:col-span-2 md:col-start-1 md:row-start-1`,
              `lg:col-span-1 lg:col-start-2`,
            )}
          >
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-primary-500/10`,
                `**:aria-[hidden]:to-secondary-500/10`,
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
                    `border-accent-500/40 bg-accent-500/20`,
                    `text-accent-500 rounded-md border px-2`,
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

                <ArrowRight />
              </Button>
            </AccountTypeFooter>
          </AccountType>

          {/* SYNTX */}

          <AccountType>
            <AccountTypeHeader
              className={cn(
                `**:aria-[hidden]:from-accent-500/10`,
                `**:aria-[hidden]:to-primary-500/10`,
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
                    `border-accent-500/40 bg-accent-500/20`,
                    `text-accent-500 rounded-md border px-2`,
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

                <ArrowRight />
              </Button>
            </AccountTypeFooter>
          </AccountType>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             EXCLUSIVE OFFERS                               */
/* -------------------------------------------------------------------------- */

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

          <span className={cn(`text-primary-500`)}>&amp; Bonuses </span>
        </SectionHeading>

        <SectionSubHeading>
          Boost your trading capital with exclusive promotions designed for
          every trader.
        </SectionSubHeading>
      </div>

      <div
        className={cn(
          `grid grid-cols-1 gap-4 pt-24 md:grid-cols-2 lg:grid-cols-3`,
        )}
      >
        <PromotionBonus>
          <PromotionBonusIcon
            className={cn(
              `border-secondary-500 bg-secondary-500/10`,
              `rounded-2xl border`,
            )}
          >
            <FingerprintIcon className={cn(`text-secondary-500`)} />
          </PromotionBonusIcon>

          <PromotionBonusTitle>Welcoins</PromotionBonusTitle>

          <PromotionBonusDescription>
            Welcoins are our digital currency, part of our loyalty program.
            Trade and effortlessly earn Welcoins, then exchange them for cash
            rewards or exciting items in Welshop.
          </PromotionBonusDescription>
        </PromotionBonus>

        <PromotionBonus offer>
          <PromotionBonusIcon
            className={cn(
              `border-primary-500 bg-primary-500/10`,
              `rounded-2xl border`,
            )}
          >
            <Grid2x2 className={cn(`text-primary-500`)} />
          </PromotionBonusIcon>

          <PromotionBonusTitle>
            First Deposit Bonus
          </PromotionBonusTitle>

          <PromotionBonusDescription>
            Double your first deposit or get your first deposit bonus — choose
            your reward and start trading with extra funds today!
          </PromotionBonusDescription>
        </PromotionBonus>

        <PromotionBonus>
          <PromotionBonusIcon
            className={cn(
              `border-accent-500 bg-accent-500/10`,
              `rounded-2xl border`,
            )}
          >
            <RotateCcw className={cn(`text-accent-500`)} />
          </PromotionBonusIcon>

          <PromotionBonusTitle>Reload Bonuses</PromotionBonusTitle>

          <PromotionBonusDescription>
            Make another deposit and receive a random bonus to boost your
            capital. Every reload is a surprise reward — spin and win!
          </PromotionBonusDescription>
        </PromotionBonus>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          EVERYTHING YOU NEED                               */
/* -------------------------------------------------------------------------- */

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

          <span className={cn(`text-secondary-500`)}>
            Total Confidence
          </span>
        </SectionHeading>
      </div>

      <div className={cn(`pt-24`)}>
        <PaymentVisual />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           PASSIVE INCOME                                   */
/* -------------------------------------------------------------------------- */

export function PassiveIncomeSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    allMiningProfiles: allMiningProfilesProm,
    allMiningOrders: allMiningOrdersProm,
  } = useLoaderData({
    from: "/(with-header-footer)/",
  });

  return (
    <section className={cn(`default-padding py-20`, className)} {...props}>
      <div className={cn(`flex flex-col items-center`)}>
        <SectionIdentifier>Passive Income</SectionIdentifier>

        <SectionHeading>
          <span>Cloud Mining </span>

          <span className={cn(`text-primary-500`)}>&amp; Earn</span>
        </SectionHeading>

        <SectionSubHeading>
          Start earning passive income with our automated cloud mining system.
          No mining equipment needed — just invest and watch your profits grow.
        </SectionSubHeading>
      </div>

      <ErrorBoundary fallback={<div>Error...</div>}>
        <Await promise={allMiningProfilesProm} fallback={<div>Loading...</div>}>
          {(allMiningProfiles) => (
            <div
              className={cn(
                `grid grid-cols-1 gap-4 pt-24`,
                `md:grid-cols-2`,
                `lg:grid-cols-3`,
                `xl:grid-cols-4`,
              )}
            >
              {allMiningProfiles.map(
                ({
                  id,
                  category,
                  minimumAllowedAmount,
                  maximumAllowedAmount,
                  dailyReturn,
                  lockinPeriod,
                  isPopular,
                }) => (
                  <PassiveIncome
                    key={id}
                    className={cn(`min-w-60`)}
                    popular={isPopular}
                  >
                    <PassiveIncomeIcon
                      className={cn(`bg-secondary-500/20 rounded-2xl`)}
                    >
                      ⛏️
                    </PassiveIncomeIcon>

                    <PassiveIncomeTitle>{category}</PassiveIncomeTitle>

                    <PassiveIncomeReturn>
                      +
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 2,
                      }).format(lockinPeriod * dailyReturn)}
                      %
                    </PassiveIncomeReturn>

                    <PassiveIncomeDescription>
                      <PassiveIncomeDescriptionItem>
                        Min: ₹{minimumAllowedAmount}
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        Max: ₹{maximumAllowedAmount}
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        {dailyReturn}% Daily
                      </PassiveIncomeDescriptionItem>

                      <PassiveIncomeDescriptionItem>
                        {lockinPeriod} Days Lock
                      </PassiveIncomeDescriptionItem>
                    </PassiveIncomeDescription>

                    <PassiveIncomeCTA />
                  </PassiveIncome>
                ),
              )}
            </div>
          )}
        </Await>
      </ErrorBoundary>

      <div
        className={cn(
          `bg-secondary-500/5 border-secondary-500/30`,
          `mt-24 grid grid-cols-2 gap-y-8 rounded-2xl border`,
          `py-8 text-center`,
          `lg:grid-cols-4`,
        )}
      >
        {/* TOTAL MINED */}

        <div
          className={cn(
            `flex w-full flex-col items-center justify-center`,
            `*:nth-[1]:text-3xl`,
            `*:nth-[1]:font-semibold`,
            `*:nth-[1]:text-secondary-500`,
            `*:nth-[2]:text-foreground/50`,
          )}
        >
          <ErrorBoundary fallback={<div>Error...</div>}>
            <Await
              promise={allMiningOrdersProm}
              fallback={<div>Loading...</div>}
            >
              {(allMiningOrders) => {
                const totalAmount = allMiningOrders.reduce((acc, curr) => {
                  return (
                    acc +
                    (curr.amountRecived !== null ? curr.amountInvested : 0)
                  );
                }, 0);

                return (
                  <>
                    <span>₹{totalAmount}+</span>
                    <span>Total Mined</span>
                  </>
                );
              }}
            </Await>
          </ErrorBoundary>
        </div>

        {/* ACTIVE MINERS */}

        <div
          className={cn(
            `flex w-full flex-col items-center justify-center`,
            `*:nth-[1]:text-3xl`,
            `*:nth-[1]:font-semibold`,
            `*:nth-[1]:text-secondary-500`,
            `*:nth-[2]:text-foreground/50`,
          )}
        >
          <ErrorBoundary fallback={<div>Error...</div>}>
            <Await
              promise={allMiningOrdersProm}
              fallback={<div>Loading...</div>}
            >
              {(allMiningOrders) => {
                const activeMiners = allMiningOrders.filter(
                  (miningOrder) => miningOrder.miningStatus === "active",
                );

                return (
                  <>
                    <span>{activeMiners.length}+</span>
                    <span>Active Miners</span>
                  </>
                );
              }}
            </Await>
          </ErrorBoundary>
        </div>

        {/* UPTIME */}

        <div
          className={cn(
            `flex w-full flex-col items-center justify-center`,
            `*:nth-[1]:text-3xl`,
            `*:nth-[1]:font-semibold`,
            `*:nth-[1]:text-secondary-500`,
            `*:nth-[2]:text-foreground/50`,
          )}
        >
          <span>99.9%</span>
          <span>Uptime</span>
        </div>

        {/* PAYOUT */}

        <div
          className={cn(
            `flex w-full flex-col items-center justify-center`,
            `*:nth-[1]:text-3xl`,
            `*:nth-[1]:font-semibold`,
            `*:nth-[1]:text-secondary-500`,
            `*:nth-[2]:text-foreground/50`,
          )}
        >
          <span>24/7</span>
          <span>Auto Payouts</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                BOTTOM CTA                                  */
/* -------------------------------------------------------------------------- */

export function BottomCTASection({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn(`default-padding`, className)} {...props}>
      <div
        className={cn(
          `bg-secondary-500/10 border-secondary-500/20`,
          `flex w-full flex-col items-center gap-x-10 gap-y-8`,
          `rounded-2xl border p-4`,
          `md:p-8`,
          `lg:flex-row`,
        )}
      >
        <div className={cn(`space-y-4`)}>
          <span
            className={cn(
              `bg-secondary-500/10 border-secondary-500/20`,
              `inline-block rounded-full border px-4 py-1`,
            )}
          >
            🚀 <span className={cn(`text-sm`)}>Start Today</span>
          </span>

          <h2 className={cn(`text-4xl font-bold`)}>
            <span>Ready to Trade the</span>

            <br />

            <span className={cn(`text-secondary-500`)}>
              World's Markets?
            </span>
          </h2>

          <p className={cn(`text-foreground/50`)}>
            Join 100,000+ traders. Open your account in 2 minutes — no complex
            setup, just great conditions from day one.
          </p>

          <ul
            className={cn(
              `text-foreground/50`,
              `flex flex-wrap gap-x-10 gap-y-2`,
            )}
          >
            <li>
              <Check
                className={cn(
                  `bg-accent-500 inline-block size-4`,
                  `rounded-full p-px text-white`,
                )}
              />{" "}
              <span>No minimum deposit required</span>
            </li>

            <li>
              <Check
                className={cn(
                  `bg-accent-500 inline-block size-4`,
                  `rounded-full p-px text-white`,
                )}
              />{" "}
              <span>Access MT4 &amp; MT5 instantly</span>
            </li>

            <li>
              <Check
                className={cn(
                  `bg-accent-500 inline-block size-4`,
                  `rounded-full p-px text-white`,
                )}
              />{" "}
              <span>First deposit bonus up to $5,000</span>
            </li>

            <li>
              <Check
                className={cn(
                  `bg-accent-500 inline-block size-4`,
                  `rounded-full p-px text-white`,
                )}
              />{" "}
              <span>24/7 multilingual support</span>
            </li>
          </ul>
        </div>

        <div
          className={cn(
            `flex w-full items-center justify-center`,
            `lg:max-w-max`,
          )}
        >
          <Button
            corner={"circle"}
            className={cn(
              `m-auto h-12 w-full text-lg`,
              `md:h-16 md:w-60`,
            )}
          >
            <Rocket className={cn(`inline-block size-5`)} />

            <span>Open Free Account</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              RATING HELPER                                 */
/* -------------------------------------------------------------------------- */

function generateRatingStarArray(
  averageRating: number,
  maxRatingStar = 5,
): number[] {
  const result: number[] = [];

  const full = Math.floor(averageRating);
  const fraction = averageRating - full;

  for (let i = 0; i < full && i < maxRatingStar; i++) {
    result.push(1);
  }

  if (result.length < maxRatingStar) {
    const frac = Number(fraction.toFixed(2));

    if (frac > 0) {
      result.push(frac);
    }
  }

  while (result.length < maxRatingStar) {
    result.push(0);
  }

  return result;
}