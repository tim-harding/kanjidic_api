<script lang="ts">
	import { Codepoint } from "../lib/types/codepoint";
	import Popover from "./Popover.svelte";
	import KutenPopoverContent from "./KutenPopoverContent.svelte";
	import UnicodePopoverContent from "./UnicodePopoverContent.svelte";

	export let codepoint: Codepoint.Codepoint;

	const KEYS: Record<Codepoint.CodepointTag, string> = {
		Jis208: "JIS X 0208-1997",
		Jis212: "JIS X 0212-1990",
		Jis213: "JIS X 0213-2000",
		Unicode: "Unicode",
	};

	$: serialized = Codepoint.serialize(codepoint);

	const key = KEYS[codepoint.tag];
</script>

<div class="text-line">
	<dl class="passthrough">
		<dt>{key}</dt>
		:&nbsp;
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