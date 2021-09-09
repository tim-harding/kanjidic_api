import { hasProperty, hasStringProperty, isObject } from "../shared";
import { isTone, Tone } from "./tone";

export namespace PinYin {
  /**
   * A modern PinYin romanization of the Chinese reading.
   */
  export interface PinYin {
    /**
     * The romanized reading.
     */
    romanization: string;

    /**
     * The Mandarin tone of the reading.
     */
    tone: Tone;
  }

  export function check(value: unknown): value is PinYin {
    return (
      isObject(value) &&
      hasStringProperty(value, "romanization") &&
      hasProperty(value, "tone") &&
      isTone(value.tone)
    );
  }
}
