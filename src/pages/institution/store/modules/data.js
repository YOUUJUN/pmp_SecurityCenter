import { getPerceptionPlatformData } from '@/api/security'

const state = {
	uid: 2,

	menu: {
		checkedKeys: [],
		expandedKeys: [],
		data: [], //全部菜单数据
		selectedKey: '', //选中菜单ID
		filters: [], //菜单过滤项
	},

	//初始数据源
	originData: [],

	//所有房间数据
	allRoomDic: [],

	//所有卫生间区域报警数据
	allToiletDic: [],
}

const mutations = {
	//设置初始数据源
	SET_ORIGIN_DATA(state, payload) {
		state.originData = payload
	},

	//设置菜单数据源
	SET_MENU_DATA(state, payload) {
		let dataSource = payload

		state.menu.data = dataSource
		console.log('dataSource', dataSource[0].only_id)
		state.menu.checkedKeys = [dataSource[0].only_id]
		state.menu.selectedKey = dataSource[0].only_id
		state.menu.filters = [
			{
				id: payload[0].only_id,
				level: 1,
			},
		]
	},

	// 设置所有房间数据
	SET_ALL_ROOM_DIC(state, payload) {
		state.allRoomDic = payload.map((item) => {
			let obj = {}

			//添加初始告警信息
			Object.assign(obj, item, {
				alarmList: [],
				alertFlag: false,
			})

			return obj
		})
	},

	// 设置所有卫生间区域报警数据
	SET_ALL_TOILET_DIC(state, payload) {
		state.allToiletDic = payload.map((item) => {
			let obj = {}

			//添加初始告警信息
			Object.assign(obj, item, {
				alertFlag: false,
			})

			return obj
		})
	},

	CHANGE_MENU_CHECKED(state, payload) {
		console.log('payload', payload)
		if (Array.isArray(payload)) {
			state.menu.checkedKeys = payload
			console.log(('state.menu.checkedKeys', state.menu.checkedKeys))
		}
	},

	//设置菜单过滤条件
	SET_MENU_FILTERS(state, payload) {
		state.menu.filters = payload
	},

	// 设置告警床位告警数据
	SET_ALARM_BED_DATA(state, payload) {
		console.log('seting bed alarm data....', payload)
		const { alarming, bed_id, alarming_date } = payload
		let alarmBed = state.allRoomDic.find((item) => {
			if (bed_id === item.bed_id) {
				return item
			}
		})

		let alarmList = alarmBed.alarmList.concat({
			alarming,
			alarming_date,
		})

		Object.assign(alarmBed, {
			warn_text: alarming,
			alarmList,
			warn_count: alarmBed.warn_count + 1,
			alertFlag: true,
		})
		console.log('seting finished....', alarmBed)
	},

	//设置床位告警状态
	CHANGE_BED_ALERT_STATUS(state, payload) {
		console.log('setting status...')
		let { bed_id, alertFlag } = payload
		let alarmBed = state.allRoomDic.find((data) => data.bed_id === bed_id)
		if (alertFlag === true) {
			// alarmBed.alertFlag = false
			setTimeout(() => {
				alarmBed.alertFlag = alertFlag
			}, 500)
		} else {
			alarmBed.alertFlag = alertFlag
		}
	},

	//减少床位告警数量
	REDUCE_BED_ALARM_QTY(state, payload) {
		let { id } = payload
		let rowData = state.allRoomDic.find((data) => data.bed_id === id)
		console.log('rowData', rowData)
		rowData.warn_count--
	},

	//设置卫生间告警状态
	SET_ALARM_TOILET_DATA(state, payload) {
		console.log('seting toilet alarm data....', payload)
		const { alarm_msg, room_id, alarming_date } = payload
		let alarmToilet = state.allToiletDic.find((item) => {
			if (room_id === item.room_id) {
				return item
			}
		})

		Object.assign(alarmToilet, {
			status: alarm_msg,
			alertFlag: true,
		})
		console.log('seting finished....', alarmToilet)
	},

	//设置卫生间告警状态
	CHANGE_TOILET_ALERT_STATUS(state, payload) {
		console.log('setting status...')
		let { room_id, alertFlag } = payload
		let alarmToilet = state.allToiletDic.find((data) => data.room_id === room_id)
		if (alertFlag === true) {
			setTimeout(() => {
				alarmToilet.alertFlag = alertFlag
			}, 500)
		} else {
			alarmToilet.alertFlag = alertFlag
			alarmToilet.status = '在线'
		}
	},
}

const actions = {
	//获取所有床铺数据
	fetchData({ state, commit }) {
		return new Promise((resolve, reject) => {
			getPerceptionPlatformData({
				uid: state.uid,
			})
				.then((response) => {
					const { status, data } = response

					if (status === 200) {
						const { code } = data

						if (code === 0) {
							const { navs_area, bed_area, toilet_area } = data
							commit('SET_ORIGIN_DATA', data)
							commit('SET_MENU_DATA', navs_area)
							commit('SET_ALL_ROOM_DIC', bed_area)
							commit('SET_ALL_TOILET_DIC', toilet_area)
						}
					}

					resolve()
				})
				.catch((err) => {
					console.log('err', err)
					reject()
				})
		})
	},

	//修改菜单选中项
	changeMenuChecked({ state, commit }, payload) {
		commit('CHANGE_MENU_CHECKED', payload)
	},

	//设置菜单过滤条件
	setMenuFilters({ state, commit }, payload) {
		commit('SET_MENU_FILTERS', payload)
	},

	//设置床位告警数据
	setBedAlarmData: {
		root: true,
		handler({ state, commit }, payload) {
			const { data } = payload
			commit('SET_ALARM_BED_DATA', data)
		},
	},

	//重置床位告警状态
	resetBedAlarm({ state, commit }, payload) {
		const { bed_id } = payload
		commit('CHANGE_BED_ALERT_STATUS', { bed_id, alertFlag: false })
	},

	//处理床位告警
	resolveBedAlarm({ state, commit }, payload) {
		console.log('payload', payload)
		const { id, warn_qty } = payload
		return new Promise((resolve, reject) => {
			try {
				commit('REDUCE_BED_ALARM_QTY', payload)
				let obj = {
					bed_id: id,
					alertFlag: false,
				}
				commit('CHANGE_BED_ALERT_STATUS', obj)
				resolve()
			} catch {
				reject()
			}
		})
	},

	//设置卫生间告警状态
	setToiletAlarmData: {
		root: true,
		handler({ state, commit }, payload) {
			const { data } = payload
			commit('SET_ALARM_TOILET_DATA', data)
		},
	},

	//处理卫生间告警
	resolveToiletAlarm({ state, commit }, payload) {
		console.log('payload', payload)
		const { id } = payload
		return new Promise((resolve, reject) => {
			try {
				let obj = {
					room_id: id,
					alertFlag: false,
				}
				commit('CHANGE_TOILET_ALERT_STATUS', obj)
				resolve()
			} catch {
				reject()
			}
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
