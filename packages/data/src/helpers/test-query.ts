import { Table__MiningOrder, Table__TradingOrder, Table__User } from "@/schema";
import { db } from "..";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { read__UserCount } from "@/querries/user";

(async () => {
  console.log(await read__UserCount({ identifier: { role: "BASIC" } }));
})();
