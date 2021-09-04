<script lang="ts">
	import type { Character } from "../lib";
	import Grade from "./Grade.svelte";
	import Codepoints from "./Codepoints.svelte";
	import Literal from "./Literal.svelte";
	import Radicals from "./Radicals.svelte";
import StrokeCount from "./StrokeCount.svelte";
import Variants from "./Variants.svelte";

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
		<StrokeCount strokeCounts={character.strokeCounts}></StrokeCount>	
	{/if}
	{#if character.variants !== undefined}
		<Variants variants={character.variants}></Variants>	
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
		margin-left: 0rem;
		grid-auto-rows: min-content;
		gap: 0.75rem;
	}
</style>
