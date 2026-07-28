export type TryCatchResult<T> = readonly [Error, null] | readonly [null, T];

export function tryCatch<T>(
  value: PromiseLike<T>,
): Promise<TryCatchResult<Awaited<T>>>;

export function tryCatch<T>(
  value: () => T,
): T extends PromiseLike<unknown>
  ? Promise<TryCatchResult<Awaited<T>>>
  : TryCatchResult<T>;

export function tryCatch<T>(
  value: T,
): T extends PromiseLike<unknown>
  ? Promise<TryCatchResult<Awaited<T>>>
  : TryCatchResult<T>;

export function tryCatch(value: unknown): unknown {
  if (typeof value === "function") {
    try {
      const result = (value as () => unknown)();

      if (
        result &&
        typeof result === "object" &&
        "then" in (result as object)
      ) {
        return Promise.resolve(result)
          .then((data) => [null, data] as const)
          .catch((err) => [err as Error, null] as const);
      }

      return [null, result] as const;
    } catch (err) {
      return [err as Error, null] as const;
    }
  }

  if (value && typeof value === "object" && "then" in (value as object)) {
    return Promise.resolve(value)
      .then((data) => [null, data] as const)
      .catch((err) => [err as Error, null] as const);
  }

  return [null, value] as const;
}
