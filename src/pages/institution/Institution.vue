<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},

	created() {
		console.log('router', this.$router)
		console.log('route', this.$route)
	},
}
</script>
<style>
/* @import url('~@/styles/global_ele.css'); */

* {
	box-sizing: border-box;
}

html,
body {
	height: 100%;
	margin: 0;
	padding: 0;
	font-size: 62.5%;
	font-family: Poppins, sans-serif;
	box-sizing: border-box;
	-webkit-text-size-adjust: none;
}

ul {
	margin: 0;
	padding: 0;
}

#app {
	height: 100%;
}
</style>
