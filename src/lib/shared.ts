import { isUint } from "./types/uint";
import type { Uint } from "./types/uint";

export function hasProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, unknown> {
  return value.hasOwnProperty(key);
}

export function hasUintProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, Uint> {
  return hasProperty(value, key) && isUint(value[key]);
}

export function hasOptionalUintProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, Uint | undefined> {
  return !hasProperty(value, key) || isUint(value[key]);
}

export function hasNumberProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, number> {
  return hasProperty(value, key) && isNumber(value[key]);
}

export function hasStringProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, string> {
  return hasProperty(value, key) && isString(value[key]);
}

export function hasOptionalStringProperty<K extends string, T extends Object>(
  value: T,
  key: K
): value is T & Record<K, string | undefined> {
  return !hasProperty(value, key) || isString(value[key]);
}

type ArrayChecker<T> = { (value: unknown): value is T };

export function hasArrayProperty<K extends string, T extends Object, E>(
  value: T,
  key: K,
  checker: ArrayChecker<E>
): value is T & Record<K, Array<Uint>> {
  return hasProperty(value, key) && isArrayOf(value[key], checker);
}

export function hasOptionalArrayProperty<K extends string, T extends Object, E>(
  value: T,
  key: K,
  checker: ArrayChecker<E>
): value is T & Record<K, Array<Uint>> {
  return !hasProperty(value, key) || isArrayOf(value[key], checker);
}

export function isObject(value: unknown): value is Object {
  return typeof value === "object" && value !== null;
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function all<T>(
  array: Array<T>,
  checker: { (element: T): boolean }
): boolean {
  for (const element of array) {
    if (!checker(element)) {
      return false;
    }
  }
  return true;
}

export function isArrayOf<T>(
  value: unknown,
  checker: ArrayChecker<T>
): value is Array<T> {
  return Array.isArray(value) && all(value, checker);
}

export interface Tagged {
  tag: string;
}

export interface Sum extends Tagged {
  content: unknown;
}

export type Checker<E extends Tagged, T extends E> = { (value: E): value is T };

export function isTypeFromTagged<E extends Tagged, T extends E>(
  value: E,
  handlers: Record<string, Checker<E, T>>
): value is T {
  const handler = handlers[value.tag];
  if (handler === undefined) {
    return false;
  }
  return handler(value);
}

export function isTagged(value: unknown): value is Tagged {
  return isObject(value) && hasStringProperty(value, "tag");
}

export function isSum(value: unknown): value is Sum {
  return isTagged(value) && hasProperty(value, "content");
}

export function rethrowable(e: unknown): Error {
  if (e instanceof Error) {
    return e;
  }
  return new Error("Unreachable");
}

export type ResponseValidator<T> = { (value: unknown): value is T };

export async function query<T>(
  url: URL,
  isT: ResponseValidator<T>
): Promise<T | Error> {
  let response;
  try {
    response = await fetch(url.toString());
  } catch (e: unknown) {
    return rethrowable(e);
  }
  if (!response.ok) {
    return new Error(response.statusText);
  }
  const json = (await response.json()) as unknown;
  if (!isT(json)) {
    return new Error("Response was not in a recognized format");
  }
  return json;
}
