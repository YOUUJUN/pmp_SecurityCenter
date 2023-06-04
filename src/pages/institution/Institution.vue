<template>
	<div id="app">
		<layout-vue>
			<template v-slot:header>
				<nav-bar>
					<template v-slot:breadCtrl>
						<category-ctrl></category-ctrl>
					</template>

					<template v-slot:navCtrl>
						<!-- <display-ctrl></display-ctrl> -->
					</template>
				</nav-bar>
			</template>

			<template v-slot:aside>
				<side-bar>
					<tree-menu></tree-menu>
				</side-bar>
			</template>

			<index></index>
		</layout-vue>
	</div>
</template>
<script>
import LayoutVue from '@/components/Layout/Layout.vue'
import NavBar from '@/components/Layout/Parts/NavBar.vue'
import SideBar from '@/components/Layout/Parts/SideBar.vue'

import Index from './modules/Index.vue'
import CategoryCtrl from './modules/Ctrl/CategoryCtrl.vue'
import TreeMenu from './modules/TreeMenu.vue'
export default {
	components: {
		LayoutVue,
		NavBar,
		SideBar,

		Index,
		CategoryCtrl,
		TreeMenu,
	},
	data() {
		return {}
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
