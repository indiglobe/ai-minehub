import { cn } from "@repo/styles/cn";
import { TRANSACTION_METHOD } from "@repo/utils/db-enums";
import { QR_CODE } from "@repo/utils/const/qr";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import type { ComponentProps } from "react";
import { useState } from "react";
import { tryCatch } from "@repo/utils/try-catch";
import {
  useCreateMiningWalletDeposits,
  useCreateTradingWalletDeposits,
  useFetchMiningWallet,
  useFetchTradingWallet,
} from "@/integrations/tanstack/react-querry/dashboard/user-dashboard";
import { useRouteContext } from "@tanstack/react-router";

const quickAmounts = [50, 100, 500, 1000];

const depositSchema = z.object({
  destinationWallet: z.enum(["Mining Wallet", "Trading Wallet"]),
  paymentMethod: z.enum(TRANSACTION_METHOD),
  amount: z
    .number("Please provide valid number as amount")
    .min(1, "Deposit amount is required")
    .refine((value) => Number.isFinite(value), {
      message: "Enter a valid amount",
    }),
  transactionHash: z
    .string()
    .trim()
    .min(1, "Transaction ID / Hash is required"),
  paymentProof: z.url("Proof of payment is required"),
});

type DepositFormValues = z.infer<typeof depositSchema>;

const defaultValues: DepositFormValues = {
  destinationWallet: "Mining Wallet",
  paymentMethod: "BSC",
  amount: 0,
  transactionHash: "",
  paymentProof: "",
};

