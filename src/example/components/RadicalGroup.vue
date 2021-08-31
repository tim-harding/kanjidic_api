<template lang="pug">
div {{ group.stroke }}
ul
	li(v-for="radical in group.radicals")
		span radical
</template>

<script lang="ts" setup>
import { RadicalAll } from "../../lib/radical_all_access";

const props = defineProps<{
	group: RadicalAll,
}>()
</script>

<style lang="scss" scoped>
</style>