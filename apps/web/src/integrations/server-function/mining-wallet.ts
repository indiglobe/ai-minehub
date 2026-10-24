import {
  read__OneMiningWallet,
  update__OneMiningWallet,
  create__MiningWallet,
} from "@repo/data/querries/mining-wallet";
import {
  read__OneMiningWalletSchema,
  update__OneMiningWalletSchema,
  create__MiningWalletSchema,
} from "@repo/data/validators/mining-wallet";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createMiningWallet = createServerFn({
  method: "POST",
})
  .validator(create__MiningWalletSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__MiningWallet(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__createMiningWallet`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readOneMiningWallet = createServerFn({
  method: "GET",
})
  .validator(read__OneMiningWalletSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__OneMiningWallet(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readOneMiningWallet`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__updateOneMiningWallet = createServerFn({
  method: "POST",
})
  .validator(update__OneMiningWalletSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      update__OneMiningWallet(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__updateOneMiningWallet`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
