import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { UserTable } from "@/schema";
import {
  create__User,
  read__AllUsers,
  read__OneUser,
  update__User,
  delete__User,
} from "@/querries/user";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(UserTable);

  await db.insert(UserTable).values([
    {
      email: "john@example.com",
      fullName: "John Doe",
      avatarUrl: "https://example.com/john.png",
      age: 25,
      role: "basic",
      phoneNumber: "9876543210",
    },
    {
      email: "admin@example.com",
      fullName: "Admin User",
      avatarUrl: "https://example.com/admin.png",
      age: 35,
      role: "admin",
      phoneNumber: "9999999999",
    },
  ]);
});

afterAll(async () => {
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("User Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates user", async () => {
    const created = await create__User({
      email: "newuser@example.com",
      fullName: "New User",
      avatarUrl: "https://example.com/new-user.png",
      age: 22,
      role: "basic",
      phoneNumber: "9123456789",
    });

    expect(created).not.toBeNull();

    expect(created?.email).toBe("newuser@example.com");

    expect(created?.fullName).toBe("New User");

    expect(created?.avatarUrl).toBe("https://example.com/new-user.png");

    expect(created?.age).toBe(22);

    expect(created?.role).toBe("basic");

    expect(created?.phoneNumber).toBe("9123456789");

    expect(created?.createdAt).toBeInstanceOf(Date);

    expect(created?.tableIdentifierToken).toBe("USER");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all users", async () => {
    const users = await read__AllUsers();

    expect(Array.isArray(users)).toBe(true);

    expect(users.length).toBeGreaterThanOrEqual(2);

    for (const user of users) {
      expect(user.email).toContain("@");

      expect(user.fullName).toBeTruthy();

      expect(user.avatarUrl).toContain("https://");

      expect(user.age).toBeTypeOf("number");

      expect(["basic", "admin"]).toContain(user.role);

      expect(user.phoneNumber).toHaveLength(10);

      expect(user.createdAt).toBeInstanceOf(Date);

      expect(user.tableIdentifierToken).toBe("USER");
    }
  });

  test("reads users with limit", async () => {
    const users = await read__AllUsers({
      queryOptions: {
        limit: 1,
      },
    });

    expect(users).toHaveLength(1);
  });

  test("reads users with skip", async () => {
    const all = await read__AllUsers();

    const skipped = await read__AllUsers({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads users filtered by role basic", async () => {
    const users = await read__AllUsers({
      identifier: {
        role: "basic",
      },
    });

    expect(users.length).toBeGreaterThan(0);

    for (const user of users) {
      expect(user.role).toBe("basic");
    }
  });

  test("reads users filtered by role admin", async () => {
    const users = await read__AllUsers({
      identifier: {
        role: "admin",
      },
    });

    expect(users.length).toBeGreaterThan(0);

    for (const user of users) {
      expect(user.role).toBe("admin");
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one user", async () => {
    const user = await read__OneUser({
      identifier: {
        email: "john@example.com",
      },
    });

    expect(user).not.toBeNull();

    expect(user?.email).toBe("john@example.com");

    expect(user?.fullName).toBe("John Doe");

    expect(user?.avatarUrl).toBe("https://example.com/john.png");

    expect(user?.age).toBe(25);

    expect(user?.role).toBe("basic");

    expect(user?.phoneNumber).toBe("9876543210");

    expect(user?.createdAt).toBeInstanceOf(Date);

    expect(user?.tableIdentifierToken).toBe("USER");
  });

  test("returns null for non-existing user", async () => {
    const user = await read__OneUser({
      identifier: {
        email: "missing@example.com",
      },
    });

    expect(user).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates user", async () => {
    const updated = await update__User({
      identifier: {
        email: "john@example.com",
      },
      dataToUpdate: {
        fullName: "Updated John",
        age: 30,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.fullName).toBe("Updated John");

    expect(updated?.age).toBe(30);
  });

  test("updates user role", async () => {
    const updated = await update__User({
      identifier: {
        email: "john@example.com",
      },
      dataToUpdate: {
        role: "admin",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.role).toBe("admin");
  });

  test("returns null when update contains only undefined fields", async () => {
    const updated = await update__User({
      identifier: {
        email: "john@example.com",
      },
      dataToUpdate: {
        fullName: undefined,
        avatarUrl: undefined,
        age: undefined,
        role: undefined,
        phoneNumber: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes user", async () => {
    await create__User({
      email: "delete@example.com",
      fullName: "Delete User",
      avatarUrl: "https://example.com/delete.png",
      age: 20,
      role: "basic",
      phoneNumber: "9000000000",
    });

    const deleted = await delete__User({
      identifier: {
        email: "delete@example.com",
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, "delete@example.com"));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing user", async () => {
    const deleted = await delete__User({
      identifier: {
        email: "missing@example.com",
      },
    });

    expect(deleted).toBeNull();
  });
});
