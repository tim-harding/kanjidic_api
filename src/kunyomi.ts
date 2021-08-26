/**
 * A kunyomi kanji reading.
 */
export interface Kunyomi {
	/**
	 * The kunyomi reading
	 */
	reading: string

	/**
	 * The okurigana if relevant
	 */
	okurigana: string | undefined

	/**
	 * Whether the reading is as a prefix, suffix, or neither.
	 */
	kind: "Normal" | "Prefix" | "Suffix"
}