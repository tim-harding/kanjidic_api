import type { Component } from "solid-js";
import RadicalSelector from "./RadicalSelector";

import styles from "./App.module.scss";

const App: Component = (_props) => {
  return (
    <div class={styles["RadicalSelector"]}>
      <RadicalSelector></RadicalSelector>
    </div>
  );
};

export default App;
