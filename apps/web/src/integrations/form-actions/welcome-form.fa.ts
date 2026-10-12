import { createServerFn } from "@tanstack/react-start";
import { serverFn__createUser } from "@/integrations/server-function/user";
import { create__UserSchema } from "@repo/data/validators/user";
import { setUserDetailsCookie } from "@/lib/auth/session";
import { tryCatch } from "@repo/utils/try-catch";

export const formAction__createNewUser = createServerFn()
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    const [formActionError, formActionResult] = await tryCatch(
      serverFn__createUser({ data }),
    );

    if (formActionError) {
      console.error(`Error in formActionError in formAction__createNewUser`);
      console.error(formActionError);
      throw formActionError;
    }

    const { age, avatarUrl, email, fullName, phoneNumber, role, id } =
      formActionResult;

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

    return formActionResult;
  });
