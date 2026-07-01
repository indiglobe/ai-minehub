import { read__OneUser, create__User } from "@repo/data/querries/user";
import {
  read__OneUserSchema,
  create__UserSchema,
} from "@repo/data/validators/user";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readOneUser = createServerFn()
  .validator(read__OneUserSchema)
  .handler(async ({ data }) => {
    return await read__OneUser(data);
  });

export const serverFn__createUser = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    return await create__User(data);
  });
