import z from "zod";

export const read__AllMiningOrdersSchema = z.object({
  identifier: z
    .object({
      miningProfileUsed: z.string().optional(),
      miningStatus: z
        .union([z.literal("active"), z.literal("completed")])
        .optional(),
      userId: z.string().optional(),
    })
    .optional(),
  queryOptions: z
    .object({
      skip: z.number().optional(),
      limit: z.number().optional(),
    })
    .optional(),
  joiningOptions: z
    .object({
      user: z.literal(true).optional(),
      miningProfile: z.literal(true).optional(),
    })
    .optional(),
  selectedFields: z
    .intersection(
      z.object({
        miningProfileUsed: z.literal(true).optional(),
        miningStatus: z.literal(true).optional(),
        id: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        updatedAt: z.literal(true).optional(),
        tableIdentifierToken: z.literal(true).optional(),
        orderedBy: z.literal(true).optional(),
        amountInvested: z.literal(true).optional(),
        amountReceived: z.literal(true).optional(),
      }),
      z.object({
        user: z
          .object({
            id: z.literal(true).optional(),
            email: z.literal(true).optional(),
            fullName: z.literal(true).optional(),
            avatarUrl: z.literal(true).optional(),
            age: z.literal(true).optional(),
            role: z.literal(true).optional(),
            phoneNumber: z.literal(true).optional(),
            referrerId: z.literal(true).optional(),
            userStatus: z.literal(true).optional(),
            createdAt: z.literal(true).optional(),
            updatedAt: z.literal(true).optional(),
            tableIdentifierToken: z.literal(true).optional(),
          })
          .optional(),
        miningProfile: z
          .object({
            id: z.literal(true).optional(),
            createdAt: z.literal(true).optional(),
            updatedAt: z.literal(true).optional(),
            tableIdentifierToken: z.literal(true).optional(),
            maximumAllowedAmount: z.literal(true).optional(),
            minimumAllowedAmount: z.literal(true).optional(),
            lockinPeriod: z.literal(true).optional(),
            category: z.literal(true).optional(),
            dailyReturn: z.literal(true).optional(),
            isPopular: z.literal(true).optional(),
          })
          .optional(),
      }),
    )
    .optional(),
});
