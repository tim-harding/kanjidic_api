<script lang="ts">
	import { isReferenceUintByTag } from "../lib/reference";
	import type {
		Reference as ReferenceType,
		ReferenceTag,
	} from "../lib/reference";

	export let reference: ReferenceType;

	interface ReferenceInformation {
		amazon?: string;
		title: string;
		authors: string[];
	}

	const REFERENCE_NAME: Record<ReferenceTag, ReferenceInformation> = {
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

	const info = REFERENCE_NAME[reference.tag];
</script>

{#if isReferenceUintByTag(reference)}
	{info.title}
{/if}
