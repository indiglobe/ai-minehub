import { cn } from "@repo/styles/cn";
import type { ComponentProps } from "react";
import { useState } from "react";

const quickAmounts = [50, 100, 500, 1000];

export function WithdrawForm({
  className,
  ...props
}: ComponentProps<"section">) {
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
          Withdraw Funds
        </h2>

        <p
          className={cn(
            `mt-1 font-brand-primary text-xs text-foreground/50 sm:text-sm`,
          )}
        >
          Withdraw your funds securely to your cryptocurrency wallet
        </p>
      </div>

      <div className={cn(`mt-7 space-y-6`)}>
        {/* Source Wallet */}

        <div className={cn(`space-y-2`)}>
          <label
            htmlFor="withdraw-wallet"
            className={cn(
              `font-brand-primary text-xs font-medium text-foreground/60`,
            )}
          >
            Select Source Wallet
          </label>

          <select
            id="withdraw-wallet"
            className={cn(
              `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
            )}
          >
            <option>Mining Wallet</option>
            <option>Trading Wallet</option>
          </select>
        </div>

        {/* Network */}

        <div className={cn(`space-y-2`)}>
          <label
            htmlFor="withdraw-network"
            className={cn(
              `font-brand-primary text-xs font-medium text-foreground/60`,
            )}
          >
            Select Network
          </label>

          <select
            id="withdraw-network"
            className={cn(
              `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
            )}
          >
            <option>BSC (BEP20)</option>
            <option>TRX (TRC20)</option>
            <option>ETH (ERC20)</option>
            <option>Bitcoin</option>
          </select>
        </div>

        {/* Address */}

        <div className={cn(`space-y-2`)}>
          <label
            htmlFor="withdraw-address"
            className={cn(
              `font-brand-primary text-xs font-medium text-foreground/60`,
            )}
          >
            Withdrawal Address
          </label>

          <input
            id="withdraw-address"
            type="text"
            placeholder="Enter your wallet address"
            className={cn(
              `h-12 w-full rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-4 font-brand-primary text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all duration-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/10`,
            )}
          />
        </div>

        {/* Amount */}

        <div className={cn(`space-y-3`)}>
          <label
            htmlFor="withdraw-amount"
            className={cn(
              `font-brand-primary text-xs font-medium text-foreground/60`,
            )}
          >
            Amount (USD)
          </label>

          <input
            id="withdraw-amount"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter withdrawal amount"
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

        {/* Withdraw summary */}

        <div
          className={cn(
            `rounded-xl border border-secondary-200/30 bg-secondary-50/20 p-5`,
          )}
        >
          <div
            className={cn(
              `flex items-center justify-between gap-4 border-b border-secondary-200/20 pb-4`,
            )}
          >
            <span
              className={cn(
                `font-brand-primary text-xs text-foreground/50`,
              )}
            >
              Available Balance
            </span>

            <span
              className={cn(
                `font-brand-primary text-sm font-semibold text-secondary-500`,
              )}
            >
              $987.00
            </span>
          </div>

          <div
            className={cn(
              `flex items-center justify-between gap-4 pt-4`,
            )}
          >
            <span
              className={cn(
                `font-brand-primary text-xs text-foreground/50`,
              )}
            >
              Network Fee
            </span>

            <span
              className={cn(
                `font-brand-primary text-sm font-semibold text-foreground`,
              )}
            >
              $0.00
            </span>
          </div>
        </div>

        {/* Submit */}

        <button
          type="button"
          className={cn(
            `flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary-400 font-brand-primary text-sm font-bold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.99]`,
          )}
        >
          <span>📤</span>
          <span>Submit Withdrawal Request</span>
        </button>
      </div>
    </section>
  );
}