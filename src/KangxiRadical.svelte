<script lang="ts">
	import { kangxiName, kangxiSymbol } from "./lib/kangxi";
	import type { KangxiRadical as KangxiRadicalType } from "./lib/kangxi_radical";
	import Popover from "./Popover.svelte";
	import Citation from "./Citation.svelte";

	export let radical: KangxiRadicalType;

	const symbol = kangxiSymbol(radical.radical);
</script>

<!-- Sources info -->
<!-- https://dl.acm.org/doi/pdf/10.5555/1610042.1610044 -->

<div class="text-line">
	<dl class="passthrough">
		<dt>
			{radical.kind}
		</dt>
		:&nbsp;
		<dd class="noto">
			{symbol}
		</dd>
	</dl>
	&nbsp;
	<Popover>
		<div class="passthrough">

		<dl class="passthrough">
			<div class="text-line">
				<dt>Radical number</dt>
				:&nbsp;
				<dd>
					{radical.radical}
				</dd>
			</div>

			<div class="text-line">
				<dt>Radical name</dt>
				:&nbsp;
				<dd>
					{kangxiName(radical.radical)}
				</dd>
			</div>
		</dl>
		{#if radical.kind === "Classical"}
			<Citation>
				Shibano, K. et al. 1997, 2002. <em>JIS Kanji Dictionary</em>, (first and
				second editions), Japan Standards Association.
			</Citation>
		{:else}
			<Citation
				amazonAsin="0804819653"
			>
				Nelson, A.N. 1974. <em
					>The Modern Reader's Japanese-English Character Dictionary</em
				>, (second revised edition), Tuttle.
			</Citation>
		{/if}
		</div>
	</Popover>
</div>