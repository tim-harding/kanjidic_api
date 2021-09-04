<script lang="ts">
	import type { StrokeCount } from "../lib";

	export let strokeCounts: StrokeCount;
</script>

<div class="root">
	Stroke counts:
	<ul class="list">
		<li>
			Accepted: {strokeCounts.accepted}
		</li>
		{#if strokeCounts.miscounts !== undefined}
			<li>
				Miscounts: {strokeCounts.miscounts
					.map((miscount) => miscount.toString())
					.join(", ")}
			</li>
		{/if}
	</ul>
</div>

<style lang="scss">
.root {
	margin-left: 1.4rem;
	gap: 0.5rem;
}

.list {
	margin-left: 1rem;
}
</style>