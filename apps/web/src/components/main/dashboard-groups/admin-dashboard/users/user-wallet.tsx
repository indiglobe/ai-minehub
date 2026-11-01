import { useMemo, useState } from "react";
import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Plus,
  Minus,
  BarChart3,
  ArrowUpRight,
  ArrowRightLeft,
  Receipt,
  RefreshCw,
  XCircle,
  ArrowDownLeft,
  Coins,
  Clock3,
  CheckCircle2,
  ArrowDownRight,
  Zap,
  User,
  Wallet,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  useReadActiveMiningOrdersOfUser,
  useReadAllMiningOrdersOfUser,
  useReadCompletedMiningOrdersOfUser,
} from "@/integrations/tanstack/react-querry/mining-order/admin.rq";
import { useReadAllMiningWalletDepositOfUser } from "@/integrations/tanstack/react-querry/mining-wallet-deposits/admin.rq";
import { useReadAllMiningWalletWithdrawOfUser } from "@/integrations/tanstack/react-querry/mining-wallet-withdraw/admin.rq";
import { useReadAllTradingWalletDepositOfUser } from "@/integrations/tanstack/react-querry/trading-wallet-deposits/admin.rq";
import { useReadAllTradingWalletWithdrawOfUser } from "@/integrations/tanstack/react-querry/trading-wallet-withdraw/admin.rq";
import { useReadOneUser } from "@/integrations/tanstack/react-querry/user/admin.rq";
import {
  useAddMiningWalletBalance,
  useDeductMiningWalletBalance,
  useReadOneMiningWallet,
} from "@/integrations/tanstack/react-querry/mining-wallet/admin.rq";
import { useReadOneTradingWallet } from "@/integrations/tanstack/react-querry/trading-wallet/admin.rq";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { Input } from "@repo/ui/input";

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

        <div className="flex items-center gap-2">
          <AddMoneyDialog />

          <DeductMoneyDialog />
        </div>
      </div>

      {/* Grid: Wallet Management & Wallet Statistics */}
      <div className={cn(`grid grid-cols-1 gap-6 lg:grid-cols-2`)}>
        <UserInformationCard />
        <StatisticsCard />
      </div>

      {/* Transaction History */}
      <RecentTransactionsCard />
    </div>
  );
}

