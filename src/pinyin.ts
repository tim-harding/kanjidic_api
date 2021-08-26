export const enum Tone {
		/**
		 * A steady high sound
		 */
    High = 1,

		/**
		 * A rising tone
		 */
    Rising,

		/**
		 * A low or dipping tone
		 */
    Low,

		/**
		 * A sharp falling tone
		 */
    Falling,
		
		/**
		 * A lack of tone
		 */
    Neutral,
}

/**
 * A modern PinYin romanization of the Chinese reading.
 */
export interface PinYin {
	/**
	 * The romanized reading.
	 */
	romanization: string

	/**
	 * The Mandarin tone of the reading.
	 */
	tone: Tone
}