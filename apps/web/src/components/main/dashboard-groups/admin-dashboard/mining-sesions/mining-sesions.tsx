import type { ComponentProps } from "react";
import { cn } from "@repo/styles/cn";
import {
  Clock,
  Layers,
  CalendarDays,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { MiningSessionsError, MiningSessionsLoading } from "./boundary-comps";
import {
  useReadActiveMiningOrders,
  useUpdateMiningOrder,
} from "@/integrations/tanstack/react-querry/mining-order/admin.rq";
import { Button } from "@repo/ui/button";
import { useAddMiningWalletBalance } from "@/integrations/tanstack/react-querry/mining-wallet/admin.rq";

type MiningStatus = "ACTIVE" | "COMPLETED";

const STATUS_STYLE: Record<MiningStatus, string> = {
  ACTIVE: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  COMPLETED: "border-green-500/30 bg-green-500/10 text-green-500",
};

export function MiningSessions({
  className,
  ...props
}: ComponentProps<"section">) {
  const {
    data: activeMiningOrders,
    isLoading: isActiveMiningOrdersLoading,
    isError: isActiveMiningOrdersError,
  } = useReadActiveMiningOrders();

  const { mutateAsync: updateMiningOrder, isPending: isUpdatingMiningOrder } =
    useUpdateMiningOrder();
  const { mutateAsync: addMiningWalletBalance } = useAddMiningWalletBalance();

  const isLoading = isActiveMiningOrdersLoading;
  const isError = isActiveMiningOrdersError;
  const orders = activeMiningOrders ?? [];

  const totalInvested = orders.reduce(
    (total, order) => total + order.amountInvested,
    0,
  );

  const activeCount = orders.filter(
    (order) => order.miningStatus === "ACTIVE",
  ).length;

  return (
    <section
      className={cn("default-padding @container py-10", className)}
      {...props}
    >
      <div className="border-secondary-500/20 bg-secondary-500/5 rounded-2xl border px-6 py-5">
        <div className="flex w-full flex-col gap-4 @md:flex-row @md:items-center @md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-secondary-500/10 flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Clock className="text-secondary-500 size-5" />
            </div>

            <div className="flex flex-col gap-0.5">
              <h2 className="font-brand-secondary text-sm font-semibold">
                Mining Sessions
              </h2>
              <p className="text-foreground/50 text-xs">
                Monitor mining orders and investments
              </p>
            </div>
          </div>

          {!isLoading && !isError && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="border-foreground/10 bg-background/50 flex items-center gap-2 rounded-lg border px-3 py-2">
                <Layers className="size-3.5 text-blue-500" />
                <span className="text-foreground/60 text-xs">Active</span>
                <span className="text-foreground text-xs font-semibold tabular-nums">
                  {activeCount}
                </span>
              </div>
            </div>
          )}
        </div>

        <hr className="border-foreground/10 -mx-6 my-5" />

        {isLoading && <MiningSessionsLoading />}

        {isError && <MiningSessionsError />}

        {!isLoading && !isError && (
          <>
            {orders.length > 0 && (
              <>
                <div className="mb-5 grid grid-cols-1 gap-3">
                  <div className="border-foreground/10 bg-background/50 flex items-center gap-3 rounded-xl border p-4">
                    <div className="bg-primary-500/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <Wallet className="text-primary-500 size-5" />
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-foreground/50 text-xs">
                        Total Invested
                      </span>
                      <span className="text-foreground truncate text-base font-semibold tabular-nums">
                        {`$ ${totalInvested.toLocaleString("en-IN")}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="text-foreground/45 border-foreground/10 text-2.75 border-b tracking-wider uppercase">
                        <th className="py-3 pr-4 font-medium">User</th>
                        <th className="py-3 pr-4 font-medium">Mining Plan</th>
                        <th className="py-3 pr-4 font-medium">Invested</th>
                        <th className="py-3 pr-4 font-medium">Status</th>
                        <th className="py-3 text-right font-medium">Started</th>
                        <th className="py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-foreground/10 divide-y text-sm">
                      {orders.map((order) => {
                        const canComplete =
                          new Date(Date.now()).getUTCMilliseconds() >
                          new Date(order.createdAt).getUTCMilliseconds() +
                            1000 *
                              60 *
                              60 *
                              24 *
                              order.miningProfile.lockinPeriod;

                        return (
                          <tr
                            key={order.id}
                            data-db-order-id={order.id}
                            data-db-user-id={order.orderedBy}
                            data-db-mining-profile-used-id={
                              order.miningProfileUsed
                            }
                            className="group hover:bg-foreground/2.5 transition-colors"
                          >
                            <td className="py-4 pr-4">
                              <span className="text-foreground/65 font-mono text-xs">
                                {order.user.fullName}
                              </span>
                            </td>

                            <td className="py-4 pr-4">
                              <div className="flex items-center gap-2">
                                <div className="bg-secondary-500/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
                                  <Layers className="text-secondary-500 size-4" />
                                </div>

                                <span className="text-foreground/90 font-medium">
                                  {order.miningProfile.category}
                                </span>
                              </div>
                            </td>

                            <td className="text-primary-500 py-4 pr-4 font-semibold tabular-nums">
                              {`$ ${order.amountInvested.toLocaleString("en-IN")}`}
                            </td>

                            <td className="py-4 pr-4">
                              <span
                                className={cn(
                                  "text-2.75 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold",
                                  STATUS_STYLE[order.miningStatus],
                                )}
                              >
                                <span
                                  className={cn(
                                    "size-1.5 rounded-full",
                                    order.miningStatus === "ACTIVE"
                                      ? "bg-blue-500"
                                      : "bg-green-500",
                                  )}
                                />
                                {order.miningStatus}
                              </span>
                            </td>

                            <td className="text-foreground/55 py-4 text-right text-xs">
                              <div className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap">
                                <CalendarDays className="size-3.5" />
                                {new Date(order.createdAt).toLocaleString(
                                  "en-IN",
                                )}
                              </div>
                            </td>

                            <td className="py-4 text-right">
                              <Button
                                size="xs"
                                variant="success"
                                disabled={isUpdatingMiningOrder || !canComplete}
                                onClick={async () => {
                                  if (canComplete) {
                                    await updateMiningOrder({
                                      data: {
                                        dataToUpdate: {
                                          miningStatus: "COMPLETED",
                                        },
                                        identifier: { id: order.id },
                                      },
                                    });

                                    await addMiningWalletBalance({
                                      data: {
                                        dataToUpdate: { balance: 0 },
                                        identifier: {
                                          associatedUserId: order.user.id,
                                        },
                                      },
                                    });
                                  }
                                }}
                                className="gap-1.5"
                              >
                                <CheckCircle2 className="size-3.5" />
                                Mark Completed
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {orders.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center py-10 text-center">
                <div className="bg-secondary-500/10 mb-4 flex size-14 items-center justify-center rounded-2xl">
                  <Clock className="text-secondary-500 size-7" />
                </div>

                <h3 className="text-foreground text-sm font-semibold">
                  No Mining Sessions Found
                </h3>

                <p className="text-foreground/50 mt-1 max-w-xs text-xs leading-relaxed">
                  There are currently no mining orders available to display.
                  Mining sessions will appear here once an order is created.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
