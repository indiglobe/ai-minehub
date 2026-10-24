import {
  read__AllReferalEarningSchema,
  create__ReferalEarningSchema,
} from "@repo/data/validators/referal-earning";
import {
  read__AllReferalEarning,
  create__ReferalEarning,
} from "@repo/data/querries/referal-earning";
import { createServerFn } from "@tanstack/react-start";
import { tryCatch } from "@repo/utils/try-catch";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createReferalEarning = createServerFn({
  method: "POST",
})
  .validator(create__ReferalEarningSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__ReferalEarning(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__createReferalEarning`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllReferalEarning = createServerFn({
  method: "GET",
})
  .validator(read__AllReferalEarningSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllReferalEarning(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readAllReferalEarning`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
