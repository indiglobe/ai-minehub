import { read__AllRatingsSchema } from "@repo/data/validators/rating";
import { read__AllRatings } from "@repo/data/querries/rating";
import { createServerFn } from "@tanstack/react-start";
import { tryCatch } from "@repo/utils/try-catch";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllRatings = createServerFn({
  method: "GET",
})
  .validator(read__AllRatingsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllRatings(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readAllRatings`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
