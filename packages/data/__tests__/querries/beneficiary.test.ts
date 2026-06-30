import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "@/index";
import { BeneficiaryTable, UserTable } from "@/schema";
import {
  create__Beneficiary,
  read__AllBeneficiaries,
  read__OneBeneficiary,
  update__Beneficiary,
  delete__Beneficiary,
} from "@/querries/beneficiary";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(BeneficiaryTable);
  await db.delete(UserTable);

  await db.insert(UserTable).values([
    {
      email: "user1@email.com",
      fullName: "User One",
      avatarUrl: "https://example.com/avatar1.png",
      age: 82,
      role: "basic",
      phoneNumber: "8585858585",
    },
    {
      email: "user2@email.com",
      fullName: "User Two",
      avatarUrl: "https://example.com/avatar2.png",
      age: 50,
      role: "basic",
      phoneNumber: "9999999999",
    },
    {
      email: "user3@email.com",
      fullName: "User Three",
      avatarUrl: "https://example.com/avatar3.png",
      age: 35,
      role: "basic",
      phoneNumber: "7777777777",
    },
  ]);

  await db.insert(BeneficiaryTable).values([
    {
      userEmail: "user2@email.com",
      beneficiarySince: new Date("2020-01-01T00:00:00.000Z"),
    },
  ]);
});

afterAll(async () => {
  await db.delete(BeneficiaryTable);
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Beneficiary Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates beneficiary with auto generated beneficiarySince", async () => {
    const beforeInsert = Date.now();

    const result = await create__Beneficiary({
      userEmail: "user1@email.com",
    });

    expect(result).not.toBeNull();

    expect(result?.user.email).toBe("user1@email.com");
    expect(result?.tableIdentifierToken).toBe("BUSR");
    expect(result?.beneficiarySince).toBeInstanceOf(Date);

    const [row] = await db
      .select()
      .from(BeneficiaryTable)
      .where(eq(BeneficiaryTable.userEmail, "user1@email.com"));

    expect(row).toBeDefined();

    expect(row!.userEmail).toBe("user1@email.com");
    expect(row!.tableIdentifierToken).toBe("BUSR");
    expect(row!.beneficiarySince).toBeInstanceOf(Date);

    const diff = Math.abs(row!.beneficiarySince.getTime() - beforeInsert);

    expect(diff).toBeLessThan(5000);
  });

  test("throws when referenced user does not exist", async () => {
    await expect(
      create__Beneficiary({
        userEmail: "missing@email.com",
      }),
    ).rejects.toThrow();
  });

  test("cannot create duplicate beneficiary", async () => {
    await expect(
      create__Beneficiary({
        userEmail: "user2@email.com",
      }),
    ).rejects.toThrow();
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all beneficiaries", async () => {
    const beneficiaries = await read__AllBeneficiaries();

    expect(Array.isArray(beneficiaries)).toBe(true);
    expect(beneficiaries.length).toBeGreaterThanOrEqual(2);

    for (const beneficiary of beneficiaries) {
      expect(beneficiary.beneficiarySince).toBeInstanceOf(Date);

      expect(beneficiary.tableIdentifierToken).toBe("BUSR");

      expect(beneficiary.user.email).toBeTruthy();
      expect(beneficiary.user.fullName).toBeTruthy();

      expect(beneficiary.user.tableIdentifierToken).toBe("USER");
    }
  });

  test("reads beneficiaries with limit", async () => {
    const beneficiaries = await read__AllBeneficiaries({
      queryOptions: {
        limit: 1,
      },
    });

    expect(beneficiaries.length).toBe(1);
  });

  test("reads beneficiaries with skip", async () => {
    const allBeneficiaries = await read__AllBeneficiaries();

    const skippedBeneficiaries = await read__AllBeneficiaries({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skippedBeneficiaries.length).toBe(allBeneficiaries.length - 1);
  });

  test("reads beneficiaries filtered by userEmail", async () => {
    const beneficiaries = await read__AllBeneficiaries({
      identifier: {
        userEmail: "user1@email.com",
      },
    });

    expect(beneficiaries.length).toBe(1);

    expect(beneficiaries[0]?.user.email).toBe("user1@email.com");
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one existing beneficiary", async () => {
    const beneficiary = await read__OneBeneficiary({
      identifier: {
        userEmail: "user1@email.com",
      },
    });

    expect(beneficiary).not.toBeNull();

    expect(beneficiary?.user.email).toBe("user1@email.com");

    expect(beneficiary?.user.fullName).toBe("User One");

    expect(beneficiary?.user.avatarUrl).toContain("avatar1");

    expect(beneficiary?.beneficiarySince).toBeInstanceOf(Date);

    expect(beneficiary?.tableIdentifierToken).toBe("BUSR");

    expect(beneficiary?.user.tableIdentifierToken).toBe("USER");
  });

  test("returns null for non-existing beneficiary", async () => {
    const beneficiary = await read__OneBeneficiary({
      identifier: {
        userEmail: "doesnotexist@email.com",
      },
    });

    expect(beneficiary).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates beneficiarySince", async () => {
    const updatedDate = new Date("2019-01-01T00:00:00.000Z");

    const result = await update__Beneficiary({
      identifier: {
        userEmail: "user1@email.com",
      },
      dataToUpdate: {
        beneficiarySince: updatedDate,
      },
    });

    expect(result).not.toBeNull();

    expect(result?.tableIdentifierToken).toBe("BUSR");

    const [row] = await db
      .select()
      .from(BeneficiaryTable)
      .where(eq(BeneficiaryTable.userEmail, "user1@email.com"));

    expect(row).toBeDefined();

    expect(new Date(row!.beneficiarySince).toISOString()).toBe(
      updatedDate.toISOString(),
    );
  });

  test("returns null when no fields are provided for update", async () => {
    const result = await update__Beneficiary({
      identifier: {
        userEmail: "user1@email.com",
      },
      dataToUpdate: {
        beneficiarySince: undefined,
      },
    });

    expect(result).toBeNull();
  });

  test("returns null when updating non-existing beneficiary with empty update payload", async () => {
    const result = await update__Beneficiary({
      identifier: {
        userEmail: "missing@email.com",
      },
      dataToUpdate: {},
    });

    expect(result).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes beneficiary", async () => {
    const deletedBeneficiary = await delete__Beneficiary({
      identifier: {
        userEmail: "user3@email.com",
      },
    });

    expect(deletedBeneficiary).toBeNull();

    await create__Beneficiary({
      userEmail: "user3@email.com",
    });

    const deleted = await delete__Beneficiary({
      identifier: {
        userEmail: "user3@email.com",
      },
    });

    expect(deleted).not.toBeNull();

    const [row] = await db
      .select()
      .from(BeneficiaryTable)
      .where(eq(BeneficiaryTable.userEmail, "user3@email.com"));

    expect(row).toBeUndefined();
  });

  test("returns null when deleting non-existing beneficiary", async () => {
    const result = await delete__Beneficiary({
      identifier: {
        userEmail: "notfound@email.com",
      },
    });

    expect(result).toBeNull();
  });
});
