import { BusyPeople } from "./busy_people"
import { isMoro } from "./moro"
import type { Moro } from "./moro"
import { isOneill } from "./oneill"
import type { Oneill } from "./oneill"
import { isSum, isTypeFromTagged } from "../shared"
import type { Checker, Sum } from "../shared"
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
	content: BusyPeople.BusyPeople
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

export function isReferenceMoroByTag(value: Reference): value is Reference_Moro {
	return value.tag === "Moro"
}

export function isReferenceOneillNamesByTag(value: Reference): value is Reference_OneillNames {
	return value.tag === "OneillNames"
}

export function isReferenceBusyPeopleByTag(value: Reference): value is Reference_BusyPeople {
	return value.tag === "BusyPeople"
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
	return BusyPeople.check(value.content)
}

interface ReferenceInformation {
	amazon?: string;
	title: string;
	authors: string[];
}

const REFERENCE_INFORMATION: Record<ReferenceTag, ReferenceInformation> = {
	NelsonClassic: {
		title: "Modern Reader's Japanese-English Character Dictionary",
		authors: ["Andrew Nelson"],
		amazon: "0804819653",
	},
	NelsonNew: {
		title: "The New Nelson Japanese-English Character Dictionary",
		authors: ["Andrew Nelson", "John Haig"],
		amazon: "0804820368",
	},
	Njecd: {
		title: "New Japanese-English Character Dictionary",
		authors: ["Jack Halpern"],
		amazon: "0844284343",
	},
	Kkd: {
		title: "The Kodansha Kanji Dictionary",
		authors: ["Jack Halpern", "Shigeko Miyazaki"],
		amazon: "1568364083",
	},
	Kkld: {
		title: "The Kodansha Kanji Learner's Dictionary",
		authors: ["Jack Halpern"],
		amazon: "4770028555",
	},
	Kkld2ed: {
		title: "The Kodansha Learner's Dictionary, second edition",
		authors: ["Jack Halpern", "Y. H. Tohsaku"],
		amazon: "1568364075",
	},
	Heisig: {
		title: "Remembering the Kanji",
		authors: ["James Heisig"],
		amazon: "0824831659",
	},
	Heisig6: {
		title: "Remembering the Kanji, sixth edition",
		authors: ["James Heisig"],
		amazon: "0824831659",
	},
	Gakken: {
		title: "A New Dictionary of Kanji Usage",
		authors: [],
		amazon: "B06XB1TSHF",
	},
	OneillNames: {
		title: "Japanese Names",
		authors: ["P. G. O'Neill"],
		amazon: "0834800608",
	},
	OneillKk: {
		title: "Essential Kanji",
		authors: ["P. G. O'Neill"],
		amazon: "0834802228",
	},
	Moro: {
		title: "Dai Kan-Wa Jiten",
		authors: ["Tetsuji Morohashi"],
	},
	Henshall: {
		title: "A Guide To Remembering Japanese Characters",
		authors: ["Kenneth Henshall"],
		amazon: "0804820384",
	},
	ShKk: {
		title: "Japanese Kanji and Kana, second edition",
		authors: ["Wolfgang Hadamitzky", "Mark Spahn"],
		amazon: "4805311169",
	},
	ShKk2: {
		title: "Japanese Kanji and Kana, 2011 edition",
		authors: ["Wolfgang Hadamitzky", "Mark Spahn"],
		amazon: "4805311169",
	},
	Sakade: {
		title: "A Guide to Reading and Writing Japanese",
		authors: ["Florence Sakade"],
		amazon: "0804802262",
	},
	Jfcards: {
		title: "Japanese Kanji Flashcards",
		authors: ["Max Hodges", "Tomoko Okazaki"],
		amazon: "0974869449",
	},
	Henshall3: {
		title: "A Guide To Reading and Writing Japanese, third edition",
		authors: ["Florence Sakade", "Kenneth Henshall", "Christopher Seeley", "Hank De Groot"],
		amazon: "B007PM0IB2",
	},
	TuttleCards: {
		title: "Japanese Kanji Flash Cards Kit",
		authors: ["Alexander Kask", "Emiko Konomi"],
		amazon: "4805311746",
	},
	Crowley: {
		title: "The Kanji Way to Japanese Language Power",
		authors: ["Dale Crowley"],
		amazon: "0962548901",
	},
	KanjiInContext: {
		title: "Kanji In Context",
		authors: ["Koichi Nishiguchi", "Tamaki Kono"],
		amazon: "4789015297",
	},
	KodanshaCompact: {
		title: "Kodansha's Compact Kanji Guide",
		authors: [],
		amazon: "4770015534",
	},
	BusyPeople: {
		title: "Japanese for Busy People",
		authors: [],
		amazon: "1568363850",
	},
	Maniette: {
		title: "Les Kanjis dans la tête",
		authors: ["Yves Maniette"],
		amazon: "295125573X",
	},
};

export function getReferenceInformation(reference: Reference): ReferenceInformation {
	return REFERENCE_INFORMATION[reference.tag]
}