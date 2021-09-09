<script lang="ts">
	import { nameForLanguage } from "./lib/types/language";
	import type { Language } from "./lib/types/language";
	import type {
		Translation,
		Translations as TranslationsType,
	} from "./lib/types/translations";
	import KanjiDropdown from "./KanjiDropdown.svelte";
	import Popover from "./Popover.svelte";

	export let translations: TranslationsType;

	function translationsKeyValues(): [Language, Translation][] {
		return Object.entries(translations) as [Language, Translation][];
	}
</script>

<KanjiDropdown>
	<span slot="summary" class="text-line">
		Translations&nbsp;
		<Popover>Translations of the kanji into different languages.</Popover>
	</span>
	<dl slot="content" class="languages">
		{#each translationsKeyValues() as [language, meanings]}
			<div class="language">
				<div class="text-line">
					<dt>
						{nameForLanguage(language)}
					</dt>
					:&nbsp
				</div>
				<dd>
					<ul class="translations">
						{#each meanings as meaning}
							<li class="translation">
								{meaning}
							</li>
						{/each}
					</ul>
				</dd>
			</div>
		{/each}
	</dl>
</KanjiDropdown>

<style lang="scss">
	.languages {
		grid-auto-rows: max-content;
	}
	
	.language {
		grid-auto-rows: max-content;
		margin-bottom: 0.5rem;
		gap: 0.25rem;
	}
	
	.translations {
		margin-left: 1.5rem;
		gap: 0.25rem;
	}
	
	.translation {
		font-weight: 400;
		grid-template-columns: max-content max-content;
		gap: 0.5rem;
		
		&::before {
			// This is an en dash, not a hyphen
			content: "–";
			font-weight: 700;
		}
	}
</style>
