import { useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Plus,
  Minus,
  Wallet,
  BarChart3,
  ArrowUpRight,
  Layers,
  ArrowRightLeft,
  Receipt,
} from "lucide-react";
import { Button } from "@repo/ui/button";

export function WalletManagement() {
  const router = useRouter();

  return (
    <div className={cn(`default-padding @container space-y-6 py-10`)}>
      {/* Top Action Buttons */}
      <div className={cn(`flex flex-wrap items-center gap-3`)}>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => router.history.back()}
        >
          <ArrowLeft className={cn(`size-4`)} />
          Back to Users
        </Button>

        {/* ADD MONEY DIALOG */}
        <AddMoneyDialog />

        <Button size="sm" variant={"destructive"} className={cn(``)}>
          <Minus className={cn(`size-4`)} />
          Deduct Money
        </Button>
      </div>

      {/* Grid: Wallet Management & Wallet Statistics */}
      <div className={cn(`grid grid-cols-1 gap-6 lg:grid-cols-2`)}>
        <WalletManagementCard />
        <WalletStatisticsCard />
      </div>

      {/* Transaction History */}
      <TransactionHistoryCard />
    </div>
  );
}

/* =========================================================
   ADD MONEY DIALOG
========================================================= */

export function AddMoneyDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const [wallet, setWallet] = useState("mining");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("bonus");
  const [description, setDescription] = useState("");

  const handleAddMoney = () => {
    console.log({
      wallet,
      amount,
      type,
      description,
    });

    setIsOpen(false);

    setAmount("");
    setDescription("");
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <Button
        size="sm"
        variant={"success"}
        onClick={() => setIsOpen(true)}
      >
        <Plus className={cn(`size-4`)} />
        Add Money
      </Button>

      {/* DIALOG */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-money-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
          className={cn(
            `fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4`,
          )}
        >
          <div
            className={cn(
              `w-full max-w-135 rounded-2xl border border-secondary-200/30 bg-background p-5 sm:p-7`,
            )}
          >
          {/* HEADER */}
          <div>
            <h2
              id="add-money-title"
              className={cn(
                `flex items-center gap-3 font-brand-secondary text-lg font-semibold text-foreground`,
              )}
            >
              <span
                className={cn(
                  `flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-500`,
                )}
              >
                <Plus className={cn(`size-4 text-white`)} />
              </span>

              Add Money to Wallet
            </h2>
          </div>

          {/* FORM */}
          <div className={cn(`mt-6 space-y-5`)}>
            {/* WALLET */}
            <div>
              <label
                htmlFor="wallet"
                className={cn(
                  `mb-2 block font-brand-primary text-sm font-medium text-foreground/60`,
                )}
              >
                Wallet
              </label>

              <select
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className={cn(
                  `h-12 w-full rounded-lg border px-4 border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm text-foreground outline-none transition-colors focus:border-secondary-500`,
                )}
              >
                <option value="mining">Mining Wallet</option>
                <option value="trading">Trading Wallet</option>
              </select>
            </div>

            {/* AMOUNT */}
            <div>
              <label
                htmlFor="amount"
                className={cn(
                  `mb-2 block font-brand-primary text-sm font-medium text-foreground/60`,
                )}
              >
                Amount ($)
              </label>

              <input
                id="amount"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className={cn(
                  `h-12 w-full rounded-lg border px-4 border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-secondary-500`,
                )}
              />
            </div>

            {/* TYPE */}
            <div>
              <label
                htmlFor="money-type"
                className={cn(
                  `mb-2 block font-brand-primary text-sm font-medium text-foreground/60`,
                )}
              >
                Type
              </label>

              <select
                id="money-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={cn(
                  `h-12 w-full rounded-lg border px-4 border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm text-foreground outline-none transition-colors focus:border-secondary-500`,
                )}
              >
                <option value="bonus">Bonus</option>
                <option value="deposit">Deposit</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                htmlFor="description"
                className={cn(
                  `mb-2 block font-brand-primary text-sm font-medium text-foreground/60`,
                )}
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Reason for adding money..."
                rows={5}
                className={cn(
                  `w-full resize-none rounded-lg border px-4 py-3 border-secondary-200/30 bg-secondary-50/20 font-brand-primary text-sm text-foreground placeholder:text-foreground/35 outline-none transition-colors focus:border-secondary-500`,
                )}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div
            className={cn(
              `mt-6 flex flex-row justify-end gap-3`,
            )}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className={cn(
                `m-0 rounded-lg border border-secondary-200/30 bg-secondary-50/20 px-5 font-brand-primary text-foreground hover:bg-secondary-50/40`,
              )}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant={"success"}
              onClick={handleAddMoney}
              className={cn(`px-5`)}
            >
              Add Money
            </Button>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   WALLET MANAGEMENT CARD
