<script lang="ts">
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";

	export let names: string[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Radical names&nbsp;
		<Popover>
			The name of the radical or radicals that this kanji represents. This field
			is absent if the kanji is not also a radical.
		</Popover>
	</span>
	<ul slot="content">
		{#each names as name}
			<li class="noto">
				{name}
			</li>
		{/each}
	</ul>
</KanjiDropdown>
