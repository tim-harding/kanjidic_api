<script lang="ts">
	import type { Character } from "../lib";
	import Codepoint from "./Codepoint.svelte";

	export let character: Character;
</script>

<div class="root">
	<div class="literal">
		Literal: {character.literal}
	</div>
	{#if character.codepoints !== undefined}
		<ul>
			{#each character.codepoints as codepoint}
				<Codepoint {codepoint} />
			{/each}
		</ul>
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
	}
</style>
