import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { FaqTable } from "@/schema";
import {
  create__Faq,
  read__AllFaqs,
  read__OneFaq,
  update__Faq,
  delete__Faq,
} from "@/querries/faq";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let faq1Id: number;
let faq2Id: number;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(FaqTable);

  const [faq1] = await db
    .insert(FaqTable)
    .values({
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces.",
      isVisible: true,
    })
    .$returningId();

  faq1Id = faq1!.id;

  const [faq2] = await db
    .insert(FaqTable)
    .values({
      question: "What is Node.js?",
      answer: "A JavaScript runtime built on Chrome's V8 engine.",
      isVisible: false,
    })
    .$returningId();

  faq2Id = faq2!.id;
});

afterAll(async () => {
  await db.delete(FaqTable);

  await db.execute(sql`ROLLBACK`);
});

describe("FAQ Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates faq", async () => {
    const created = await create__Faq({
      question: "What is TypeScript?",
      answer: "A typed superset of JavaScript.",
      isVisible: true,
    });

    expect(created).not.toBeNull();

    expect(created?.id).toBeTypeOf("number");

    expect(created?.question).toBe("What is TypeScript?");
    expect(created?.answer).toBe("A typed superset of JavaScript.");

    expect(created?.isVisible).toBe(true);

    expect(created?.tableIdentifierToken).toBe("FAQS");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all faqs", async () => {
    const faqs = await read__AllFaqs();

    expect(Array.isArray(faqs)).toBe(true);
    expect(faqs.length).toBeGreaterThanOrEqual(2);

    for (const faq of faqs) {
      expect(faq.id).toBeTypeOf("number");

      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();

      expect(typeof faq.isVisible).toBe("boolean");

      expect(faq.tableIdentifierToken).toBe("FAQS");
    }
  });

  test("reads visible faqs only", async () => {
    const faqs = await read__AllFaqs({
      identifier: {
        isVisible: true,
      },
    });

    expect(faqs.length).toBeGreaterThan(0);

    for (const faq of faqs) {
      expect(faq.isVisible).toBe(true);
    }
  });

  test("reads hidden faqs only", async () => {
    const faqs = await read__AllFaqs({
      identifier: {
        isVisible: false,
      },
    });

    expect(faqs.length).toBeGreaterThan(0);

    for (const faq of faqs) {
      expect(faq.isVisible).toBe(false);
    }
  });

  test("reads faqs with limit", async () => {
    const faqs = await read__AllFaqs({
      queryOptions: {
        limit: 1,
      },
    });

    expect(faqs).toHaveLength(1);
  });

  test("reads faqs with skip", async () => {
    const all = await read__AllFaqs();

    const skipped = await read__AllFaqs({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads faqs with visibility filter and limit", async () => {
    const faqs = await read__AllFaqs({
      identifier: {
        isVisible: true,
      },
      queryOptions: {
        limit: 1,
      },
    });

    expect(faqs).toHaveLength(1);
    expect(faqs[0]?.isVisible).toBe(true);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one faq", async () => {
    const faq = await read__OneFaq({
      identifier: {
        id: faq1Id,
      },
    });

    expect(faq).not.toBeNull();

    expect(faq?.id).toBe(faq1Id);

    expect(faq?.question).toBe("What is React?");
    expect(faq?.answer).toBe(
      "A JavaScript library for building user interfaces.",
    );

    expect(faq?.isVisible).toBe(true);

    expect(faq?.tableIdentifierToken).toBe("FAQS");
  });

  test("returns null for non-existing faq", async () => {
    const faq = await read__OneFaq({
      identifier: {
        id: -99999,
      },
    });

    expect(faq).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates faq", async () => {
    const updated = await update__Faq({
      identifier: {
        id: faq2Id,
      },
      dataToUpdate: {
        question: "Updated Node.js Question",
        isVisible: true,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.question).toBe("Updated Node.js Question");
    expect(updated?.isVisible).toBe(true);
  });

  test("updates faq answer only", async () => {
    const updated = await update__Faq({
      identifier: {
        id: faq1Id,
      },
      dataToUpdate: {
        answer: "Updated React Answer",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.answer).toBe("Updated React Answer");
  });

  test("returns null when update contains only undefined fields", async () => {
    const updated = await update__Faq({
      identifier: {
        id: faq1Id,
      },
      dataToUpdate: {
        question: undefined,
        answer: undefined,
        isVisible: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes faq", async () => {
    const created = await create__Faq({
      question: "Delete Me",
      answer: "Delete Answer",
      isVisible: true,
    });

    const deleted = await delete__Faq({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(FaqTable)
      .where(eq(FaqTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing faq", async () => {
    const deleted = await delete__Faq({
      identifier: {
        id: -99999,
      },
    });

    expect(deleted).toBeNull();
  });
});
