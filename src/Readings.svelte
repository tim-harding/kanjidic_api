<script lang="ts">
	import type { Reading as ReadingType } from "./lib/types/reading";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";
	import Reading from "./Reading.svelte";

	export let readings: ReadingType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Readings&nbsp;
		<Popover>Readings or pronunciations of the kanji.</Popover>
	</span>
	<dl slot="content">
		{#each readings as reading}
			<Reading {reading} />
		{/each}
	</dl>
</KanjiDropdown>
