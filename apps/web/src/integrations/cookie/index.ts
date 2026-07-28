import { createServerFn } from "@tanstack/react-start";

export const setCookie = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    return await create__User(data);
  });
