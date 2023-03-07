<template>
	<h1>PROJECT 2</h1>
	<button @click="toDashboard">Dashbord</button>
	<button @click="toAbout">About</button>
	<button @click="toPrivateModule1">Private Module1</button>
	<button @click="toPrivateModule2">Private Module2</button>
	<router-view></router-view>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
	setup() {
		const router = useRouter()

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
    const toPrivateModule1 = () => {
      router.push({
        path: '/private-module1'
      });
    }
    const toPrivateModule2 = () => {
      router.push({
        path: '/private-module2'
      });
    }
		return {
			toDashboard,
			toAbout,
			toPrivateModule1,
			toPrivateModule2
		}
	}
}
</script>
