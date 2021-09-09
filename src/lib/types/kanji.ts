import { isCodepoint } from "./codepoint";
import type { Codepoint } from "./codepoint";
import { isGrade } from "./grade";
import type { Grade } from "./grade";
import { isQueryCode } from "./query_code";
import type { QueryCode } from "./query_code";
import { isKangxiRadical } from "./kangxi_radical";
import type { KangxiRadical } from "./kangxi_radical";
import { isReading } from "./reading";
import type { Reading } from "./reading";
import { isReference } from "./reference";
import type { Reference } from "./reference";
import { hasOptionalArrayProperty, hasOptionalUintProperty, hasProperty, hasStringProperty, isObject, isString } from "../shared";
import { isStrokeCount } from "./stroke_count";
import type { StrokeCount } from "./stroke_count";
import { isTranslations } from "./translations";
import type { Translations } from "./translations";
import type { Uint } from "./uint";
import { isVariant } from "./variant";
import type { Variant } from "./variant";

/**
 * Information about a kanji.
 */
export interface Kanji {
	/**
	 * The character itself.
	 */
	literal: string

	/**
	 * Alternate encodings for the character.
	 */
	codepoints?: Array<Codepoint>

	/**
	 * Alternate classifications for the character by radical.
	 */
	radicals?: Array<KangxiRadical>

	/**
	 * The kanji grade level.
	 */
	grade?: Grade

	/**
	 * The stroke count of the character.
	 */
	strokeCounts?: StrokeCount

	/**
	 * Cross-references to other characters or alternative indexings.
	 */
	variants?: Array<Variant>

	/**
	 * A ranking of how often the character appears in newspapers.
	 */
	frequency?: Uint

	/**
	 * The kanji's name as a radical if it is one.
	 */
	radicalNames?: Array<string>

	/**
	 * Old JLPT level of the kanji. Based on pre-2010 test levels
	 * that go up to four, not five.
	 */
	jlpt?: Uint

	/**
	 * Indexes into dictionaries and other instructional books.
	 */
	references?: Array<Reference>

	/**
	 * Codes used to identify the kanji.
	 */
	queryCodes?: Array<QueryCode>

	/**
	 * Different ways the kanji can be read.
	 */
	readings?: Array<Reading>

	/**
	 * Translations of the kanji into different languages.
	 */
	translations?: Translations

	/**
	 * Japanese readings associated with names.
	 */
	nanori?: Array<string>

	/**
	 * The constituent radicals in the kanji.
	 */
	decomposition?: Array<string>
}

export function isCharacter(value: unknown): value is Kanji {
	return isObject(value) &&
		hasStringProperty(value, "literal") &&
		hasOptionalArrayProperty(value, "codepoints", isCodepoint) &&
		hasOptionalArrayProperty(value, "radicals", isKangxiRadical) &&
		(!hasProperty(value, "grade") || isGrade(value.grade)) &&
		(!hasProperty(value, "strokeCounts") || isStrokeCount(value.strokeCounts)) &&
		hasOptionalArrayProperty(value, "variants", isVariant) &&
		hasOptionalUintProperty(value, "frequency") &&
		hasOptionalArrayProperty(value, "radicalNames", isString) &&
		hasOptionalUintProperty(value, "jlpt") &&
		hasOptionalArrayProperty(value, "references", isReference) &&
		hasOptionalArrayProperty(value, "queryCodes", isQueryCode) &&
		hasOptionalArrayProperty(value, "readings", isReading) &&
		(!hasProperty(value, "translations") || isTranslations(value.translations)) &&
		hasOptionalArrayProperty(value, "nanori", isString) &&
		hasOptionalArrayProperty(value, "decomposition", isString)
}