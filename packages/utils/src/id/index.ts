import { uid } from "uid/secure";

export function id(options?: { length: number }) {
  const length = options?.length ?? 10;

  return uid(length);
}
