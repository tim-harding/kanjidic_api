<script lang="ts">
	import type { Uint } from "./lib/uint";
	import Popover from "./Popover.svelte";

	export let jlpt: Uint;
</script>

<div class="root text-line">
	<dl class="passthrough">
		<dt>
			JLPT level
		</dt>
		:&nbsp;
		<dd>
			{jlpt}
		</dd>
	</dl>
	&nbsp;
	<Popover>
		Old JLPT level of the kanji. Based on pre-2010 test levels that go up to
		four, not five.
	</Popover>
</div>

<style>
	.root {
		margin-left: 1.4rem;
	}
</style>
