import Vue from 'vue'
import VueRouter from 'vue-router'

import BlankLayout from '@/components/Layout/BlankLayout.vue'

Vue.use(VueRouter)

//不变的路由配置，不参与菜单项构建
export const constantRoutes = [
	{
		path: '/',
		component: BlankLayout,
		children: [
			{
				path: '',
				name: 'ControlPanel', 
				component: () => import('../views/ControlPanel.vue'),
			},

			{
				path: 'screen',
				name: 'screen',
				component: () => import('../views/Screen.vue'),
			},
		],
	},
]

/**
 * 清除路由配置
 * @param {*} router // 传入当前router
 */
export function resetRouter(router) {
	// 用初始化的matcher替换当前router的matcher
	router.matcher = new VueRouter({
		mode: 'hash',
		base: '/',
		routes: constantRoutes,
	}).matcher
}

const router = new VueRouter({
	mode: 'hash',
	base: '/',
	routes: constantRoutes,
})

export default router
