<script lang="ts">
	import type { Grade as GradeType, GradeTag } from "../lib/grade";
	import Popover from "./Popover.svelte";

	export let grade: GradeType;

	const INFOS: Record<GradeTag, string> = {
		Kyouiku: "A Kyouiku kanji learned in grades 1-6.",
		Jinmeiyou:
			"A Jinmeiyou kanji for use in names that is approved for use in family name registers and other official documents.",
		Jouyou: "A remaining Jouyou kanji to be learned in junior high school.",
		JinmeiyouJouyouVariant:
			"A Jinmeiyou kanji that is a variant of a Jouyou kanji.",
	};

	const info = INFOS[grade.tag];
</script>

{#if grade}
	<p class="root">
		Grade:&nbsp;
		<strong>
			{grade.tag}&nbsp;
			{#if grade.tag === "Kyouiku"}
				grade&nbsp;{grade.content}&nbsp;
			{/if}
		</strong>
		<Popover>
			<p>
				{info}
			</p>
		</Popover>
	</p>
{/if}

<style>
	.root {
		display: block;
		grid-template-columns: max-content 1fr;
		align-items: flex-end;
		margin-left: 1.4rem;
		gap: 0.5rem;
	}
</style>
