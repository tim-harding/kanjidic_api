<script lang="ts">
  import { Stroke } from "../lib/types/stroke";
  import type { FourCorner } from "../lib/types/four_corner";
  import Url from "./Url.svelte";

  export let fourCorner: FourCorner.FourCorner;
</script>

<p>
  <Url href="http://nihongo.monash.edu/FOURCORNER.html">
    Four corner codes information
  </Url>
</p>
<dl class="passthrough">
  <div class="text-line">
    <dt>Top left</dt>
    :&nbsp;
    <dd>
      {Stroke.serialize(fourCorner.topLeft)}
    </dd>
  </div>
  <div class="text-line">
    <dt>Top right</dt>
    :&nbsp;
    <dd>
      {Stroke.serialize(fourCorner.topRight)}
    </dd>
  </div>
  <div class="text-line">
    <dt>Bottom left</dt>
    :&nbsp;
    <dd>
      {Stroke.serialize(fourCorner.bottomLeft)}
    </dd>
  </div>
  <div class="text-line">
    <dt>Bottom right</dt>
    :&nbsp;
    <dd>
      {Stroke.serialize(fourCorner.bottomRight)}
    </dd>
  </div>
  {#if fourCorner.fifthCorner !== undefined}
    <div class="text-line">
      <dt>Fifth corner</dt>
      :&nbsp;
      <dd>
        {Stroke.serialize(fourCorner.fifthCorner)}
      </dd>
    </div>
  {/if}
</dl>
