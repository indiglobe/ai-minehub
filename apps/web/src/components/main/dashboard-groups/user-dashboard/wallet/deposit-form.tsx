import { cn } from "@repo/styles/cn";
import { useForm } from "@tanstack/react-form";
import type { ComponentProps } from "react";

const paymentMethods = [
  {
    id: "bsc",
    icon: "🟡",
    name: "BSC (BEP20)",
  },
  {
    id: "trx",
    icon: "🔴",
    name: "TRX (TRC20)",
  },
  {
    id: "eth",
    icon: "🔷",
    name: "ETH (ERC20)",
  },
  {
    id: "btc",
    icon: "₿",
    name: "Bitcoin",
  },
];

const quickAmounts = [50, 100, 500, 1000];

export function DepositForm({
  className,
  ...props
}: ComponentProps<"section">) {
  const form = useForm({
    defaultValues: {
      destinationWallet: "Mining Wallet",
      paymentMethod: "bsc",
      amount: "",
      transactionHash: "",
      paymentProof: null as File | null,
    },

    onSubmit: async ({ value }) => {
      const selectedPaymentMethod = paymentMethods.find(
        (method) => method.id === value.paymentMethod,
      );

      console.log("Deposit Form Data:", {
        destinationWallet: value.destinationWallet,
        paymentMethod: selectedPaymentMethod,
        amount: value.amount,
        transactionHash: value.transactionHash,
        paymentProof: value.paymentProof,
      });
    },
  });

  return (
    <section
      className={cn(
        `w-full rounded-2xl border border-secondary-200/20 bg-secondary-50/30 px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 dark:border-secondary-200/30 dark:bg-secondary-50/20`,
        className,
      )}
      {...props}
    >
      <div>
        <h2
          className={cn(
            `font-brand-primary text-lg font-bold text-foreground sm:text-xl`,
          )}
        >
          Deposit Funds
        </h2>

        <p
          className={cn(
            `mt-1 font-brand-primary text-xs text-foreground/50 sm:text-sm`,
          )}
        >
          Select wallet and choose payment method
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className={cn(`mt-7 space-y-6`)}
      >
        {/* Destination Wallet */}
        <form.Field name="destinationWallet">
          {(field) => (
            <div className={cn(`space-y-2`)}>
              <label
                htmlFor="destination-wallet"
                className={cn(
                  `font-brand-primary text-xs font-medium text-foreground/60`,
                )}
              >
                Select Destination Wallet
              </label>

              <select
                id="destination-wallet"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                className={cn(
                  `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10 dark:border-secondary-200/30 dark:bg-secondary-50/20`,
                )}
              >
                <option value="Mining Wallet">Mining Wallet</option>
                <option value="Trading Wallet">Trading Wallet</option>
              </select>
            </div>
          )}
        </form.Field>

        {/* Payment Method */}
        <form.Field name="paymentMethod">
          {(field) => (
            <div className={cn(`space-y-3`)}>
              <p
                className={cn(
                  `font-brand-primary text-xs font-medium text-foreground/60`,
                )}
              >
                Choose Payment Method
              </p>

              <div
                className={cn(
                  `grid grid-cols-2 gap-3 sm:grid-cols-4`,
                )}
              >
                {paymentMethods.map((method) => {
                  const isSelected = field.state.value === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => field.handleChange(method.id)}
                      className={cn(
                        `flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border px-3 py-4 font-brand-primary transition-all duration-300`,
                        isSelected
                          ? `border-primary-400 bg-primary-500/10 shadow-md shadow-primary-500/10`
                          : `border-secondary-200/30 bg-secondary-50/20 hover:border-secondary-400/50`,
                      )}
                    >
                      <span
                        className={cn(
                          `flex size-10 items-center justify-center text-3xl`,
                        )}
                      >
                        {method.icon}
                      </span>

                      <span
                        className={cn(
                          `text-center text-xs font-semibold text-foreground`,
                        )}
                      >
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
            <div className={cn(`space-y-3`)}>
              <label
                htmlFor="deposit-amount"
                className={cn(
                  `font-brand-primary text-xs font-medium text-foreground/60`,
                )}
              >
                Amount (USD)
              </label>

              <input
                id="deposit-amount"
                name={field.name}
                type="number"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Enter deposit amount"
                className={cn(
                  `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
                )}
              />

              <div
                className={cn(
                  `grid grid-cols-2 gap-3 sm:grid-cols-4`,
                )}
              >
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() =>
                      field.handleChange(String(quickAmount))
                    }
                    className={cn(
                      `h-11 rounded-lg border border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary-400 hover:bg-primary-500/10`,
                    )}
                  >
                    ${quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form.Field>

        {/* Transaction Hash */}
        <form.Field name="transactionHash">
          {(field) => (
            <div className={cn(`space-y-2`)}>
              <label
                htmlFor="transaction-hash"
                className={cn(
                  `font-brand-primary text-xs font-medium text-foreground/60`,
                )}
              >
                Transaction ID / Hash
              </label>

              <input
                id="transaction-hash"
                name={field.name}
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                placeholder="Paste the transaction hash"
                className={cn(
                  `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
                )}
              />
            </div>
          )}
        </form.Field>

        {/* Proof */}
        <form.Field name="paymentProof">
          {(field) => (
            <div className={cn(`space-y-2`)}>
              <label
                htmlFor="payment-proof"
                className={cn(
                  `font-brand-primary text-xs font-medium text-foreground/60`,
                )}
              >
                Proof of Payment (Screenshot)
              </label>

              <div
                className={cn(
                  `flex min-h-12 items-center rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-3`,
                )}
              >
                <input
                  id="payment-proof"
                  name={field.name}
                  type="file"
                  accept="image/*"
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    field.handleChange(
                      event.target.files?.[0] ?? null,
                    );
                  }}
                  className={cn(
                    `w-full font-brand-primary text-xs text-foreground/50 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-foreground file:px-3 file:py-2 file:text-xs file:font-medium file:text-background`,
                  )}
                />
              </div>

              <p
                className={cn(
                  `font-brand-primary text-2.5 text-foreground/30`,
                )}
              >
                Upload a screenshot of your successful transaction.
              </p>
            </div>
          )}
        </form.Field>

        {/* Payment Details */}
        <div
          className={cn(
            `rounded-xl border border-secondary-200/30 bg-secondary-50/20 p-5 sm:p-6`,
          )}
        >
          <h3
            className={cn(
              `flex items-center gap-2 font-brand-primary text-sm font-semibold text-accent-500`,
            )}
          >
            <span>🚩</span>
            <span>Send Payment To</span>
          </h3>

          <div className={cn(`mt-5`)}>
            <div
              className={cn(
                `flex items-center justify-between gap-4 border-b border-secondary-200/20 py-4`,
              )}
            >
              <span
                className={cn(
                  `font-brand-primary text-xs text-foreground/50`,
                )}
              >
                Network:
              </span>

              <span
                className={cn(
                  `font-brand-primary text-xs font-semibold text-foreground`,
                )}
              >
                BSC (BEP20)
              </span>
            </div>

            <div
              className={cn(
                `border-b border-secondary-200/20 py-4 sm:flex sm:items-center sm:justify-between sm:gap-4`,
              )}
            >
              <span
                className={cn(
                  `font-brand-primary text-xs text-foreground/50`,
                )}
              >
                Wallet Address:
              </span>

              <div
                className={cn(
                  `mt-3 flex min-w-0 items-center gap-3 sm:mt-0`,
                )}
              >
                <span
                  className={cn(
                    `max-w-45 truncate font-brand-primary text-xs text-foreground/50 3xs:max-w-55 sm:max-w-80`,
                  )}
                >
                  0xa9983eB2EBDf93A2c35D02731dA2C8A6C263d86ED
                </span>

                <button
                  type="button"
                  className={cn(
                    `h-9 shrink-0 rounded-lg bg-primary-400 px-4 font-brand-primary text-xs font-semibold text-white shadow-md shadow-primary-500/20 transition-all duration-200 hover:bg-primary-500`,
                  )}
                >
                  Copy
                </button>
              </div>
            </div>

            <div
              className={cn(
                `flex items-center justify-between gap-5 pt-5`,
              )}
            >
              <span
                className={cn(
                  `font-brand-primary text-xs text-foreground/50`,
                )}
              >
                QR Code:
              </span>

              <div
                className={cn(
                  `flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-foreground p-2 sm:size-28`,
                )}
              >
                {/* Keep your existing QR image src here */}
                <img
                  src="YOUR_EXISTING_QR_CODE_SRC"
                  alt="Payment QR Code"
                  className={cn(`size-full object-contain`)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                `flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-400 font-brand-primary text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60`,
              )}
            >
              <span>✓</span>

              <span>
                {isSubmitting
                  ? "Submitting..."
                  : "Submit Deposit Request"}
              </span>
            </button>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}