import {
  read__AllMiningOrders,
  update__MiningOrder,
  create__MiningOrder,
} from "@repo/data/querries/mining-order";
import {
  read__AllMiningOrdersSchema,
  update__MiningOrderSchema,
  create__MiningOrderSchema,
} from "@repo/data/validators/mining-order";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createMiningOrder = createServerFn({ method: "POST" })
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

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllMiningOrders = createServerFn({ method: "GET" })
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

const serverFn__updateMiningOrder = createServerFn({ method: "GET" })
  .validator(update__MiningOrderSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      update__MiningOrder(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__updateMiningOrder`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

export {
  serverFn__readAllMiningOrders,
  serverFn__createMiningOrder,
  serverFn__updateMiningOrder,
};
