import { BusyPeople } from "./busy_people"
import { Moro } from "./moro"
import { Oneill } from "./oneill"
import { Uint } from "./uint"

/**
 * A reference into Japanese for Busy People
 */
export interface Reference_BusyPeople {
	/**
	 * The reference source
	 */
	kind: "BusyPeople"
	
	/**
	 * The reference
	 */
	value: BusyPeople
}

/**
 * A reference into Daikanwajiten by Morohashi
 */
export interface Reference_Moro {
	/**
	 * The reference source
	 */
	kind: "Moro"
	
	/**
	 * The reference
	 */
	value: Moro
}

/**
 * A reference into Japanese Names by P.G. O'Neill
 */
export interface Reference_Oneill {
	/**
	 * The reference source
	 */
	kind: "Oneill"
	
	/**
	 * The reference
	 */
	value: Oneill
}

/**
 * Modern Reader's Japanese-English Dictionary by Andrew Nelson
 */
type NelsonClassic = "NelsonClassic"

/**
 * The New Nelson Japanese-English Dictionary by John Haig
 */
type NelsonNew = "NelsonNew"

/**
 * New Japanese-English Character Dictionary by Jack Halpern
 */
type Njecd = "Njecd"

/**
 * Kodansha's Japanese-English Dictionary by Jack Halpern
 */
type Kkd = "Kkd"

/**
 * Kanji Learners Dictionary by Jack Halpern
 */
type Kkld = "Kkld"

/**
 * Kanji Learners Dictionary Second Edition by Jack Halpern
 */
type Kkld2ed = "Kkld2ed"

/**
 * Remembering the Kanji by James Heisig
 */
type Heisig = "Heisig"

/**
 * Remembering the Kanji Sixth Edition by James Heisig
 */
type Heisig6 = "Heisig6"

/**
 * A New Dictionary of Kanji Usage
 */
type Gakken = "Gakken"

/**
 * Essential Kanji by P.G. O'Neill
 */
type OneillKk = "OneillKk"

/**
 * A Guide to Remembering Japanese Characters by Kenneth G. Henshall
 */
type Henshall = "Henshall"

/**
 * Kanji and Kana by Spahn and Hadamitzky
 */
type ShKk = "ShKk"

/**
 * Kanji and Kana 2011 edition by Spahn and Hadamitzky
 */
type ShKk2 = "ShKk2"

/**
 * A Guide to Reading and Writing Japanese by Florence Sakade
 */
type Sakade = "Sakade"

/**
 * Japanese Kanji Flashcards by Tomoko Okazaki
 */
type Jfcards = "Jfcards"

/**
 * A Guide to Reading and Writing Japanese by Henshall
 */
type Henshall3 = "Henshall3"

/**
 * Tuttle Kanji Cards by Alexander Kask
 */
type TuttleCards = "TuttleCards"

/**
 * The Kanji Way to Japanese Language Power by Dale Crowley
 */
type Crowley = "Crowley"

/**
 * Kanji in Context by Nishiguchi and Kono
 */
type KanjiInContext = "KanjiInContext"

/**
 * The Kodansha Compact Study Guide
 */
type KodanshaCompact = "KodanshaCompact"

/**
 * Les Kanjis dans la tete by Yves Maniette
 */
type Maniette = "Maniette"

/**
 * A numeric index into a dictionary or reference book.
 */
export interface Reference_Uint {
	/**
	 * The reference source
	 */
	kind: NelsonClassic | 
		NelsonNew |
		Njecd |
		Kkd |
		Kkld |
		Kkld2ed |
		Heisig |
		Heisig6 |
		Gakken |
		OneillKk |
		Henshall |
		ShKk |
		ShKk2 |
		Sakade |
		Jfcards |
		Henshall3 |
		TuttleCards |
		Crowley |
		KanjiInContext |
		KodanshaCompact |
		Maniette
	
	/**
	 * The reference
	 */
	value: Uint
}

/**
 * An index number into a particular kanji dictionary or reference book.
 */
export type Reference = Reference_BusyPeople |
	Reference_Moro |
	Reference_Oneill |
	Reference_Uint