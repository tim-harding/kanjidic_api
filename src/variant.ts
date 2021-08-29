import { DeRoo, isDeRoo, serializeDeRoo } from "./de_roo";
import { isKuten, Kuten, serializeKuten } from "./kuten";
import { isOneill, Oneill, serializeOneill } from "./oneill";
import { Checker, hasProperty, hasStringProperty, isObject, isSum, isTypeFromTagged, Sum } from "./shared";
import { ShDesc, serialize as serializeShDesc, isShDesc } from "./sh_desc";
import { isUint, Uint } from "./uint";

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
	content: Kuten
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
	content: Uint
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
	content: DeRoo
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
	content: ShDesc
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
	content: Oneill
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
	return serializer(variant.content)
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

export function isVariant(value: unknown): value is Variant {
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

const CHECKERS: Record<VariantTag, Checker<Sum, Variant>> = {
		"Jis208": isVariantKuten,
		"Jis212": isVariantKuten,
		"Jis213": isVariantKuten,
		"Unicode": isVariantUint,
		"Halpern": isVariantUint,
		"Nelson": isVariantUint,
		"DeRoo": isVariantDeRoo,
		"ShDesc": isVariantShDesc,
		"Oneill": isVariantOneill,
}

function isVariantKuten(value: Sum): value is Variant_Kuten {
	return isKuten(value.content)
}

function isVariantDeRoo(value: Sum): value is Variant_DeRoo {
	return isDeRoo(value.content)
}

function isVariantOneill(value: Sum): value is Variant_Oneill {
	return isOneill(value.content)
}

function isVariantShDesc(value: Sum): value is Variant_ShDesc {
	return isShDesc(value.content)
}

function isVariantUint(value: Sum): value is Variant_Uint {
	return isUint(value.content)
}