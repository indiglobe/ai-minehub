import Main from "@/components/main/main";
import { cn } from "@repo/styles/cn";
import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function About() {
  return (
    <Main>
      <PageHeading />

      <div className="default-padding bg-slate-300 py-10 lg:py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl space-y-10 lg:space-y-16">
          <div className="space-y-10 rounded-3xl border border-slate-600 bg-black/5 px-4 py-6 sm:px-8 sm:py-10 lg:space-y-12 lg:px-12 lg:py-14 dark:bg-white/3">
            <OurMission />
            <CoreValues />
          </div>

          <LicensingAndRegulation />
        </div>
      </div>
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
        "default-padding relative overflow-hidden py-16 text-center lg:py-24",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--color-secondary-500)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-primary-500)_20%,transparent)_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)] bg-size-[40px_40px] opacity-60 lg:bg-size-[56px_56px]"
      />

      <div className="relative mx-auto max-w-3xl">
        <h1 className="font-brand-secondary mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
          <span>About </span>
          <span className="text-secondary-500">Our Company</span>
        </h1>

        <p className="text-foreground/70 mx-auto max-w-2xl text-base leading-relaxed md:text-lg lg:text-xl">
          For over 19 years, we have been revolutionizing the algorithmic crypto
          trading landscape with transparent conditions and high-speed
          execution.
        </p>
      </div>
    </section>
  );
}

export function OurMission({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn(className)} {...props}>
      <h2 className="font-brand-secondary mb-4 text-2xl font-semibold lg:mb-6 lg:text-3xl xl:text-4xl">
        Our Mission
      </h2>

      <p className="text-foreground/70 max-w-4xl text-base leading-relaxed lg:text-lg">
        Our mission is to empower retail and institutional traders globally by
        providing unparalleled technological infrastructure, lightning-fast
        execution, and robust automated SyntX engines. We believe that everyone
        should have access to Wall Street-level tools without sacrificing the
        ethos of decentralized finance.
      </p>
    </section>
  );
}

export function CoreValues({ className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn(className)} {...props}>
      <h2 className="font-brand-secondary mb-4 text-2xl font-semibold lg:mb-6 lg:text-3xl xl:text-4xl">
        Core Values
      </h2>

      <ul className="text-foreground/70 space-y-5 text-base leading-relaxed lg:text-lg">
        <ValueItem title="Transparency">
          No hidden fees or unexpected commissions.
        </ValueItem>

        <ValueItem title="Innovation">
          Constantly deploying state-of-the-art server infrastructure.
        </ValueItem>

        <ValueItem title="Security">
          Military-grade encryption protecting every digital asset securely.
        </ValueItem>
      </ul>
    </section>
  );
}

function ValueItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <Check className="bg-accent-500 text-background mt-1 size-4 shrink-0 rounded-full p-1 md:size-5" />

      <span>
        <strong>{title}:</strong> {children}
      </span>
    </li>
  );
}

export function LicensingAndRegulation({
  className,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-slate-600 bg-black/5 px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14 dark:bg-white/3",
        className,
      )}
      {...props}
    >
      <h2 className="font-brand-secondary mb-4 text-2xl font-semibold lg:mb-6 lg:text-3xl xl:text-4xl">
        Licensing & Regulation
      </h2>

      <div className="text-foreground/70 max-w-4xl space-y-6 text-base leading-relaxed lg:text-lg">
        <p>
          We are fully licensed and regulated, respecting all industry standards
          and regulations. Our registration details are as follows:
        </p>

        <div className="space-y-5">
          <div>
            <h3 className="text-foreground mb-1 font-semibold">Vanuatu</h3>

            <p>
              Registration number <strong>40491</strong> with registered address
              at Office 1276, 1st Floor, Govant Building, Kumul Highway, Port
              Vila, Vanuatu.
            </p>
          </div>

          <div>
            <h3 className="text-foreground mb-1 font-semibold">Cyprus</h3>

            <p>
              Authorized and regulated by the Cyprus Securities and Exchange
              Commission (CySEC) as a Cyprus Investment Firm with license number
              <strong> 316/16</strong>, registration number
              <strong> HE345787</strong>, registered address at 36 Pafou Street,
              Vladimiros Court, 1st Floor, Limassol 3052, Cyprus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
