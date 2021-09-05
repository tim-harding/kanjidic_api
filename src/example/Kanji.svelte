<script lang="ts">
	import type { Character } from "../lib";
	import Grade from "./Grade.svelte";
	import Codepoints from "./Codepoints.svelte";
	import Literal from "./Literal.svelte";
	import Radicals from "./KangxiRadicals.svelte";
	import StrokeCounts from "./StrokeCounts.svelte";
	import Variants from "./Variants.svelte";
import Frequency from "./Frequency.svelte";

	export let character: Character;
</script>

<div class="root">
	<Literal literal={character.literal} />
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
		<Frequency frequency={character.frequency}></Frequency>	
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
		margin-left: 0rem;
		grid-auto-rows: max-content;
		gap: 0.75rem;
	}
</style>
