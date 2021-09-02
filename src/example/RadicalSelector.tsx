import { Component, createResource, Show, For } from "solid-js";
import { queryAllRadicals, RadicalAll } from "../lib/radical_all_access";
import { RadicalGroup } from "./RadicalGroup";
import { ENDPOINT_BASE } from "./shared";

import styles from "./RadicalSelector.module.scss"

export interface RadicalInfo {
  literal: string
  id: string
  checked: boolean
}

export interface RadicalsInfo {
  strokes: number
  radicals: RadicalInfo[]
}

function radicalInfoFromRadicalAll(radicalAll: RadicalAll): RadicalsInfo {
  return {
    strokes: radicalAll.strokes,
    radicals: radicalAll.literals.map(literal => {
      return {
        literal,
        id: `radical-${literal}`,
        checked: false,
      }
    })
  }
}

export const RadicalSelector: Component = (_props) => {
  const [radicalsAll] = createResource(async () => {
    const response = await queryAllRadicals(ENDPOINT_BASE)
    if (response instanceof Error) {
      throw response
    }
    const radicals = response.map(radicalInfoFromRadicalAll)
    return radicals
  })
  
  // Todo
  const search = (_form: any) => {}

  return (
    <Show when={!radicalsAll.loading} fallback="Loading...">
      <Show when={!radicalsAll.error} fallback={`Error: ${radicalsAll.error}`}>
        <form onSubmit={search}>
          <fieldset>
            <legend class="hidden">Select radicals search for a matching kanji</legend>
            <ol class={styles["list"]}>
              <For each={radicalsAll()}>{(radical, _i) => (
                <li class={styles["item"]}>
                  <RadicalGroup radical={radical}></RadicalGroup>
                </li>
              )}</For>
            </ol>
          </fieldset>
        </form>
      </Show>
    </Show>
  );
};

export default RadicalSelector;