========================================================= */

export function WalletManagementCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <Wallet className={cn(`text-secondary-500 size-4`)} />

        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          User Wallets
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div className={cn(`space-y-6`)}>
        <div>
          <h3 className={cn(`font-brand-secondary text-base font-semibold`)}>
            Wallet Management
          </h3>
        </div>

        <div
          className={cn(
            `bg-foreground/5 border-foreground/10 space-y-4 rounded-xl border p-4`,
          )}
        >
          <div className={cn(`text-center font-medium`)}>
            dsfsd dsfsf
          </div>

          <div
            className={cn(
              `bg-foreground/5 border-foreground/10 space-y-3 rounded-lg border p-3`,
            )}
          >
            <div
              className={cn(
                `text-foreground/70 text-xs font-semibold`,
              )}
            >
              Quick Info
            </div>

            <div className={cn(`grid grid-cols-2 gap-4 text-xs`)}>
              <div className={cn(`flex flex-col gap-1`)}>
                <span className={cn(`text-foreground/50`)}>
                  Email
                </span>

                <span className={cn(`font-medium`)}>
                  birthday@yzcalo.com
                </span>
              </div>

              <div className={cn(`flex flex-col gap-1`)}>
                <span className={cn(`text-foreground/50`)}>
                  Joined
                </span>

                <span className={cn(`font-medium`)}>
                  Sep 07, 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WALLET STATISTICS
========================================================= */

export function WalletStatisticsCard({
  className,
  ...props
}: ComponentProps<"div">) {
  const stats = [
    {
      label: "Total Withdrawals",
      value: "$0.00",
      icon: <ArrowUpRight className={cn(`size-4 text-red-500`)} />,
      valueColor: "text-red-500",
    },
    {
      label: "Total Mining",
      value: "$0.00",
      icon: <Layers className={cn(`text-primary-500 size-4`)} />,
      valueColor: "text-foreground",
    },
    {
      label: "Total Transactions",
      value: "0",
      icon: <ArrowRightLeft className={cn(`size-4 text-blue-500`)} />,
      valueColor: "text-foreground",
    },
  ];

  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <BarChart3 className={cn(`text-secondary-500 size-4`)} />

        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          Wallet Statistics
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div className={cn(`space-y-6`)}>
        {stats.map((stat, index) => (
          <div key={index} className={cn(`flex flex-col gap-1`)}>
            <div className={cn(`flex items-center justify-between`)}>
              <span className={cn(`text-foreground/50 text-xs`)}>
                {stat.label}
              </span>

              <div
                className={cn(
                  `bg-foreground/5 border-foreground/10 flex size-8 items-center justify-center rounded-md border`,
                )}
              >
                {stat.icon}
              </div>
            </div>

            <span
              className={cn(
                `text-xl font-semibold`,
                stat.valueColor,
              )}
            >
              {stat.value}
            </span>

            {index < stats.length - 1 && (
              <hr
                className={cn(
                  `border-foreground/10 -mx-6 mt-5`,
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   TRANSACTION HISTORY
========================================================= */

export function TransactionHistoryCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <Receipt className={cn(`text-secondary-500 size-4`)} />

        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          Transaction History
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      <div
        className={cn(
          `flex flex-col items-center justify-center py-12 text-center`,
        )}
      >
        <div
          className={cn(
            `bg-foreground/5 border-foreground/10 text-foreground/40 mb-3 flex size-14 items-center justify-center rounded-full border text-2xl`,
          )}
        >
          📄
        </div>

        <p className={cn(`text-foreground/50 text-sm`)}>
          No transactions yet
        </p>
      </div>
    </div>
  );
}