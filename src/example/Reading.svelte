<script lang="ts">
	import { serializeTone } from "../lib/types/tone";

	import type { Reading as ReadingType, ReadingTag } from "../lib/types/reading";
	import { isReadingStringFromTag } from "../lib/types/reading";
	import Popover from "./Popover.svelte";

	export let reading: ReadingType;

	const KEYS: Record<ReadingTag, string> = {
		KoreanHangul: "Korean Hangul",
		KoreanRomanized: "Korean Romanized",
		Onyomi: "Onyomi",
		Vietnam: "Vietnamese",
		Kunyomi: "Kunyomi",
		PinYin: "Pin Yin",
	};

	const key = KEYS[reading.tag];
</script>

<div class="text-line">
	<dt>
		{key}
	</dt>
	:&nbsp;
	{#if isReadingStringFromTag(reading)}
		<dd>
			{reading.content}
		</dd>
		&nbsp;
	{:else if reading.tag === "Kunyomi"}
		<dd>
			{reading.content.reading}
		</dd>
		&nbsp;
		{#if reading.content.kind !== "Normal" || reading.content.okurigana !== undefined}
			<Popover>
				{#if reading.content.kind !== "Normal"}
					<p>
						This reading is used as a {reading.content.kind.toLowerCase()}.
					</p>
				{/if}

				{#if reading.content.okurigana !== undefined}
					<dl class="text-line">
						<dt>Okurigana</dt>
						:&nbsp;
						<dd>
							{reading.content.okurigana}
						</dd>
					</dl>
				{/if}
			</Popover>
		{/if}
	{:else}
		<dd>
			{reading.content.romanization}
		</dd>
		&nbsp;
		<Popover>
			<dl class="text-line">
				<dt>Tone</dt>
				:&nbsp;
				<dd>
					{serializeTone(reading.content.tone)}
				</dd>
			</dl>
		</Popover>
	{/if}
</div>
