import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import { DownloadIcon, Globe, Phone, Smartphone } from "lucide-react";
import type { ComponentProps } from "react";
import { FaAndroid, FaApple, FaWindows } from "react-icons/fa";
import { MetaTraderLogo } from "@repo/ui/meta-trader-logo";

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

type PlatformCard = {
  recommended?: boolean;
  name: string;
  subtitle: string;
  logoColor: string;
  accent: string;
  valuesColor: string;
  programming: string;
  timeframes: string;
  orderTypes: string;
  hedging: string;
  feature: string;
  featureValue: string;
  copyTrading: string;
  secondaryDownloads: {
    icon: React.ReactNode;
    label: string;
  }[];
};

const cards: PlatformCard[] = [
  {
    recommended: true,
    name: "MetaTrader 5",
    subtitle: "The next generation trading platform",
    logoColor: "bg-emerald-600",
    accent: "from-emerald-600 to-emerald-400 border-emerald-500/50",
    valuesColor: "text-emerald-400",
    programming: "MQL5",
    timeframes: "21",
    orderTypes: "6 pending",
    hedging: "Allowed",
    feature: "Economic Cal.",
    featureValue: "Built-in",
    copyTrading: "Supported",
    secondaryDownloads: [
      {
        icon: <FaApple size={18} />,
        label: "macOS",
      },
      {
        icon: <Smartphone size={18} />,
        label: "iOS",
      },
    ],
  },
  {
    name: "MetaTrader 4",
    subtitle: "The industry standard platform",
    logoColor: "bg-blue-500",
    accent: "from-sky-600 to-sky-400 border-sky-500/50",
    valuesColor: "text-sky-400",
    programming: "MQL4",
    timeframes: "9",
    orderTypes: "4 pending",
    hedging: "Allowed",
    feature: "Custom Indicators",
    featureValue: "Limited",
    copyTrading: "Available",
    secondaryDownloads: [
      {
        icon: <FaApple size={18} />,
        label: "macOS",
      },
      {
        icon: <Phone size={18} />,
        label: "Android",
      },
    ],
  },
];

function Row({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-700/40 py-4">
      <span className="text-slate-400">{label}</span>

      <span className={`font-mono font-semibold ${valueColor}`}>{value}</span>
    </div>
  );
}

export default function TradingPlatforms() {
  return (
    <section className="bg-[#050A13] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <PlatformCard></PlatformCard>

        {/* {cards.map((card) => (
          <div key={card.name} className="">
            {card.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="rounded-b-xl bg-emerald-500 px-6 py-1 text-sm font-semibold text-white">
                  ✓ Recommended
                </div>
              </div>
            )}

            <MetaTraderLogo />

            <h2 className="">{card.name}</h2>

            <p className="mt-3 text-center text-slate-400">{card.subtitle}</p>

            <div className="mt-10">
              <Row
                label="Programming"
                value={card.programming}
                valueColor={card.valuesColor}
              />

              <Row
                label="Timeframes"
                value={card.timeframes}
                valueColor={card.valuesColor}
              />

              <Row
                label="Order Types"
                value={card.orderTypes}
                valueColor={card.valuesColor}
              />

              <Row
                label="Hedging"
                value={card.hedging}
                valueColor={card.valuesColor}
              />

              <Row
                label={card.feature}
                value={card.featureValue}
                valueColor={card.valuesColor}
              />

              <Row
                label="Copy Trading"
                value={card.copyTrading}
                valueColor={card.valuesColor}
              />
            </div>

            <DownloadButtons>
              <DownloadWindows />
              <DownloadMacOS />
              <DownloadIOS />
            </DownloadButtons>
          </div>
        ))} */}
      </div>
    </section>
  );
}

export function DownloadButtons({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn(`grid grid-cols-2`, className)} {...props} />;
}

export function DownloadWindows({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `col-span-2 mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      {...props}
    >
      <FaWindows size={20} />
      Download for Windows
    </button>
  );
}

export function DownloadMacOS({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      {...props}
    >
      <FaApple size={20} />
      macOS
    </button>
  );
}

export function DownloadIOS({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      {...props}
    >
      <Smartphone size={20} />
      iOS
    </button>
  );
}

export function DownloadAndroid({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        `mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r text-lg font-semibold text-white`,
        className,
      )}
      {...props}
    >
      <FaAndroid size={20} />
      Android
    </button>
  );
}

export function StatRow({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn(`mt-10`, className)} {...props} />;
}

export function StatRowItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `flex items-center justify-between border-b border-slate-700/40 py-4`,
        className,
      )}
      {...props}
    />
  );
}

export function StatRowItemLabel({
  className,
  ...props
}: ComponentProps<"span">) {
  return <span className={cn(`text-slate-400`, className)} {...props} />;
}

export function StatRowItemValue({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span className={cn(`font-mono font-semibold`, className)} {...props} />
  );
}

export function PlatformCardHeading({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        `mt-6 text-center text-4xl font-bold text-white`,
        className,
      )}
      {...props}
    />
  );
}

export function PlatformCardSubHeading({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={cn(`mt-3 text-center text-slate-400`, className)}
      {...props}
    />
  );
}

export function PlatformCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `relative overflow-hidden rounded-3xl border p-8`,
        className,
      )}
      {...props}
    />
  );
}

export function PlatformCardRecomendation({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("absolute top-0 left-1/2 -translate-x-1/2")} {...props}>
      <div className="rounded-b-xl bg-emerald-500 px-6 py-1 text-sm font-semibold text-white">
        ✓ Recommended
      </div>
    </div>
  );
}
