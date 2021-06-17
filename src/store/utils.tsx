export function createApiTypes<T extends string>(value: T) {
  return {
    REQUEST: `${value}__REQUEST` as const,
    SUCCESS: `${value}__SUCCESS` as const,
  };
}
