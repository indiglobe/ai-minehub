import type { ComponentProps } from "react";
import { useMemo } from "react";
import { cn } from "@repo/styles/cn";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import { Button } from "@repo/ui/button";
import {
  useReadPendingTradingWalletWithdraw,
  useUpdateTradingWalletWithdraw,
} from "@/integrations/tanstack/react-querry/trading-wallet-withdraw/admin.rq";
import {
  useReadPendingMiningWalletWithdraw,
  useUpdateMiningWalletWithdraw,
} from "@/integrations/tanstack/react-querry/mining-wallet-withdraw/admin.rq";
import { useDeductTradingWalletBalance } from "@/integrations/tanstack/react-querry/trading-wallet/admin.rq";
import { useDeductMiningWalletBalance } from "@/integrations/tanstack/react-querry/mining-wallet/admin.rq";

type WithdrawalStatus = "PENDING" | "PROCESSED" | "VALIDATING" | "REJECTED";

type WithdrawalUser = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
};

type MiningWalletWithdrawal = {
  id: string;
  orderedBy: string;
  wallet: string;
  amount: number;
  cryptoWalletAddress: string;
  status: WithdrawalStatus;
  withdrawlMethod: "BSC" | "TRX" | "ETH" | "Bitcoin";
  createdAt: Date;
  associatedUserDetail: WithdrawalUser;
};

type TradingWalletWithdrawal = {
  id: string;
  orderedBy: string;
  wallet: string;
  amount: number;
  cryptoWaletAddress: string;
  status: WithdrawalStatus;
  withdrawlMethod: "BSC" | "TRX" | "ETH" | "Bitcoin";
  createdAt: Date;
  associatedUserDetail: WithdrawalUser;
};

type WithdrawalItem = {
  id: string;
  user: WithdrawalUser;
  amount: number;
  wallet: "Trading Wallet" | "Mining Wallet";
  walletAddress: string;
  method: string;
  status: WithdrawalStatus;
  createdAt: Date;
};

