import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Bot, Gem, MessageCircle, UserLock, Zap } from "lucide-react";
import type { ComponentProps } from "react";
import {
  AccountsCards,
  AccountsCardsHeading,
  AccountsCardsIcon,
  AccountsCardsOfferingItem,
  AccountsCardsOfferingList,
  AccountsCardsPopulerBadge,
  AccountsCardsSubHeading,
} from "@/components/main/trading/accounts/page-uis";
import { Button } from "@repo/ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@repo/ui/table";

export function Accounts() {
  return (
    <Main>
      <PageHeading />
      <ChooseAccountType />
      <CompareAcconts />
      <ChatWithExpert />
    </Main>
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
          `bg-primary-500/20 border-primary-500/50 text-primary-600 inline-block max-w-max rounded-full border px-6 py-2 text-sm font-semibold`,
        )}
      >
        <UserLock className={cn(`inline-block size-4`)} /> Choose Your Account
      </div>

      <h1
        className={cn(
          `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
        )}
      >
        <span>Trading </span>
        <span
          className={cn(
            `from-primary-500 to-secondary-500 bg-linear-to-r bg-clip-text text-transparent`,
          )}
        >
          Account Types{" "}
        </span>
      </h1>

      <p
        className={cn(
          `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
        )}
      >
        Three account types designed for every trading style. Start from $10
        with institutional-grade conditions.
      </p>
    </section>
  );
}

export function ChooseAccountType({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `default-padding flex flex-wrap gap-4 bg-slate-200 py-30 *:grow *:basis-100 dark:bg-slate-900`,
        className,
      )}
      {...props}
    >
      <AccountsCards
        className={cn(`border-primary-500/50 hover:shadow-primary-500/10`)}
      >
        <AccountsCardsIcon
          className={cn(`bg-primary-500/20 *:text-primary-600`)}
        >
          <Gem className={cn(`size-6 md:size-8`)} />
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
            <span className={cn(`text-sm font-semibold`)}>1:500</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Commission</span>
            <span className={cn(`text-accent-600 text-sm font-semibold`)}>
              None
            </span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Instruments
            </span>
            <span className={cn(`text-sm font-semibold`)}>100+</span>
          </AccountsCardsOfferingItem>
        </AccountsCardsOfferingList>
        <Button
          variant={"primary"}
          className={cn(`h-12 w-full`)}
          corner={"rounded"}
        >
          Do some stuff
        </Button>
      </AccountsCards>

      <AccountsCards
        className={cn(`border-secondary-500/50 hover:shadow-secondary-500/10`)}
      >
        <AccountsCardsPopulerBadge />
        <AccountsCardsIcon
          className={cn(`bg-secondary-500/20 *:text-secondary-600`)}
        >
          <Zap className={cn(`size-6 md:size-8`)} />
        </AccountsCardsIcon>
        <AccountsCardsHeading>Pro Account</AccountsCardsHeading>
        <AccountsCardsSubHeading>
          For experienced traders
        </AccountsCardsSubHeading>

        <AccountsCardsOfferingList>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Minimum Deposit
            </span>
            <span className={cn(`text-secondary-600 text-sm font-semibold`)}>
              $500
            </span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Spread From
            </span>
            <span className={cn(`text-sm font-semibold`)}>0.1 pips</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Leverage</span>
            <span className={cn(`text-sm font-semibold`)}>1:1000</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Commission</span>
            <span className={cn(`text-sm font-semibold`)}>$4/lot</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Instruments
            </span>
            <span className={cn(`text-sm font-semibold`)}>200+</span>
          </AccountsCardsOfferingItem>
        </AccountsCardsOfferingList>
        <Button
          variant={"secondary"}
          className={cn(`h-12 w-full`)}
          corner={"rounded"}
        >
          Do some stuff
        </Button>
      </AccountsCards>

      <AccountsCards
        className={cn(`border-accent-500/50 hover:shadow-accent-500/10`)}
      >
        <AccountsCardsIcon className={cn(`bg-accent-500/20 *:text-accent-600`)}>
          <Bot className={cn(`size-6 md:size-8`)} />
        </AccountsCardsIcon>
        <AccountsCardsHeading>Pro Account</AccountsCardsHeading>
        <AccountsCardsSubHeading>
          For experienced traders
        </AccountsCardsSubHeading>

        <AccountsCardsOfferingList>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Minimum Deposit
            </span>
            <span className={cn(`text-accent-600 text-sm font-semibold`)}>
              $1,000
            </span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Spread From
            </span>
            <span className={cn(`text-sm font-semibold`)}>0.0 pips</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Leverage</span>
            <span className={cn(`text-sm font-semibold`)}>1:300</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>Commission</span>
            <span className={cn(`text-sm font-semibold`)}>$2/lot</span>
          </AccountsCardsOfferingItem>
          <AccountsCardsOfferingItem>
            <span className={cn(`text-foreground/50 text-sm`)}>
              Instruments
            </span>
            <span className={cn(`text-sm font-semibold`)}>300+</span>
          </AccountsCardsOfferingItem>
        </AccountsCardsOfferingList>
        <Button
          variant={"accent"}
          className={cn(`h-12 w-full`)}
          corner={"rounded"}
        >
          Do some stuff
        </Button>
      </AccountsCards>
    </div>
  );
}

