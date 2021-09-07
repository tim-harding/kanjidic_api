<script lang="ts">
	import type { Character } from "../lib";
	import Grade from "./Grade.svelte";
	import Codepoints from "./Codepoints.svelte";
	import Literal from "./Literal.svelte";
	import Radicals from "./KangxiRadicals.svelte";
	import StrokeCounts from "./StrokeCounts.svelte";
	import Variants from "./Variants.svelte";
	import Frequency from "./Frequency.svelte";
	import RadicalNames from "./RadicalNames.svelte";
	import Jlpt from "./Jlpt.svelte";
	import References from "./References.svelte";
	import QueryCodes from "./QueryCodes.svelte";
	import Readings from "./Readings.svelte";
	import Translations from "./Translations.svelte";
	import Nanori from "./Nanori.svelte";
	import Decomposition from "./Decomposition.svelte";

	export let character: Character;
</script>

<details class="root">
	<summary class="summary">
		<Literal literal={character.literal} />
		<span class="material-icons-outlined md-36">expand_more</span>
	</summary>
	<div class="content">
		{#if character.codepoints !== undefined}
			<Codepoints codepoints={character.codepoints} />
		{/if}
		{#if character.radicals !== undefined}
			<Radicals radicals={character.radicals} />
		{/if}
		{#if character.grade !== undefined}
			<Grade grade={character.grade} />
		{/if}
		{#if character.strokeCounts !== undefined}
			<StrokeCounts strokeCounts={character.strokeCounts} />
		{/if}
		{#if character.variants !== undefined}
			<Variants variants={character.variants} />
		{/if}
		{#if character.frequency !== undefined}
			<Frequency frequency={character.frequency} />
		{/if}
		{#if character.radicalNames !== undefined}
			<RadicalNames names={character.radicalNames} />
		{/if}
		{#if character.jlpt !== undefined}
			<Jlpt jlpt={character.jlpt} />
		{/if}
		{#if character.references !== undefined}
			<References references={character.references} />
		{/if}
		{#if character.queryCodes !== undefined}
			<QueryCodes codes={character.queryCodes} />
		{/if}
		{#if character.readings !== undefined}
			<Readings readings={character.readings} />
		{/if}
		{#if character.translations !== undefined}
			<Translations translations={character.translations} />
		{/if}
		{#if character.nanori !== undefined}
			<Nanori nanori={character.nanori} />
		{/if}
		{#if character.decomposition !== undefined}
			<Decomposition decomposition={character.decomposition} />
		{/if}
	</div>
</details>

<style>
	.root {
		grid-auto-rows: max-content;
	}

	.content {
		margin: 1rem;
		margin-left: 0rem;
		grid-auto-rows: max-content;
		gap: 0.75rem;
	}
	
	.summary {
		grid-template-columns: max-content 1fr;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}
</style>
