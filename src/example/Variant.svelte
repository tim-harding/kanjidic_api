<script lang="ts">
	import {
		isVariantDeRooFromTag,
		isVariantKutenFromTag,
		isVariantOneillFromTag,
		isVariantShDescFromTag,
		isVariantUintFromTag,
		serializeVariant,
	} from "../lib/variant";
	import type { Variant as VariantType, VariantTag } from "../lib/variant";
	import KutenPopoverContent from "./KutenPopoverContent.svelte";
	import Popover from "./Popover.svelte";

	export let variant: VariantType;

	const KEYS: Record<VariantTag, string> = {
		Jis208: "JIS X 0208-1997",
		Jis212: "JIS X 0212-1990",
		Jis213: "JIS X 0213-2000",
		Unicode: "Unicode",
		Halpern: "Halpern",
		Nelson: "Nelson",
		DeRoo: "De Roo",
		ShDesc: "Spahn-Hadamitzky",
		Oneill: "O'Neill",
	};

	const key = KEYS[variant.tag];
</script>

<span class="root">
	{key}:&nbsp;<strong>{serializeVariant(variant)}&nbsp;</strong>
	<Popover>
		{#if isVariantKutenFromTag(variant)}
			<KutenPopoverContent kuten={variant.content} />
		{:else if isVariantUintFromTag(variant)}
			Uint
		{:else if isVariantDeRooFromTag(variant)}
			DeRoo
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
</style>
