<script lang="ts">
	import type { Kanji } from "./lib/types/kanji";
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

	export let kanji: Kanji;
</script>

<details class="root">
	<summary class="summary">
		<Literal literal={kanji.literal} />
		<span class="material-icons-outlined md-36 expand-icon">expand_more</span>
	</summary>
	<div class="content">
		{#if kanji.decomposition !== undefined}
			<Decomposition decomposition={kanji.decomposition} />
		{/if}
		{#if kanji.strokeCounts !== undefined}
			<StrokeCounts strokeCounts={kanji.strokeCounts} />
		{/if}
		{#if kanji.frequency !== undefined}
			<Frequency frequency={kanji.frequency} />
		{/if}
		{#if kanji.jlpt !== undefined}
			<Jlpt jlpt={kanji.jlpt} />
		{/if}
		{#if kanji.grade !== undefined}
			<Grade grade={kanji.grade} />
		{/if}
		{#if kanji.readings !== undefined}
			<Readings readings={kanji.readings} />
		{/if}
		{#if kanji.translations !== undefined}
			<Translations translations={kanji.translations} />
		{/if}
		{#if kanji.codepoints !== undefined}
			<Codepoints codepoints={kanji.codepoints} />
		{/if}
		{#if kanji.queryCodes !== undefined}
			<QueryCodes codes={kanji.queryCodes} />
		{/if}
		{#if kanji.radicals !== undefined}
			<Radicals radicals={kanji.radicals} />
		{/if}
		{#if kanji.variants !== undefined}
			<Variants variants={kanji.variants} />
		{/if}
		{#if kanji.radicalNames !== undefined}
			<RadicalNames names={kanji.radicalNames} />
		{/if}
		{#if kanji.nanori !== undefined}
			<Nanori nanori={kanji.nanori} />
		{/if}
		{#if kanji.references !== undefined}
			<References references={kanji.references} />
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
	
	.expand-icon {
		justify-self: flex-end;
		margin-right: 2rem;
	}
</style>
