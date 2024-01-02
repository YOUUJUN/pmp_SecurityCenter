<template>
	<el-dialog class="dlg" :visible="visible" @close="handleClose" @opened="handleDlgOpen" zIndex="2">
		<template slot="title">
			<div class="dlg-title-wrap">
				<div class="dlg-title-left">
					<img class="dlg-logo" src="~@/assets/images/toilet.png" />
					<span class="dlg-title">{{ areaName }}</span>
					<span class="dlg-status">{{ statusText }}</span>
				</div>

				<div class="dlg-title-right">
					<img class="dlg-logo" src="~@/assets/images/toilet.png" />
					<span class="dlg-title">在床</span>
					<span class="dlg-desc">实时监控中</span>
				</div>
			</div>
		</template>

		<article class="main-body">
			<section class="dlg-body">
				<div class="dlg-body-left">
					<span class="dlg-body-title">检测仪已开启</span>
					<div class="cursor-bar-wrap">
						<CursorBar :value="breathValue" type="breath"></CursorBar>
						<CursorBar :value="heartValue" type="heart"></CursorBar>
					</div>
					<div class="bar-chart" ref="bar"></div>
				</div>
				<div class="dlg-body-right">
					<AlarmTable :bedId="roomData.bed_id"></AlarmTable>
				</div>
			</section>

			<HealthReport :partnerId="partner_id" :sleepReportData="sleepReportData"></HealthReport>

			<!-- <section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">监测时段</span>
						<span class="chart-desc">(睡眠时长{{ totalSleepTime }})</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="monitor-chart" ref="monitor"></div>
				</div>
			</section>

			<section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">睡眠详情</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="sleep-chart" ref="sleep"></div>
				</div>
			</section>

			<section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">体动详情</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="kinesia-chart" ref="kinesia"></div>
				</div>
			</section>

			<section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">心率</span>
						<span class="chart-desc">(平均65bpm 最低50bpm 最高80bpm)</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="heart-chart" ref="heart"></div>
				</div>
			</section>

			<section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">呼吸率</span>
						<span class="chart-desc">(平均65bpm 最低50bpm 最高80bpm)</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="breath-chart" ref="breath"></div>
				</div>
			</section>

			<section class="chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">呼吸暂停</span>
						<span class="chart-desc">(次数3次，平均18秒)</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="apnea-chart" ref="apnea"></div>
				</div>
			</section> -->
		</article>
	</el-dialog>
</template>
<script>
import * as echarts from 'echarts'
import { Chart } from '@antv/g2'

import CursorBar from '@/components/CursorBar/CursorBar.vue'
import HealthReport from './ElderInfoParts/HealthReport.vue'
import AlarmTable from './AlarmTable.vue'

import { mapActions, mapGetters } from 'vuex'

import moment from 'moment'

