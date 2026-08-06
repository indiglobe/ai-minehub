import { useQuery, queryOptions } from "@tanstack/react-query";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { useServerFn } from "@tanstack/react-start";
import { DASHBOARD, INVESTMENT_DETAILS } from "@/utils/mutation-keys";
import { useRouteContext } from "@tanstack/react-router";

export function useInvestmentData() {
  const readOneUser = useServerFn(serverFn__readOneUser);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({
    from: "/(without-header-footer)/(authenticated)/(existing-user)/dashboard/",
  });

  return useQuery(
    queryOptions({
      queryKey: [DASHBOARD, INVESTMENT_DETAILS],

      queryFn: async () => {
        const result = await readOneUser({
          data: {
            identifier: {
              id: userId,
            },
            joinOptions: {
              miningOrders: true,
              tradingOrders: true,
            },
          },
        });

        return result;
      },

      select: (data) => {
        type TOutput = {
          activeInvestmentsCount: number;
          investedAmount: number;
          profitAmount: number;
        };

        let output: TOutput = {
          activeInvestmentsCount: 0,
          investedAmount: 0,
          profitAmount: 0,
        };

        data?.miningOrders.reduce((acc, curr) => {
          if (curr.miningStatus === "active") {
            output = {
              ...acc,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }

          output = {
            ...acc,
            investedAmount: output.investedAmount + curr.amountInvested,
            profitAmount:
              output.profitAmount +
              (curr.amountRecived === null || curr.amountRecived === 0
                ? 0
                : curr.amountRecived - curr.amountInvested),
          };

          return output;
        }, output);

        data?.tradingOrders.reduce((acc, curr) => {
          if (curr.tradingStatus === "active") {
            output = {
              ...acc,
              activeInvestmentsCount: output.activeInvestmentsCount + 1,
            };
          }

          output = {
            ...acc,
            investedAmount: output.investedAmount + curr.amountInvested,
            profitAmount:
              output.profitAmount +
              (curr.amountRecived === null || curr.amountRecived === 0
                ? 0
                : curr.amountRecived - curr.amountInvested),
          };

          return output;
        }, output);

        return output;
      },
    }),
  );
}
