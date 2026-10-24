/**
 * Available user roles used to control access permissions
 * and distinguish administrative users from regular users.
 */
export const ROLE = ["ADMIN", "BASIC"] as const;

/**
 * Supported cryptocurrency transaction methods used to identify
 * the blockchain network or cryptocurrency for deposits and withdrawals.
 */
export const TRANSACTION_METHOD = ["BSC", "TRX", "ETH", "Bitcoin"] as const;

/**
 * Possible user account statuses used to determine whether an account
 * is active, inactive, or blocked.
 */
export const USER_STATUS = ["ACTIVE", "INACTIVE", "BLOCKED"] as const;

/**
 * Possible investment statuses used to indicate whether an investment
 * is currently active or has been completed.
 */
export const INVESTMENT_STATUS = ["ACTIVE", "COMPLETED"] as const;

/**
 * Possible deposit statuses used to track the deposit lifecycle,
 * from pending or validation through processing or rejection.
 */
export const DEPOSIT_STATUS = [
  "PENDING",
  "PROCESSED",
  "VALIDATING",
  "REJECTED",
] as const;

/**
 * Possible withdrawal statuses used to track the withdrawal lifecycle,
 * including pending, validation, processing, and rejection.
 */
export const WITHDRAWL_STATUS = [
  "PENDING",
  "PROCESSED",
  "VALIDATING",
  "REJECTED",
] as const;

/**
 * Supported causes of referrer earnings, identifying rewards generated
 * through referrals, referred-user deposits, or referred-user profits.
 */
export const REFERRER_EARNING_CAUSE = [
  "REFERING",
  "REFERRER_DEPOSIT",
  "REFERRER_PROFIT",
] as const;
