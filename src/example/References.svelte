<script lang="ts">
	import type { Reference as ReferenceType } from "../lib/reference";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";
	import Reference from "./Reference.svelte";

	export let references: ReferenceType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		References&nbsp;
		<Popover>Indexes into dictionaries and other instructional books.</Popover>
	</span>
	<ul slot="content">
		{#each references as reference}
			<li>
				<Reference {reference} />
			</li>
		{/each}
	</ul>
</KanjiDropdown>
