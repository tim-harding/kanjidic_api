<script lang="ts">
	import type { Character } from "../lib";
	import Codepoint from "./Codepoint.svelte";

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
		<details open={true} class="details">
			<summary class="summary">
				<div class="disclosure-triangle">
					<span class="material-icons-outlined open-disclosure">arrow_right</span>
					<span class="material-icons-outlined close-disclosure">arrow_drop_down</span>
				</div>
				<span class="summary-label">
					Codepoints
				</span>
			</summary>
			<ul class="details-body">
				{#each character.codepoints as codepoint}
					<Codepoint {codepoint} />
				{/each}
			</ul>
		</details>
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
		margin-left: 0.5rem;
		grid-template-rows: min-content;
		gap: 0.75rem;
	}

	.literal {
		grid-template-columns: min-content 1fr;
		align-items: flex-end;
		margin-left: 0.5rem;
	}

	.summary {
		grid-template-columns: 1.5rem 1fr;
		cursor: pointer;
		margin-bottom: 0.25rem;
	}
	
	.summary-label {
	}
	
	.disclosure-triangle {
		transform: translateY(-0.2rem);
		/* grid-area: center; */
		grid-template-areas: "center";
	}
	
	.open-disclosure, .close-disclosure {
		grid-area: center;
	}

	.details-body {
		margin-left: 2rem;
		gap: 0.25rem;
	}
	
	.close-disclosure {
		visibility: hidden;
	}
	
	.details[open] .close-disclosure {
		visibility: initial;
	}

	.details[open] .open-disclosure {
		visibility: hidden;
	}
	
	.expand-more {
		transform: translateY(-0.2rem);
	}
</style>
