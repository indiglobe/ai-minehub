import type { fetchUserDetailsCookie } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";

export function contextData__userDetailsFromCookies({
  role,
}: {
  role: "basic" | "admin";
}) {
  return {
    userId: "2121212121",
    fullName: "Indiglobe IT",
    age: 30,
    avatarUrl: "https://avatars.githubusercontent.com/u/97165289",
    email: "kassandra4@hotmail.com",
    phone: "961-770-7727",
    role: role,
  } satisfies DeepPartial<Awaited<ReturnType<typeof fetchUserDetailsCookie>>>;
}
