//添加 websocket
import SocketService from '@/api/socketService'

const state = {
	// 实时数据缓存
	vitalIotDataCache: {},
}

const mutations = {
	//设置实时数据缓存
	SET_VITAL_IOT_DATA(state, payload) {
		const { elderly_id } = payload

		if (!state.vitalIotDataCache?.[elderly_id]) {
			state.vitalIotDataCache[elderly_id] = []
		}

		let dataCache = state.vitalIotDataCache[elderly_id]
		dataCache.push(payload)
		state.vitalIotDataCache = Object.assign({}, state.vitalIotDataCache, {
			[elderly_id]: dataCache,
		})
	},
}

const actions = {
	//设置websocket 数据处理
	initSocketData({ state, commit, dispatch }, payload) {
		//触发对于服务器的socket连接
		SocketService.Instance.connect()
		const socket = SocketService.Instance
		socket.registerCallBack('init', (msg) => {
			console.log('msg', msg)
			let jsonData = ''
			try {
				jsonData = JSON.parse(msg?.data ?? null)
			} catch (err) {
				return
			}

			console.log('jsonData', jsonData)

			const { operation } = jsonData

			switch (operation) {
				case 'bed_vital_iot':
					dispatch('handleVitalIotData', jsonData)
					break
				case 'bed_alarm_iot':
					dispatch('handleBedAlarmIot', jsonData)
					break
			}
		})
	},

	//处理床位实时数据
	handleVitalIotData({ state, commit, dispatch }, payload) {
		const { date, data } = payload
		const { elderly_id, elderly_name, breathing, heart } = data
		commit('SET_VITAL_IOT_DATA', { elderly_id, elderly_name, breathing, heart, date })
	},

	//处理床位告警事件
	handleBedAlarmIot({ state, commit, dispatch }, payload) {
		const { date, data } = payload
		dispatch('setBedAlarmData', { data }, { root: true })
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
