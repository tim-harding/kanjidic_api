<script>
	import { uniqueId } from "./shared";

	const id = uniqueId();
	let checked = false;
</script>

<span class="root">
	<label class="summary" for={id}>
		<span class="material-icons-outlined md-18 icon">
			info
		</span>
		{#if checked}
			<div class="popover">
				<div class="left-triangle-base" />
				<div class="content">
					<slot />
				</div>
				<div class="left-triangle-top" />
			</div>
		{/if}
	</label>
	<input type="checkbox" {id} class="hidden input" bind:checked />
</span>

<style lang="scss">
	.root {
		grid-template-columns: max-content 1fr;
		display: inline-grid;
	}

	.icon {
		transform: translateY(0.175rem);
	}
	
	.serialized {
		font-weight: 700;
	}

	.summary {
		cursor: pointer;
		user-select: none;
	}

	.popover {
		position: absolute;
		left: 1.65rem;
		grid-template-columns: 1fr max-content;
		grid-template-areas: "arrow content";
		z-index: 1;
	}

	.root {
		position: relative;
		align-items: center;
	}

	.left-triangle-base,
	.left-triangle-top {
		align-self: center;
		transform: rotate(45deg);
		grid-area: arrow;
	}

	.left-triangle-base {
		background-color: var(--snow-storm-2);
		width: 1.25rem;
		height: 1.25rem;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
	}

	.left-triangle-top {
		background-color: var(--snow-storm-0);
		width: calc(1.25rem - 2px);
		height: calc(1.25rem - 2px);
	}

	.content {
		grid-area: content;
		transform: translateX(-1.25rem * (1/1.414));
		background-color: var(--snow-storm-0);
		padding: 1rem;
		border-radius: 0.5rem;
		border-color: var(--snow-storm-2);
		border-width: 1px;
		border-style: solid;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
	}
</style>
