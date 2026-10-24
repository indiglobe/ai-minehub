import {
  read__AllMiningOrders,
  create__MiningOrder,
} from "@repo/data/querries/mining-order";
import {
  read__AllMiningOrdersSchema,
  create__MiningOrderSchema,
} from "@repo/data/validators/mining-order";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllMiningOrders = createServerFn({ method: "GET" })
  .validator(read__AllMiningOrdersSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllMiningOrders(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllMiningOrders`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createMiningOrder = createServerFn({ method: "POST" })
  .validator(create__MiningOrderSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__MiningOrder(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllMiningOrders`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
