<script lang="ts">
	import type { Character } from "../lib";
	import Codepoint from "./Codepoint.svelte";
import KanjiDropdown from "./KanjiDropdown.svelte";

	export let character: Character;
</script>

<div class="root">
	<div class="literal">
		Literal:&nbsp;
		<span class="noto">
			{character.literal}
		</span>
	</div>
	{#if character.codepoints !== undefined}
		<KanjiDropdown summary="Codepoints">
			<ul class="details-body">
				{#each character.codepoints as codepoint}
					<Codepoint {codepoint} />
				{/each}
			</ul>
		</KanjiDropdown>
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
		margin-left: 0rem;
		grid-template-rows: min-content;
		gap: 0.75rem;
	}

	.literal {
		grid-template-columns: min-content 1fr;
		align-items: flex-end;
		margin-left: 1.4rem;
	}

	.details-body {
		margin-left: 2rem;
		gap: 0.5rem;
	}
</style>
