<script lang="ts">
	import { serializeSolidSubpattern } from "./lib/types/solid_subpattern";
	import type { Skip } from "./lib/types/skip";
	import Url from "./Url.svelte";

	export let skip: Skip;
</script>

<p>
	<Url href="http://www.edrdg.org/wwwjdic/SKIP.html">
		Skip codes identification
	</Url>
</p>
<dl class="passthrough">
	<div class="text-line">
		<dt>Kind</dt>
		:&nbsp;
		<dd>
			{skip.tag}
		</dd>
	</div>

	{#if skip.tag === "Horizontal"}
		<div class="text-line">
			<dt>Strokes in left part</dt>
			:&nbsp;
			<dd>
				{skip.content.left}
			</dd>
		</div>

		<div class="text-line">
			<dt>Strokes in right part</dt>
			:&nbsp;
			<dd>
				{skip.content.right}
			</dd>
		</div>
	{:else if skip.tag === "Vertical"}
		<div class="text-line">
			<dt>Strokes in top part</dt>
			:&nbsp;
			<dd>
				{skip.content.top}
			</dd>
		</div>

		<div class="text-line">
			<dt>Strokes in bottom part</dt>
			:&nbsp;
			<dd>
				{skip.content.bottom}
			</dd>
		</div>
	{:else if skip.tag === "Enclosure"}
		<div class="text-line">
			<dt>Strokes in enclosed part</dt>
			:&nbsp;
			<dd>
				{skip.content.interior}
			</dd>
		</div>

		<div class="text-line">
			<dt>Strokes in exterior part</dt>
			:&nbsp;
			<dd>
				{skip.content.exterior}
			</dd>
		</div>
	{:else}
		<div class="text-line">
			<dt>Total strokes in kanji</dt>
			:&nbsp;
			<dd>
				{skip.content.totalStrokeCount}
			</dd>
		</div>

		<div class="text-line">
			<dt>Solid subpattern</dt>
			:&nbsp;
			<dd>
				{serializeSolidSubpattern(skip.content.solidSubpattern)}
			</dd>
		</div>
	{/if}
</dl>
