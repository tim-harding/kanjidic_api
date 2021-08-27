import { DeRoo, serialize as serializeDeRoo } from "./de_roo";
import { Kuten, serialize as serializeKuten } from "./kuten";
import { Oneill, serialize as serializeOneill } from "./oneill";
import { ShDesc, serialize as serializeShDesc } from "./sh_desc";
import { Uint } from "./uint";

/**
 * An encoding in JIS208, JIS212, or JIS213
 */
export interface Variant_Kuten {
	/**
	 * The kind of encoding
	 */
	tag: "Jis208" | "Jis212" | "Jis213"

	/**
	 * The encoding
	 */
	value: Kuten
}

/**
 * A code for a kanji in one of the following forms:
 * - `Unicode`: A unicode codepoint
 * - `Halpern`: An index number in "The New Japanese-English Character Dictionary" (1990) by Jack Halpern
 * - `Nelson`: An index number in "The Modern Reader's Japanese-English Character Dictionary" by Andrew Nelson
 */
export interface Variant_Uint {
	/**
	 * The kind of encoding
	 */
	tag: "Unicode" | "Halpern" | "Nelson"

	/**
	 * The encoding
	 */
	value: Uint
}

/**
 * A kanji code in the De Roo system
 */
export interface Variant_DeRoo {
	/**
	 * The kind of encoding
	 */
	tag: "DeRoo"

	/**
	 * The encoding
	 */
	value: DeRoo
}

/**
 * A kanji descriptor from "Kanji and Kana" by Spahn and Hadamitzky
 */
export interface Variant_ShDesc {
	/**
	 * The kind of encoding
	 */
	tag: "ShDesc"

	/**
	 * The encoding
	 */
	value: ShDesc
}

/**
 * An index into "Japanese Names" by P.G. O'Neill
 */
export interface Variant_Oneill {
	/**
	 * The kind of encoding
	 */
	tag: "Oneill"

	/**
	 * The encoding
	 */
	value: Oneill
}

/**
 * Represents either of the following:
 * - A cross-reference to another kanji usually regarded as a variant
 * - An alternative indexing code for the current kanji
 */
export type Variant = Variant_Kuten |
	Variant_Uint |
	Variant_DeRoo |
	Variant_ShDesc |
	Variant_Oneill

/**
 * Gets the string representation of a Variant.
 * @param variant The variant
 * @returns The string
 */
export function serialize(variant: Variant): string {
	switch (variant.tag) {
		case "Jis208":
		case "Jis212":
		case "Jis213": {
			return serializeKuten(variant.value)
		}
		case "Unicode":
		case "Halpern":
		case "Nelson": {
			return variant.value.value.toString()
		}
		case "DeRoo": {
			return serializeDeRoo(variant.value)
		}
		case "ShDesc": {
			return serializeShDesc(variant.value)
		}
		case "Oneill": {
			return serializeOneill(variant.value)
		}
	}
}