export const ROLE = ["ADMIN", "BASIC"] as const;

export const TRANSACTION_METHOD = ["BSC", "TRX", "ETH", "Bitcoin"] as const;

export const USER_STATUS = ["ACTIVE", "INACTIVE", "BLOCKED"] as const;

export const INVESTMENT_STATUS = ["ACTIVE", "COMPLETED"] as const;

export const DEPOSIT_STATUS = [
  "PENDING",
  "PROCESSED",
  "VALIDATING",
  "REJECTED",
] as const;

export const WITHDRAWL_STATUS = [
  "PENDING",
  "PROCESSED",
  "VALIDATING",
  "REJECTED",
] as const;
