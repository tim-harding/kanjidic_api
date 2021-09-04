import { isDeRoo, serializeDeRoo } from "./de_roo";
import type { DeRoo, } from "./de_roo";
import { isKuten, serializeKuten } from "./kuten";
import type { Kuten } from "./kuten";
import { isOneill, serializeOneill } from "./oneill";
import type { Oneill } from "./oneill";
import { isSum, isTypeFromTagged } from "./shared";
import type { Checker, Sum } from "./shared";
import { serializeShDesc, isShDesc } from "./sh_desc";
import type { ShDesc } from "./sh_desc";
import { isUint } from "./uint";
import type { Uint } from "./uint";

export type KutenTag = "Jis208" | "Jis212" | "Jis213"
export type UintTag = "Unicode" | "Halpern" | "Nelson"
export type DeRooTag = "DeRoo"
export type ShDescTag = "ShDesc"
export type OneillTag = "Oneill"

export function isKutenTag(tag: VariantTag): tag is KutenTag {
	return tag in KUTEN_TAGS
}

const KUTEN_TAGS: Record<KutenTag, boolean> = {
	"Jis208": true,
	"Jis212": true,
	"Jis213": true,
}

export function isUintTag(tag: VariantTag): tag is UintTag {
	return tag in UINT_TAGS
}

const UINT_TAGS: Record<UintTag, boolean> = {
	"Unicode": true,
	"Halpern": true,
	"Nelson": true,
}

export type VariantTag = KutenTag |
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

export function isVariantKutenFromTag(variant: Variant): variant is Variant_Kuten {
	return isKutenTag(variant.tag)
}

export function isVariantUintFromTag(variant: Variant): variant is Variant_Uint {
	return isUintTag(variant.tag)
}

export function isVariantDeRooFromTag(variant: Variant): variant is Variant_DeRoo {
	return variant.tag === "DeRoo"
}

export function isVariantShDescFromTag(variant: Variant): variant is Variant_ShDesc {
	return variant.tag === "ShDesc"
}

export function isVariantOneillFromTag(variant: Variant): variant is Variant_Oneill {
	return variant.tag === "Oneill"
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
export function serializeVariant(variant: Variant): string {
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