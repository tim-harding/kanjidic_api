import { hasProperty, hasStringProperty, isObject } from "../shared";
import { Tone } from "./tone";

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
    tone: Tone.Tone;
  }

  export function check(value: unknown): value is PinYin {
    return (
      isObject(value) &&
      hasStringProperty(value, "romanization") &&
      hasProperty(value, "tone") &&
      Tone.check(value.tone)
    );
  }
}
