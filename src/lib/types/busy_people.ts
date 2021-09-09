import { hasOptionalUintProperty, hasUintProperty, isObject } from "../shared";
import type { Uint } from "./uint";

export namespace BusyPeople {
  /**
   * A location in Japanese for Busy People.
   */
  export interface BusyPeople {
    /**
     * The volume
     */
    volume: Uint;

    /**
     * The chapter
     */
    chapter?: Uint;
  }

  export function check(value: unknown): value is BusyPeople {
    return (
      isObject(value) &&
      hasUintProperty(value, "volume") &&
      hasOptionalUintProperty(value, "chapter")
    );
  }
}
