import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useState } from "react";

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
  const [selectedPayment, setSelectedPayment] = useState("bsc");
  const [amount, setAmount] = useState("");

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

      <div className={cn(`mt-7 space-y-6`)}>
        {/* Destination Wallet */}

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
            className={cn(
              `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10 dark:border-secondary-200/30 dark:bg-secondary-50/20`,
            )}
          >
            <option>Mining Wallet</option>
            <option>Trading Wallet</option>
          </select>
        </div>

        {/* Payment Method */}

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
              const isSelected = selectedPayment === method.id;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPayment(method.id)}
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

        {/* Amount */}

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
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
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
                onClick={() => setAmount(String(quickAmount))}
                className={cn(
                  `h-11 rounded-lg border border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary-400 hover:bg-primary-500/10`,
                )}
              >
                ${quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Hash */}

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
            type="text"
            placeholder="Paste the transaction hash"
            className={cn(
              `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
            )}
          />
        </div>

        {/* Proof */}

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
              type="file"
              accept="image/*"
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
                <img
                  src="data:image/png;base64,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"
                  alt="Payment QR Code"
                  className={cn(`size-full object-contain`)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}

        <button
          type="button"
          className={cn(
            `flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-400 font-brand-primary text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.99]`,
          )}
        >
          <span>✓</span>
          <span>Submit Deposit Request</span>
        </button>
      </div>
    </section>
  );
}