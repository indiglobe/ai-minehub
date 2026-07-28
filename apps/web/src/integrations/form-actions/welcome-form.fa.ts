import { createServerFn } from "@tanstack/react-start";
import { serverFn__createUser } from "../server-function/user";
import { create__UserSchema } from "@repo/data/validators/user";
import { setUserDetailsCookie } from "@/lib/auth/session";

export const formAction__createNewUser = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    const createdUser = await serverFn__createUser({ data });

    if (createdUser) {
      const { age, avatarUrl, email, fullName, phoneNumber, role, id } =
        createdUser;

      await setUserDetailsCookie({
        data: {
          age,
          avatarUrl,
          email,
          fullName,
          role,
          phone: phoneNumber,
          userId: id,
        },
      });
    }

    return;
  });
