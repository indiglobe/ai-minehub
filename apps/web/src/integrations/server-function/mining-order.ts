import { read__AllMiningOrders } from "@repo/data/querries/mining-order";
import { read__AllMiningOrdersSchema } from "@repo/data/validators/mining-order";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllMiningOrders = createServerFn()
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
