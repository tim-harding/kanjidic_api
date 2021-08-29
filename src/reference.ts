import { BusyPeople, isBusyPeople } from "./busy_people"
import { isMoro, Moro } from "./moro"
import { isOneill, Oneill } from "./oneill"
import { Checker, hasProperty, hasStringProperty, isObject, isTypeFrom, Sum } from "./shared"
import { isUint, Uint } from "./uint"

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
export interface Reference_Oneill {
	/**
	 * The reference source
	 */
	tag: OneillTag

	/**
	 * The reference
	 */
	content: Oneill
}

type OneillTag = "Oneill"

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
	OneillTag | 
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
	Reference_Oneill |
	Reference_Uint
	
export function isReference(value: unknown): value is Reference {
	return isObject(value) &&
		hasStringProperty(value, "tag") &&
		hasProperty(value, "content") &&
		isTypeFrom(value, TAG_HANDLERS)
}

const TAG_HANDLERS: Record<ReferenceTag, Checker<Sum, Reference>> = {
	"NelsonClassic": handleUintTag,
	"NelsonNew": handleUintTag,
	"Njecd": handleUintTag,
	"Kkd": handleUintTag,
	"Kkld": handleUintTag,
	"Kkld2ed": handleUintTag,
	"Heisig": handleUintTag,
	"Heisig6": handleUintTag,
	"Gakken": handleUintTag,
	"OneillKk": handleUintTag,
	"Henshall": handleUintTag,
	"ShKk": handleUintTag,
	"ShKk2": handleUintTag,
	"Sakade": handleUintTag,
	"Jfcards": handleUintTag,
	"Henshall3": handleUintTag,
	"TuttleCards": handleUintTag,
	"Crowley": handleUintTag,
	"KanjiInContext": handleUintTag,
	"KodanshaCompact": handleUintTag,
	"Maniette": handleUintTag,
	"Moro": handleMoroTag,
	"Oneill": handleOneillTag,
	"BusyPeople": handleBusyPeopleTag,
}

function handleUintTag(value: Sum): value is Reference_Uint {
	return isUint(value.content)
}

function handleMoroTag(value: Sum): value is Reference_Moro {
	return isMoro(value.content)
}

function handleOneillTag(value: Sum): value is Reference_Oneill {
	return isOneill(value.content)
}

function handleBusyPeopleTag(value: Sum): value is Reference_BusyPeople {
	return isBusyPeople(value.content)
}