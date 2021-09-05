<script lang="ts">
	import {
		serializeQueryCode,
	} from "../lib";
	import type {
		Misclassification,
		MisclassificationKind,
		QueryCode as QueryCodeType,
		QueryCodeTag,
	} from "../lib";

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

<dl class="text-line">
	<dt>
		{key}
	</dt>
	:&nbsp;
	<dd>
		{serializeQueryCode(code)}
	</dd>
</dl>
