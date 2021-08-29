import { Codepoint, isCodepoint } from "./codepoint";
import { Grade, isGrade } from "./grade";
import { isQueryCode, QueryCode } from "./query_code";
import { isRadical, Radical } from "./radical";
import { isReading, Reading } from "./reading";
import { isReference, Reference } from "./reference";
import { hasOptionalArrayProperty, hasOptionalStringProperty, hasOptionalUintProperty, hasProperty, isObject, isString } from "./shared";
import { isStrokeCount, StrokeCount } from "./stroke_count";
import { isTranslations, Translations } from "./translations";
import { Uint } from "./uint";
import { isVariant, Variant } from "./variant";

/**
 * Information about a kanji.
 */
export interface Character {
	/**
	 * The character itself.
	 */
	literal?: string

	/**
	 * Alternate encodings for the character.
	 */
	codepoints?: Array<Codepoint>

	/**
	 * Alternate classifications for the character by radical.
	 */
	radicals?: Array<Radical>

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

export function isCharacter(value: unknown): value is Character {
	return isObject(value) &&
		hasOptionalStringProperty(value, "literal") &&
		hasOptionalArrayProperty(value, "codepoints", isCodepoint) &&
		hasOptionalArrayProperty(value, "radicals", isRadical) &&
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