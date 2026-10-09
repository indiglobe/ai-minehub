import {
  read__OneUser,
  read__AllUsers,
  create__User,
} from "@repo/data/querries/user";
import {
  read__OneUserSchema,
  create__UserSchema,
  read__AllUsersSchema,
} from "@repo/data/validators/user";
import { createServerFn } from "@tanstack/react-start";
import { tryCatch } from "@repo/utils/try-catch";

export const serverFn__readOneUser = createServerFn()
  .validator(read__OneUserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(read__OneUser(data));

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export const serverFn__createUser = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(create__User(data));

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__createUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export const serverFn__readAllUsers = createServerFn()
  .validator(read__AllUsersSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllUsers(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllUsers`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });
