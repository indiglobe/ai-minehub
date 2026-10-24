import {
  create__TradingWallet,
  read__OneTradingWallet,
} from "@repo/data/querries/trading-wallet";
import {
  create__TradingWalletSchema,
  read__OneTradingWalletSchema,
} from "@repo/data/validators/trading-wallet";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createTradingWallet = createServerFn({
  method: "POST",
})
  .validator(create__TradingWalletSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__TradingWallet(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__createTradingWallet`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readOneTradingWallet = createServerFn({
  method: "GET",
})
  .validator(read__OneTradingWalletSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__OneTradingWallet(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readOneTradingWallet`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
