<script lang="ts">
	import type { StrokeCount } from "../lib";

	export let strokeCounts: StrokeCount;
</script>

<div class="root">
	Stroke counts
	<ul class="list">
		<li class="count-category">
			Accepted:&nbsp;
			<strong>
				{strokeCounts.accepted}
			</strong>
		</li>
		{#if strokeCounts.miscounts !== undefined}
			<li class="count-category">
				Miscounts:
				<strong class="transparent">
					<ul class="transparent">
						{#each strokeCounts.miscounts as miscount}
							<li class="miscount">
								&nbsp;{miscount}
							</li>
						{/each}
					</ul>
				</strong>
			</li>
		{/if}
	</ul>
</div>

<style lang="scss">
	.root {
		margin-left: 1.4rem;
		gap: 0.5rem;
		grid-auto-rows: min-content;
	}

	.list {
		margin-left: 1rem;
	}

	.block {
		display: block;
	}
	
	.transparent {
		display: contents;
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
	
	.count-category {
		display: block;
	}
</style>
