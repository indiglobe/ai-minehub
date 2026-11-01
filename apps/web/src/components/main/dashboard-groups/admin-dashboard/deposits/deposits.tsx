import type { ComponentProps } from "react";
import {
  AlertCircle,
  ArrowDownLeft,
  CheckCircle2,
  Clock3,
  ExternalLink,
  ImageIcon,
  Loader2,
  RefreshCw,
  Wallet,
  XCircle,
} from "lucide-react";
import { cn } from "@repo/styles/cn";
import { Button } from "@repo/ui/button";
import {
  useReadPendingMiningWalletDeposit,
  useUpdateMiningWalletDeposit,
} from "@/integrations/tanstack/react-querry/mining-wallet-deposits/admin.rq";
import {
  useReadPendingTradingWalletDeposit,
  useUpdateTradingWalletDeposit,
} from "@/integrations/tanstack/react-querry/trading-wallet-deposits/admin.rq";
import { useAddMiningWalletBalance } from "@/integrations/tanstack/react-querry/mining-wallet/admin.rq";
import { useAddTradingWalletBalance } from "@/integrations/tanstack/react-querry/trading-wallet/admin.rq";

type DepositStatus = "PENDING" | "PROCESSED" | "VALIDATING" | "REJECTED";

const STATUS_STYLES: Record<DepositStatus, string> = {
  PENDING: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500",
  VALIDATING: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  PROCESSED: "border-accent-500/30 bg-accent-500/10 text-accent-500",
  REJECTED: "border-destructive/30 bg-destructive/10 text-destructive",
};

