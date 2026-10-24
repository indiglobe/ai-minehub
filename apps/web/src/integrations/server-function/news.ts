import { read__AllNewsSchema } from "@repo/data/validators/news";
import { read__AllNews } from "@repo/data/querries/news";
import { createServerFn } from "@tanstack/react-start";
import { tryCatch } from "@repo/utils/try-catch";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllNewsSchema = createServerFn({
  method: "GET",
})
  .validator(read__AllNewsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllNews(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readAllNewsSchema`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
