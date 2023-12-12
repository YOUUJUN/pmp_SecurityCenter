import { getPerceptionPlatformData } from '@/api/security'

const state = {
	uid: 1,

	menu: {
		data: [],
		filters: [], //菜单过滤项
	},

	//所有房间数据
	allRoomDic: [],
}

const mutations = {}

const actions = {
	//获取所有床铺数据
	fetchData({ state, commit }) {
		return new Promise((resolve, reject) => {
			getPerceptionPlatformData({
				uid: state.uid,
			})
				.then((res) => {
					console.log('res-->1', res)
					// const { code } = res
					// let navData = res.data.navs
					// let originData = res.data.data
					// commit('SET_MENU_DATA', navData)
					// commit('SET_ORIGIN_DATA', originData)
					// commit('SET_ALL_ROOM_DIC', navData)
					resolve()
				})
				.catch((err) => {
					console.log('err', err)
					reject()
				})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
