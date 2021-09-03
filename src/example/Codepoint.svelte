<script lang="ts">
	import { serializeCodepoint } from "../lib";
	import type { Codepoint } from "../lib";

	export let codepoint: Codepoint;

	$: serialized = serializeCodepoint(codepoint);
</script>

<div>
	{serialized}
</div>
