import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { RequestedAssetsTable, UserTable } from "@/schema";
import {
  create__RequestedAsset,
  read__AllRequestedAssets,
  read__OneRequestedAsset,
  delete__RequestedAsset,
} from "@/querries/requested-asset";
import { db } from "@/index";
import { and, eq, sql } from "drizzle-orm";

const assetUrl1 = "https://example.com/assets/react-intro.mp4";
const assetUrl2 = "https://example.com/assets/node-intro.mp4";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(RequestedAssetsTable);
  await db.delete(UserTable);

  await db.insert(UserTable).values([
    {
      email: "john@example.com",
      fullName: "John Doe",
      avatarUrl: "https://example.com/john.png",
      age: 25,
      phoneNumber: "9876543210",
    },
    {
      email: "jane@example.com",
      fullName: "Jane Smith",
      avatarUrl: "https://example.com/jane.png",
      age: 28,
      phoneNumber: "9999999999",
    },
  ]);

  await db.insert(RequestedAssetsTable).values([
    {
      userEmail: "john@example.com",
      assetUrl: assetUrl1,
    },
    {
      userEmail: "jane@example.com",
      assetUrl: assetUrl2,
    },
  ]);
});

afterAll(async () => {
  await db.delete(RequestedAssetsTable);
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Requested Asset Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates requested asset", async () => {
    const created = await create__RequestedAsset({
      userEmail: "john@example.com",
      assetUrl: "https://example.com/assets/typescript.pdf",
    });

    expect(created).not.toBeNull();

    expect(created?.userEmail).toBe("john@example.com");
    expect(created?.assetUrl).toBe("https://example.com/assets/typescript.pdf");

    expect(created?.tableIdentifierToken).toBe("RQAS");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all requested assets", async () => {
    const records = await read__AllRequestedAssets();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.userEmail).toContain("@");
      expect(record.assetUrl).toContain("https://");

      expect(record.tableIdentifierToken).toBe("RQAS");
    }
  });

  test("reads requested assets with limit", async () => {
    const records = await read__AllRequestedAssets({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records).toHaveLength(1);
  });

  test("reads requested assets with skip", async () => {
    const all = await read__AllRequestedAssets();

    const skipped = await read__AllRequestedAssets({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads requested assets filtered by userEmail", async () => {
    const records = await read__AllRequestedAssets({
      identifier: {
        userEmail: "john@example.com",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.userEmail).toBe("john@example.com");
    }
  });

  test("reads requested assets filtered by assetUrl", async () => {
    const records = await read__AllRequestedAssets({
      identifier: {
        assetUrl: assetUrl1,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.assetUrl).toBe(assetUrl1);
    }
  });

  test("reads requested assets using multiple filters", async () => {
    const records = await read__AllRequestedAssets({
      identifier: {
        userEmail: "john@example.com",
        assetUrl: assetUrl1,
      },
    });

    expect(records).toHaveLength(1);

    expect(records[0]?.userEmail).toBe("john@example.com");
    expect(records[0]?.assetUrl).toBe(assetUrl1);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one requested asset", async () => {
    const record = await read__OneRequestedAsset({
      identifier: {
        userEmail: "john@example.com",
        assetUrl: assetUrl1,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.userEmail).toBe("john@example.com");
    expect(record?.assetUrl).toBe(assetUrl1);

    expect(record?.tableIdentifierToken).toBe("RQAS");
  });

  test("returns null for non-existing requested asset", async () => {
    const record = await read__OneRequestedAsset({
      identifier: {
        userEmail: "missing@example.com",
        assetUrl: "https://example.com/missing.pdf",
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes requested asset", async () => {
    await create__RequestedAsset({
      userEmail: "jane@example.com",
      assetUrl: "https://example.com/assets/delete-me.pdf",
    });

    const deleted = await delete__RequestedAsset({
      identifier: {
        userEmail: "jane@example.com",
        assetUrl: "https://example.com/assets/delete-me.pdf",
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(RequestedAssetsTable)
      .where(
        and(
          eq(RequestedAssetsTable.userEmail, "jane@example.com"),
          eq(
            RequestedAssetsTable.assetUrl,
            "https://example.com/assets/delete-me.pdf",
          ),
        ),
      );

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing requested asset", async () => {
    const deleted = await delete__RequestedAsset({
      identifier: {
        userEmail: "missing@example.com",
        assetUrl: "https://example.com/missing.pdf",
      },
    });

    expect(deleted).toBeNull();
  });
});
