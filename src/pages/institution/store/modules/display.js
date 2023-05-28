const state = {
	displayRow: 'X6',
	/**
	 * 全部 1
	 * 在床 2
	 * 离床 3
	 * 告警 4
	 * 设备离线 5
	 * 房间告警 6
	 * displayCategory
	 */
	displayCategory: '1',
	displayCategoryMap: new Map([
		['1', '全部'],
		['2', '在床'],
		['3', '离床'],
		['4', '告警'],
		['5', '设备离线'],
		['6', '房间告警'],
	]),

	//是否显示空床位
	ifDisplayEmptyBeds: false,
}

const mutations = {
	CHANGE_DISPLAY_ROW(state, payload) {
		state.displayRow = payload
	},

	CHANGE_DISPLAY_CATEGORY(state, payload) {
		state.displayCategory = payload
	},

	CHANGE_EMPTY_BEDS_DISPLAY(state, payload) {
		state.ifDisplayEmptyBeds = payload
	},
}

const actions = {
	changeDisplayRow({ commit }, payload) {
		commit('CHANGE_DISPLAY_ROW', payload)
	},

	changeDisplayCategory({ commit }, payload) {
		commit('CHANGE_DISPLAY_CATEGORY', payload)
	},

	//控制是否显示空床位
	changeEmptyBedsDisplay({ commit }, payload) {
		commit('CHANGE_EMPTY_BEDS_DISPLAY', payload)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
