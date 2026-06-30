import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { TestimonialsTable, UserTable } from "@/schema";
import {
  create__Testimonial,
  read__AllTestimonials,
  read__OneTestimonial,
  update__Testimonial,
  delete__Testimonial,
} from "@/querries/testimonial";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let testimonial1Id: number;
let testimonial2Id: number;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(TestimonialsTable);
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

  const [testimonial1] = await db
    .insert(TestimonialsTable)
    .values({
      content: "Excellent course. Highly recommended.",
      authorEmail: "john@example.com",
      socialHandle: "@john_doe",
    })
    .$returningId();

  testimonial1Id = testimonial1!.id;

  const [testimonial2] = await db
    .insert(TestimonialsTable)
    .values({
      content: "Amazing webinar and great insights.",
      authorEmail: "jane@example.com",
      socialHandle: "@jane_smith",
    })
    .$returningId();

  testimonial2Id = testimonial2!.id;
});

afterAll(async () => {
  await db.delete(TestimonialsTable);
  await db.delete(UserTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Testimonial Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates testimonial", async () => {
    const created = await create__Testimonial({
      content: "This platform helped me a lot.",
      authorEmail: "john@example.com",
      socialHandle: "@john_new",
    });

    expect(created).not.toBeNull();

    expect(created?.id).toBeTypeOf("number");

    expect(created?.content).toBe("This platform helped me a lot.");

    expect(created?.authorEmail).toBe("john@example.com");

    expect(created?.socialHandle).toBe("@john_new");

    expect(created?.tableIdentifierToken).toBe("TMNL");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all testimonials", async () => {
    const testimonials = await read__AllTestimonials();

    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBeGreaterThanOrEqual(2);

    for (const testimonial of testimonials) {
      expect(testimonial.id).toBeTypeOf("number");

      expect(testimonial.content).toBeTruthy();

      expect(testimonial.authorEmail).toContain("@");

      expect(testimonial.socialHandle).toBeTruthy();

      expect(testimonial.tableIdentifierToken).toBe("TMNL");
    }
  });

  test("reads testimonials with limit", async () => {
    const testimonials = await read__AllTestimonials({
      queryOptions: {
        limit: 1,
      },
    });

    expect(testimonials).toHaveLength(1);
  });

  test("reads testimonials with skip", async () => {
    const all = await read__AllTestimonials();

    const skipped = await read__AllTestimonials({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads testimonials filtered by authorEmail", async () => {
    const testimonials = await read__AllTestimonials({
      identifier: {
        authorEmail: "john@example.com",
      },
    });

    expect(testimonials.length).toBeGreaterThan(0);

    for (const testimonial of testimonials) {
      expect(testimonial.authorEmail).toBe("john@example.com");
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one testimonial", async () => {
    const testimonial = await read__OneTestimonial({
      identifier: {
        id: testimonial1Id,
      },
    });

    expect(testimonial).not.toBeNull();

    expect(testimonial?.id).toBe(testimonial1Id);

    expect(testimonial?.content).toBe("Excellent course. Highly recommended.");

    expect(testimonial?.authorEmail).toBe("john@example.com");

    expect(testimonial?.socialHandle).toBe("@john_doe");

    expect(testimonial?.tableIdentifierToken).toBe("TMNL");
  });

  test("returns null for non-existing testimonial", async () => {
    const testimonial = await read__OneTestimonial({
      identifier: {
        id: -99999,
      },
    });

    expect(testimonial).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates testimonial", async () => {
    const updated = await update__Testimonial({
      identifier: {
        id: testimonial2Id,
      },
      dataToUpdate: {
        content: "Updated testimonial content",
        socialHandle: "@updated_handle",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.content).toBe("Updated testimonial content");

    expect(updated?.socialHandle).toBe("@updated_handle");
  });

  test("updates authorEmail", async () => {
    const updated = await update__Testimonial({
      identifier: {
        id: testimonial1Id,
      },
      dataToUpdate: {
        authorEmail: "jane@example.com",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.authorEmail).toBe("jane@example.com");
  });

  test("returns null when update contains only undefined fields", async () => {
    const updated = await update__Testimonial({
      identifier: {
        id: testimonial1Id,
      },
      dataToUpdate: {
        content: undefined,
        authorEmail: undefined,
        socialHandle: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes testimonial", async () => {
    const created = await create__Testimonial({
      content: "Delete this testimonial",
      authorEmail: "john@example.com",
      socialHandle: "@delete_me",
    });

    const deleted = await delete__Testimonial({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(TestimonialsTable)
      .where(eq(TestimonialsTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing testimonial", async () => {
    const deleted = await delete__Testimonial({
      identifier: {
        id: -99999,
      },
    });

    expect(deleted).toBeNull();
  });
});
