<script lang="ts">
	import type { KangxiRadical as KangxiRadicalType } from "../lib/types/kangxi_radical";
	import { Kangxi } from "../lib/types/kangxi"
	import Popover from "./Popover.svelte";
	import Citation from "./Citation.svelte";

	export let radical: KangxiRadicalType.KangxiRadical;

	const symbol = Kangxi.check(radical.radical);
</script>

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
					{Kangxi.name(radical.radical)}
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