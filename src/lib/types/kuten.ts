import { hasUintProperty, isObject } from "../shared";
import type { Uint } from "./uint";

export namespace Kuten {
  /**
   * A kuten representation of a JIS character. For more information, see
   * http://unicode-iphone.blogspot.com/2010/05/kuten-code-to-unicode.html
   */
  export interface Kuten {
    /**
     * The plane on which a kuten representation is found.
     */
    plane: Uint;

    /**
     * The Ku part of the matrix position.
     */
    ku: Uint;

    /**
     * The Ten part of the matrix position.
     */
    ten: Uint;
  }

  /**
   * Converts a kuten code to a string representation.
   * @param kuten The kuten code
   * @returns The string
   */
  export function serialize(kuten: Kuten): string {
    return `${kuten.plane}-${kuten.ku}-${kuten.ten}`;
  }

  export function check(value: unknown): value is Kuten {
    return (
      isObject(value) &&
      hasUintProperty(value, "plane") &&
      hasUintProperty(value, "ku") &&
      hasUintProperty(value, "ten")
    );
  }
}
