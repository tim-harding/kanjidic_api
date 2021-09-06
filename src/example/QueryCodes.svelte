<script lang="ts">
	import type { QueryCode as QueryCodeType } from "../lib";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";
	import QueryCode from "./QueryCode.svelte";

	export let codes: QueryCodeType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Query&nbsp;codes&nbsp;
		<Popover />
	</span>
	<dl slot="content" class="list">
		{#each codes as code}
			<QueryCode {code} />
		{/each}
	</dl>
</KanjiDropdown>

<style>
	.list {
		gap: 0.25rem;
	}
</style>