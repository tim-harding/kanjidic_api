<script lang="ts">
	import { serializeCodepoint } from "../lib";
	import type { CodepointTag } from "../lib";
	import type { Codepoint } from "../lib";
	import Popover from "./Popover.svelte";
	import KutenPopoverContent from "./KutenPopoverContent.svelte";
	import UnicodePopoverContent from "./UnicodePopoverContent.svelte";

	export let codepoint: Codepoint;

	const KEYS: Record<CodepointTag, string> = {
		Jis208: "JIS X 0208-1997",
		Jis212: "JIS X 0212-1990",
		Jis213: "JIS X 0213-2000",
		Unicode: "Unicode",
	};

	$: serialized = serializeCodepoint(codepoint);

	const key = KEYS[codepoint.tag];
</script>

<div class="text-line">
	<dl class="passthrough">
		<dt>{key}</dt>
		<dd>{serialized}</dd>
	</dl>
	&nbsp;
	<Popover>
		{#if codepoint.tag === "Unicode"}
			<UnicodePopoverContent codepoint={codepoint.content} />
		{:else}
			<KutenPopoverContent kuten={codepoint.content} />
		{/if}
	</Popover>
</div>

<style lang="scss">
	.kuten-details {
		gap: 0.25rem;
	}
</style>
