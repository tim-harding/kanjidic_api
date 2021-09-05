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
	<ul slot="content">
		{#each codes as code}
			<li>
				<QueryCode {code} />
			</li>
		{/each}
	</ul>
</KanjiDropdown>
