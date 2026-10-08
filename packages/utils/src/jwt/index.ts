import { ROLE } from "@/db-enums";
import { env } from "@repo/env/server";
import * as jose from "jose";
import { z } from "zod";

const secret = new TextEncoder().encode(env.TOKEN_SECRET);

/**
 * Zod schema for validating application-specific JWT claims.
 *
 * This schema is used at runtime to ensure that decoded JWT payloads
 * contain the expected authentication and authorization fields.
 *
 * @example
 * ```ts
 * const payload = jwtPayloadSchema.parse({
 *   userId: "user_123",
 *   email: "user@example.com",
 *   fullName: "John Doe",
 *   avatarUrl: "https://example.com/avatar.jpg",
 *   age: 30,
 *   role: "basic",
 *   phone: "+1234567890",
 * });
 * ```
 */
export const jwtPayloadSchema = z.object({
  /** Unique identifier of the authenticated user. */
  userId: z.string(),

  /** Email address associated with the authenticated user. */
  email: z.email(),

  /** Full name of the authenticated user. */
  fullName: z.string(),

  /** URL of the user's avatar image. */
  avatarUrl: z.url(),

  /** Age of the authenticated user. */
  age: z.number().int().nonnegative(),

  /** Authorization role assigned to the user. */
  role: z.enum(ROLE),

  /** Phone number associated with the authenticated user. */
  phone: z.string(),
});

/**
 * Represents the application-specific claims included in a JSON Web Token.
 *
 * This type is automatically inferred from {@link jwtPayloadSchema},
 * ensuring that the TypeScript type and runtime validation schema remain
 * synchronized.
 */
export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

/**
 * Signs a JSON Web Token using the application's secret key.
 *
 * The token uses the HS256 signing algorithm and includes `iat` and `exp`
 * claims. The payload is validated against {@link jwtPayloadSchema} before
 * the token is signed.
 *
 * @param payload - Application-specific claims to include in the token.
 * @param expiresIn - Token lifetime expressed as seconds or a supported
 * duration string such as `"2h"` or `"7d"`. Defaults to `"2h"`.
 * @returns A promise that resolves to the signed JWT.
 *
 * @throws {@link z.ZodError}
 * If the provided payload does not match {@link jwtPayloadSchema}.
 *
 * @throws {@link jose.errors.JOSEError}
 * If the token cannot be signed.
 *
 * @example
 * ```ts
 * const token = await signJWT({
 *   userId: "user_123",
 *   email: "user@example.com",
 *   fullName: "John Doe",
 *   avatarUrl: "https://example.com/avatar.jpg",
 *   age: 30,
 *   role: "basic",
 *   phone: "+1234567890",
 * });
 * ```
 */
export const signJWT = async (
  payload: JwtPayload,
  expiresIn: string | number = "2h",
) => {
  const validatedPayload = jwtPayloadSchema.parse(payload);

  return await new jose.SignJWT(validatedPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

/**
 * Verifies the signature and validity of a JSON Web Token.
 *
 * In addition to cryptographically verifying the token, this function
 * validates the decoded payload against {@link jwtPayloadSchema}.
 *
 * The token must:
 * - Have a valid HS256 signature.
 * - Have been signed with the application's secret key.
 * - Not be expired.
 * - Contain a payload matching {@link jwtPayloadSchema}.
 *
 * @param token - JWT string to verify.
 * @returns A promise that resolves to the validated JWT payload.
 *
 * @throws {@link jose.errors.JOSEError}
 * If the token has an invalid signature, is expired, is malformed,
 * or otherwise fails JWT verification.
 *
 * @throws {@link z.ZodError}
 * If the verified payload does not match {@link jwtPayloadSchema}.
 *
 * @example
 * ```ts
 * const payload = await verifyJWT(token);
 *
 * console.log(payload.userId);
 * console.log(payload.role);
 * ```
 */
export const verifyJWT = async (token: string): Promise<JwtPayload> => {
  const { payload } = await jose.jwtVerify(token, secret);

  return jwtPayloadSchema.parse(payload);
};

/**
 * Decodes a JSON Web Token without verifying its signature or validity.
 *
 * This function only parses the JWT payload. It does not verify:
 * - The token's signature.
 * - The token's issuer.
 * - The token's expiration.
 * - Whether the token was issued by the application.
 *
 * The decoded payload is still validated against {@link jwtPayloadSchema}.
 *
 * **Security warning:** Never use the result of this function for
 * authentication, authorization, or any other security-sensitive decision.
 * Use {@link verifyJWT} when token authenticity or validity matters.
 *
 * @param token - JWT string to decode.
 * @returns The decoded and validated JWT payload.
 *
 * @throws {@link jose.errors.JOSEError}
 * If the token is malformed or cannot be decoded.
 *
 * @throws {@link z.ZodError}
 * If the decoded payload does not match {@link jwtPayloadSchema}.
 *
 * @example
 * ```ts
 * const payload = decodeJWT(token);
 *
 * console.log(payload.userId);
 * ```
 */
export const decodeJWT = (token: string): JwtPayload => {
  const payload = jose.decodeJwt(token);

  return jwtPayloadSchema.parse(payload);
};

/**
 * Encrypts arbitrary JSON-serializable data into an encrypted JWT (JWE).
 *
 * The data is encrypted using direct symmetric encryption (`dir`) with
 * AES-256-GCM (`A256GCM`). The resulting token includes `iat` and `exp`
 * claims and expires after two hours.
 *
 * Unlike a signed JWT, the contents of the encrypted token cannot be read
 * without access to the application's encryption secret.
 *
 * @typeParam T - Type of the data being encrypted.
 * @param data - JSON-serializable data to encrypt.
 * @returns A promise that resolves to the encrypted JWT.
 *
 * @throws {@link jose.errors.JOSEError}
 * If the data cannot be encrypted.
 *
 * @example
 * ```ts
 * const token = await encrypt({
 *   userId: "user_123",
 *   sessionId: "session_456",
 * });
 * ```
 */
export const encrypt = async <T>(data: T): Promise<string> => {
  return await new jose.EncryptJWT({
    data,
  })
    .setProtectedHeader({
      alg: "dir",
      enc: "A256GCM",
    })
    .setIssuedAt()
    .setExpirationTime("2h")
    .encrypt(secret);
};

/**
 * Decrypts an encrypted JWT and validates the decrypted data.
 *
 * The token must have been encrypted using the application's secret key
 * and must be valid and unexpired. The decrypted value is validated using
 * the Zod schema provided by the caller.
 *
 * @typeParam T - Expected type of the decrypted data.
 * @param token - Encrypted JWT to decrypt.
 * @param schema - Zod schema used to validate and infer the decrypted data.
 * @returns A promise that resolves to the validated decrypted data.
 *
 * @throws {@link jose.errors.JOSEError}
 * If the token is malformed, cannot be decrypted, has an invalid
 * authentication tag, or is expired.
 *
 * @throws {@link z.ZodError}
 * If the decrypted data does not match the provided schema.
 *
 * @example
 * ```ts
 * const sessionSchema = z.object({
 *   userId: z.string(),
 *   sessionId: z.string(),
 * });
 *
 * const data = await decrypt(token, sessionSchema);
 *
 * console.log(data.userId);
 * console.log(data.sessionId);
 * ```
 */
export const decrypt = async <T>(
  token: string,
  schema: z.ZodType<T>,
): Promise<T> => {
  const { payload } = await jose.jwtDecrypt(token, secret);

  return schema.parse(payload.data);
};
