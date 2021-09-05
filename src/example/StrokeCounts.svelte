<script lang="ts">
	import type { StrokeCount } from "../lib";

	export let strokeCounts: StrokeCount;
</script>

<div class="root">
	Stroke counts
	<dl class="list">
		<div class="text-line">
			<dt>Accepted</dt>
			:&nbsp;
			<dd>
				{strokeCounts.accepted}
			</dd>
		</div>

		{#if strokeCounts.miscounts !== undefined}
			<div class="text-line">
				<dt>Miscounts</dt>
				:
				<dd class="text">
					<ul class="transparent">
						{#each strokeCounts.miscounts as miscount}
							<li class="miscount">
								&nbsp;{miscount}
							</li>
						{/each}
					</ul>
				</dd>
			</div>
		{/if}
	</dl>
</div>

<style lang="scss">
	.root {
		margin-left: 1.4rem;
		gap: 0.25rem;
		grid-auto-rows: min-content;
	}

	.list {
		margin-left: 1rem;
		gap: 0.25rem;
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
</style>
