<script lang="ts">
	import Popover from "./Popover.svelte";

	export let frequency: number;
</script>

<div class="text-line root">
	<dl class="passthrough">
		<dt>Frequency</dt>
		:&nbsp;
		<dd>
			{frequency}
		</dd>
	</dl>
	&nbsp;
	<Popover>
		<p>
			A ranking of how often the character appears in newspapers, 1 being the
			most frequent.
		</p>
	</Popover>
</div>

<style>
	.root {
		margin-left: 1.4rem;
	}
</style>
