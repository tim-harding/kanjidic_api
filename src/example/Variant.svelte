<script lang="ts">
	import {
		isVariantDeRooFromTag,
		isVariantKutenFromTag,
		isVariantOneillFromTag,
		isVariantShDescFromTag,
		isVariantUintFromTag,
		isVariantUnicodeFromTag,
		serializeVariant,
	} from "../lib/variant";
	import type { Variant as VariantType, VariantTag } from "../lib/variant";
	import KutenPopoverContent from "./KutenPopoverContent.svelte";
	import Popover from "./Popover.svelte";
	import UnicodePopoverContent from "./UnicodePopoverContent.svelte";
	import Citation from "./Citation.svelte";
	import DeRooPopoverContent from "./DeRooPopoverContent.svelte";

	export let variant: VariantType;

	const KEYS: Record<VariantTag, string> = {
		Jis208: "JIS X 0208-1997",
		Jis212: "JIS X 0212-1990",
		Jis213: "JIS X 0213-2000",
		Unicode: "Unicode",
		Halpern: "Halpern",
		Nelson: "Nelson",
		DeRoo: "De Roo",
		SpahnHadamitzky: "Spahn-Hadamitzky",
		ONeill: "O'Neill",
	};

	const key = KEYS[variant.tag];
</script>

<span class="root">
	{key}:&nbsp;<strong>{serializeVariant(variant)}&nbsp;</strong>
	<Popover>
		{#if isVariantKutenFromTag(variant)}
			<KutenPopoverContent kuten={variant.content} />
		{:else if isVariantUintFromTag(variant)}
			<div class="uint">
				<p>An index into the following dictionary:</p>
				{#if variant.tag === "Halpern"}
					<Citation
						amazon="https://www.amazon.com/Japanese-English-character-dictionary-Jack-Halpern/dp/4767490405/ref=sr_1_4?dchild=1&keywords=new+japanese+english+character+dictionary&qid=1630803914&sr=8-4"
					>
						Halpern, J. 1990. <em>
							New Japanese-English Character Dictionary
						</em>, Kenkyusha/NTC.
					</Citation>
				{:else}
					<Citation
						amazon="https://www.amazon.com/Readers-Japanese-English-Character-Dictionary-Revised/dp/B000KWN4BK/ref=sr_1_6?dchild=1&keywords=The+Modern+Reader%27s+Japanese-English+Character+Dictionary&qid=1630803980&sr=8-6"
					>
						Nelson, A.N. 1974. <em>
							The Modern Reader's Japanese-English Character Dictionary
						</em>, (second revised edition), Tuttle.
					</Citation>
				{/if}
			</div>
		{:else if isVariantUnicodeFromTag(variant)}
			<UnicodePopoverContent codepoint={variant.content} />
		{:else if isVariantDeRooFromTag(variant)}
			<DeRooPopoverContent deRoo={variant.content} />
		{:else if isVariantShDescFromTag(variant)}
			ShDesc
		{:else if isVariantOneillFromTag(variant)}
			Oneill
		{/if}
	</Popover>
</span>

<style lang="scss">
	.root {
		grid-template-columns: max-content max-content 1fr;
	}

	.uint {
		grid-auto-rows: max-content;
	}
</style>
