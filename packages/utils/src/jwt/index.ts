import { env } from "@repo/env/server";
import * as jose from "jose";

const secret = new TextEncoder().encode(env.TOKEN_SECRET);

/**
 * JWT Payload
 */
export interface JwtPayload extends jose.JWTPayload {
  userId: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  age: number;
  role: "basic" | "admin";
  phone: string;
}

/**
 * Sign JWT
 */
export const signJWT = async (
  payload: JwtPayload,
  expiresIn: string | number = "2h",
) => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
};

/**
 * Verify JWT
 */
export const verifyJWT = async <T = JwtPayload>(token: string) => {
  const { payload } = await jose.jwtVerify(token, secret);

  return payload as T;
};

/**
 * Decode JWT (WITHOUT verification)
 * Only use when you don't care if the token is valid.
 */
export const decodeJWT = <T = JwtPayload>(token: string) => {
  return jose.decodeJwt(token) as T;
};

/**
 * Encrypt arbitrary JSON
 */
export const encrypt = async <T>(data: T) => {
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
 * Decrypt encrypted JWT
 */
export const decrypt = async <T>(token: string) => {
  const { payload } = await jose.jwtDecrypt(token, secret);

  return payload.data as T;
};
