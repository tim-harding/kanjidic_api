<script lang="ts">
	import { kangxiName, kangxiSymbol } from "../lib";

	import type { KangxiRadical as KangxiRadicalType } from "../lib/kangxi_radical";
	import Link from "./Link.svelte";
	import Popover from "./Popover.svelte";

	export let radical: KangxiRadicalType;

	const symbol = kangxiSymbol(radical.radical);
</script>

<span class="root">
	<span>{radical.kind}:</span>
	<span class="noto">{symbol}</span>
	<Popover>
		<div class="details">
			<p>
				<Link href="https://en.wikipedia.org/wiki/Kangxi_radical"
					>Kangxi radicals info</Link
				>
			</p>
			<p>A classification of the kanji based on the Kangxi Zidian.</p>
			<p>
				Radical number: {radical.radical}
			</p>
			<p>
				Radical name: {kangxiName(radical.radical)}
			</p>
			<p>Source:</p>
			{#if radical.kind === "Classical"}
			<p class="hanging-indent">
					<!-- <span class="hanging-indent"> -->
						Shibano, K. et al. 1997, 2002. <em>JIS Kanji Dictionary</em>, (first and second editions), Japan Standards Association.
					<!-- </span> -->
			</p>
			{:else}
			<p>
					Nelson: A reclassification sourced from the
					<Link
						href="https://www.amazon.com/Original-Readers-Japanese-English-Character-Dictionary/dp/0804819653"
					>
						Modern Japanese-English Character Dictionary
					</Link>.
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
