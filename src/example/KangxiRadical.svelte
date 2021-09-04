<script lang="ts">
	import { kangxiName, kangxiSymbol } from "../lib";
	import type { KangxiRadical as KangxiRadicalType } from "../lib/kangxi_radical";
	import Popover from "./Popover.svelte";

	export let radical: KangxiRadicalType;

	const symbol = kangxiSymbol(radical.radical);
</script>

<!-- Sources info -->
<!-- https://dl.acm.org/doi/pdf/10.5555/1610042.1610044 -->

<span class="root">
	<span>{radical.kind}:</span>
	<span class="noto">{symbol}</span>
	<Popover>
		<div class="details">
			<p>
				Radical number: {radical.radical}
			</p>
			<p>
				Radical name: {kangxiName(radical.radical)}
			</p>
			{#if radical.kind === "Classical"}
				<p class="hanging-indent">
					Shibano, K. et al. 1997, 2002. <em>JIS Kanji Dictionary</em>, (first
					and second editions), Japan Standards Association.
				</p>
			{:else}
				<p class="hanging-indent">
					Nelson, A.N. 1974. <em>The Modern Reader's Japanese-English Character Dictionary</em>, (second revised edition), Tuttle. 
				</p>
			{/if}
		</div>
	</Popover>
</span>

<style lang="scss">
	.root {
		grid-template-columns: max-content max-content 1fr;
		align-items: flex-end;
		gap: 0.75rem;
	}

	.details {
		grid-auto-rows: min-content;
		gap: 0.25rem;

		& p {
			display: block;

			& * {
				display: inline;
			}
		}
	}

	.hanging-indent {
		text-indent: -2rem;
		padding-left: 2rem;
	}
</style>
