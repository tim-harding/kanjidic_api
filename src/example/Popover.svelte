<span class="root">
	<span class="material-icons-outlined md-18 summary"> info </span>
	<div class="popover">
		<div class="left-triangle-base" />
		<div class="left-triangle-top" />
		<div class="content">
			<slot />
		</div>
	</div>
</span>

<style lang="scss">
	.root {
		grid-template-columns: max-content 1fr;
	}

	.serialized {
		font-weight: 700;
	}

	.summary {
		cursor: pointer;
		user-select: none;
		z-index: 1;
	}

	.summary:not(:hover) + .popover {
		opacity: 0;
		position: absolute;
		left: -100vw;
	}

	.popover {
		position: absolute;
		left: 1.65rem;
		grid-template-columns: min-content 1fr;
		grid-template-areas: "arrow content";
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
		z-index: 2;
	}

	.left-triangle-top {
		background-color: var(--snow-storm-0);
		width: calc(1.25rem - 2px);
		height: calc(1.25rem - 2px);
		z-index: 4;
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
		z-index: 3;
	}
</style>
