import { DeRoo, serializeDeRoo } from "./de_roo";
import { Kuten, serializeKuten } from "./kuten";
import { Oneill, serializeOneill } from "./oneill";
import { ShDesc, serialize as serializeShDesc } from "./sh_desc";
import { Uint } from "./uint";

type KutenTag = "Jis208" | "Jis212" | "Jis213"

type UintTag = "Unicode" | "Halpern" | "Nelson"

type DeRooTag = "DeRoo"

type ShDescTag = "ShDesc"

type OneillTag = "Oneill"

type VariantTag = KutenTag |
	UintTag |
	DeRooTag |
	ShDescTag |
	OneillTag

/**
 * An encoding in JIS208, JIS212, or JIS213
 */
export interface Variant_Kuten {
	/**
	 * The kind of encoding
	 */
	tag: KutenTag

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
	tag: UintTag

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
	tag: DeRooTag

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
	tag: ShDescTag

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
	tag: OneillTag

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
	const serializer = SERIALIZERS[variant.tag]
	return serializer(variant.value)
}

type Serializer = { (content: any): string }

const SERIALIZERS: Record<VariantTag, Serializer> = {
		"Jis208": serializeKuten,
		"Jis212": serializeKuten,
		"Jis213": serializeKuten,
		"Unicode": serializeUint,
		"Halpern": serializeUint,
		"Nelson": serializeUint,
		"DeRoo": serializeDeRoo,
		"ShDesc": serializeShDesc,
		"Oneill": serializeOneill,
}

function serializeUint(uint: Uint): string {
	return uint.toString()
}