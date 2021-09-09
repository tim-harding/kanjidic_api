import { isNumber } from "../shared";

export namespace Unicode {
  export type Unicode = number;

  export function check(value: unknown): value is Unicode {
    return isNumber(value);
  }

  export function serialize(unicode: number): string {
    return `U+${unicode.toString(16).toUpperCase()}`;
  }
}
