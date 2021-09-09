<script lang="ts">
	import {
		getReferenceInformation,
		isReferenceBusyPeopleByTag,
		isReferenceMoroByTag,
		isReferenceUintByTag,
	} from "../lib/types/reference";
	import type { Reference as ReferenceType } from "../lib/types/reference";
	import Url from "./Url.svelte";
	import { serializeOneill } from "../lib/types/oneill";

	export let reference: ReferenceType;

	const info = getReferenceInformation(reference);
</script>

<div class="text">
	{#if isReferenceUintByTag(reference)}
		Index
		<strong>
			{reference.content}
		</strong>
	{:else if isReferenceMoroByTag(reference)}
		Index
		<strong>
			{reference.content.index}
		</strong>
		{#if reference.content.page !== undefined || reference.content.volume !== undefined}
			from
		{/if}
		{#if reference.content.volume}
			volume
			<strong>
				{reference.content.volume}
			</strong>
		{/if}
		{#if reference.content.page !== undefined}
			page
			<strong>
				{reference.content.page}
			</strong>
		{/if}
	{:else if isReferenceBusyPeopleByTag(reference)}
		Volume
		<strong>
			{reference.content.volume}
		</strong>
		{#if reference.content.chapter !== undefined}
			chapter
			<strong>
				{reference.content.chapter}
			</strong>
		{/if}
	{:else}
		Index
		<strong>
			{serializeOneill(reference.content)}
		</strong>
	{/if}
	in
	<em>
		<Url href={`https://amzn.com/${info.amazon}`}>
			{info.title}
		</Url>
	</em>
	{#if info.authors.length > 0}
		by
	{/if}
	<ul class="passthrough">
		{#each info.authors as author}
			<li class="author">
				{author}
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.author {
		display: inline;

		&::after {
			content: "and ";
			white-space: pre;
		}

		&:last-of-type::after {
			content: none;
		}
	}
</style>
