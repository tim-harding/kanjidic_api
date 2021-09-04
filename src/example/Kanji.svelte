<script lang="ts">
	import type { Character } from "../lib";
	import Codepoint from "./Codepoint.svelte";
	import KangxiRadical from "./KangxiRadical.svelte";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";
	import Link from "./Link.svelte";
	import Grade from "./Grade.svelte";

	export let character: Character;
</script>

<div class="root">
	<div class="no-dropdown">
		Literal:&nbsp;
		<span class="noto">
			{character.literal}
		</span>
	</div>

	{#if character.codepoints !== undefined}
		<KanjiDropdown>
			<span slot="summary"> Codepoints </span>
			<ul slot="content" class="details-body">
				{#each character.codepoints as codepoint}
					<Codepoint {codepoint} />
				{/each}
			</ul>
		</KanjiDropdown>
	{/if}

	{#if character.radicals !== undefined}
		<KanjiDropdown>
			<slot slot="summary">
				<div class="radical-popover">
					Radicals
					<Popover>
						<p>
							<Link href="https://en.wikipedia.org/wiki/Kangxi_radical"
								>Kangxi radicals info</Link
							>
						</p>
						<p>A classification of the kanji based on the Kangxi Zidian.</p>
					</Popover>
				</div>
			</slot>
			<ul slot="content" class="details-body">
				{#each character.radicals as radical}
					<KangxiRadical {radical} />
				{/each}
			</ul>
		</KanjiDropdown>
	{/if}

	{#if character.grade}
		<div class="no-dropdown">
			Grade:&nbsp;<Grade grade={character.grade} />
		</div>
	{/if}
</div>

<style>
	.root {
		margin: 1rem;
		margin-left: 0rem;
		grid-auto-rows: min-content;
		gap: 0.75rem;
	}

	.no-dropdown {
		grid-template-columns: min-content 1fr;
		align-items: flex-end;
		margin-left: 1.4rem;
	}

	.details-body {
		margin-left: 2.5rem;
		gap: 0.5rem;
	}

	.radical-popover {
		grid-template-columns: max-content 1fr;
		align-items: center;
		gap: 0.5rem;
	}
</style>
