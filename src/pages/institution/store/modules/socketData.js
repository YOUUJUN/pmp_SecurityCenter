//添加 websocket
import SocketService from '@/api/socketService'

const state = {
	// 实时数据缓存
	vitalIotDataCache: {},

	//区域告警缓存
	roomAlertCache: [],

	//心电图数据
	heatRate: {
		value: 75,
		count: 1,
	},

	//呼吸数据
	breathRate: {
		value: 75,
		count: 1,
	},
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

	SET_HEAT_DATA(state, payload) {
		const { heart } = payload
		state.heatRate.value = heart
		state.heatRate.count += 1
	},

	SET_BREATH_DATA(state, payload) {
		const { breathing } = payload
		state.breathRate.value = breathing
		state.breathRate.count += 1
	},

	//添加区域告警缓存
	SET_ROOM_ALERT_DATA(state, payload) {
		state.roomAlertCache.push(payload)
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
				case 'room_alarm_iot':
					dispatch('handleRoomAlarmIot', jsonData)
					break
			}
		})
	},

	//处理床位实时数据
	handleVitalIotData({ state, commit, dispatch }, payload) {
		const { date, data } = payload
		const { elderly_id, elderly_name, breathing, heart } = data
		commit('SET_VITAL_IOT_DATA', { elderly_id, elderly_name, breathing, heart, date })
		commit('SET_HEAT_DATA', { heart })
		commit('SET_BREATH_DATA', { breathing })
	},

	//处理床位告警事件
	handleBedAlarmIot({ state, commit, dispatch }, payload) {
		const { date, data } = payload
		dispatch('setBedAlarmData', { data }, { root: true })
	},

	//处理区域告警事件
	handleRoomAlarmIot({ state, commit, dispatch }, payload) {
		console.log('payload', payload)
		const { date, data } = payload
		dispatch('setToiletAlarmData', { data }, { root: true })
	},

	//重置心跳数据
	resetHeartRate({ state, commit, dispatch }, payload) {
		commit('SET_HEAT_DATA', { heart: 75 })
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
