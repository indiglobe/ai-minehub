import { z } from "zod";

export const welcomeFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  age: z.number(),
  phoneNo: z.number(),
  referralCode: z.string(),
});

export type TWelcomeFormSchema = z.infer<typeof welcomeFormSchema>;
