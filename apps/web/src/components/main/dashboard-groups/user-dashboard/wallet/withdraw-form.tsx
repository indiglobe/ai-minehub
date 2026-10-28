import {
  useCreateMiningWalletWithdraws,
  useCreateTradingWalletWithdraw,
  useReadMiningWallet,
  useReadTradingWallet,
} from "@/integrations/tanstack/react-querry/dashboard/user.rq";
import { cn } from "@repo/styles/cn";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { ComponentProps } from "react";
import { QR_CODE } from "@repo/utils/const/qr";
import { tryCatch } from "@repo/utils/try-catch";
import { useRouteContext } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";

const quickAmounts = [50, 100, 500, 1000];

const withdrawSchema = z.object({
  sourceWallet: z.enum(["Mining Wallet", "Trading Wallet"]),
  network: z.enum(QR_CODE.map((q) => q.walletType)),
  withdrawalAddress: z.string().trim().min(1, "Withdrawal address is required"),
  amount: z
    .number("Please provide a valid withdrawal amount")
    .min(1, "Withdrawal amount must be at least $1")
    .refine((value) => Number.isFinite(value), {
      message: "Enter a valid amount",
    }),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

const defaultValues: WithdrawFormValues = {
  sourceWallet: "Mining Wallet",
  network: "BSC",
  withdrawalAddress: "",
  amount: 0,
};

export function WithdrawForm({
  className,
  ...props
}: ComponentProps<"section">) {
  const { data: miningWallet } = useReadMiningWallet();
  const { data: tradingWallet } = useReadTradingWallet();
  const { mutateAsync: createMiningWalletWithdraws } =
    useCreateMiningWalletWithdraws();
  const { mutateAsync: createTradingWalletWithdraw } =
    useCreateTradingWalletWithdraw();

  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/wallet/",
  });

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: withdrawSchema,
    },

    onSubmit: async ({ value }) => {
      const parsedValue = withdrawSchema.safeParse(value);

      if (!parsedValue.success) {
        throw new Error("Please check the withdrawal form fields.");
      }

      if (
        parsedValue.data.amount > (miningWallet?.balance ?? 0) &&
        parsedValue.data.sourceWallet === "Mining Wallet"
      ) {
        throw new Error("Insufficient balance in Mining Wallet.");
      }

      if (
        parsedValue.data.amount > (tradingWallet?.balance ?? 0) &&
        parsedValue.data.sourceWallet === "Trading Wallet"
      ) {
        throw new Error("Insufficient balance in Trading Wallet.");
      }

      const { sourceWallet, network, withdrawalAddress, amount } =
        parsedValue.data;

      const selectedWallet =
        sourceWallet === "Mining Wallet" ? miningWallet : tradingWallet;

      if (!selectedWallet?.id) {
        throw new Error(`${sourceWallet} is not available.`);
      }

      const { userId } = userDetailsFromCookie;

      if (value.sourceWallet === "Mining Wallet") {
        const [miningWalletWithdrawsError] = await tryCatch(
          createMiningWalletWithdraws({
            data: {
              dataToInsert: {
                amount: amount,
                cryptoWalletAddress: withdrawalAddress,
                orderedBy: userId,
                status: "PENDING",
                wallet: miningWallet!.id,
                withdrawalMethod: network,
              },
            },
          }),
        );

        if (miningWalletWithdrawsError) {
          console.error(
            "Error in miningWalletWithdrawsError in from-submission",
          );
          throw miningWalletWithdrawsError;
        }
      }

      if (value.sourceWallet === "Trading Wallet") {
        const [tradingWalletWithdrawError] = await tryCatch(
          createTradingWalletWithdraw({
            data: {
              dataToInsert: {
                amount: amount,
                cryptoWaletAddress: withdrawalAddress,
                orderedBy: userId,
                status: "PENDING",
                wallet: tradingWallet!.id,
                withdrawlMethod: network,
              },
            },
          }),
        );

        if (tradingWalletWithdrawError) {
          console.error(
            "Error in tradingWalletWithdrawError in from-submission",
          );
          throw tradingWalletWithdrawError;
        }
      }
    },
  });

  const fieldClass = cn(
    "border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-foreground placeholder:text-foreground/25 focus:border-primary-400 focus:ring-primary-400/10 h-12 w-full rounded-lg border px-4 text-sm outline-none transition-all focus:ring-2",
  );

  const labelClass = cn(
    "font-brand-primary text-foreground/60 text-xs font-medium",
  );

  return (
    <section
      className={cn(
        "border-secondary-200/20 bg-secondary-50/30 dark:border-secondary-200/30 dark:bg-secondary-50/20 w-full rounded-2xl border px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8",
        className,
      )}
      {...props}
    >
      <div>
        <h2 className="font-brand-primary text-foreground text-lg font-bold sm:text-xl">
          Withdraw Funds
        </h2>

        <p className="font-brand-primary text-foreground/50 mt-1 text-xs sm:text-sm">
          Withdraw your funds securely to your cryptocurrency wallet
        </p>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="mt-7 space-y-6"
      >
        {/* Source Wallet */}
        <form.Field name="sourceWallet">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor="withdraw-wallet" className={labelClass}>
                Select Source Wallet *
              </label>

              <Select
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(
                    value as WithdrawFormValues["sourceWallet"],
                  )
                }
                required
              >
                <SelectTrigger
                  id="withdraw-wallet"
                  className={fieldClass}
                  onBlur={field.handleBlur}
                >
                  <SelectValue placeholder="Select a source wallet" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Mining Wallet">Mining Wallet</SelectItem>

                  <SelectItem value="Trading Wallet">Trading Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Network */}

        <form.Field name="network">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor="withdraw-network" className={labelClass}>
                Select Network *
              </label>

              <select
                id="withdraw-network"
                name={field.name}
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value as WithdrawFormValues["network"],
                  )
                }
                className={fieldClass}
              >
                {QR_CODE.map((wallet) => (
                  <option key={wallet.walletType} value={wallet.walletType}>
                    {wallet.icon} {wallet.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form.Field>

        {/* Address */}

        <form.Field name="withdrawalAddress">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor="withdraw-address" className={labelClass}>
                Withdrawal Address *
              </label>

              <input
                id="withdraw-address"
                name={field.name}
                type="text"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter your wallet address"
                className={fieldClass}
              />
            </div>
          )}
        </form.Field>

        {/* Amount */}

        <form.Field name="amount">
          {(field) => (
            <div className="space-y-3">
              <label htmlFor="withdraw-amount" className={labelClass}>
                Amount (USD) *
              </label>

              <input
                id="withdraw-amount"
                name={field.name}
                type="number"
                inputMode="decimal"
                min="1"
                step="any"
                required
                value={field.state.value === 0 ? "" : field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target.value === "" ? 0 : Number(event.target.value),
                  )
                }
                placeholder="Enter withdrawal amount"
                className={fieldClass}
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => field.handleChange(quickAmount)}
                    className="border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-foreground hover:border-primary-400 hover:bg-primary-500/10 h-11 rounded-lg border text-sm font-semibold transition-all"
                  >
                    ${quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        {/* Withdraw summary */}

        <form.Subscribe selector={(state) => state.values.sourceWallet}>
          {(sourceWallet) => {
            const selectedWallet =
              sourceWallet === "Mining Wallet" ? miningWallet : tradingWallet;

            return (
              <div className="border-secondary-200/30 bg-secondary-50/20 rounded-xl border p-5">
                <div className="border-secondary-200/20 flex items-center justify-between gap-4 border-b pb-4">
                  <span className="font-brand-primary text-foreground/50 text-xs">
                    Available Balance
                  </span>

                  <span className="font-brand-primary text-secondary-500 text-sm font-semibold">
                    $
                    {(selectedWallet?.balance ?? 0).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4">
                  <span className="font-brand-primary text-foreground/50 text-xs">
                    Network Fee
                  </span>

                  <span className="font-brand-primary text-foreground text-sm font-semibold">
                    $0.00
                  </span>
                </div>
              </div>
            );
          }}
        </form.Subscribe>

        {/* Submit */}

        <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-400 font-brand-primary shadow-primary-500/30 hover:bg-primary-500 hover:shadow-primary-500/30 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>📤</span>

              <span>
                {isSubmitting ? "Submitting..." : "Submit Withdrawal Request"}
              </span>
            </button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}
