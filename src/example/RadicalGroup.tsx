import { Component, For } from "solid-js"

import styles from "./RadicalGroup.module.scss"
import { RadicalsInfo } from "./RadicalSelector"

interface Props {
	radical: RadicalsInfo
}

export const RadicalGroup: Component<Props> = (props) => {
	return (
		<>
			<div class={styles["strokes"]}>
				{props.radical.strokes}
			</div>
			<ul class={styles["list"]}>
				<For each={props.radical.radicals}>{(radical, _i) => (
					<li>
						<input type="text" 
							name="radical-selector" 
							value={radical.literal} 
							id={radical.id} 
							class="hidden" 
							checked={radical.checked} />
						<label htmlFor={radical.id} class={styles["checkbox"]}>
							{radical.literal}
						</label>
					</li>
				)}</For>
			</ul>
		</>
	)
}