export default {
	components: {
		CursorBar,
		HealthReport,
		AlarmTable,
	},

	props: {
		visible: {
			type: Boolean,
			default: false,
		},

		//区域名
		areaName: {
			type: String,
			default: '101卫生间',
		},

		//区域状态
		statusText: {
			type: String,
			default: '有人',
		},

		roomData: {
			type: Object,
			default() {
				return {}
			},
		},
	},

	data() {
		return {
			breathValue: 0,
			heartValue: 0,

			//呼吸心跳图表
			heartBreathChart: null,

			//监测时段数据
			MonitorData: {},

			//监测时段总睡眠时长
			totalSleepTime: '',

			partner_id: this.roomData.elderly_id,

			sleepReportData: moment().format('YYYY-MM-DD'),
		}
	},

	computed: {
		...mapGetters(['vitalIotData']),
	},

	watch: {
		visible: {
			handler(newValue) {
				if (newValue) {
					// this.drawBarChart()
				}
			},
		},

		vitalIotData: {
			deep: true,
			immediate: true,
			handler(newValue, oldValue) {
				const { elderly_id } = this.roomData
				const newVitalData = newValue?.[elderly_id]
				if (newVitalData) {
					const { breathing, heart } = newVitalData[newVitalData.length - 1]
					this.breathValue = breathing
					this.heartValue = heart

					this.heartBreathChart && this.updateHeartChart()
				}
			},
		},
	},

	methods: {
		...mapActions('tempData', ['getReportData']),

		//绘制图表
		renderInfo(payload) {
			this.getReportData(payload).then((res) => {
				const reportData = res
				const { alarm_datas, monitor_period } = reportData
				// this.tableData = alarm_datas
				this.MonitorData = monitor_period

				this.drawHeartChart()
				// this.drawMonitorChart()
				// this.drawSleepChart()
				// this.drawKinesiaChart()
				// this.drawHeartRateChart()
				// this.drawBreathChart()
			})
		},

		handleClose() {
			console.log('close dlg')
			this.$emit('update:visible', false)
		},

		//处理窗体打开
		handleDlgOpen() {},

		//绘制呼吸心跳图
		drawHeartChart() {
			const { elderly_id } = this.roomData
			const originData = this.vitalIotData[elderly_id] || []
			const xData = originData.map((value, index) => {
				let { date } = value
				return date
			})

			const heartData = originData.map((value, index) => {
				let { heart } = value
				return heart
			})

			const breathData = originData.map((value, index) => {
				let { breathing } = value
				return breathing
			})

			var chartDom = this.$refs.bar
			this.heartBreathChart = echarts.init(chartDom)
			var option

			option = {
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					show: false,
				},
				grid: {
					top: 0,
					bottom: 0,
					left: '5%',
					right: '10%',
				},
				xAxis: {
					type: 'category',
					show: false,
					boundaryGap: false,
					// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					data: xData,
				},
				yAxis: {
					type: 'value',
					show: false,
				},
				series: [
					{
						name: '呼吸',
						type: 'line',
						smooth: true,
						showSymbol: false,
						// data: [10, 11, 13, 11, 12, 12, 9],
						data: breathData,
						markLine: {
							data: [{ type: 'average', name: 'Avg' }],
						},
					},
					{
						name: '心率',
						type: 'line',
						showSymbol: false,
						// data: [1, -2, 2, 5, 3, 2, 0],
						data: heartData,
						markLine: {
							data: [{ type: 'average', name: 'Avg' }],
						},
					},
				],
			}

			option && this.heartBreathChart.setOption(option)
		},

		//更新呼吸心跳图数据
		updateHeartChart() {
			const { elderly_id } = this.roomData
			const originData = this.vitalIotData[elderly_id] || []
			const xData = originData.map((value, index) => {
				let { date } = value
				return date
			})

			const heartData = originData.map((value, index) => {
				let { heart } = value
				return heart
			})

			const breathData = originData.map((value, index) => {
				let { breathing } = value
				return breathing
			})

			this.heartBreathChart.setOption({
				xAxis: {
					data: xData,
				},

				series: [
					{
						name: '呼吸',
						data: breathData,
					},
					{
						name: '心率',
						data: heartData,
					},
				],
			})
		},

		//绘制监测时段图表
		drawMonitorChart() {
			var chartDom = this.$refs.monitor
			var myChart = echarts.init(chartDom)

			const {
				total,
				deep_sleep,
				light_sleep,
				wake,
				level_bed,
				total_str,
				deep_sleep_str,
				light_sleep_str,
				wake_str,
				level_bed_str,
			} = this.MonitorData

			this.totalSleepTime = total_str

			const processedData = Object.assign(
				{},
				{
					deep_sleep,
					light_sleep,
					wake,
					level_bed,
				},
			)

			const series = Object.entries(processedData).map((item, index) => {
				console.log('item', item)
				const label = item[0]
				const value = item[1]
				let name = ''
				console.log('value', value, total)
				let data = [value / total]
				switch (label) {
					case 'deep_sleep':
						name = `深睡${deep_sleep_str}`
						break
					case 'light_sleep':
						name = `浅睡${light_sleep_str}`
						break
					case 'wake':
						name = `清醒${wake_str}`
						break
					case 'level_bed':
						name = `离床${level_bed_str}`
						break
				}

				let obj = {
					// name: '深睡',
					name,
					type: 'bar',
					barWidth: 20,
					stack: 'percent',
					label: {
						show: false,
					},
					emphasis: {
						focus: 'series',
					},
					data,
					// data: [25],
				}
				return obj
			})

			console.log('series', series)

			let option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// Use axis to trigger tooltip
						type: 'none', // 'shadow' as default; can also be 'line' or 'shadow'
					},
				},
				legend: {
					right: '4%',
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '6%',
					// containLabel: true,
				},
				xAxis: {
					type: 'value',
					show: false,
				},
				yAxis: {
					type: 'category',
					show: false,
					data: ['监测时段'],
				},
				series,
				// series: [
				// 	{
				// 		name: '深睡',
				// 		type: 'bar',
				// 		barWidth: 20,
				// 		stack: 'percent',
				// 		label: {
				// 			show: true,
				// 		},
				// 		emphasis: {
				// 			focus: 'series',
				// 		},
				// 		data: [25],
				// 	},
				// 	{
				// 		name: '浅睡',
				// 		type: 'bar',
				// 		barWidth: 20,
				// 		stack: 'percent',
				// 		label: {
				// 			show: true,
				// 		},
				// 		emphasis: {
				// 			focus: 'series',
				// 		},
				// 		data: [25],
				// 	},
				// 	{
				// 		name: '清醒',
				// 		type: 'bar',
				// 		barWidth: 20,
				// 		stack: 'percent',
				// 		label: {
				// 			show: true,
				// 		},
				// 		emphasis: {
				// 			focus: 'series',
				// 		},
				// 		data: [25],
				// 	},
				// 	{
				// 		name: '离床',
				// 		type: 'bar',
				// 		barWidth: 20,
				// 		stack: 'percent',
				// 		label: {
				// 			show: true,
				// 		},
				// 		emphasis: {
				// 			focus: 'series',
				// 		},
				// 		data: [25],
				// 	},
				// ],
			}

			option && myChart.setOption(option)
		},

		//绘制睡眠详情图表
		drawSleepChart() {
			const shell = this.$refs.sleep
			const chart = new Chart({
				container: shell,
				theme: 'classic',
				autoFit: true,
				paddingLeft: 60,
			})

			chart.coordinate({ transform: [{ type: 'transpose' }] })
			chart
				.interval()
				.style('radius', 4)
				.style('maxWidth', 30)
				.data([
					{ month: '离床', profit: 387264, start: 0, end: 387264 },
					{ month: '离床', profit: 387264, start: 487264, end: 587264 },
					{ month: '清醒', profit: 772096, start: 387264, end: 1159360 },
					{ month: '浅睡', profit: 638075, start: 1159360, end: 1797435 },
					{ month: '深睡', profit: -211386, start: 1797435, end: 1586049 },
				])
				.encode('x', 'month')
				.encode('y', ['start', 'end'])
				.axis('x', {
					title: false,
				})
				.axis('y', {
					title: false,
				})
				.scale('y', {
					type: 'time',
					/* 其他配置项 */
				})
				.encode('color', 'month')
				.scale('color', {
					type: 'ordinal',
					range: ['#7593ed', '#95e3b0', '#6c7893', '#e7c450', '#7460eb'],
				})
				.legend('color', {
					title: false,
				})
				.tooltip(['start', 'end'])

			chart.render()
		},

		//绘制体动详情图表
		drawKinesiaChart() {
			var chartDom = this.$refs.kinesia
			var myChart = echarts.init(chartDom)
			var option

			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				grid: {
					left: '3%',
					right: '3%',
					top: '3%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						axisTick: {
							alignWithLabel: true,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
					},
				],
				series: [
					{
						name: 'Direct',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 200, 334, 390, 330, 220],
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制心率图表
		drawHeartRateChart() {
			var chartDom = this.$refs.heart
			var myChart = echarts.init(chartDom)
			var option

			option = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line',
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制呼吸率图表
		drawBreathChart() {
			var chartDom = this.$refs.breath
			var myChart = echarts.init(chartDom)
			var option

			option = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line',
					},
				],
			}

			option && myChart.setOption(option)
		},

		test() {
			console.log('vitalIotData', this.vitalIotData)
			console.log('this.$store.state', this.$store.state)
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
		justify-content: space-between;
		width: 100%;
		.dlg-title-left {
			display: flex;
			align-items: center;
		}

		.dlg-title-right {
			display: flex;
			align-items: center;
			margin-right: 45px;
		}

		.dlg-logo {
			width: 36px;
			height: 36px;
			margin-right: 16px;
		}

		.dlg-title,
		.dlg-status {
			font-size: 20px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		.dlg-status {
			margin-left: 16px;
		}

		.dlg-desc {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			margin-left: 25px;
		}
	}

	.main-body {
		padding: 20px;
		.dlg-body {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100%;
			margin-bottom: 16px;

			.dlg-body-title {
				flex: none;
				font-size: 17px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 12px;
			}

			.dlg-body-left {
				display: flex;
				flex-direction: column;
				flex: auto;
				height: 100%;
				align-self: flex-start;
				.bar-chart {
					flex: auto;
					width: 100%;
					height: 100%;
				}

				.cursor-bar-wrap {
					flex: none;
					margin: 0 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					& > div:last-child {
						margin-left: 150px;
					}
				}
			}

			.dlg-body-right {
				flex: none;
				width: 400px;
				height: 100%;
			}
		}

		.chart-container {
			.chart-head {
				padding: 20px;
				.chart-head-left {
					display: flex;
					flex-direction: row;
					align-items: center;
					.chart-logo {
						width: 25px;
						height: 25px;
						margin-right: 12px;
					}

					.chart-title {
						font-size: 18px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin-right: 14px;
					}

					.chart-desc {
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
					}
				}
			}

			.chart-body {
				.monitor-chart {
					height: 80px;
					width: 100%;
				}

				.sleep-chart {
					height: 220px;
					width: 100%;
				}

				.kinesia-chart {
					height: 250px;
					width: 100%;
				}
			}
		}
	}
}
</style>