export function UserInformationCard({
  className,
  ...props
}: ComponentProps<"div">) {
  const { userId } = useParams({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
  });

  const { data: userDetails } = useReadOneUser(userId);
  const { data: miningWallet } = useReadOneMiningWallet(userId);
  const { data: tradingWallet } = useReadOneTradingWallet(userId);

  if (!userDetails) return null;

  return (
    <div
      className={cn(
        `bg-secondary-500/5 border-secondary-500/20 @container rounded-2xl border px-6 py-6`,
        className,
      )}
      {...props}
    >
      <div className={cn(`flex items-center gap-2`)}>
        <User className={cn(`text-secondary-500 size-4`)} />
        <h2 className={cn(`font-brand-secondary text-sm font-semibold`)}>
          User Information
        </h2>
      </div>

      <hr className={cn(`border-foreground/20 -mx-6 my-5`)} />

      {/* Avatar & Name */}
      <div className={cn(`flex flex-col items-center pb-6 text-center`)}>
        <div
          className={cn(
            `bg-secondary-500 mb-3 flex size-16 items-center justify-center rounded-full text-xl font-bold text-white`,
          )}
        >
          {userDetails.fullName[0]}
        </div>
        <h3 className={cn(`font-brand-secondary text-lg font-semibold`)}>
          {userDetails.fullName}
        </h3>
        <p className={cn(`text-foreground/50 mt-0.5 text-xs`)}>
          {userDetails.email}
        </p>
      </div>

      <hr className={cn(`border-foreground/10 -mx-6 mb-6`)} />

      {/* Details Grid */}
      <div className={cn(`grid grid-cols-2 gap-y-6 text-sm`)}>
        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Referral Code
          </span>
          <span className={cn(`font-mono text-xs font-semibold`)}>
            {userDetails.id}
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Referred By</span>
          <span className={cn(`text-foreground/80 font-medium`)}>
            {userDetails.referrerId ? userDetails.referrerId : "N/A"}
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Phone</span>
          <span className={cn(`text-foreground/80 font-medium`)}>
            {userDetails.phoneNumber}
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Status</span>
          <div>
            <span
              className={cn(
                `inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500`,
              )}
            >
              {userDetails.userStatus}
            </span>
          </div>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Mining Wallet
          </span>
          <span className={cn(`text-secondary-500 font-semibold`)}>
            {miningWallet?.balance
              ? `$ ${miningWallet.balance.toLocaleString("en-IN")}`
              : "N/A"}
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>
            Trading Wallet
          </span>
          <span className={cn(`text-accent-500 font-semibold`)}>
            {tradingWallet?.balance
              ? `$ ${tradingWallet.balance.toLocaleString("en-IN")}`
              : "N/A"}
          </span>
        </div>

        <div className={cn(`flex flex-col gap-1`)}>
          <span className={cn(`text-foreground/50 text-xs`)}>Joined</span>
          <span className={cn(`text-foreground/80 text-xs font-medium`)}>
            {userDetails.createdAt.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function StatisticsCard({ className, ...props }: ComponentProps<"div">) {
  const { userId } = useParams({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
  });

  const { data: allMiningOrders } = useReadAllMiningOrdersOfUser(userId);
  const { data: activeMiningOrders } = useReadActiveMiningOrdersOfUser(userId);
  const { data: completedMiningOrders } =
    useReadCompletedMiningOrdersOfUser(userId);
  const { data: allMiningWalletWithdraw } =
    useReadAllMiningWalletWithdrawOfUser(userId);
  const { data: allTradingWalletWithdraw } =
    useReadAllTradingWalletWithdrawOfUser(userId);
  const { data: allMiningWalletDeposit } =
    useReadAllMiningWalletDepositOfUser(userId);
  const { data: allTradingWalletDeposit } =
    useReadAllTradingWalletDepositOfUser(userId);

  if (
    allMiningOrders &&
    activeMiningOrders &&
    completedMiningOrders &&
    allMiningWalletWithdraw &&
    allTradingWalletWithdraw &&
    allMiningWalletDeposit &&
    allTradingWalletDeposit
  ) {
    const totalTransactions =
      allMiningOrders.length +
      allTradingWalletDeposit.length +
      allMiningWalletDeposit.length +
      allTradingWalletWithdraw.length +
      allMiningWalletWithdraw.length;

    const totalDeposits =
      allMiningWalletDeposit.reduce((p, n) => p + n.amount, 0) +
      allTradingWalletDeposit.reduce((p, n) => p + n.amount, 0);
    const totalWithdrawals =
      allMiningWalletWithdraw.reduce((p, n) => p + n.amount, 0) +
      allTradingWalletWithdraw.reduce((p, n) => p + n.amount, 0);

    const stats = [
      {
        label: "Total Transactions",
        value: totalTransactions,
        icon: <ArrowRightLeft className={cn(`size-4 text-blue-500`)} />,
      },
      {
        label: "Active Mining",
        value: activeMiningOrders.length,
        icon: <Zap className={cn(`text-primary-500 size-4`)} />,
      },
      {
        label: "Total Deposits",
        value: `$ ${totalDeposits.toLocaleString("en-IN")}`,
        icon: <ArrowDownRight className={cn(`size-4 text-green-500`)} />,
        valueColor: "text-green-500",
      },
      {
        label: "Total Withdrawals",
        value: `$ ${totalWithdrawals.toLocaleString("en-IN")}`,
        icon: <ArrowUpRight className={cn(`size-4 text-red-500`)} />,
        valueColor: "text-red-500",
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
            Statistics
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
                  stat.valueColor || `text-foreground`,
                )}
              >
                {stat.value}
              </span>
              {index < stats.length - 1 && (
                <hr className={cn(`border-foreground/10 -mx-6 mt-5`)} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

type TransactionStatus =
  | "PENDING"
  | "PROCESSED"
  | "VALIDATING"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED";

type TransactionType =
  | "MINING_ORDER"
  | "MINING_DEPOSIT"
  | "TRADING_DEPOSIT"
  | "MINING_WITHDRAWAL"
  | "TRADING_WITHDRAWAL";

type Transaction = {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  status: TransactionStatus;
  createdAt: Date;
  method?: string;
  reference: string;
  wallet: "Mining" | "Trading";
};

const STATUS_STYLES: Record<
  TransactionStatus,
  { label: string; className: string; icon: typeof Clock3 }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Clock3,
  },
  VALIDATING: {
    label: "Validating",
    className: "bg-secondary-500/10 text-secondary-600 dark:text-secondary-400",
    icon: RefreshCw,
  },
  PROCESSED: {
    label: "Processed",
    className: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
    icon: XCircle,
  },
  ACTIVE: {
    label: "Active",
    className: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
    icon: CheckCircle2,
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
    icon: CheckCircle2,
  },
};

const TYPE_LABELS: Record<TransactionType, string> = {
  MINING_ORDER: "Mining Order",
  MINING_DEPOSIT: "Mining Deposit",
  TRADING_DEPOSIT: "Trading Deposit",
  MINING_WITHDRAWAL: "Mining Withdrawal",
  TRADING_WITHDRAWAL: "Trading Withdrawal",
};

export function RecentTransactionsCard({
  className,
  ...props
}: ComponentProps<"div">) {
  const { userId } = useParams({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
  });

  const {
    data: allMiningOrders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useReadAllMiningOrdersOfUser(userId);

  const {
    data: allMiningWalletDeposit,
    isLoading: isMiningDepositsLoading,
    isError: isMiningDepositsError,
  } = useReadAllMiningWalletDepositOfUser(userId);

  const {
    data: allMiningWalletWithdraw,
    isLoading: isMiningWithdrawalsLoading,
    isError: isMiningWithdrawalsError,
  } = useReadAllMiningWalletWithdrawOfUser(userId);

  const {
    data: allTradingWalletDeposit,
    isLoading: isTradingDepositsLoading,
    isError: isTradingDepositsError,
  } = useReadAllTradingWalletDepositOfUser(userId);

  const {
    data: allTradingWalletWithdraw,
    isLoading: isTradingWithdrawalsLoading,
    isError: isTradingWithdrawalsError,
  } = useReadAllTradingWalletWithdrawOfUser(userId);

  const isLoading =
    isOrdersLoading ||
    isMiningDepositsLoading ||
    isMiningWithdrawalsLoading ||
    isTradingDepositsLoading ||
    isTradingWithdrawalsLoading;

  const isError =
    isOrdersError ||
    isMiningDepositsError ||
    isMiningWithdrawalsError ||
    isTradingDepositsError ||
    isTradingWithdrawalsError;

  const hasAllData =
    allMiningOrders !== undefined &&
    allMiningWalletDeposit !== undefined &&
    allMiningWalletWithdraw !== undefined &&
    allTradingWalletDeposit !== undefined &&
    allTradingWalletWithdraw !== undefined;

  const transactions = useMemo<Transaction[]>(() => {
    const result: Transaction[] = [
      ...(allMiningOrders ?? []).map((order) => ({
        id: order.id,
        type: "MINING_ORDER" as const,
        description: `Mining profile: ${order.miningProfileUsed}`,
        amount: order.amountInvested,
        status: order.miningStatus,
        createdAt: order.createdAt,
        reference: order.id,
        wallet: "Mining" as const,
      })),

      ...(allMiningWalletDeposit ?? []).map((deposit) => ({
        id: deposit.id,
        type: "MINING_DEPOSIT" as const,
        description: `Transaction: ${deposit.transactionId || deposit.id}`,
        amount: deposit.amount,
        status: deposit.status,
        createdAt: deposit.createdAt,
        method: deposit.depositMethod,
        reference: deposit.transactionId || deposit.id,
        wallet: "Mining" as const,
      })),

      ...(allTradingWalletDeposit ?? []).map((deposit) => ({
        id: deposit.id,
        type: "TRADING_DEPOSIT" as const,
        description: `Transaction: ${deposit.transactionId || deposit.id}`,
        amount: deposit.amount,
        status: deposit.status,
        createdAt: deposit.createdAt,
        method: deposit.depositMethod,
        reference: deposit.transactionId || deposit.id,
        wallet: "Trading" as const,
      })),

      ...(allMiningWalletWithdraw ?? []).map((withdrawal) => ({
        id: withdrawal.id,
        type: "MINING_WITHDRAWAL" as const,
        description: `Address: ${withdrawal.cryptoWalletAddress}`,
        amount: withdrawal.amount,
        status: withdrawal.status,
        createdAt: withdrawal.createdAt,
        method: withdrawal.withdrawlMethod,
        reference: withdrawal.id,
        wallet: "Mining" as const,
      })),

      ...(allTradingWalletWithdraw ?? []).map((withdrawal) => ({
        id: withdrawal.id,
        type: "TRADING_WITHDRAWAL" as const,
        description: `Address: ${withdrawal.cryptoWaletAddress}`,
        amount: withdrawal.amount,
        status: withdrawal.status,
        createdAt: withdrawal.createdAt,
        method: withdrawal.withdrawlMethod,
        reference: withdrawal.id,
        wallet: "Trading" as const,
      })),
    ];

    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [
    allMiningOrders,
    allMiningWalletDeposit,
    allMiningWalletWithdraw,
    allTradingWalletDeposit,
    allTradingWalletWithdraw,
  ]);

  return (
    <div
      className={cn(
        "bg-secondary-500/5 border-secondary-500/20 rounded-2xl border px-6 py-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Receipt className="text-secondary-500 size-4" />

          <h2 className="font-brand-secondary text-sm font-semibold">
            Recent Transactions
          </h2>
        </div>

        {!isLoading && !isError && hasAllData && (
          <span className="text-foreground/50 text-xs font-medium">
            {transactions.length} total
          </span>
        )}
      </div>

      <hr className="border-foreground/20 -mx-6 my-4" />

      {isLoading || (!hasAllData && !isError) ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <RefreshCw className="text-secondary-500 mb-3 size-5 animate-spin" />

          <p className="text-sm font-medium">Loading transactions...</p>

          <p className="text-foreground/50 mt-1 text-xs">
            Retrieving the user's transaction history.
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-primary-500/10 text-primary-500 mb-3 flex size-12 items-center justify-center rounded-full">
            <XCircle className="size-5" />
          </div>

          <p className="text-sm font-semibold">Unable to load transactions</p>

          <p className="text-foreground/50 mt-1 text-xs">
            Something went wrong while retrieving transaction history.
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-foreground/5 border-foreground/10 text-foreground/40 mb-3 flex size-14 items-center justify-center rounded-full border">
            <Receipt className="size-6" />
          </div>

          <p className="text-sm font-semibold">No transactions yet</p>

          <p className="text-foreground/50 mt-1 text-xs">
            This user has no recorded mining orders, deposits or withdrawals.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 border-collapse text-left">
            <thead>
              <tr className="text-foreground/50 text-2.5 tracking-wider uppercase">
                <th className="py-3 pr-4 font-medium">Transaction</th>

                <th className="py-3 pr-4 font-medium">Reference</th>

                <th className="py-3 pr-4 font-medium">Date</th>

                <th className="py-3 pr-4 font-medium">Amount</th>

                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-foreground/10 divide-y text-sm">
              {transactions.slice(0, 10).map((transaction) => {
                const isDeposit =
                  transaction.type === "MINING_DEPOSIT" ||
                  transaction.type === "TRADING_DEPOSIT";

                const Icon = isDeposit
                  ? ArrowDownLeft
                  : transaction.type === "MINING_ORDER"
                    ? Coins
                    : ArrowUpRight;

                return (
                  <tr
                    key={`${transaction.type}-${transaction.id}`}
                    className="group hover:bg-secondary-500/3 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg",
                            isDeposit
                              ? "bg-accent-500/10 text-accent-600 dark:text-accent-400"
                              : transaction.type === "MINING_ORDER"
                                ? "bg-secondary-500/10 text-secondary-500"
                                : "bg-primary-500/10 text-primary-500",
                          )}
                        >
                          <Icon className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-semibold">
                            {TYPE_LABELS[transaction.type]}
                          </p>

                          <p className="text-foreground/50 text-2.5 mt-1 max-w-52 truncate">
                            {transaction.description}
                          </p>

                          <p className="text-foreground/40 text-2.5 mt-1">
                            {transaction.wallet} wallet
                            {transaction.method
                              ? ` · ${transaction.method}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        title={transaction.reference}
                        className="text-foreground/70 block max-w-36 truncate font-mono text-xs"
                      >
                        {transaction.reference}
                      </span>
                    </td>

                    <td className="text-foreground/60 py-4 pr-4 text-xs">
                      <p className="whitespace-nowrap">
                        {new Date(transaction.createdAt).toLocaleString(
                          "en-IN",
                        )}
                      </p>

                      <p className="text-foreground/40 text-2.5 mt-1 whitespace-nowrap">
                        {new Date(transaction.createdAt).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        className={cn(
                          "font-semibold whitespace-nowrap tabular-nums",
                          isDeposit
                            ? "text-accent-600 dark:text-accent-400"
                            : "text-foreground",
                        )}
                      >
                        {isDeposit ? "+" : "-"}
                        {`$ ${transaction.amount.toLocaleString("en-IN")}`}
                      </span>
                    </td>

                    <td className="py-4">
                      <TransactionStatusBadge status={transaction.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {transactions.length > 10 && (
            <div className="border-foreground/10 text-foreground/50 border-t py-3 text-xs">
              Showing the 10 most recent transactions out of{" "}
              <span className="text-foreground font-semibold">
                {transactions.length}
              </span>
              .
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TransactionStatusBadge({ status }: { status: TransactionStatus }) {
  const config = STATUS_STYLES[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "text-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold",
        config.className,
      )}
    >
      <Icon className="size-3" />
      {config.label}
    </span>
  );
}

export function AddMoneyDialog() {
  const { userId } = useParams({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
  });

  const { mutateAsync: addMiningWalletBalance } = useAddMiningWalletBalance();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      amount: "",
      note: "",
    },

    onSubmit: async ({ value }) => {
      const parsedAmount = Number(value.amount);

      await addMiningWalletBalance({
        data: {
          dataToUpdate: {
            balance: parsedAmount,
          },
          identifier: {
            associatedUserId: userId,
          },
        },
      });

      form.reset();
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="success">
          <Plus className="size-4" />
          Add Money
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="bg-accent-500/10 text-accent-500 mb-1 flex size-10 items-center justify-center rounded-xl">
            <Wallet className="size-5" />
          </div>

          <DialogTitle>Add money to wallet</DialogTitle>

          <DialogDescription>
            Add funds to this user's wallet. The amount will be credited to
            their balance.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Amount */}
          <form.Field
            name="amount"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) {
                  return "Amount is required";
                }

                const amount = Number(value);

                if (!Number.isFinite(amount) || amount <= 0) {
                  return "Enter a valid amount greater than zero";
                }

                if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                  return "Amount can have up to 2 decimal places";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-foreground/70 text-xs font-semibold"
                >
                  Amount
                </label>

                <div className="relative">
                  <span className="text-foreground/50 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                    ₹
                  </span>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    min="0.01"
                    step="0.01"
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter amount"
                    className={cn(
                      "border-foreground/15 bg-background h-11 w-full rounded-lg border pr-3 pl-8 text-sm transition-colors outline-none",
                      "placeholder:text-foreground/35 focus:border-accent-500 focus:ring-accent-500/15 focus:ring-2",
                      field.state.meta.errors.length > 0 &&
                        "border-destructive focus:border-destructive",
                    )}
                  />
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-destructive text-xs">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Note */}
          <form.Field name="note">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-foreground/70 text-xs font-semibold"
                >
                  Transaction note{" "}
                  <span className="text-foreground/40 font-normal">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter a reason for adding money..."
                  rows={3}
                  className={cn(
                    "border-foreground/15 bg-background w-full resize-none rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none",
                    "placeholder:text-foreground/35 focus:border-accent-500 focus:ring-accent-500/15 focus:ring-2",
                  )}
                />
              </div>
            )}
          </form.Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={form.state.isSubmitting}
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  disabled={!canSubmit || isSubmitting}
                >
                  <Plus className="size-4" />
                  {isSubmitting ? "Adding..." : "Add Money"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeductMoneyDialog() {
  const { userId } = useParams({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/(admin)/users/$userId/wallet/",
  });

  const { mutateAsync: deductMiningWalletBalance } =
    useDeductMiningWalletBalance();
  const { data: miningWallet } = useReadOneMiningWallet(userId);

  // Replace this with your actual wallet balance query.
  const currentBalance = miningWallet?.balance ?? 0;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      amount: "",
      note: "",
    },

    onSubmit: async ({ value }) => {
      const parsedAmount = Number(value.amount);

      await deductMiningWalletBalance({
        data: {
          dataToUpdate: {
            balance: parsedAmount,
          },
          identifier: {
            associatedUserId: userId,
          },
        },
      });

      form.reset();
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Minus className="size-4" />
          Deduct Money
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="bg-destructive/10 text-destructive mb-1 flex size-10 items-center justify-center rounded-xl">
            <Wallet className="size-5" />
          </div>

          <DialogTitle>Deduct money from wallet</DialogTitle>

          <DialogDescription>
            Deduct funds from this user's wallet. Make sure the amount is
            correct before proceeding.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="space-y-4"
        >
          {/* Available balance */}
          <div className="border-foreground/10 bg-foreground/2.5 rounded-lg border p-3">
            <p className="text-foreground/50 text-xs">Available balance</p>

            <p className="font-brand-secondary mt-1 text-lg font-semibold">
              ₹
              {currentBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Amount */}
          <form.Field
            name="amount"
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) {
                  return "Amount is required";
                }

                const amount = Number(value);

                if (!Number.isFinite(amount) || amount <= 0) {
                  return "Enter a valid amount greater than zero";
                }

                if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                  return "Amount can have up to 2 decimal places";
                }

                if (amount > currentBalance) {
                  return "Amount cannot exceed the available balance";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-foreground/70 text-xs font-semibold"
                >
                  Amount
                </label>

                <div className="relative">
                  <span className="text-foreground/50 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                    ₹
                  </span>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    min="0.01"
                    max={currentBalance}
                    step="0.01"
                    inputMode="numeric"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Enter amount"
                    className={cn(
                      "border-foreground/15 bg-background h-11 w-full rounded-lg border pr-3 pl-8 text-sm transition-colors outline-none",
                      "placeholder:text-foreground/35 focus:border-destructive focus:ring-destructive/15 focus:ring-2",
                      field.state.meta.errors.length > 0 &&
                        "border-destructive",
                    )}
                  />
                </div>

                {field.state.meta.errors.length > 0 && (
                  <p className="text-destructive text-xs">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Note */}
          <form.Field name="note">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-foreground/70 text-xs font-semibold"
                >
                  Transaction note{" "}
                  <span className="text-foreground/40 font-normal">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Enter a reason for deducting money..."
                  rows={3}
                  className={cn(
                    "border-foreground/15 bg-background w-full resize-none rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none",
                    "placeholder:text-foreground/35 focus:border-destructive focus:ring-destructive/15 focus:ring-2",
                  )}
                />
              </div>
            )}
          </form.Field>

          {/* Warning */}
          <div className="bg-destructive/5 text-destructive flex items-start gap-2 rounded-lg p-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />

            <p className="text-xs leading-relaxed">
              This action will immediately deduct the specified amount from the
              user's wallet.
            </p>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={form.state.isSubmitting}
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="destructive"
                  size="sm"
                  disabled={!canSubmit || isSubmitting}
                >
                  <Minus className="size-4" />
                  {isSubmitting ? "Deducting..." : "Deduct Money"}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
