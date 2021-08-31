<template>
<div v-if="store.recentErrorMessage">
	{{ store.recentErrorMessage }}
</div>
<Suspense v-else>
	<template #default>
		<ul>
			<li v-for="group in store.all" :key="group.stroke">
				<RadicalGroup></RadicalGroup>
			</li>
		</ul>
	</template>
	<template #fallback>
		Loading
	</template>
</Suspense>
</template>

<script lang="ts" setup>
import RadicalGroup from "./RadicalGroup.vue"
import { useRadkAllStore } from '../store/radk_all'

const store = useRadkAllStore()
await store.fetchRadkAll()
</script>

<style lang="scss" module>

</style>