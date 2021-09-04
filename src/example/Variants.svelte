<script lang="ts">
	import type { Variant as VariantType } from "../lib";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";
	import Variant from "./Variant.svelte";

	export let variants: VariantType[];
</script>

<KanjiDropdown>
	<span slot="summary" class="summary">
		Variants&nbsp;
		<Popover>
			Either a cross-reference code to another kanji, usually regarded as a
			variant, or an alternative indexing code for the current kanji.
		</Popover>
	</span>
	<div slot="content">
		<ul>
			{#each variants as variant}
				<li>
					<Variant {variant} />
				</li>
			{/each}
		</ul>
	</div>
</KanjiDropdown>

<style>
	.summary {
		grid-template-columns: max-content 1fr;
	}
</style>