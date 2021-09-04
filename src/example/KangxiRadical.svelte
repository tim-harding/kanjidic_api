<script lang="ts">
	import { kangxiName, kangxiSymbol } from "../lib";
	import type { KangxiRadical as KangxiRadicalType } from "../lib/kangxi_radical";
	import Popover from "./Popover.svelte";
	import Citation from "./Citation.svelte";

	export let radical: KangxiRadicalType;

	const symbol = kangxiSymbol(radical.radical);
</script>

<!-- Sources info -->
<!-- https://dl.acm.org/doi/pdf/10.5555/1610042.1610044 -->

<p class="root">
	{radical.kind}:&nbsp;
	<strong class="noto">{symbol}</strong>&nbsp;
	<Popover>
		<div class="details">
			<p>
				Radical number: {radical.radical}
			</p>
			<p>
				Radical name: {kangxiName(radical.radical)}
			</p>
			{#if radical.kind === "Classical"}
				<Citation>
					Shibano, K. et al. 1997, 2002. <em>JIS Kanji Dictionary</em>, (first
					and second editions), Japan Standards Association.
				</Citation>
			{:else}
				<Citation
					amazon="https://www.amazon.com/Original-Readers-Japanese-English-Character-Dictionary/dp/0804819653/ref=sr_1_1?dchild=1&keywords=The+Modern+Reader%27s+Japanese-English+Character+Dictionary&qid=1630793965&sr=8-1"
				>
					Nelson, A.N. 1974. <em
						>The Modern Reader's Japanese-English Character Dictionary</em
					>, (second revised edition), Tuttle.
				</Citation>
			{/if}
		</div>
	</Popover>
</p>

<style lang="scss">
	.root {
		display: block;
		grid-template-columns: max-content 1fr;
		align-items: flex-end;
		gap: 0.5rem;
	}

	.details {
		grid-auto-rows: min-content;
		gap: 0.25rem;
	}
</style>