export function CompareAcconts({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(`default-padding space-y-6 py-20`, className)}
      {...props}
    >
      <div className={cn(`text-center`)}>
        <h1
          className={cn(
            `font-brand-secondary text-2xl font-bold lg:text-4xl xl:text-5xl`,
          )}
        >
          <span>Compare </span>
          <span>Accounts</span>
        </h1>

        <p
          className={cn(
            `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
          )}
        >
          Side-by-side breakdown of all account features
        </p>
      </div>

      <div>
        <Table
          className={cn(
            `w-full border-collapse overflow-hidden rounded-xl border border-slate-700`,
          )}
        >
          <Thead>
            <Tr
              className={cn(
                `text-background dark:text-foreground bg-slate-900 text-left dark:bg-slate-800`,
              )}
            >
              <Th className={cn(``)}>Feature</Th>
              <Th className={cn(`text-primary-600`)}>Micro</Th>
              <Th className={cn(`text-secondary-600`)}>Pro</Th>
              <Th className={cn(`text-accent-600`)}>SyntX</Th>
            </Tr>
          </Thead>

          <Tbody className={cn(``)}>
            <Tr className={cn(``)}>
              <Td className={cn(`font-medium`)}>Minimum Deposit</Td>
              <Td className={cn(``)}>$10</Td>
              <Td className={cn(``)}>$500</Td>
              <Td className={cn(``)}>$1,000</Td>
            </Tr>

            <Tr className={cn(`bg-slate-800/30`)}>
              <Td className={cn(`font-medium`)}>Spreads From</Td>
              <Td className={cn(``)}>0.5 pips</Td>
              <Td className={cn(``)}>0.1 pips</Td>
              <Td className={cn(``)}>0.0 pips</Td>
            </Tr>

            <Tr className={cn(``)}>
              <Td className={cn(`font-medium`)}>Max Leverage</Td>
              <Td className={cn(``)}>1:500</Td>
              <Td className={cn(``)}>1:1000</Td>
              <Td className={cn(``)}>1:300</Td>
            </Tr>

            <Tr className={cn(`bg-slate-800/30`)}>
              <Td className={cn(`font-medium`)}>Commission</Td>
              <Td className={cn(``)}>None</Td>
              <Td className={cn(``)}>$4/lot</Td>
              <Td className={cn(``)}>$2/lot</Td>
            </Tr>

            <Tr className={cn(``)}>
              <Td className={cn(`font-medium`)}>Available Assets</Td>
              <Td className={cn(``)}>100+</Td>
              <Td className={cn(``)}>200+</Td>
              <Td className={cn(``)}>300+</Td>
            </Tr>

            <Tr className={cn(`bg-slate-800/30`)}>
              <Td className={cn(`font-medium`)}>EAs / Robots</Td>
              <Td className={cn(``)}>✗</Td>
              <Td className={cn(``)}>✓</Td>
              <Td className={cn(``)}>✓</Td>
            </Tr>

            <Tr className={cn(``)}>
              <Td className={cn(`font-medium`)}>Swap-Free Option</Td>
              <Td className={cn(``)}>✓</Td>
              <Td className={cn(``)}>✓</Td>
              <Td className={cn(``)}>✓</Td>
            </Tr>
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
            <span>Not Sure Which Account?</span>
          </h1>

          <p
            className={cn(
              `text-foreground/70 m-auto max-w-160 text-base lg:text-lg xl:text-xl`,
            )}
          >
            Our team can help you pick the right account based on your goals.
          </p>
        </div>

        <div className={cn(`flex items-center justify-center`)}>
          <Button corner={"circle"} className={cn(`h-12 px-8`)}>
            <span>
              <MessageCircle className={cn(`fill-foreground`)} />
            </span>
            <span>Chat with Our Experts.</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
