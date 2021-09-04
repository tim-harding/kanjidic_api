<script lang="ts">
  import type { Character } from "../lib";

  import Kanji from "./Kanji.svelte";
  import RadicalsSelector from "./RadicalsSelector.svelte";

  // Todo: pick something that tests all possible paths
  const testKanji: Character = {
    literal: "亜",
    codepoints: [
      {
        tag: "Unicode",
        content: 20124,
      },
      {
        tag: "Jis208",
        content: {
          plane: 1,
          ku: 16,
          ten: 1,
        },
      },
    ],
    radicals: [
      {
        kind: "Classical",
        radical: 7,
      },
      {
        kind: "Nelson",
        radical: 1,
      },
    ],
    grade: {
      tag: "Jouyou",
    },
    strokeCounts: {
      accepted: 7,
      miscounts: [9, 11],
    },
    variants: [
      {
        tag: "Jis208",
        content: {
          plane: 1,
          ku: 48,
          ten: 19,
        },
      },
      {
        tag: "Halpern",
        content: 1960,
      },
      {
        tag: "DeRoo",
        content: {
          top: 37,
          bottom: 44,
        },
      },
      {
        tag: "SpahnHadamitzky",
        content: {
          radicalStrokes: 3,
          radical: "d",
          otherStrokes: 8,
          sequence: 15,
        },
      },
      {
        tag: "ONeill",
        content: {
          number: 2078,
          suffix: "A",
        },
      },
      {
        tag: "Unicode",
        content: 21531,
      },
    ],
    frequency: 1509,
    jlpt: 1,
    references: [
      {
        tag: "NelsonClassic",
        content: 43,
      },
      {
        tag: "NelsonNew",
        content: 81,
      },
      {
        tag: "Njecd",
        content: 3540,
      },
      {
        tag: "Kkd",
        content: 4354,
      },
      {
        tag: "Kkld",
        content: 2204,
      },
      {
        tag: "Kkld2ed",
        content: 2966,
      },
      {
        tag: "Heisig",
        content: 1809,
      },
      {
        tag: "Heisig6",
        content: 1950,
      },
      {
        tag: "Gakken",
        content: 1331,
      },
      {
        tag: "OneillNames",
        content: {
          number: 525,
        },
      },
      {
        tag: "OneillKk",
        content: 1788,
      },
      {
        tag: "Moro",
        content: {
          volume: 1,
          page: 525,
          index: 272,
        },
      },
      {
        tag: "Henshall",
        content: 997,
      },
      {
        tag: "ShKk",
        content: 1616,
      },
      {
        tag: "ShKk2",
        content: 1724,
      },
      {
        tag: "Jfcards",
        content: 1032,
      },
      {
        tag: "TuttleCards",
        content: 1092,
      },
      {
        tag: "KanjiInContext",
        content: 1818,
      },
      {
        tag: "KodanshaCompact",
        content: 35,
      },
      {
        tag: "Maniette",
        content: 1827,
      },
    ],
    queryCodes: [
      {
        tag: "Skip",
        content: {
          tag: "Solid",
          content: {
            totalStrokeCount: 7,
            solidSubpattern: 1,
          },
        },
      },
      {
        tag: "SpahnHadamitzky",
        content: {
          radicalStrokes: 0,
          radical: "a",
          otherStrokes: 7,
          sequence: 14,
        },
      },
      {
        tag: "FourCorner",
        content: {
          topLeft: 1,
          topRight: 0,
          bottomLeft: 1,
          bottomRight: 0,
          fifthCorner: 6,
        },
      },
      {
        tag: "DeRoo",
        content: {
          top: 32,
          bottom: 73,
        },
      },
    ],
    readings: [
      {
        tag: "PinYin",
        content: {
          romanization: "ya",
          tone: 4,
        },
      },
      {
        tag: "KoreanRomanized",
        content: "a",
      },
      {
        tag: "KoreanHangul",
        content: "아",
      },
      {
        tag: "Vietnam",
        content: "A",
      },
      {
        tag: "Vietnam",
        content: "Á",
      },
      {
        tag: "Onyomi",
        content: "ア",
      },
      {
        tag: "Kunyomi",
        content: {
          reading: "つ",
          okurigana: "ぐ",
          kind: "Normal",
        },
      },
    ],
    translations: {
      fr: ["Asie", "suivant", "sub-", "sous-"],
      es: ["pref. para indicar", "venir después de", "Asia"],
      pt: ["Ásia", "próxima", "o que vem depois", "-ous"],
      en: ["Asia", "rank next", "come after", "-ous"],
    },
    nanori: ["や", "つぎ", "つぐ"],
    decomposition: ["｜", "一", "口"],
  };
</script>

<main class="root">
  <div class="selector">
    <RadicalsSelector />
  </div>
  <div class="kanji">
    <Kanji character={testKanji} />
  </div>
</main>

<style lang="scss">
  .root {
    justify-self: center;
    grid-template-rows: 1fr min-content;
    margin: 2rem;
    gap: 2rem;
  }

  .selector,
  .kanji {
    background-color: var(--snow-storm-1);
    border-radius: 0.25rem;
    border-color: var(--snow-storm-2);
    border-style: solid;
    border-width: 2px;
  }

  .kanji {
    max-width: 40rem;
  }
</style>
