<script lang="ts">
	import type { KangxiRadical as KangxiRadicalType } from "../lib/kangxi_radical";
	import KangxiRadical from "./KangxiRadical.svelte";
	import Popover from "./Popover.svelte";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Url from "./Url.svelte";

	export let radicals: KangxiRadicalType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Radicals&nbsp;
		<Popover>
			<p>
				<Url href="https://en.wikipedia.org/wiki/Kangxi_radical"
					>Kangxi radicals info</Url
				>
			</p>
			<p>A classification of the kanji based on the Kangxi Zidian.</p>
		</Popover>
	</span>
	<ul slot="content">
		{#each radicals as radical}
			<KangxiRadical {radical} />
		{/each}
	</ul>
</KanjiDropdown>
