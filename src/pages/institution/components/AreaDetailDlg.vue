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
		}
	},

	watch: {
		visible: {
			handler(newValue) {
				if (newValue) {
					// this.drawBarChart()
				}
			},
		},
	},

	mounted() {},

	methods: {
		//初始化数据
		setData(payload) {
			console.log('payload', payload)
			const { data } = payload
			const { device_id, alarm_msg, room_name } = data
			this.areaName = `${room_name} - 卫生间`
			this.statusText = alarm_msg
			this.device_id = device_id
		},

		handleClose() {
			this.$emit('update:visible', false)
		},

		//处理窗体打开
		handleDlgOpen() {
			const chartDom = this.$refs.bar
			chartDom.innerHTML = ''
			this.$nextTick(() => {
				fetchRoomAlarmList({
					device_id: this.device_id,
				})
					.then((res) => {
						console.log('res', res)
						const response = {
							result: 'success',
							message: '数据处理成功!',
							data: {
								toilet_status: '无人',
								toilet_warn: [
									{
										id: 64,
										alarm_time: '2023-08-31 01:28:01',
										alarm_type: '跌倒告警',
										alarm_text: '跌倒告警',
									},
									{
										id: 65,
										alarm_time: '2023-08-31 01:29:24',
										alarm_type: '跌倒告警',
										alarm_text: '跌倒告警',
									},
								],
								toilet_event: [
									{
										id: 75,
										name: '有人',
										start_time: '2023-08-31 01:28:24',
										end_time: '2023-08-31 01:28:39',
									},
									{
										id: 76,
										name: '离线',
										start_time: '2023-08-31 01:28:51',
										end_time: '2023-08-31 01:29:04',
									},
									{
										id: 78,
										name: '跌倒',
										start_time: '2023-08-31 01:29:24',
										end_time: '2023-08-31 01:29:40',
									},
								],
							},
						}
						const { result, data } = response
						if (result === 'success') {
							const { toilet_status, toilet_warn, toilet_event } = data
							const warnArr = toilet_event.map((item) => {
								let obj = {}
								const start_time = this.formatTime(item.start_time)
								const end_time = this.formatTime(item.end_time)
								const diff = this.calculateTimeDifference(item.start_time, item.end_time)
								Object.assign(obj, {
									time: this.formatTime(item.start_time),
									start: this.extractMinutes(start_time),
									end: this.extractMinutes(start_time) + diff,
									flag: 1,
								})

								return obj
							}, [])

							console.log('warnArr', warnArr)

							this.drawChart()
						}
					})
					.catch((err) => {})
			})
		},

		//绘制矩形
		drawBarChart() {
			console.log('this.$refs.bar', this.$refs.bar)
			const chartDom = this.$refs.bar
			const myChart = echarts.init(chartDom)

			// prettier-ignore
			let dataAxis = ['6:00', '6:10', '6:20', '6:30', '6:40', '6:50', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '8:00', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', '7:00', '7:10', '7:20', '7:30', '7:40', '7:50'];
			// prettier-ignore
			let data = [0,0,0,0,0,0,0,0,0,0,0,0,0];
			let data2 = [1, 1, 1, 1, 1, 1]
			let data3 = [4, 5, 1, 1, 1, 1]
			let yData = [0, 5, 10]
			let option = {
				xAxis: {
					data: dataAxis,
					axisLabel: {
						inside: false,
						// color: '#fff',
					},
					axisTick: {
						alignWithLabel: true,
					},
					// axisTick: {
					// 	show: false,
					// },
					// axisLine: {
					// 	show: false,
					// },
					z: 10,
				},
				yAxis: {
					data: yData,
					type: 'value',
					min: 0,
					max: 10,
					axisLine: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						color: '#999',
					},
				},
				dataZoom: [
					{
						type: 'inside',
					},
				],
				series: [
					{
						type: 'bar',
						stack: 'Ad',
						showBackground: true,
						backgroundStyle: {
							borderRadius: 10,
						},
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: '#83bff6' },
								{ offset: 0.5, color: '#188df0' },
								{ offset: 1, color: '#188df0' },
							]),
						},
						emphasis: {
							itemStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: '#2378f7' },
									{ offset: 0.7, color: '#2378f7' },
									{ offset: 1, color: '#83bff6' },
								]),
							},
						},
						data: data,
					},

					{
						type: 'bar',
						showBackground: true,
						stack: 'Ad',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: '#83bff6' },
								{ offset: 0.5, color: '#188df0' },
								{ offset: 1, color: '#188df0' },
							]),
						},
						emphasis: {
							itemStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: '#2378f7' },
									{ offset: 0.7, color: '#2378f7' },
									{ offset: 1, color: '#83bff6' },
								]),
							},
						},
						data: data2,
					},

					{
						type: 'bar',
						showBackground: true,
						stack: 'Ad',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{ offset: 0, color: '#83bff6' },
								{ offset: 0.5, color: '#188df0' },
								{ offset: 1, color: '#188df0' },
							]),
						},
						emphasis: {
							itemStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{ offset: 0, color: '#2378f7' },
									{ offset: 0.7, color: '#2378f7' },
									{ offset: 1, color: '#83bff6' },
								]),
							},
						},
						data: data3,
					},
				],
			}

			// 假设你已经引入了 ECharts 库，并创建了一个容器 div，id 为 'chart-container'

			// 数据示例
			const dataV = [
				{ time: '2023-01', range: [10, 20] },
				{ time: '2023-02', range: [15, 25] },
				{ time: '2023-03', range: [18, 30] },
				// 更多数据...
			]

			// 转换数据
			const seriesData = dataV.map((item) => ({
				name: item.time,
				value: [item.time, ...item.range],
			}))

			// 自定义绘制区间条形图
			option = {
				xAxis: {
					type: 'time',
				},
				yAxis: {},
				series: [
					{
						type: 'custom',
						renderItem: function (params, api) {
							const yValue = api.value(2)
							const start = api.coord([api.value(0), yValue[0]])
							const end = api.coord([api.value(0), yValue[1]])
							const height = api.size([0, yValue[1] - yValue[0]])[1]

							const rectShape = echarts.graphic.clipRectByRect(
								{
									x: start[0],
									y: start[1],
									width: 20, // 设置条形图宽度
									height: height,
								},
								{
									x: start[0],
									y: 0,
									width: end[0] - start[0],
									height: myChart.getHeight(),
								},
							)

							return {
								type: 'rect',
								shape: rectShape,
								style: api.style(),
							}
						},
						encode: {
							x: 'time',
							y: [1, 2], // 区间范围的数据索引
						},
						data: seriesData,
					},
				],
			}

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)

			myChart.on('click', function (params) {
				console.log('params', params)
			})

			option && myChart.setOption(option)
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
						labelAutoHide: true,
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
						if (d.flag === 1) {
							return 'red'
						} else {
							return '#fff'
						}
					},
					stroke: '#C1C1C1',
					maxWidth: 14,
				})
				.data(dataMap)
				.encode('x', 'time')
				.encode('y', ['end', 'start'])
				.interaction('tooltip', {
					// render 回调方法返回一个innerHTML 或者 DOM
					render: (event, { title, items }) => {
						console.log('event', event)
						return '发生离线告警'
					},
				})
				.scrollbar('x', { value: 1 })

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
