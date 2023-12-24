import request from '@/utils/http'
import qs from 'qs'
import { postAction, getAction } from './manage'

//获取感知平台最新数据接口
export const getPerceptionPlatformData = (params) => getAction('/inst/security/main/page', params)

//获取健康报告数据接口
export const getHealthReportDataByElderId = (params) => getAction('/inst/health/report/api', params)

// 单日健康报告接口
export function handelDayReport(params) {
	return request({
		url: `/fm/elderly/oneday/report/analysis`,
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
		url: `/month/health/report/api`,
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
		url: `/fm/elderly/more/report/analysis`,
		method: 'post',
		data: qs.stringify(params),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	})
}
