<script lang="ts">
	import type { Character } from "../lib";
import { queryLiteralsChecked } from "../lib/literals_access";
	import { queryTranslationChecked } from "../lib/translation_access";

	import Popover from "./Popover.svelte";
	import ResultsList from "./ResultsList.svelte";
	import SectioningBox from "./SectioningBox.svelte";
	import { kanjiAccess } from "./shared";

	let results: Character[] = [];
	let error: string | undefined;

	let updatePending = false;
	let needsUpdate = false;

	async function updateResults() {
		if (updatePending) {
			needsUpdate = true;
			return;
		}
		updatePending = true;

		await doQuery();

		updatePending = false;
		if (needsUpdate) {
			needsUpdate = false;
			updateResults();
		}
	}

	async function doQuery() {
		term = term.trim()
		if (term.length === 0) {
			return;
		}
		const [translations, literals] = await Promise.all([
			queryTranslationChecked(kanjiAccess, term),
			queryLiteralsChecked(kanjiAccess, term)
		])
		if (translations instanceof Error) {
			error = translations.message;
			return;
		}
		if (literals instanceof Error) {
			error = literals.message;
			return;
		}
		// We're just ignoring errors on the literals response
		results = [
			...translations.kanji,
			...literals.kanji,
		]
	}

	let term: string = "";

	$: {
		term; // Get that reactivity
		console.log("hit");
		updateResults();
	}
</script>

<div class="root">
<SectioningBox>
	<form on:submit|preventDefault={() => {}} class="form">
		<label for="search-term" class="search-term-label text-line"> Word: </label>
		<input
			type="text"
			name="search-term"
			id="search-term"
			class="search-term"
			bind:value={term}
		/>
		<Popover>
			A word in another language to find a kanji for. At this time, translations
			are available in English, French, Spanish, and Portuguese.
		</Popover>
	</form>
</SectioningBox>
{#if error !== undefined}
	<div class="error">
		{error}
	</div>
{/if}
<ResultsList kanjis={results} />
</div>

<style>
	.root {
		grid-auto-rows: min-content;
		gap: 0.5rem;
		width: 100%;
		max-width: 30rem;
	}

	.search-term {
		background-color: var(--snow-storm-0);
		border-color: var(--gray-300);
		border-radius: 0.25rem;
		border-width: 2px;
		border-style: solid;
		padding: 0.5rem;
	}

	.search-term-label {
		font-size: 1.25rem;
	}

	.form {
		grid-template-columns: min-content 1fr min-content;
		padding: 1rem;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		max-width: 40rem;
	}

	.error {
		color: var(--aurora-red);
	}
</style>
