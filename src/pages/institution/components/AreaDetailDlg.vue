<template>
	<el-dialog class="dlg" :visible="visible" @close="handleClose" @opened="handleDlgOpen">
		<template slot="title">
			<div class="dlg-title-wrap">
				<div class="dlg-title-left">
					<img class="dlg-logo" src="~@/assets/images/toilet.png" />
					<span class="dlg-title">{{ areaName }}</span>
					<span class="dlg-status">{{ statusText }}</span>
				</div>
			</div>
		</template>

		<section class="dlg-body">
			<div class="dlg-body-left">
				<div class="bar-chart" ref="bar"></div>
			</div>
			<div class="dlg-body-right">
				<AlarmTable type="room" :id="cardInfo.device_id" tableType="toilet"></AlarmTable>
			</div>
		</section>
	</el-dialog>
</template>
<script>
import { fetchRoomAlarmList } from '@/api/security'

import * as echarts from 'echarts'
import { Chart } from '@antv/g2'

import AlarmTable from './AlarmTable.vue'

export default {
	props: {
		visible: {
			type: Boolean,
			default: false,
		},

		//区域信息
		cardInfo: {
			type: Object,
			default() {
				return {}
			},
		},
	},

	components: {
		AlarmTable,
	},

	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: ' 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: ' 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: ' 1516 弄',
				},
			],

			//选择的日期
			choicedDate: '',

			areaName: '101卫生间',
			statusText: '有人',
			device_id: 0,

			//图表
			chart: null,

			//处理后的告警时间信息
			processedToiletData: [],

			//告警详情信息
			toiletEvent: [],
		}
	},

	// watch: {
	// 	visible: {
	// 		handler(newValue) {
	// 			if (newValue) {
	// 			}
	// 		},
	// 	},
	// },

	mounted() {},

	methods: {
		//初始化数据
		setData(payload) {
			const { device_id, status, device_name } = payload
			this.areaName = `${device_name} - 卫生间`
			this.statusText = status
			this.device_id = device_id
		},

		handleClose() {
			this.$emit('update:visible', false)
		},

		//处理窗体打开
		handleDlgOpen() {
			const chartDom = this.$refs.bar
			const canvas = chartDom.querySelector('canvas')
			canvas && chartDom.removeChild(canvas)
			this.$nextTick(() => {
				fetchRoomAlarmList({
					device_id: this.device_id,
				})
					.then((res) => {
						console.log('res12', res)
						const { result, data } = res.data
						if (result === 'success') {
							const { toilet_status, toilet_event, toilet_data } = data
							console.log('toilet_data', toilet_data)
							let processedData = toilet_data.reduce((total, item, index) => {
								let arr = item.data
								arr = arr.map((data) => {
									return {
										...data,
										id: item.id,
									}
								})
								total = total.concat(arr)
								return total
							}, [])

							processedData = processedData.map((item) => {
								const eventInfo = toilet_event.find((data) => data.id === item.id)
								const { name, start_time, end_time } = eventInfo
								let startText = start_time.split(' ')[1]
								let endText = end_time.split(' ')[1]
								let flag = 0
								let alertText = ''
								if (name === '有人') {
									flag = 1
									alertText = `<div class="g2-alert">
										<span>${startText} - ${endText}</span>
										<span>有人进入</span>
										</div>`
								} else if (name === '跌倒') {
									flag = 2
									alertText = `<div class="g2-alert">
										<span>${startText} - ${endText}</span>
										<span>有人跌倒</span>
										</div>`
								}
								return {
									id: item.id,
									flag,
									alertText,
									time: item.time,
									start: Number(item.start),
									end: Number(item.end),
								}
							})

							console.log('processedData', processedData)

							const warnArr = processedData
							// .map((item) => {
							// 	const { name } = item
							// 	let flag = 0
							// 	let alertText = ''
							// 	if (name === '有人') {
							// 		flag = 1
							// 		alertText = '有人进入'
							// 	} else if (name === '跌倒') {
							// 		flag = 2
							// 		alertText = '有人跌倒'
							// 	}
							// 	return {
							// 		...item,
							// 		flag,
							// 		alertText,
							// 	}
							// })

							console.log('warnArr', warnArr)

							this.processedToiletData = warnArr
							this.toiletEvent = toilet_event

							this.drawChart(warnArr)
						}
					})
					.catch((err) => {})
			})
		},

		drawChart(dataArr = []) {
			console.log('cardInfo', this.cardInfo)
			const chartDom = this.$refs.bar

			const chart = new Chart({
				container: chartDom,
				autoFit: true,
				theme: 'classic',
			})

			const timeArray = this.generateTimeArrayUntilNow()
			console.log('timeArray', timeArray)
			let dataMap = timeArray.map((item) => {
				let obj = {}
				Object.assign(obj, {
					time: item,
					start: 0,
					end: 10,
				})
				return obj
			})

			dataMap.push({
				time: '17:00',
				start: 3,
				end: 9,
				flag: 1,
			})

			dataMap = dataMap.concat(dataArr)

			chart.options({
				axis: {
					x: {
						// labelAutoHide: true,
						labelFilter: function (datum, index, data) {
							if (!datum) {
								return false
							}
							let arr = datum.split(':')
							if (arr[1] === '00') {
								return true
							} else {
								return false
							}
						},
					},
					y: {
						min: 0,
						max: 10,
					},
				},
			})

			chart
				.interval()
				.style({
					radius: 6,
					fill(d) {
						if (d.flag === 2) {
							return 'red'
						} else if (d.flag === 1) {
							return '#E5F6E7'
						} else {
							return '#fff'
						}
					},
					stroke: '#C1C1C1',
					maxWidth: 14,
				})
				.data(dataMap)
				.encode('x', 'time')
				.scrollbar('x', { value: 1 })
				.encode('y', ['end', 'start'])
				.interaction('tooltip', {
					// render 回调方法返回一个innerHTML 或者 DOM
					render: (event, { title, items }) => {
						console.log('event', event)
						console.log('title', title)
						const selectData = this.processedToiletData.find((item) => item.time === title)
						console.log('selectData', selectData)
						if (selectData) {
							return selectData.alertText
						} else {
							return `<div style="display:none;"></div>`
						}
						return ''
					},
				})

			console.log('chart', chart)
			chart.render()
			this.chart = chart
		},

		generateTimeArray() {
			const hours = 24
			const minutesInHour = 60
			const timeSlot = 10
			const result = []

			for (let hour = 0; hour < hours; hour++) {
				for (let minute = 0; minute < minutesInHour; minute += timeSlot) {
					const formattedHour = String(hour).padStart(2, '0')
					const formattedMinute = String(minute).padStart(2, '0')
					result.push(`${formattedHour}:${formattedMinute}`)
				}
			}

			return result
		},

		generateTimeArrayUntilNow() {
			const currentDate = new Date()
			const currentHour = currentDate.getHours()
			const currentMinute = currentDate.getMinutes()
			const minutesInHour = 60
			const timeSlot = 10
			const result = []

			for (let hour = 0; hour <= currentHour; hour++) {
				const lastHour = hour === currentHour ? currentMinute / timeSlot : minutesInHour / timeSlot

				for (let minute = 0; minute < lastHour; minute++) {
					const formattedHour = String(hour).padStart(2, '0')
					const formattedMinute = String(minute * timeSlot).padStart(2, '0')
					result.push(`${formattedHour}:${formattedMinute}`)
				}
			}

			return result
		},

		formatTime(dateTimeString) {
			const date = new Date(dateTimeString)
			const hours = date.getHours()
			const minutes = date.getMinutes()

			const formattedHours = hours < 10 ? '0' + hours : hours
			const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
			return `${hours}:${formattedMinutes}`
		},

		timeRangeToArrays(startTime, endTime, intervalMinutes) {
			const start = new Date(`2000-01-01 ${startTime}`)
			const end = new Date(`2000-01-01 ${endTime}`)
			const intervalMilliseconds = intervalMinutes * 60 * 1000

			const result = []
			let current = start

			while (current <= end) {
				const formattedTime = `${current.getHours()}:${
					current.getMinutes() < 10 ? '0' : ''
				}${current.getMinutes()}`
				result.push(formattedTime)

				current = new Date(current.getTime() + intervalMilliseconds)
			}

			return result
		},

		extractMinutes(time) {
			const parts = time.split(':')
			if (parts.length === 2) {
				const minutes = parseInt(parts[1], 10)
				if (!isNaN(minutes)) {
					return minutes
				}
			}
			// 默认返回 0 或者其他处理方式，取决于你的需求
			return 0
		},

		calculateTimeDifference(startTime, endTime) {
			const start = new Date(startTime)
			const end = new Date(endTime)

			// 计算时间差（以分钟为单位）
			const timeDifference = Math.floor((end - start) / (1000 * 60))

			return timeDifference
		},
	},
}
</script>
<style lang="less" scoped>
.dlg {
	::v-deep .el-dialog {
		width: 1200px;
		border-radius: 10px;
		overflow: hidden;
	}

	::v-deep .el-dialog__header {
		height: 56px;
		background: #f1f2f6;
		padding: 0 21px;
		display: flex;
		align-items: center;
	}

	::v-deep .el-dialog__headerbtn {
		font-size: 20px;
		top: 15px;
	}

	::v-deep .el-dialog__body {
		padding: 0;
	}

	.dlg-title-wrap {
		display: flex;
		flex-direction: row;
		.dlg-title-left {
			display: flex;
			align-items: center;
		}
		.dlg-logo {
			width: 36px;
			height: 36px;
			margin-right: 6px;
		}

		.dlg-title,
		.dlg-status {
			font-size: 20px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.dlg-status {
			margin-left: 6px;
		}
	}

	.dlg-body {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 400px;
		padding: 20px;

		.dlg-body-left {
			flex: auto;
			height: 100%;
			.bar-chart {
				width: 100%;
				height: 100%;
			}
		}

		.dlg-body-right {
			flex: none;
			width: 400px;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			::v-deep .dlg-table {
				height: 290px !important;
			}

			.dlg-body-right-top {
				flex: none;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.dlg-body-right-title {
					font-size: 17px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.dlg-body-right-date {
					::v-deep .el-input__inner {
						font-size: 14px;
						font-family: PingFang SC;
						padding: 0 0 0 33px;
						height: 28px;
					}

					::v-deep .el-input__prefix {
						top: -7px;
					}

					font-weight: 500;
					color: #666666;
					width: 106px;
				}
			}

			.dlg-body-right-bottom {
				flex: auto;
				height: 100%;
				width: 100%;
				margin-top: 14px;
				.dlg-table {
					height: 100%;
					border: 1px solid #d9d9d9;
					border-radius: 10px;
					overflow: hidden;
				}
				::v-deep .el-table__header {
					height: 40px;
				}

				::v-deep .el-table th {
					background: #f1f2f6;
				}
			}

			.dlg-body-right-footer {
				flex: none;
				margin-top: 8px;
				width: 100%;
				display: flex;
				justify-content: flex-end;

				.table-pagging {
				}
			}
		}
	}
}
</style>

<style>
.g2-tooltip {
	background: unset !important;
	box-shadow: unset !important;
	padding: 0 !important;
}

.g2-alert {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.9);
	box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 12px 0px;
	border-radius: 4px;
}
</style>
