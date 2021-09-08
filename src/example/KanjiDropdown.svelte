<details open={false} class="details">
	<summary class="summary text-line">
		<span class="material-icons-outlined open-disclosure"
			>arrow_right</span
		>
		<span class="material-icons-outlined close-disclosure"
			>arrow_drop_down</span
		>
		<slot name="summary">
			Summary
		</slot>
	</summary>
	<div class="content-container">
		<slot name="content">
			Content
		</slot>
	</div>
</details>

<style>
	.summary {
		cursor: pointer;
		margin-bottom: 0.25rem;
	}
	
	.close-disclosure, .open-disclosure {
		transform: translateY(0.125rem);
	}

	.close-disclosure {
		display: none;
	}

	.details[open] .close-disclosure {
		display: initial;
	}

	.details[open] .open-disclosure {
		display: none;
	}

	.content-container {
		margin-left: 2.5rem;
	}
</style>