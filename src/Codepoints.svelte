<script lang="ts">
	import type { Codepoint as CodepointType } from "./lib/types/codepoint";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Codepoint from "./Codepoint.svelte";
	import Popover from "./Popover.svelte";

	export let codepoints: CodepointType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Codepoints&nbsp;
		<Popover>Alternate encodings for the character.</Popover>
	</span>
	<ul slot="content" class="list">
		{#each codepoints as codepoint}
			<li>
				<Codepoint {codepoint} />
			</li>
		{/each}
	</ul>
</KanjiDropdown>

<style>
	.list {
		gap: 0.25rem;
	}
</style>
