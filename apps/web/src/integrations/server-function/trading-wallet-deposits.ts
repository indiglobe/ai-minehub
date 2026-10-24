import { create__TradingWalletDeposite } from "@repo/data/querries/trading-wallet-deposits";
import { create__TradingWalletDepositeSchema } from "@repo/data/validators/trading-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";



// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createTradingWalletDeposite = createServerFn({
  method: "POST",
})
  .validator(create__TradingWalletDepositeSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      create__TradingWalletDeposite(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createTradingWalletDeposite`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });
