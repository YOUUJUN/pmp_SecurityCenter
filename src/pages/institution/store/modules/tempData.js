import { handelDayReport } from '@/api/security'

const state = {
	tempReportData: {},
}

const mutations = {
	//设置初始数据源
	SET_REPORT_DATA(state, payload) {
		const { elderId, reportDate, reportData } = payload
		state.tempReportData = Object.assign(state.tempReportData, {
			[elderId]: {
				[reportDate]: reportData,
			},
		})
	},
}

const actions = {
	//保存健康报告数据
	saveTempReportData({ state, commit }, payload) {
		return new Promise((resolve, reject) => {
			const { elderId, reportDate, reportData } = payload
			commit('SET_REPORT_DATA', { elderId, reportDate, reportData })
			resolve()
		})
	},

	//查询健康报告数据
	getReportData({ state, commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			console.log('state.tempReportData', state.tempReportData, payload)
			const { elderId, reportDate } = payload
			const reportData = state.tempReportData?.[elderId]?.[reportDate]
			if (reportData) {
				console.log(1)
				resolve(reportData)
			} else {
				console.log(2)
				dispatch('fetchReportData', payload)
					.then((res) => {
						resolve(res)
					})
					.catch((err) => {
						reject(err)
					})
			}
		})
	},

	//获取健康报告数据
	fetchReportData({ state, commit, dispatch }, payload) {
		return new Promise((resolve, reject) => {
			const { elderId, reportDate } = payload

			const reportData = state.tempReportData?.elderId?.reportDate
			if (reportData) {
				resolve(reportData)
			} else {
				handelDayReport({
					elderly_id: elderId,
					search_date: reportDate,
				})
					.then((response) => {
						console.log('response', response)
						const { result, message } = response.data
						if (result === 'success') {
							const { data } = response

							dispatch('saveTempReportData', {
								elderId,
								reportDate,
								reportData: data,
							})

							resolve(data)
						} else {
							reject(message)
						}
					})
					.catch((err) => {
						reject()
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
