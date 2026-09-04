import type { serverFn__readAllTradingOrders } from "@/integrations/server-function/trading-order";
import type { DeepPartial } from "@/utils/types/storybook";

export function mocked__serverFn__readAllTradingOrders() {
  return [
    {
      amountInvested: 20,
      amountRecived: 30,
      createdAt: new Date(),
      id: "2121212121",
      tradingStatus: "active",
      orderedBy: "3232323232",
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
      tableIdentifierToken: "TORD",
      updatedAt: new Date(),
    },
    {
      amountInvested: 20,
      amountRecived: 30,
      createdAt: new Date(),
      id: "2121212122",
      tradingStatus: "completed",
      orderedBy: "3232323232",
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
      tableIdentifierToken: "TORD",
      updatedAt: new Date(),
    },
    {
      amountInvested: 20,
      amountRecived: 30,
      createdAt: new Date(),
      id: "2121212123",
      tradingStatus: "active",
      orderedBy: "3232323232",
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
      tableIdentifierToken: "TORD",
      updatedAt: new Date(),
    },
  ] satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readAllTradingOrders>>
  >;
}
