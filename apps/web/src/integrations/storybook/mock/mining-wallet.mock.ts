import type { serverFn__readOneMiningWallet } from "@/integrations/server-function/mining-wallet";
import type { DeepPartial } from "@/utils/types/storybook";

export function mocked__serverFn__readOneMiningWallet() {
  return {
    associatedUser: "2121212121",
    balance: 30,
    createdAt: new Date("2022-07-31T01:33:29.567Z"),
    id: "1212121212",
    tableIdentifierToken: "MWAL",
    updatedAt: new Date("2022-07-31T01:33:29.567Z"),
    user: {
      id: "2121212121",
      fullName: "Indiglobe IT",
      age: 30,
      avatarUrl: "https://avatars.githubusercontent.com/u/97165289",
      createdAt: new Date("2022-07-31T01:33:29.567Z"),
      email: "Jeanne63@yahoo.com",
      phoneNumber: "13-850175-913761-7",
      referrerId: "3232323234",
      role: "admin",
      tableIdentifierToken: "USER",
      updatedAt: new Date("2022-07-31T01:33:29.567Z"),
    },
  } satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readOneMiningWallet>>
  >;
}
