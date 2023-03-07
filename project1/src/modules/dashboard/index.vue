<template>
	Hello, Dashboard
	<button @click="inc">{{count}}</button>
</template>

<script>
import { ref } from 'vue'

export default {
	setup() {
		let count = ref(0)
		const inc = () => {
			count.value++
		}
		return {
			inc,
			count
		}
	}
}
</script>