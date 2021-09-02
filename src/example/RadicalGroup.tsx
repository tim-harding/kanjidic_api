import { Component, For } from "solid-js"
import { RadicalAll } from "../lib/radical_all_access"

import styles from "./RadicalGroup.module.scss"

interface Props {
	radical: RadicalAll
}

export const RadicalGroup: Component<Props> = (props) => {
	return (
		<div class={styles["root"]}>
			<div class={styles["strokes"]}>
				{props.radical.strokes}
			</div>
			<ul class={styles["list"]}>
				<For each={props.radical.literals}>{(literal, _i) => (
					<li class={styles["item"]}>
						<button class={styles["button"]}>
							{literal}
						</button>
					</li>
				)}</For>
			</ul>
		</div>
	)
}