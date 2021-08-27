import { Codepoint } from "./codepoint";
import { Grade } from "./grade";
import { QueryCode } from "./query_code";
import { Radical } from "./radical";
import { Reading } from "./reading";
import { Reference } from "./reference";
import { StrokeCount } from "./stroke_count";
import { Uint } from "./uint";
import { Variant } from "./variant";

/**
 * Information about a kanji.
 */
export interface Character {
	/**
	 * The character itself.
	 */
	literal: string

	/**
	 * Alternate encodings for the character.
	 */
	codepoints: Array<Codepoint>

	/**
	 * Alternate classifications for the character by radical.
	 */
	radicals: Array<Radical>

	/**
	 * The kanji grade level.
	 */
	grade: Grade | undefined

	/**
	 * The stroke count of the character.
	 */
	strokeCounts: StrokeCount

	/**
	 * Cross-references to other characters or alternative indexings.
	 */
	variants: Array<Variant>

	/**
	 * A ranking of how often the character appears in newspapers.
	 */
	frequency: Uint | undefined

	/**
	 * The kanji's name as a radical if it is one.
	 */
	radicalNames: Array<string>

	/**
	 * Old JLPT level of the kanji. Based on pre-2010 test levels
	 * that go up to four, not five.
	 */
	jlpt: Uint | undefined

	/**
	 * Indexes into dictionaries and other instructional books.
	 */
	references: Array<Reference>

	/**
	 * Codes used to identify the kanji.
	 */
	queryCodes: Array<QueryCode>

	/**
	 * Different ways the kanji can be read.
	 */
	readings: Array<Reading>

	/**
	 * Translations of the kanji into different languages.
	 */
	translations: Record<string, Array<string>>
	
	/**
	 * Japanese readings associated with names.
	 */
	nanori: Array<string>
	
	/**
	 * The constituent radicals in the kanji.
	 */
	decomposition: Array<string>
}