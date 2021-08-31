import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = (props) => {
  return (
    <div class={styles.App}>
      <Hello name="Tim"></Hello>
    </div>
  );
};

interface HelloProps {
  name: string
}

const Hello: Component<HelloProps> = (props) => {
  return (
    <span>Hello, {props.name}</span>
  )
}

export default App;
