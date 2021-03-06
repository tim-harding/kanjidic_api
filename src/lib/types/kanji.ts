import { Codepoint } from "./codepoint";
import { Grade } from "./grade";
import { isQueryCode } from "./query_code";
import type { QueryCode } from "./query_code";
import { KangxiRadical } from "./kangxi_radical";
import { isReading } from "./reading";
import type { Reading } from "./reading";
import { Reference } from "./reference";
import {
  hasOptionalArrayProperty,
  hasOptionalUintProperty,
  hasProperty,
  hasStringProperty,
  isObject,
  isString,
} from "../shared";
import { StrokeCount } from "./stroke_count";
import { Translations } from "./translations";
import type { Uint } from "./uint";
import { Variant } from "./variant";

export namespace Kanji {
  /**
   * Information about a kanji.
   */
  export interface Kanji {
    /**
     * The character itself.
     */
    literal: string;

    /**
     * Alternate encodings for the character.
     */
    codepoints?: Codepoint.Codepoint[];

    /**
     * Alternate classifications for the character by radical.
     */
    radicals?: KangxiRadical.KangxiRadical[];

    /**
     * The kanji grade level.
     */
    grade?: Grade.Grade;

    /**
     * The stroke count of the character.
     */
    strokeCounts?: StrokeCount.StrokeCount;

    /**
     * Cross-references to other characters or alternative indexings.
     */
    variants?: Variant.Variant[];

    /**
     * A ranking of how often the character appears in newspapers.
     */
    frequency?: Uint;

    /**
     * The kanji's name as a radical if it is one.
     */
    radicalNames?: string[];

    /**
     * Old JLPT level of the kanji. Based on pre-2010 test levels
     * that go up to four, not five.
     */
    jlpt?: Uint;

    /**
     * Indexes into dictionaries and other instructional books.
     */
    references?: Reference.Reference[];

    /**
     * Codes used to identify the kanji.
     */
    queryCodes?: QueryCode[];

    /**
     * Different ways the kanji can be read.
     */
    readings?: Reading[];

    /**
     * Translations of the kanji into different languages.
     */
    translations?: Translations.Translations;

    /**
     * Japanese readings associated with names.
     */
    nanori?: string[];

    /**
     * The constituent radicals in the kanji.
     */
    decomposition?: string[];
  }

  export function check(value: unknown): value is Kanji {
    return (
      isObject(value) &&
      hasStringProperty(value, "literal") &&
      hasOptionalArrayProperty(value, "codepoints", Codepoint.check) &&
      hasOptionalArrayProperty(value, "radicals", KangxiRadical.check) &&
      (!hasProperty(value, "grade") || Grade.check(value.grade)) &&
      (!hasProperty(value, "strokeCounts") ||
        StrokeCount.check(value.strokeCounts)) &&
      hasOptionalArrayProperty(value, "variants", Variant.check) &&
      hasOptionalUintProperty(value, "frequency") &&
      hasOptionalArrayProperty(value, "radicalNames", isString) &&
      hasOptionalUintProperty(value, "jlpt") &&
      hasOptionalArrayProperty(value, "references", Reference.check) &&
      hasOptionalArrayProperty(value, "queryCodes", isQueryCode) &&
      hasOptionalArrayProperty(value, "readings", isReading) &&
      (!hasProperty(value, "translations") ||
        Translations.check(value.translations)) &&
      hasOptionalArrayProperty(value, "nanori", isString) &&
      hasOptionalArrayProperty(value, "decomposition", isString)
    );
  }
}
