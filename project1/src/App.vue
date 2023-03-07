<template>
	<h1>PROJECT 1</h1>
	<button class="btn" @click="toDashboard">Dashbord</button>
	<button class="btn" @click="toAbout">About</button>
	<router-view></router-view>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
	setup() {
		const router = useRouter()

		console.log("Hello from project1...")

		const toDashboard = () => {
      router.push({
        path: '/dashboard'
      });
    }
    const toAbout = () => {
      router.push({
        path: '/about'
      });
    }
		return {
			toDashboard,
			toAbout
		}
	}
}
</script>

<style>

</style>