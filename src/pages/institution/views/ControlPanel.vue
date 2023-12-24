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

import Index from '../modules/Index.vue'
import CategoryCtrl from '../modules/Ctrl/CategoryCtrl.vue'
import TreeMenu from '../modules/TreeMenu.vue'

import { mapActions, mapGetters } from 'vuex'

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

	created() {
		this.fetchData()

		this.initSocketData()
	},

	methods: {
		...mapActions('data', ['fetchData']),
		...mapActions('socketData', ['initSocketData']),
	},
}
</script>
<style></style>
