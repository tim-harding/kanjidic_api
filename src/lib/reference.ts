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

type OneillNamesTag = "OneillNames"

type MoroTag = "Moro"

type BusyPeopleTag = "BusyPeople"

/**
 * Modern Reader's Japanese-English Dictionary by Andrew Nelson
 */
type NelsonClassicTag = "NelsonClassic"

/**
 * The New Nelson Japanese-English Dictionary by John Haig
 */
type NelsonNewTag = "NelsonNew"

/**
 * New Japanese-English Character Dictionary by Jack Halpern
 */
type NjecdTag = "Njecd"

/**
 * Kodansha's Japanese-English Dictionary by Jack Halpern
 */
type KkdTag = "Kkd"

/**
 * Kanji Learners Dictionary by Jack Halpern
 */
type KkldTag = "Kkld"

/**
 * Kanji Learners Dictionary Second Edition by Jack Halpern
 */
type Kkld2edTag = "Kkld2ed"

/**
 * Remembering the Kanji by James Heisig
 */
type HeisigTag = "Heisig"

/**
 * Remembering the Kanji Sixth Edition by James Heisig
 */
type Heisig6Tag = "Heisig6"

/**
 * A New Dictionary of Kanji Usage
 */
type GakkenTag = "Gakken"

/**
 * Essential Kanji by P.G. O'Neill
 */
type OneillKkTag = "OneillKk"

/**
 * A Guide to Remembering Japanese Characters by Kenneth G. Henshall
 */
type HenshallTag = "Henshall"

/**
 * Kanji and Kana by Spahn and Hadamitzky
 */
type ShKkTag = "ShKk"

/**
 * Kanji and Kana 2011 edition by Spahn and Hadamitzky
 */
type ShKk2Tag = "ShKk2"

/**
 * A Guide to Reading and Writing Japanese by Florence Sakade
 */
type SakadeTag = "Sakade"

/**
 * Japanese Kanji Flashcards by Tomoko Okazaki
 */
type JfcardsTag = "Jfcards"

/**
 * A Guide to Reading and Writing Japanese by Henshall
 */
type Henshall3Tag = "Henshall3"

/**
 * Tuttle Kanji Cards by Alexander Kask
 */
type TuttleCardsTag = "TuttleCards"

/**
 * The Kanji Way to Japanese Language Power by Dale Crowley
 */
type CrowleyTag = "Crowley"

/**
 * Kanji in Context by Nishiguchi and Kono
 */
type KanjiInContextTag = "KanjiInContext"

/**
 * The Kodansha Compact Study Guide
 */
type KodanshaCompactTag = "KodanshaCompact"

/**
 * Les Kanjis dans la tete by Yves Maniette
 */
type ManietteTag = "Maniette"

type ReferenceUintTag = NelsonClassicTag |
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

type ReferenceTag = ReferenceUintTag |
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