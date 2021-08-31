import { Component, createResource, Show, For } from "solid-js";
import { queryAllRadicals } from "../lib/radical_all_access";
import { RadicalGroup } from "./RadicalGroup";
import { ENDPOINT_BASE } from "./shared";

import styles from "./RadicalSelector.module.scss"

export const RadicalSelector: Component = (_props) => {
  const [radicalsAll] = createResource(async () => {
    const response = await queryAllRadicals(ENDPOINT_BASE)
    if (response instanceof Error) {
      throw response
    }
    return response
  })

  return (
    <Show when={!radicalsAll.loading} fallback="Loading...">
      <Show when={!radicalsAll.error} fallback={`Error: ${radicalsAll.error}`}>
        <ol class={styles["list"]}>
          <For each={radicalsAll()}>{(radical, _i) => (
            <li class={styles["item"]}>
              <RadicalGroup radical={radical}></RadicalGroup>
            </li>
          )}</For>
        </ol>
      </Show>
    </Show>
  );
};

export default RadicalSelector;
