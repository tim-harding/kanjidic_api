import { hasStringProperty, hasUintProperty, isObject } from "../shared";
import { isShRadical } from "./sh_radical";
import type { ShRadical } from "./sh_radical";
import type { Uint } from "./uint";

export namespace SpahnHadamitzky {
  /**
   * Descriptor code for The Kanji Dictionary.
   * The code reference can be found here:
   * http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
   */
  export interface Descriptor {
    /**
     * The letter for the radical in the identification system.
     */
    radical: ShRadical;

    /**
     * Number of strokes in the identifying radical.
     */
    radicalStrokes: Uint;

    /**
     * The number of strokes not included in the radical.
     */
    otherStrokes: Uint;

    /**
     * The position of the kanji in the sequence described
     * by the other descriptor parts.
     */
    sequence: Uint;
  }

  export function serialize(desc: Descriptor): string {
    return `${desc.radicalStrokes}${desc.radical}${desc.otherStrokes}.${desc.sequence}`;
  }

  export function check(value: unknown): value is Descriptor {
    return (
      isObject(value) &&
      hasUintProperty(value, "radicalStrokes") &&
      hasUintProperty(value, "otherStrokes") &&
      hasUintProperty(value, "sequence") &&
      hasStringProperty(value, "radical") &&
      isShRadical(value.radical)
    );
  }
}
