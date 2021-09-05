import { isBusyPeople } from "./busy_people"
import type { BusyPeople } from "./busy_people"
import { isMoro } from "./moro"
import type { Moro } from "./moro"
import { isOneill } from "./oneill"
import type { Oneill } from "./oneill"
import { isSum, isTypeFromTagged } from "./shared"
import type { Checker, Sum } from "./shared"
import { isUint } from "./uint"
import type { Uint } from "./uint"

/**
 * A reference into Japanese for Busy People
 */
export interface Reference_BusyPeople {
	/**
	 * The reference source
	 */
	tag: BusyPeopleTag

	/**
	 * The reference
	 */
	content: BusyPeople
}

/**
 * A reference into Daikanwajiten by Morohashi
 */
export interface Reference_Moro {
	/**
	 * The reference source
	 */
	tag: MoroTag

	/**
	 * The reference
	 */
	content: Moro
}

/**
 * A reference into Japanese Names by P.G. O'Neill
 */
export interface Reference_OneillNames {
	/**
	 * The reference source
	 */
	tag: OneillNamesTag

	/**
	 * The reference
	 */
	content: Oneill
}

export type OneillNamesTag = "OneillNames"

export type MoroTag = "Moro"

export type BusyPeopleTag = "BusyPeople"

/**
 * Modern Reader's Japanese-English Dictionary by Andrew Nelson
 */
export type NelsonClassicTag = "NelsonClassic"

/**
 * The New Nelson Japanese-English Dictionary by John Haig
 */
export type NelsonNewTag = "NelsonNew"

/**
 * New Japanese-English Character Dictionary by Jack Halpern
 */
export type NjecdTag = "Njecd"

/**
 * Kodansha's Japanese-English Dictionary by Jack Halpern
 */
export type KkdTag = "Kkd"

/**
 * Kanji Learners Dictionary by Jack Halpern
 */
export type KkldTag = "Kkld"

/**
 * Kanji Learners Dictionary Second Edition by Jack Halpern
 */
export type Kkld2edTag = "Kkld2ed"

/**
 * Remembering the Kanji by James Heisig
 */
export type HeisigTag = "Heisig"

/**
 * Remembering the Kanji Sixth Edition by James Heisig
 */
export type Heisig6Tag = "Heisig6"

/**
 * A New Dictionary of Kanji Usage
 */
export type GakkenTag = "Gakken"

/**
 * Essential Kanji by P.G. O'Neill
 */
export type OneillKkTag = "OneillKk"

/**
 * A Guide to Remembering Japanese Characters by Kenneth G. Henshall
 */
export type HenshallTag = "Henshall"

/**
 * Kanji and Kana by Spahn and Hadamitzky
 */
export type ShKkTag = "ShKk"

/**
 * Kanji and Kana 2011 edition by Spahn and Hadamitzky
 */
export type ShKk2Tag = "ShKk2"

/**
 * A Guide to Reading and Writing Japanese by Florence Sakade
 */
export type SakadeTag = "Sakade"

/**
 * Japanese Kanji Flashcards by Tomoko Okazaki
 */
export type JfcardsTag = "Jfcards"

/**
 * A Guide to Reading and Writing Japanese by Henshall
 */
export type Henshall3Tag = "Henshall3"

/**
 * Tuttle Kanji Cards by Alexander Kask
 */
export type TuttleCardsTag = "TuttleCards"

/**
 * The Kanji Way to Japanese Language Power by Dale Crowley
 */
export type CrowleyTag = "Crowley"

/**
 * Kanji in Context by Nishiguchi and Kono
 */
export type KanjiInContextTag = "KanjiInContext"

/**
 * The Kodansha Compact Study Guide
 */
export type KodanshaCompactTag = "KodanshaCompact"

/**
 * Les Kanjis dans la tete by Yves Maniette
 */
export type ManietteTag = "Maniette"

export type ReferenceUintTag = NelsonClassicTag |
	NelsonNewTag |
	NjecdTag |
	KkdTag |
	KkldTag |
	Kkld2edTag |
	HeisigTag |
	Heisig6Tag |
	GakkenTag |
	OneillKkTag |
	HenshallTag |
	ShKkTag |
	ShKk2Tag |
	SakadeTag |
	JfcardsTag |
	Henshall3Tag |
	TuttleCardsTag |
	CrowleyTag |
	KanjiInContextTag |
	KodanshaCompactTag |
	ManietteTag

export type ReferenceTag = ReferenceUintTag |
	OneillNamesTag |
	MoroTag |
	BusyPeopleTag

/**
 * A numeric index into a dictionary or reference book.
 */
export interface Reference_Uint {
	/**
	 * The reference source
	 */
	tag: ReferenceUintTag

	/**
	 * The reference
	 */
	content: Uint
}

/**
 * An index number into a particular kanji dictionary or reference book.
 */
export type Reference = Reference_BusyPeople |
	Reference_Moro |
	Reference_OneillNames |
	Reference_Uint

export function isReference(value: unknown): value is Reference {
	return isSum(value) &&
		isTypeFromTagged(value, CHECKERS)
}

export function isReferenceUintByTag(value: Reference): value is Reference_Uint {
	return value.tag in UINT_TAGS
}

const UINT_TAGS: Record<ReferenceUintTag, boolean> = {
	"NelsonClassic": true,
	"NelsonNew": true,
	"Njecd": true,
	"Kkd": true,
	"Kkld": true,
	"Kkld2ed": true,
	"Heisig": true,
	"Heisig6": true,
	"Gakken": true,
	"OneillKk": true,
	"Henshall": true,
	"ShKk": true,
	"ShKk2": true,
	"Sakade": true,
	"Jfcards": true,
	"Henshall3": true,
	"TuttleCards": true,
	"Crowley": true,
	"KanjiInContext": true,
	"KodanshaCompact": true,
	"Maniette": true,
}

const CHECKERS: Record<ReferenceTag, Checker<Sum, Reference>> = {
	"NelsonClassic": isReferenceUint,
	"NelsonNew": isReferenceUint,
	"Njecd": isReferenceUint,
	"Kkd": isReferenceUint,
	"Kkld": isReferenceUint,
	"Kkld2ed": isReferenceUint,
	"Heisig": isReferenceUint,
	"Heisig6": isReferenceUint,
	"Gakken": isReferenceUint,
	"OneillKk": isReferenceUint,
	"Henshall": isReferenceUint,
	"ShKk": isReferenceUint,
	"ShKk2": isReferenceUint,
	"Sakade": isReferenceUint,
	"Jfcards": isReferenceUint,
	"Henshall3": isReferenceUint,
	"TuttleCards": isReferenceUint,
	"Crowley": isReferenceUint,
	"KanjiInContext": isReferenceUint,
	"KodanshaCompact": isReferenceUint,
	"Maniette": isReferenceUint,
	"Moro": isReferenceMoro,
	"OneillNames": isReferenceOneill,
	"BusyPeople": isReferenceBusyPeople,
}

function isReferenceUint(value: Sum): value is Reference_Uint {
	return isUint(value.content)
}

function isReferenceMoro(value: Sum): value is Reference_Moro {
	return isMoro(value.content)
}

function isReferenceOneill(value: Sum): value is Reference_OneillNames {
	return isOneill(value.content)
}

function isReferenceBusyPeople(value: Sum): value is Reference_BusyPeople {
	return isBusyPeople(value.content)
}