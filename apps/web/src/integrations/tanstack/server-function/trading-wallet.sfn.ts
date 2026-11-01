import {
  create__TradingWallet,
  read__OneTradingWallet,
  update__AddBalance,
  update__DeductBalance,
} from "@repo/data/querries/trading-wallet";
import {
  create__TradingWalletSchema,
  read__OneTradingWalletSchema,
  update__BalanceSchema,
} from "@repo/data/validators/trading-wallet";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createTradingWallet = createServerFn({
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

const serverFn__readOneTradingWallet = createServerFn({
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

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateAddBalance = createServerFn({
  method: "POST",
})
  .validator(update__BalanceSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      update__AddBalance(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__updateAddBalance`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateDeductBalance = createServerFn({
  method: "POST",
})
  .validator(update__BalanceSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      update__DeductBalance(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__updateDeductBalance`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

export {
  serverFn__createTradingWallet,
  serverFn__readOneTradingWallet,
  serverFn__updateAddBalance,
  serverFn__updateDeductBalance,
};
