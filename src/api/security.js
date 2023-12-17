import { postAction, getAction } from './manage'

//获取感知平台最新数据接口
export const getPerceptionPlatformData = (params) => getAction('/inst/security/main/page', params)

//获取健康报告数据接口
export const getHealthReportDataByElderId = (params) => getAction('/inst/health/report/api', params)
