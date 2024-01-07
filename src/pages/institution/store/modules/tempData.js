import { handelDayReport } from '@/api/security'

const state = {
	tempReportData: {},
}

const mutations = {
	//设置初始数据源
	SET_REPORT_DATA(state, payload) {
		const { elderId, reportDate, reportData, result, message } = payload
		state.tempReportData = Object.assign(state.tempReportData, {
			[elderId]: {
				[reportDate]: {
					result,
					message,
					data: reportData,
				},
			},
		})

		console.log('tempReportData', state.tempReportData)
	},
}

const actions = {
	//保存健康报告数据
	saveTempReportData({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			const { elderId, reportDate, reportData, result, message } = payload
			commit('SET_REPORT_DATA', { elderId, reportDate, reportData, result, message })
			resolve()
		})
	},

	//查询健康报告数据
	getReportData({ state, commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			console.log('state.tempReportData', state.tempReportData, payload)
			const { elderId, reportDate } = payload
			const reportCache = state.tempReportData?.[elderId]?.[reportDate]
			console.log('reportCache', reportCache, state.tempReportData['8'])
			if (reportCache) {
				const { result, message, data } = reportCache
				resolve({ result, message, data })
			} else {
				console.log(2)
				dispatch('fetchReportData', payload).then((res) => {
					resolve(res)
				})
			}
		})
	},

	//获取健康报告数据
	fetchReportData({ state, commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			const { elderId, reportDate } = payload

			const reportData = state.tempReportData?.elderId?.reportDate
			console.log('reportData,111', reportData)
			if (reportData) {
				resolve(reportData)
			} else {
				handelDayReport({
					elderly_id: elderId,
					search_date: reportDate,
				}).then((response) => {
					console.log('response', response)
					const { result, message, data } = response.data
					if (result === 'success') {
						dispatch('saveTempReportData', {
							elderId,
							reportDate,
							reportData: data,
							result,
							message,
						})

						resolve({ result, message, data })
					} else {
						dispatch('saveTempReportData', {
							elderId,
							reportDate,
							reportData: {},
							result,
							message,
						})

						resolve({ result, message, data: {} })
					}
				})
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
