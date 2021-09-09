<script lang="ts">
  import type { SpahnHadamitzky } from "../lib/types/sh_desc";
  import Url from "./Url.svelte";

  export let shDesc: SpahnHadamitzky.Descriptor;
</script>

<p>
  Descriptor code for
  <em>The Kanji Dictionary</em>. See <Url
    href="http://www.edrdg.org/wiki/index.php/KANJIDIC_Project">here</Url
  >
  for more information.
</p>
<dl class="passthrough">
  <div>
    <dt>Number of strokes in the identifying radical</dt>
    <!-- :&nbsp; -->
    <dd>
      {shDesc.radicalStrokes}
    </dd>
  </div>

  <div>
    <dt>Letter for the radical</dt>
    <!-- :&nbsp; -->
    <dd>
      {shDesc.radical}
    </dd>
  </div>

  <div>
    <dt>Number of strokes not in the radical</dt>
    <!-- :&nbsp; -->
    <dd>
      {shDesc.otherStrokes}
    </dd>
  </div>

  <div>
    <dt>Position of the kanji in this sequence</dt>
    <!-- :&nbsp; -->
    <dd>
      {shDesc.sequence}
    </dd>
  </div>
</dl>

<style lang="scss">
  dl > div {
    display: block;

    & > dt::after {
      content: ":";
    }

    & > * {
      display: inline;
    }
  }
</style>
