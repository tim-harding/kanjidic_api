<script lang="ts">
	import type { StrokeCount } from "../lib";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";

	export let strokeCounts: StrokeCount;
</script>

{#if strokeCounts.miscounts !== undefined}
	<KanjiDropdown>
		<span slot="summary" class="text-line">
			Stroke counts&nbsp;
			<Popover>The number of strokes it takes to draw the kanji.</Popover>
		</span>
		<dl slot="content">
			<div class="text-line">
				<dt>Accepted</dt>
				:&nbsp;
				<dd>
					{strokeCounts.accepted}
				</dd>
			</div>

			<div class="text-line">
				<dt>Miscounts</dt>
				:
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
	</KanjiDropdown>

{:else}
<div class="root text-line">
	<dl class="passthrough">
		<dt>Stroke counts</dt>
		:&nbsp;
		<dd>
			{strokeCounts.accepted}
		</dd>
	</dl>
	&nbsp;
	<Popover>The number of strokes it takes to draw the kanji.</Popover>
</div>

{/if}
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
