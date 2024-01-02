import request from '@/utils/http'
import qs from 'qs'
import { postAction, getAction } from './manage'

import reportJson from './report.json'

//获取感知平台最新数据接口
export const getPerceptionPlatformData = (params) => getAction('/inst/security/main/page', params)

// 获取健康报告数据接口
export function handelDayReport(params) {
	return request({
		url: `/public/elderly/oneday/report/analysis`,
		method: 'post',
		data: qs.stringify(params),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})

	// return new Promise((resolve) => {
	// 	resolve({
	// 		status: 200,
	// 		data: reportJson,
	// 	})
	// })
}

//获取老人健康报告
export function getElderlyHealthReport(params) {
	return request({
		url: `/elderly/health/report/api`,
		method: 'post',
		data: qs.stringify(params),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取老人健康报告存在的日期
export function getElderlyHealthReportDate(params) {
	return request({
		url: `/public/month/health/report/api`,
		method: 'post',
		data: qs.stringify(params),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
}

// 7日健康报告接口
export function handelSevenDayReport(params) {
	return request({
		url: `/public/elderly/more/report/analysis`,
		method: 'post',
		data: qs.stringify(params),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
}

// 获取告警列表数据
export function fetchAlarmList(params) {
	// return request({
	// 	url: `/public/alarm/list/data/api`,
	// 	method: 'post',
	// 	data: qs.stringify(params),
	// 	headers: {
	// 		'content-type': 'application/x-www-form-urlencoded',
	// 	},
	// })

	return new Promise((resolve) => {
		resolve({
			result: 'success',
			message: 'success',
			alarm_datas: [
				{
					id: 22,
					alarm_time: '2023-07-29 08:27:14',
					alarm_type: '心率异常',
					alarm_text: '心率过低(低于40次/分)',
				},
				{
					id: 33,
					alarm_time: '2023-07-29 20:04:45',
					alarm_type: '心率异常',
					alarm_text: '心率过低(低于40次/分)',
				},
				{
					id: 34,
					alarm_time: '2023-07-29 20:05:40',
					alarm_type: '心率异常',
					alarm_text: '心率过低(低于40次/分)',
				},
				{
					id: 34,
					alarm_time: '2023-07-29 20:05:40',
					alarm_type: '心率异常',
					alarm_text: '心率过低(低于40次/分)',
				},
				{
					id: 34,
					alarm_time: '2023-07-29 20:05:40',
					alarm_type: '心率异常',
					alarm_text: '心率过低(低于40次/分)',
				},
			],
			count: 5,
		})
	})
}

// 处理告警
export function handleAlarmSolved(params) {
	return request({
		url: `/public/immediate/process/api`,
		method: 'post',
		data: params,
	})
}
