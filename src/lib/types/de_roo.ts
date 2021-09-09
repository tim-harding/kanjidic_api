import { ExtremeTop} from "./extreme_top";
import { ExtremeBottom} from "./extreme_bottom";
import { hasProperty, isObject } from "../shared";

export namespace DeRoo {
  /**
   * The classification of a kanji in the De Roo system. See
   * http://www.edrdg.org/wwwjdic/deroo.html
   * for more information.
   */
  export interface DeRoo {
    /**
     * The graphic element at the top left of a kanji.
     */
    top: ExtremeTop.ExtremeTop;

    /**
     * The graphic element at the bottom right of a kanji.
     */
    bottom: ExtremeBottom.ExtremeBottom;
  }

  /**
   * Converts a De Roo code to a string.
   * @param deroo The De Roo code
   * @returns The string
   */
  export function serialize(deroo: DeRoo): string {
    return `${deroo.top}${deroo.bottom}`;
  }

  export function check(value: unknown): value is DeRoo {
    return (
      isObject(value) &&
      hasProperty(value, "top") &&
      ExtremeTop.check(value.top) &&
      hasProperty(value, "bottom") &&
      ExtremeBottom.check(value.bottom)
    );
  }
}
