import { read__AllUsers, read__OneUser } from "@/querries/user";

(async () => {
  const res = await read__OneUser({
    // identifier: { id: "8a6cc1514a" },
    // identifier: { id: "46efa423f4" },
    identifier: { id: "d0969f5985" },
    // identifier: { id: "22d09744f3" },
    joiningOptions: {
      referrer: true,
      tradingWallet: true,
      miningWallet: true,
      rating: true,
      referrals: true,
      miningOrders: true,
      tradingOrders: true,
    },
  });

  console.log(res);
})();
