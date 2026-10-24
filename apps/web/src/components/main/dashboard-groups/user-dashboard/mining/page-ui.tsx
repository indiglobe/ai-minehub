import { cn } from "@repo/styles/cn";
import { useState } from "react";
import type { ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { Button } from "@repo/ui/button";
import { useForm } from "@tanstack/react-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { Input } from "@repo/ui/input";
import z from "zod";
import {
  useCreateMiningOrder,
  useReadMiningWallet,
  useUpdateOneMiningWallet,
} from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { tryCatch } from "@repo/utils/try-catch";

export function PassiveIncome({
  className,
  popular,
  ...props
}: ComponentProps<"div"> & { popular?: boolean }) {
  useGSAP(() => {
    gsap.to(".gsap-account-type", {
      opacity: 1,
      top: 0,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".gsap-account-type",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });

  return (
    <div
      data-slot={`passive-income`}
      data-popular={popular}
      className={cn(
        `group`,
        `bg-secondary-500/10 border-secondary-500/50 relative flex w-full flex-col items-center justify-center space-y-4 overflow-clip rounded-2xl border px-4 py-6 transition-transform hover:-translate-y-1 md:px-6 md:py-8`,
        `gsap-account-type relative top-10 opacity-0`,
        className,
      )}
      {...props}
    >
      {popular && (
        <span
          className={cn(
            `bg-primary-600 absolute top-8 -right-17 rotate-45 rounded-full px-20 py-0.5 text-xs uppercase`,
          )}
        >
          Popular
        </span>
      )}
      {props.children}
    </div>
  );
}

export function PassiveIncomeIcon({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`passive-income-icon`}
      className={cn(
        `flex size-16 shrink-0 items-center justify-center rounded-sm text-2xl`,
        className,
      )}
      {...props}
    />
  );
}

export function PassiveIncomeTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot={`passive-income-title`}
      className={cn(`font-brand-secondary text-2xl font-bold`, className)}
      {...props}
    />
  );
}

export function PassiveIncomeReturn({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot={`passive-income-return`}
      className={cn(
        `font-brand-secondary bg-accent-500/20 flex w-full flex-col items-center justify-center rounded-2xl p-8 font-bold`,
        className,
      )}
      {...props}
    >
      <div className={cn(`text-accent-500 text-2xl lg:text-3xl`)}>
        {props.children}
      </div>
      <div className={cn(`text-foreground/50 text-sm font-normal`)}>
        Total retun
      </div>
    </div>
  );
}

export function PassiveIncomeDescription({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot={`passive-income-description`}
      className={cn(`text-foreground/50 w-full space-y-4 text-sm`, className)}
      {...props}
    />
  );
}

export function PassiveIncomeDescriptionItem({
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot={`passive-income-description-item`}
      className={cn(`text-foreground/50 space-x-4 text-sm`, className)}
      {...props}
    >
      <Check
        className={cn(
          `bg-accent-500 inline-block size-4 rounded-full px-px text-white`,
        )}
      />
      <span>{props.children}</span>
    </li>
  );
}

// Investment validation schema
const createInvestmentSchema = (miningWalletBalance: number) =>
  z.object({
    amount: z
      .string()
      .trim()
      .min(1, "Please enter an investment amount.")
      .refine((value) => {
        const amount = Number(value);
        return Number.isFinite(amount) && amount > 0;
      }, "Amount must be greater than zero.")
      .refine((value) => {
        const amount = Number(value);
        return Number.isSafeInteger(amount * 100);
      }, "Enter a valid amount.")
      .refine((value) => {
        return Number(value) <= miningWalletBalance;
      }, "Amount exceeds your wallet balance."),
  });

export function PassiveIncomeCTA({
  miningProfilesUsed,
  userId,
  className,
  ...props
}: {
  miningProfilesUsed: string;
  userId: string;
} & ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const { data: miningWallet } = useReadMiningWallet();
  const miningWalletBalance = miningWallet?.balance ?? 0;

  const investmentSchema = createInvestmentSchema(miningWalletBalance);
  const { mutateAsync: createMiningOrder } = useCreateMiningOrder();
  const { mutateAsync: updateOneMiningWallet } = useUpdateOneMiningWallet();

  const form = useForm({
    defaultValues: {
      amount: "",
    },
    validators: {
      onChange: investmentSchema,
      onSubmit: investmentSchema,
    },
    onSubmit: async ({ value }) => {
      const amount = Number(value.amount);

      const [createMiningOrderError] = await tryCatch(
        createMiningOrder({
          data: {
            dataToInsert: {
              amountInvested: amount,
              miningProfileUsed: miningProfilesUsed,
              orderedBy: userId,
            },
          },
        }),
      );

      if (createMiningOrderError) {
        console.error(`Error in createMiningOrderError in PassiveIncomeCTA`);
        console.error(createMiningOrderError);
        throw createMiningOrderError;
      }

      const [updateOneMiningWalletError] = await tryCatch(
        updateOneMiningWallet({
          data: {
            dataToUpdate: { balance: miningWalletBalance - amount },
            identifier: { associatedUserId: userId },
          },
        }),
      );

      if (updateOneMiningWalletError) {
        console.error(
          `Error in updateOneMiningWalletError in PassiveIncomeCTA`,
        );
        console.error(updateOneMiningWalletError);
        throw updateOneMiningWalletError;
      }

      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className={cn(
            "group/btn border-accent-500 relative h-12 w-full overflow-hidden rounded-xl border bg-transparent transition-shadow hover:bg-transparent md:h-16",
            className,
          )}
          {...props}
        >
          <span className="from-secondary-500 to-accent-500 absolute inset-0 bg-linear-to-r opacity-0 transition-opacity group-hover/btn:opacity-100" />
          <span className="relative z-10">Start Mining</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md gap-5">
        <DialogHeader>
          <DialogTitle>Start Mining</DialogTitle>
          <DialogDescription>
            Enter the amount you want to invest.
          </DialogDescription>
        </DialogHeader>

        {/* Wallet Balance */}
        <div className="space-y-3 text-sm">
          <div className="border-accent-500/20 from-accent-500/10 via-background to-secondary-500/10 relative overflow-hidden rounded-xl border bg-linear-to-br p-5">
            <div className="bg-accent-500/10 absolute -top-8 -right-8 size-28 rounded-full blur-2xl" />

            <div className="relative space-y-2">
              <span className="text-muted-foreground text-sm font-medium">
                Available Wallet Balance
              </span>

              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-accent-500 text-2xl font-semibold">
                  $
                </span>

                <span className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
                  {miningWalletBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="text-muted-foreground text-xs">
                Maximum amount available to invest
              </p>
            </div>
          </div>
        </div>

        {/* Investment Form */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-2"
        >
          <form.Field name="amount">
            {(field) => {
              const errors = field.state.meta.errors;

              return (
                <div className="space-y-2">
                  <label
                    htmlFor="mining-amount"
                    className="text-sm font-medium"
                  >
                    Investment Amount ($)
                  </label>

                  <Input
                    id="mining-amount"
                    name={field.name}
                    type="text"
                    inputMode="decimal"
                    placeholder="Enter amount"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={errors.length > 0}
                  />

                  {errors.length > 0 && (
                    <p className="text-destructive text-xs" role="alert">
                      {errors
                        .map((error) =>
                          typeof error === "string" ? error : error?.message,
                        )
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  <p className="text-muted-foreground text-xs">
                    Available balance: $
                    {miningWalletBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              );
            }}
          </form.Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Confirm &amp; Start Mining</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
