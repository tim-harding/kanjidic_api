<script lang="ts">
	import {
		isVariantDeRooFromTag,
		isVariantKutenFromTag,
		isVariantOneillFromTag,
		isVariantShDescFromTag,
		isVariantUintFromTag,
		isVariantUnicodeFromTag,
		serializeVariant,
	} from "../lib/types/variant";
	import type { Variant as VariantType, VariantTag } from "../lib/types/variant";
	import KutenPopoverContent from "./KutenPopoverContent.svelte";
	import Popover from "./Popover.svelte";
	import UnicodePopoverContent from "./UnicodePopoverContent.svelte";
	import Citation from "./Citation.svelte";
	import DeRooPopoverContent from "./DeRooPopoverContent.svelte";
	import SpahnHadamitzkyPopoverContent from "./SpahnHadamitzkyPopoverContent.svelte";
import OneillPopoverContent from "./OneillPopoverContent.svelte";

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

<span class="text-line">
	{key}:&nbsp;<strong>{serializeVariant(variant)}&nbsp;</strong>
	<Popover>
		{#if isVariantKutenFromTag(variant)}
			<KutenPopoverContent kuten={variant.content} />
		{:else if isVariantUintFromTag(variant)}
			<p>An index into the following dictionary:</p>
			{#if variant.tag === "Halpern"}
				<Citation
					amazonAsin="4767490405"
				>
					Halpern, J. 1990. <em>
						New Japanese-English Character Dictionary
					</em>, Kenkyusha/NTC.
				</Citation>
			{:else}
				<Citation
					amazonAsin="0804819653"
				>
					Nelson, A.N. 1974. <em>
						The Modern Reader's Japanese-English Character Dictionary
					</em>, (second revised edition), Tuttle.
				</Citation>
			{/if}
		{:else if isVariantUnicodeFromTag(variant)}
			<UnicodePopoverContent codepoint={variant.content} />
		{:else if isVariantDeRooFromTag(variant)}
			<DeRooPopoverContent deRoo={variant.content} />
		{:else if isVariantShDescFromTag(variant)}
			<SpahnHadamitzkyPopoverContent shDesc={variant.content} />
		{:else if isVariantOneillFromTag(variant)}
		<OneillPopoverContent></OneillPopoverContent>
		{/if}
	</Popover>
</span>
