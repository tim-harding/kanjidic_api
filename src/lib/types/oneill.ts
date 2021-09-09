import {
  hasOptionalStringProperty,
  hasUintProperty,
  isObject,
} from "../shared";
import type { Uint } from "./uint";

export namespace Oneill {
  export type OneillSuffix = "A";

  /**
   * An index into the Japanese Names reference book
   */
  export interface Oneill {
    /**
     * The reference number
     */
    number: Uint;

    /**
     * An optional suffix on the index
     */
    suffix?: OneillSuffix;
  }

  /**
   * Converts a Japanese Names reference into a string representation.
   * @param oneill The reference
   * @returns The string
   */
  export function serialize(oneill: Oneill): string {
    if (oneill.suffix === undefined) {
      return oneill.number.toString();
    }
    return `${oneill.number}${oneill.suffix}`;
  }

  export function check(value: unknown): value is Oneill {
    return (
      isObject(value) &&
      hasUintProperty(value, "number") &&
      hasOptionalStringProperty(value, "suffix") &&
      (value.suffix === undefined || isOneillSuffix(value.suffix))
    );
  }

  function isOneillSuffix(str: string): str is OneillSuffix {
    return str === "A";
  }
}
