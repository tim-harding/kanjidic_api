<script lang="ts">
	import { serializeQueryCode } from "../lib/types/query_code";
	import type {
		QueryCode as QueryCodeType,
		QueryCodeTag,
	} from "../lib/types/query_code";
	import type {
		Misclassification,
		MisclassificationKind,
	} from "../lib/types/misclassification";
	import Popover from "./Popover.svelte";
	import DeRooPopoverContent from "./DeRooPopoverContent.svelte";
	import SpahnHadamitzkyPopoverContent from "./SpahnHadamitzkyPopoverContent.svelte";
	import SkipPopoverContent from "./SkipPopoverContent.svelte";
	import FourCornerPopoverContent from "./FourCornerPopoverContent.svelte";

	export let code: QueryCodeType;

	const MISCLASSIFICATION_NAMES: Record<MisclassificationKind, string> = {
		Ambiguous: "ambiguous",
		Position: "position",
		StrokeAndPosition: "stroke and position",
		StrokeCount: "stroke count",
	};

	const KEY_MAKERS: Record<QueryCodeTag, { (code: QueryCodeType): string }> = {
		DeRoo: (_) => "De Roo",
		FourCorner: (_) => "Four Corner",
		Skip: (_) => "Skip",
		SpahnHadamitzky: (_) => "Spahn Hadamitzky",
		Misclassification: (code) => {
			const misclassification = code.content as Misclassification;
			return `Misclassification of ${
				MISCLASSIFICATION_NAMES[misclassification.kind]
			}`;
		},
	};

	const key = KEY_MAKERS[code.tag](code);
</script>

<div class="text-line">
	<dt>
		{key}
	</dt>
	:&nbsp;
	<dd>
		{serializeQueryCode(code)}
	</dd>
	&nbsp;
	<Popover>
		{#if code.tag === "DeRoo"}
			<DeRooPopoverContent deRoo={code.content} />
		{:else if code.tag === "FourCorner"}
			<FourCornerPopoverContent fourCorner={code.content} />
		{:else if code.tag === "Misclassification"}
			<SkipPopoverContent skip={code.content.skip} />
		{:else if code.tag === "Skip"}
			<SkipPopoverContent skip={code.content} />
		{:else if code.tag === "SpahnHadamitzky"}
			<SpahnHadamitzkyPopoverContent shDesc={code.content} />
		{/if}
	</Popover>
</div>