function AllWithdrawalsLoading() {
  return (
    <div className="flex flex-col gap-3 py-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="bg-foreground/5 h-14 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

function AllWithdrawalsError() {
  return (
    <div className="text-foreground/60 py-12 text-center text-sm">
      Unable to load withdrawals. Please try again.
    </div>
  );
}

export function AllWithdrawals({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: pendingTradingWalletWithdraw,
    isError: isPendingTradingWalletWithdrawError,
    isLoading: isPendingTradingWalletWithdrawLoading,
  } = useReadPendingTradingWalletWithdraw();

  const {
    data: pendingMiningWalletWithdraw,
    isError: isPendingMiningWalletWithdrawError,
    isLoading: isPendingMiningWalletWithdrawLoading,
  } = useReadPendingMiningWalletWithdraw();

  const { mutateAsync: updateMiningWalletWithdraw } =
    useUpdateMiningWalletWithdraw();
  const { mutateAsync: updateTradingWalletWithdraw } =
    useUpdateTradingWalletWithdraw();
  const { mutateAsync: deductMiningWalletBalance } =
    useDeductMiningWalletBalance();
  const { mutateAsync: deductTradingWalletBalance } =
    useDeductTradingWalletBalance();

  const isLoading =
    isPendingTradingWalletWithdrawLoading ||
    isPendingMiningWalletWithdrawLoading;

  const isError =
    isPendingTradingWalletWithdrawError || isPendingMiningWalletWithdrawError;

  const withdrawals = useMemo<WithdrawalItem[]>(() => {
    const tradingWithdrawals: WithdrawalItem[] = (
      pendingTradingWalletWithdraw ?? []
    ).map((item: TradingWalletWithdrawal) => ({
      id: item.id,
      user: item.associatedUserDetail,
      amount: item.amount,
      wallet: "Trading Wallet",
      walletAddress: item.cryptoWaletAddress,
      method: item.withdrawlMethod,
      status: item.status,
      createdAt: item.createdAt,
    }));

    const miningWithdrawals: WithdrawalItem[] = (
      pendingMiningWalletWithdraw ?? []
    ).map((item: MiningWalletWithdrawal) => ({
      id: item.id,
      user: item.associatedUserDetail,
      amount: item.amount,
      wallet: "Mining Wallet",
      walletAddress: item.cryptoWalletAddress,
      method: item.withdrawlMethod,
      status: item.status,
      createdAt: item.createdAt,
    }));

    return [...tradingWithdrawals, ...miningWithdrawals].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [pendingTradingWalletWithdraw, pendingMiningWalletWithdraw]);

  return (
    <section
      className={cn("default-padding @container py-10", className)}
      {...props}
    >
      <div className="border-secondary-500/20 bg-secondary-500/5 rounded-2xl border px-6 py-5">
        <div className="flex flex-col gap-3 @md:flex-row @md:items-center @md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500/10 flex size-10 items-center justify-center rounded-xl">
              <ArrowUpRight className="text-primary-600 size-5" />
            </div>

            <div>
              <h2 className="font-brand-secondary text-sm font-semibold">
                All Withdrawals
              </h2>
              <p className="text-foreground/50 mt-1 text-xs">
                Review and manage wallet withdrawal requests.
              </p>
            </div>
          </div>

          <div className="border-foreground/10 bg-background/50 flex items-center gap-2 self-start rounded-lg border px-3 py-2 @md:self-auto">
            <Clock3 className="text-foreground/50 size-4" />
            <span className="text-foreground/70 text-xs">
              {withdrawals.length} withdrawal
              {withdrawals.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <hr className="border-foreground/10 -mx-6 my-5" />

        {isLoading ? (
          <AllWithdrawalsLoading />
        ) : isError ? (
          <AllWithdrawalsError />
        ) : withdrawals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-foreground/5 mb-4 flex size-14 items-center justify-center rounded-2xl">
              <Check className="text-foreground/40 size-6" />
            </div>

            <h3 className="text-sm font-semibold">No withdrawals found</h3>

            <p className="text-foreground/50 mt-1 text-xs">
              There are currently no withdrawal requests to display.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-foreground/50 border-foreground/10 border-b text-xs tracking-wider uppercase">
                  <th className="py-3 pr-4 font-medium">User</th>
                  <th className="py-3 pr-4 font-medium">Amount</th>
                  <th className="py-3 pr-4 font-medium">Wallet</th>
                  <th className="py-3 pr-4 font-medium">Wallet Address</th>
                  <th className="py-3 pr-4 font-medium">Network</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-foreground/10 divide-y text-sm">
                {withdrawals.map((item) => (
                  <tr
                    key={`${item.wallet}-${item.id}`}
                    className="group hover:bg-foreground/2 transition-colors"
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        {item.user.avatarUrl ? (
                          <img
                            src={item.user.avatarUrl}
                            alt={item.user.fullName}
                            className="size-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="bg-primary-500/15 text-primary-600 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                            {item.user.fullName
                              .trim()
                              .split(/\s+/)
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="flex min-w-0 flex-col">
                          <span className="text-foreground max-w-44 truncate font-medium">
                            {item.user.fullName}
                          </span>
                          <span className="text-foreground/50 max-w-44 truncate text-xs">
                            {item.user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 pr-4 font-semibold text-red-500">
                      {`$ -${item.amount.toLocaleString("en-IN")}`}
                    </td>

                    <td className="py-4 pr-4">
                      <span
                        className={cn(
                          "inline-flex rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
                          item.wallet === "Mining Wallet"
                            ? "border-purple-500/20 bg-purple-500/10 text-purple-500"
                            : "border-secondary-500/20 bg-secondary-500/10 text-secondary-500",
                        )}
                      >
                        {item.wallet}
                      </span>
                    </td>

                    <td className="text-foreground/70 max-w-48 py-4 pr-4">
                      <span
                        title={item.walletAddress}
                        className="block truncate font-mono text-xs"
                      >
                        {item.walletAddress}
                      </span>
                    </td>

                    <td className="text-foreground/70 py-4 pr-4 text-xs">
                      {item.method}
                    </td>

                    <td className="text-foreground/60 py-4 pr-4 text-xs whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 text-right">
                      {item.status !== "PROCESSED" &&
                      item.status !== "REJECTED" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1.5 rounded-lg border-green-500/30 px-3 text-xs whitespace-nowrap text-green-600 hover:bg-green-500/10 hover:text-green-600"
                          onClick={async () => {
                            if (item.wallet === "Mining Wallet") {
                              await deductMiningWalletBalance({
                                data: {
                                  dataToUpdate: { balance: item.amount },
                                  identifier: {
                                    associatedUserId: item.user.id,
                                  },
                                },
                              });
                              await updateMiningWalletWithdraw({
                                data: {
                                  dataToInsert: { status: "PROCESSED" },
                                  identifier: { userId: item.user.id },
                                },
                              });
                            }
                            if (item.wallet === "Trading Wallet") {
                              await deductTradingWalletBalance({
                                data: {
                                  dataToUpdate: { balance: item.amount },
                                  identifier: {
                                    associatedUserId: item.user.id,
                                  },
                                },
                              });
                              await updateTradingWalletWithdraw({
                                data: {
                                  dataToInsert: { status: "PROCESSED" },
                                  identifier: { userId: item.user.id },
                                },
                              });
                            }
                          }}
                        >
                          <Check className="size-3.5" />
                          Mark as Done
                        </Button>
                      ) : (
                        <span className="text-foreground/40 text-xs">
                          {item.status === "PROCESSED"
                            ? "Completed"
                            : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
