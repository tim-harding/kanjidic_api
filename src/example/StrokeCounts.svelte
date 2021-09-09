<script lang="ts">
	import type { StrokeCount } from "../lib/stroke_count";
	import Popover from "./Popover.svelte";

	export let strokeCounts: StrokeCount;
</script>

<div class="root text-line">
	<dl class="passthrough">
		<dt>Stroke count</dt>
		:&nbsp;
		<dd>
			{strokeCounts.accepted}
		</dd>
	</dl>
	&nbsp;
	<Popover>
		The number of strokes it takes to draw the kanji.
		{#if strokeCounts.miscounts !== undefined}
			<dl>
				<div class="text-line">
					<dt>Miscounts</dt>
					:&nbsp;
					<dd class="transparent">
						<ul class="text-line">
							{#each strokeCounts.miscounts as miscount}
								<li class="miscount">
									&nbsp;{miscount}
								</li>
							{/each}
						</ul>
					</dd>
				</div>
			</dl>
		{/if}
	</Popover>
</div>

<style lang="scss">
	.root {
		margin-left: 1.4rem;
	}

	.miscount {
		display: inline-grid;
		grid-template-columns: 1fr max-content;
	}

	.miscount::after {
		content: ",";
	}

	.miscount:last-of-type::after {
		content: none;
	}
</style>