export function DepositForm({
  className,
  ...props
}: ComponentProps<"section">) {
  const { userDetailsFromCookie } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(basic)/wallet/",
  });

  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: miningWalletDeposits } = useCreateMiningWalletDeposits();
  const { data: miningWallet } = useFetchMiningWallet();
  const { data: tradingWallet } = useFetchTradingWallet();
  const { mutateAsync: tradingWalletDeposits } =
    useCreateTradingWalletDeposits();

  const form = useForm({
    defaultValues,

    validators: {
      onSubmit: depositSchema,
    },

    onSubmit: async ({ value }) => {
      if (!file) {
        throw new Error(`File is needed`);
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        publicURL?: string;
        message?: string;
      };

      if (!response.ok || !result.publicURL) {
        throw new Error(result.message ?? "Upload failed.");
      }

      const publicURL = result.publicURL;

      form.setFieldValue("paymentProof", publicURL);

      const parsed = depositSchema.safeParse(value);

      if (!parsed.success) {
        throw new Error(`Error in parsing in subnit`);
      }
      const { amount, paymentMethod, transactionHash } = value;

      const { userId } = userDetailsFromCookie;

      if (value.destinationWallet === "Mining Wallet") {
        const [depositingToMiningWalletError] = await tryCatch(
          miningWalletDeposits({
            data: {
              dataToInsert: {
                amount,
                depositMethod: paymentMethod,
                depositProof: publicURL,
                orderedBy: userId,
                transactionId: transactionHash,
                wallet: miningWallet!.id,
              },
            },
          }),
        );

        if (depositingToMiningWalletError) {
          console.error(
            "Error in depositingToMiningWalletError in from-submission",
          );
          throw depositingToMiningWalletError;
        }

        // Handle mining wallet deposit.
      } else if (value.destinationWallet === "Trading Wallet") {
        // Handle trading wallet deposit.
        const [depositingToTradingWalletError] = await tryCatch(
          tradingWalletDeposits({
            data: {
              dataToInsert: {
                amount,
                depositMethod: paymentMethod,
                depositProof: publicURL,
                orderedBy: userId,
                transactionId: transactionHash,
                wallet: tradingWallet!.id,
              },
            },
          }),
        );

        if (depositingToTradingWalletError) {
          console.error(
            "Error in depositingToTradingWalletError in from-submission",
          );
          throw depositingToTradingWalletError;
        }
      }

      form.reset();
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
          Deposit Funds
        </h2>

        <p className="font-brand-primary text-foreground/50 mt-1 text-xs sm:text-sm">
          Select wallet and choose payment method
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
        {/* Destination wallet */}
        <form.Field name="destinationWallet">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor="destination-wallet" className={labelClass}>
                Select Destination Wallet *
              </label>

              <select
                id="destination-wallet"
                name={field.name}
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(
                    event.target
                      .value as DepositFormValues["destinationWallet"],
                  )
                }
                className={fieldClass}
              >
                <option value="Mining Wallet">Mining Wallet</option>
                <option value="Trading Wallet">Trading Wallet</option>
              </select>
            </div>
          )}
        </form.Field>

        {/* Payment method */}
        <form.Field name="paymentMethod">
          {(field) => (
            <div className="space-y-3">
              <p className={labelClass}>Choose Payment Method *</p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {QR_CODE.map((method) => {
                  const selected = field.state.value === method.walletType;

                  return (
                    <button
                      key={method.walletType}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        field.handleChange(method.walletType);
                      }}
                      className={cn(
                        "font-brand-primary flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border px-3 py-4 transition-all",
                        selected
                          ? "border-primary-400 bg-primary-500/10 shadow-primary-500/10 shadow-md"
                          : "border-secondary-200/30 bg-secondary-50/20 hover:border-secondary-400/50",
                      )}
                    >
                      <span className="flex size-10 items-center justify-center text-3xl">
                        {method.icon}
                      </span>

                      <span className="text-foreground text-center text-xs font-semibold">
                        {method.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </form.Field>

        {/* Amount */}
        <form.Field name="amount">
          {(field) => (
            <div className="space-y-3">
              <label htmlFor="deposit-amount" className={labelClass}>
                Amount (USD) *
              </label>

              <input
                id="deposit-amount"
                name={field.name}
                type="text"
                inputMode="numeric"
                min="0"
                step="10"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(Number(event.target.value))
                }
                placeholder="Enter deposit amount"
                className={fieldClass}
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => field.handleChange(amount)}
                    className="border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-foreground hover:border-primary-400 hover:bg-primary-500/10 h-11 rounded-lg border text-sm font-semibold transition-all"
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        {/* Transaction hash */}
        <form.Field name="transactionHash">
          {(field) => (
            <div className="space-y-2">
              <label htmlFor="transaction-hash" className={labelClass}>
                Transaction ID / Hash *
              </label>

              <input
                id="transaction-hash"
                name={field.name}
                type="text"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Paste the transaction hash"
                className={fieldClass}
              />
            </div>
          )}
        </form.Field>

        <div className="space-y-2">
          <label htmlFor="payment-proof" className={labelClass}>
            Proof of Payment (Screenshot) *
          </label>

          <div className="border-secondary-200/30 bg-secondary-50/20 flex min-h-12 items-center rounded-lg border px-3">
            <input
              id="payment-proof"
              type="file"
              accept="image/*"
              required
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="font-brand-primary text-foreground/50 file:bg-foreground file:text-background w-full text-xs file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:px-3 file:py-2 file:text-xs file:font-medium"
            />
          </div>

          <p className="font-brand-primary text-foreground/40 text-xs">
            Image only, maximum 5 MB.
          </p>
        </div>

        {/* Dynamic payment details */}
        <form.Field name="paymentMethod">
          {(field) => {
            const selectedMethod = QR_CODE.find(
              (method) => method.walletType === field.state.value,
            );

            if (!selectedMethod) {
              return (
                <p role="alert" className="text-sm text-red-500">
                  Payment method details could not be found.
                </p>
              );
            }

            return (
              <div className="border-secondary-200/30 bg-secondary-50/20 rounded-xl border p-5 sm:p-6">
                <h3 className="font-brand-primary text-accent-500 flex items-center gap-2 text-sm font-semibold">
                  <span>🚩</span>
                  <span>Send Payment To</span>
                </h3>

                <div className="mt-5">
                  {/* Network */}
                  <div className="border-secondary-200/20 flex items-center justify-between gap-4 border-b py-4">
                    <span className="font-brand-primary text-foreground/50 text-xs">
                      Network:
                    </span>

                    <span className="font-brand-primary text-foreground text-right text-xs font-semibold">
                      {selectedMethod.name}
                    </span>
                  </div>

                  {/* Wallet address */}
                  <div className="border-secondary-200/20 border-b py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <span className="font-brand-primary text-foreground/50 text-xs">
                      Wallet Address:
                    </span>

                    <div className="mt-3 flex min-w-0 items-center gap-3 sm:mt-0">
                      <span className="font-brand-primary text-foreground/70 max-w-45 truncate text-xs sm:max-w-80">
                        {selectedMethod.walletId}
                      </span>

                      <button
                        type="button"
                        onClick={() => {
                          void navigator.clipboard
                            .writeText(selectedMethod.walletId)
                            .catch((error: unknown) => {
                              console.error(
                                "Unable to copy wallet address:",
                                error,
                              );
                            });
                        }}
                        className="bg-primary-400 hover:bg-primary-500 h-9 shrink-0 rounded-lg px-4 text-xs font-semibold text-white"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  {/* QR code */}
                  <div className="flex flex-col items-center gap-3 pt-5">
                    <p className="font-brand-primary text-foreground/50 text-xs">
                      Scan QR Code to Pay
                    </p>

                    <div className="border-secondary-200/30 rounded-xl border bg-white p-3">
                      <img
                        key={selectedMethod.walletType}
                        src={selectedMethod.walletImageSource}
                        alt={`${selectedMethod.name} payment QR code`}
                        className="size-48 object-contain sm:size-56"
                      />
                    </div>

                    <p className="font-brand-primary text-foreground/40 text-center text-xs">
                      Send funds only through the {selectedMethod.name} network.
                    </p>
                  </div>
                </div>
              </div>
            );
          }}
        </form.Field>

        {/* Submit button */}
        <form.Subscribe selector={(state) => [state.isSubmitting] as const}>
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-400 hover:bg-primary-500 flex h-14 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span>✓</span>

              <span>
                {isSubmitting ? "Submitting..." : "Submit Deposit Request"}
              </span>
            </button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}