function formatAmount(amount: number) {
  return `$ ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date: Date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function DepositsLoading() {
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between">
        <div className="bg-foreground/10 h-3 w-32 animate-pulse rounded" />
        <div className="bg-foreground/10 h-3 w-20 animate-pulse rounded" />
      </div>

      <div className="divide-foreground/10 divide-y">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 py-5">
            <div className="bg-foreground/10 size-10 shrink-0 animate-pulse rounded-full" />

            <div className="flex flex-1 flex-col gap-2">
              <div className="bg-foreground/10 h-3 w-32 animate-pulse rounded" />
              <div className="bg-foreground/10 h-2.5 w-44 animate-pulse rounded" />
            </div>

            <div className="bg-foreground/10 hidden h-4 w-20 animate-pulse rounded @md:block" />
            <div className="bg-foreground/10 hidden h-5 w-16 animate-pulse rounded-full @lg:block" />
            <div className="bg-foreground/10 h-4 w-20 animate-pulse rounded" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 py-4">
        <Loader2 className="text-secondary-500 size-4 animate-spin" />
        <span className="text-foreground/50 text-xs">
          Loading deposit records...
        </span>
      </div>
    </div>
  );
}

function DepositsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-destructive/10 text-destructive mb-3 flex size-12 items-center justify-center rounded-full">
        <AlertCircle className="size-5" />
      </div>

      <h3 className="text-sm font-semibold">Unable to load deposits</h3>

      <p className="text-foreground/50 mt-1 max-w-sm text-xs leading-relaxed">
        Something went wrong while retrieving the mining and trading wallet
        deposit records. Please try again.
      </p>

      <Button
        size="sm"
        variant="outline"
        className="mt-5 gap-2"
        onClick={onRetry}
      >
        <RefreshCw className="size-3.5" />
        Try again
      </Button>
    </div>
  );
}

function DepositsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-secondary-500/10 text-secondary-500 mb-3 flex size-14 items-center justify-center rounded-full">
        <Wallet className="size-6" />
      </div>

      <h3 className="text-sm font-semibold">No deposits found</h3>

      <p className="text-foreground/50 mt-1 max-w-sm text-xs leading-relaxed">
        There are currently no mining or trading wallet deposit records to
        display.
      </p>
    </div>
  );
}

export function AllDeposits({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: pendingMiningWalletDeposits,
    isError: isMiningDepositsError,
    isLoading: isMiningDepositsLoading,
    refetch: refetchMiningDeposits,
  } = useReadPendingMiningWalletDeposit();

  const {
    data: pendingTradingWalletDeposits,
    isError: isTradingDepositsError,
    isLoading: isTradingDepositsLoading,
    refetch: refetchTradingDeposits,
  } = useReadPendingTradingWalletDeposit();

  const { mutateAsync: updateMiningWalletDeposit } =
    useUpdateMiningWalletDeposit();
  const { mutateAsync: updateTradingWalletDeposit } =
    useUpdateTradingWalletDeposit();

  const { mutateAsync: addMiningWalletBalance } = useAddMiningWalletBalance();
  const { mutateAsync: addTradingWalletBalance } = useAddTradingWalletBalance();

  const isLoading = isMiningDepositsLoading || isTradingDepositsLoading;
  const isError = isMiningDepositsError || isTradingDepositsError;

  const deposits = [
    ...(pendingMiningWalletDeposits ?? []).map((item) => ({
      ...item,
      walletType: "Mining" as const,
    })),
    ...(pendingTradingWalletDeposits ?? []).map((item) => ({
      ...item,
      walletType: "Trading" as const,
    })),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const handleRetry = () => {
    void Promise.all([refetchMiningDeposits(), refetchTradingDeposits()]);
  };

  return (
    <section
      className={cn("default-padding @container py-10", className)}
      {...props}
    >
      <div className="border-secondary-500/20 bg-secondary-500/5 rounded-2xl border px-6 py-4">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowDownLeft className="text-primary-500 size-4" />

            <h2 className="font-brand-secondary text-sm font-semibold">
              All Deposits
            </h2>
          </div>

          {!isLoading && !isError && (
            <span className="bg-secondary-500/10 text-secondary-500 rounded-full px-2.5 py-1 text-xs font-semibold">
              {deposits.length} Records
            </span>
          )}
        </div>

        <hr className="border-foreground/20 -mx-6 my-4" />

        {isLoading ? (
          <DepositsLoading />
        ) : isError ? (
          <DepositsError onRetry={handleRetry} />
        ) : deposits.length === 0 ? (
          <DepositsEmpty />
        ) : (
          <>
            <div className="mb-3">
              <p className="text-foreground/50 text-xs">
                Showing{" "}
                <span className="text-foreground font-semibold">
                  {deposits.length}
                </span>{" "}
                deposit records
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-275 border-collapse text-left">
                <thead>
                  <tr className="text-foreground/50 text-2.75 tracking-wider uppercase">
                    <th className="py-3 pr-4 font-medium">User</th>
                    <th className="py-3 pr-4 font-medium">Amount</th>
                    <th className="py-3 pr-4 font-medium">Wallet Type</th>
                    <th className="py-3 pr-4 font-medium">Wallet</th>
                    <th className="py-3 pr-4 font-medium">Method</th>
                    <th className="py-3 pr-4 font-medium">Transaction ID</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Date</th>
                    <th className="py-3 font-medium">Proof</th>
                    <th className="py-3 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-foreground/10 divide-y text-sm">
                  {deposits.map((item) => {
                    const user = item.associatedUserDetail;

                    return (
                      <tr
                        key={`${item.walletType}-${item.id}`}
                        className="group hover:bg-secondary-500/3 transition-colors"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            {user.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt={user.fullName}
                                className="border-foreground/10 size-10 shrink-0 rounded-full border object-cover"
                              />
                            ) : (
                              <div className="bg-secondary-500/10 text-secondary-500 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                                {getInitials(user.fullName)}
                              </div>
                            )}

                            <div className="flex min-w-0 flex-col">
                              <span className="max-w-44 truncate font-medium">
                                {user.fullName}
                              </span>

                              <span className="text-foreground/50 max-w-44 truncate text-xs">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="text-accent-500 py-4 pr-4 font-semibold">
                          {formatAmount(item.amount)}
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={cn(
                              "inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold",
                              item.walletType === "Mining"
                                ? "border-secondary-500/20 bg-secondary-500/10 text-secondary-500"
                                : "border-primary-500/20 bg-primary-500/10 text-primary-500",
                            )}
                          >
                            {item.walletType}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <span className="text-foreground/80 text-xs font-medium">
                            {item.wallet}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <span className="text-foreground/80 text-xs font-medium">
                            {item.depositMethod}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            title={item.transactionId}
                            className="text-foreground/60 block max-w-40 truncate font-mono text-xs"
                          >
                            {item.transactionId}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                              STATUS_STYLES[item.status],
                            )}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="py-4 pr-4">
                          <div className="text-foreground/60 flex items-center gap-1.5 text-xs whitespace-nowrap">
                            <Clock3 className="size-3.5" />
                            {formatDate(item.createdAt)}
                          </div>
                        </td>

                        <td className="py-4">
                          {item.depositProof ? (
                            <a
                              href={item.depositProof}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary-500 hover:text-secondary-400 inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-colors"
                            >
                              <ImageIcon className="size-3.5" />
                              View proof
                              <ExternalLink className="size-3" />
                            </a>
                          ) : (
                            <span className="text-foreground/35 text-xs">
                              Not provided
                            </span>
                          )}
                        </td>

                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="xs"
                              variant="success"
                              className={cn(`rounded-sm`)}
                              onClick={async () => {
                                if (item.walletType === "Mining") {
                                  await addMiningWalletBalance({
                                    data: {
                                      dataToUpdate: { balance: item.amount },
                                      identifier: {
                                        associatedUserId: item.orderedBy,
                                      },
                                    },
                                  });

                                  await updateMiningWalletDeposit({
                                    data: {
                                      dataToInsert: { status: "PROCESSED" },
                                      identifier: { userId: item.orderedBy },
                                    },
                                  });
                                }
                                if (item.walletType === "Trading") {
                                  await addTradingWalletBalance({
                                    data: {
                                      dataToUpdate: { balance: item.amount },
                                      identifier: {
                                        associatedUserId: item.orderedBy,
                                      },
                                    },
                                  });

                                  await updateTradingWalletDeposit({
                                    data: {
                                      dataToInsert: { status: "PROCESSED" },
                                      identifier: { userId: item.orderedBy },
                                    },
                                  });
                                }
                              }}
                            >
                              <CheckCircle2 className="size-3.5" />
                              Approve
                            </Button>

                            <Button
                              size="xs"
                              variant="destructive"
                              className={cn(`rounded-sm`)}
                              onClick={
                                async () => {
                                  if (item.walletType === "Mining") {
                                    await updateMiningWalletDeposit({
                                      data: {
                                        dataToInsert: { status: "REJECTED" },
                                        identifier: { userId: item.orderedBy },
                                      },
                                    });
                                  }
                                  if (item.walletType === "Trading") {
                                    await updateTradingWalletDeposit({
                                      data: {
                                        dataToInsert: { status: "REJECTED" },
                                        identifier: { userId: item.orderedBy },
                                      },
                                    });
                                  }
                                }
                                // handleReject(item.id, item.walletType)
                              }
                            >
                              <XCircle className="size-3.5" />
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
