import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { ContactSubmissionTable } from "@/schema";
import {
  create__ContactSubmission,
  read__AllContactSubmissions,
  read__OneContactSubmission,
  update__ContactSubmission,
  delete__ContactSubmission,
} from "@/querries/contact-submission";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let submission1Id: number;
let submission2Id: number;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(ContactSubmissionTable);

  const [{ insertId: id1 }] = await db.insert(ContactSubmissionTable).values({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "9876543210",
    message: "I would like to know more about your services.",
    isVerified: true,
  });

  submission1Id = id1;

  const [{ insertId: id2 }] = await db.insert(ContactSubmissionTable).values({
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phoneNumber: "9999999999",
    message: "Please contact me regarding webinars.",
    isVerified: false,
  });

  submission2Id = id2;
});

afterAll(async () => {
  await db.delete(ContactSubmissionTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Contact Submission Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates contact submission", async () => {
    const result = await create__ContactSubmission({
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phoneNumber: "8888888888",
      message: "Need help with course enrollment.",
    });

    expect(result).not.toBeNull();

    expect(result?.firstName).toBe("Alice");
    expect(result?.lastName).toBe("Johnson");
    expect(result?.email).toBe("alice@example.com");
    expect(result?.phoneNumber).toBe("8888888888");
    expect(result?.message).toBe("Need help with course enrollment.");

    expect(result?.isVerified).toBe(false);

    expect(result?.createdAt).toBeInstanceOf(Date);
    expect(result?.updatedAt).toBeInstanceOf(Date);

    expect(result?.tableIdentifierToken).toBe("CONT");

    const row = await read__OneContactSubmission({
      identifier: {
        id: result!.id,
      },
    });

    expect(row).not.toBeNull();
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all contact submissions", async () => {
    const records = await read__AllContactSubmissions();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.id).toBeTypeOf("number");

      expect(record.firstName).toBeTruthy();
      expect(record.lastName).toBeTruthy();

      expect(record.email).toContain("@");

      expect(record.phoneNumber).toHaveLength(10);

      expect(record.message).toBeTruthy();

      expect(typeof record.isVerified).toBe("boolean");

      expect(record.createdAt).toBeInstanceOf(Date);
      expect(record.updatedAt).toBeInstanceOf(Date);

      expect(record.tableIdentifierToken).toBe("CONT");
    }
  });

  test("reads contact submissions with limit", async () => {
    const records = await read__AllContactSubmissions({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records.length).toBe(1);
  });

  test("reads contact submissions with skip", async () => {
    const all = await read__AllContactSubmissions();

    const skipped = await read__AllContactSubmissions({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads contact submissions filtered by email", async () => {
    const records = await read__AllContactSubmissions({
      identifier: {
        email: "john@example.com",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.email).toBe("john@example.com");
    }
  });

  test("reads contact submissions filtered by isVerified", async () => {
    const records = await read__AllContactSubmissions({
      identifier: {
        isVerified: true,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.isVerified).toBe(true);
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one existing contact submission", async () => {
    const record = await read__OneContactSubmission({
      identifier: {
        id: submission1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(submission1Id);

    expect(record?.firstName).toBe("John");
    expect(record?.lastName).toBe("Doe");

    expect(record?.email).toBe("john@example.com");

    expect(record?.phoneNumber).toBe("9876543210");

    expect(record?.message).toContain("services");

    expect(record?.isVerified).toBe(true);

    expect(record?.tableIdentifierToken).toBe("CONT");
  });

  test("returns null for non-existing contact submission", async () => {
    const record = await read__OneContactSubmission({
      identifier: {
        id: -1,
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates contact submission", async () => {
    const result = await update__ContactSubmission({
      identifier: {
        id: submission2Id,
      },
      dataToUpdate: {
        isVerified: true,
        message: "Updated message.",
      },
    });

    expect(result).not.toBeNull();

    expect(result?.isVerified).toBe(true);
    expect(result?.message).toBe("Updated message.");

    const row = await read__OneContactSubmission({
      identifier: {
        id: submission2Id,
      },
    });

    expect(row?.isVerified).toBe(true);
    expect(row?.message).toBe("Updated message.");
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__ContactSubmission({
      identifier: {
        id: submission1Id,
      },
      dataToUpdate: {
        message: undefined,
        isVerified: undefined,
      },
    });

    expect(result).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes contact submission", async () => {
    const created = await create__ContactSubmission({
      firstName: "Delete",
      lastName: "Me",
      email: "delete@example.com",
      phoneNumber: "7777777777",
      message: "Delete this record.",
    });

    const deleted = await delete__ContactSubmission({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const row = await db
      .select()
      .from(ContactSubmissionTable)
      .where(eq(ContactSubmissionTable.id, created!.id));

    expect(row).toHaveLength(0);
  });

  test("returns null when deleting non-existing contact submission", async () => {
    const result = await delete__ContactSubmission({
      identifier: {
        id: -99999,
      },
    });

    expect(result).toBeNull();
  });
});
