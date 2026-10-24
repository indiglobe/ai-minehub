import { read__AllTradingOrders } from "@repo/data/querries/trading-order";
import { read__AllTradingOrdersSchema } from "@repo/data/validators/trading-order";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";


// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllTradingOrders = createServerFn({
  method: "GET",
})
  .validator(read__AllTradingOrdersSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllTradingOrders(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readAllTradingOrders`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
