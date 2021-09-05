<script lang="ts">
	import type { KangxiRadical as KangxiRadicalType } from "../lib/kangxi_radical";
	import KangxiRadical from "./KangxiRadical.svelte";
	import Popover from "./Popover.svelte";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Link from "./Link.svelte";

	export let radicals: KangxiRadicalType[];
</script>

<KanjiDropdown>
	<slot slot="summary">
		Radicals
		<Popover>
			<p>
				<Link href="https://en.wikipedia.org/wiki/Kangxi_radical"
					>Kangxi radicals info</Link
				>
			</p>
			<p>A classification of the kanji based on the Kangxi Zidian.</p>
		</Popover>
	</slot>
	<ul slot="content" class="details-body">
		{#each radicals as radical}
			<KangxiRadical {radical} />
		{/each}
	</ul>
</KanjiDropdown>
