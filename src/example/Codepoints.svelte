<script lang="ts">
	import type { Codepoint as CodepointType } from "../lib/codepoint";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Codepoint from "./Codepoint.svelte";

	export let codepoints: CodepointType[];
</script>

<KanjiDropdown>
	<span slot="summary"> Codepoints </span>
	<ul slot="content" class="details-body">
		{#each codepoints as codepoint}
			<Codepoint {codepoint} />
		{/each}
	</ul>
</KanjiDropdown>
