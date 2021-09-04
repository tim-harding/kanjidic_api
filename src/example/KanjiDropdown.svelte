<details open={true} class="details">
	<summary class="summary">
		<div class="disclosure-triangle">
			<span class="material-icons-outlined open-disclosure"
				>arrow_right</span
			>
			<span class="material-icons-outlined close-disclosure"
				>arrow_drop_down</span
			>
		</div>
		<span>
			<slot name="summary">
				Summary
			</slot>
		</span>
	</summary>
	<slot name="content">
		Content
	</slot>
</details>

<style>
	.summary {
		grid-template-columns: 1.4rem 1fr;
		cursor: pointer;
		margin-bottom: 0.25rem;
	}

	.disclosure-triangle {
		grid-template-areas: "center";
	}

	.open-disclosure,
	.close-disclosure {
		grid-area: center;
	}

	.close-disclosure {
		visibility: hidden;
	}

	.details[open] .close-disclosure {
		visibility: initial;
	}

	.details[open] .open-disclosure {
		visibility: hidden;
	}
	
	.summary {
		align-items: center;
	}
</style>