<script lang="ts">
import KanjiDropdown from "./KanjiDropdown.svelte";
import Popover from "./Popover.svelte";

export let nanori: string[];
</script>

<KanjiDropdown>
	<span class="text-line" slot="summary">
		Nanori&nbsp;
		<Popover>
			Japanese readings associated with names.
		</Popover>
	</span>	
	<ul slot="content">
		{#each nanori as item}
			<li class="noto">
				{item}
			</li>
		{/each}
	</ul>
</KanjiDropdown>