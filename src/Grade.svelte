<script lang="ts">
	import type { Grade as GradeType, GradeTag } from "./lib/types/grade";
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
	<div class="text-line root">
		<dl class="passthrough">
			<dt>Grade</dt>
			:&nbsp;
			<dd>
				{grade.tag}
				{#if grade.tag === "Kyouiku"}
					grade&nbsp;{grade.content}
				{/if}
			</dd>
		</dl>
		&nbsp;
		<Popover>
			{info}
		</Popover>
	</div>
{/if}

<style>
	.root {
		margin-left: 1.4rem;
	}
</style>
