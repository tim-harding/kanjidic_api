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
	const id = `${key}__${serialized}`;
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

	.info-button {
		cursor: pointer;
	}

	input:checked + .info-button + .popover {
		visibility: visible;
	}

	.popover {
		visibility: hidden;
		position: absolute;
		left: 1.5rem;
		grid-template-columns: min-content 1fr;
		grid-template-areas: "arrow content";
	}

	.popover-root {
		position: relative;
		align-items: center;
	}

	.left-triangle {
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--snow-storm-0);
		border-color: var(--snow-storm-2);
		border-width: 1px;
		border-style: solid;
		align-self: center;
		transform: rotate(45deg);
		box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
		grid-area: arrow;
		z-index: 1;
	}
	
	.left-triangle-2 {
		align-self: center;
		width: 1.25rem;
		height: 1.25rem;
		background-color: var(--snow-storm-0);
		border-color: var(--snow-storm-2);
		transform: rotate(45deg);
		grid-area: arrow;
		z-index: 3;
	}

	.popover-content {
		grid-area: content;
		transform: translateX(-1.25rem * (1/1.414));
		background-color: var(--snow-storm-0);
		padding: 1rem;
		border-radius: 0.25rem;
		border-color: var(--snow-storm-2);
		border-width: 1px;
		border-style: solid;
		box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
		z-index: 2;
	}
</style>
