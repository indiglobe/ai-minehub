import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";

export function mocked__fetchUserDetailsCookie() {
  return {
    role: "basic",
    age: 30,
    avatarUrl: "",
    email: "",
    fullName: "",
    phone: "",
    userId: "",
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}
