import { read__AllChats } from "@repo/data/querries/chat";
import { read__AllChatsSchema } from "@repo/data/validators/chat";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllChats = createServerFn({ method: "GET" })
  .validator(read__AllChatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllChats(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllChats`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

export { serverFn__readAllChats };
