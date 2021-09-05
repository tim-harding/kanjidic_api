<script>
	import { currentPopoverIndex } from "./popover_store";
	import { uniqueIndex } from "./shared";
	
	const index = uniqueIndex();

	let open = false

	function handleClick() {
		const dst = index === $currentPopoverIndex ? -1 : index;
		$currentPopoverIndex = dst
	}
	
	$: {
		// Details element doesn't respond properly to the binding
		// unless we wait a frame. Might be a bug worth reporting.
		requestAnimationFrame(() => {
			open = $currentPopoverIndex === index
		})
	}
</script>

<details class="root" on:click={handleClick} open={open}>
	<summary class="summary">
		<span class="material-icons-outlined md-18 icon"> info </span>
	</summary>
		<div class="popover">
			<div class="left-triangle-base" />
			<div class="content">
				<slot />
			</div>
			<div class="left-triangle-top" />
		</div>
</details>

<style lang="scss">
	.root {
		grid-template-columns: max-content 1fr;
		display: inline-grid;
		position: relative;
		align-items: center;
	}

	.icon {
		transform: translateY(-1px);
	}

	.summary {
		cursor: pointer;
		user-select: none;
	}

	.popover {
		position: absolute;
		left: 2.25rem;
		transform: translateY(calc(-50% - 0.5rem - 2px));
		grid-template-columns: max-content;
		grid-template-areas: "content";
		z-index: 1;
	}

	.left-triangle-base,
	.left-triangle-top {
		align-self: center;
		transform: translateX(calc(-1.25rem * 1/2 + 1px)) rotate(45deg) ;
		grid-area: content;
		width: 1.25rem;
		height: 1.25rem;
	}

	.left-triangle-base {
		background-color: var(--snow-storm-2);
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	.left-triangle-top {
		background-color: var(--snow-storm-0);
		left: 1.414px;
		position: relative;
		z-index: 4;
	}

	.content {
		grid-area: content;
		background-color: var(--snow-storm-0);
		padding: 1rem;
		border-radius: 0.5rem;
		border-color: var(--snow-storm-2);
		border-width: 1px;
		border-style: solid;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
		grid-auto-rows: max-content;
		gap: 0.25rem;
		max-width: 25vw;
		z-index: 3;
	}
</style>
