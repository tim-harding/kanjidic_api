<script lang="ts">
	import { serializeCodepoint } from "../lib";
	import type { CodepointTag } from "../lib";
	import type { Codepoint } from "../lib";
import Popover from "./Popover.svelte";

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

<p class="root">
	<span>
		{key}:&nbsp;
	</span>
	<span class="serialized">
		{serialized}&nbsp;
	</span>
	<Popover>Things and stuff<br>More things</Popover>
</p>

<style lang="scss">
	.root {
		grid-template-columns: max-content max-content 1fr;
	}

	.serialized {
		font-weight: 700;
	}
</style>
