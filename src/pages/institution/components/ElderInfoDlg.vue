<template>
	<el-dialog class="dlg" :visible="visible" @close="handleClose" @opened="handleDlgOpen" zIndex="2">
		<template slot="title">
			<div class="dlg-title-wrap">
				<div class="dlg-title-left">
					<!-- <img class="dlg-logo" src="~@/assets/images/toilet.png" /> -->
					<img class="dlg-logo" v-if="roomData.gender === '男'" src="~@/assets/images/man.png" />
					<img class="dlg-logo" v-else-if="roomData.gender === '女'" src="~@/assets/images/women.png" />
					<span class="dlg-title">{{ roomData.name }}</span>
					<span class="dlg-status">{{ roomData.elderly_name }}</span>
				</div>

				<div class="dlg-title-right">
					<img class="dlg-logo" src="~@/assets/images/alert/bedroom.png" />
					<span class="dlg-title">{{ roomData.status }}</span>
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
					<!-- <div class="bar-chart" ref="heartBar"></div>
					<div class="bar-chart" ref="breathBar"></div> -->
					<!-- <HeartLine :width="701" :height="420" ref="heartLine"></HeartLine> -->
					<BreathLine></BreathLine>
					<HeartElect></HeartElect>
				</div>
				<div class="dlg-body-right">
					<AlarmTable tableType="bed" :id="roomData.bed_id"></AlarmTable>
				</div>
			</section>

			<HealthReport ref="healthReport" :partnerId="partner_id" :sleepReportData="sleepReportData"></HealthReport>
		</article>
	</el-dialog>
</template>
<script>
import * as echarts from 'echarts'
import { Chart } from '@antv/g2'

import CursorBar from '@/components/CursorBar/CursorBar.vue'
import HealthReport from './ElderInfoParts/HealthReport.vue'
import AlarmTable from './AlarmTable.vue'
import HeartLine from './HeartRate/HeartLine.vue'
import HeartElect from './HeartRate/HeartElect.vue'
import BreathLine from './HeartRate/BreathLine.vue'

import { mapActions, mapGetters } from 'vuex'

import moment from 'moment'

export default {
	components: {
		CursorBar,
		HealthReport,
		AlarmTable,
		// HeartLine,
		HeartElect,
		BreathLine,
	},

	props: {
		visible: {
			type: Boolean,
			default: false,
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

			//心跳图表
			heartChart: null,

			//呼吸图表
			breathChart: null,

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

					// this.heartChart && this.updateHeartChart()
					// this.breathChart && this.updateBreathChart()
					this.$refs.heartLine.drawLine(heart)
				}
			},
		},
	},

	methods: {
		...mapActions('tempData', ['getReportData']),

		//绘制图表
		renderInfo(payload) {
			const { elderId, reportDate } = payload

			this.getReportData(payload).then((res) => {
				if (res && res.result === 'success') {
					const reportData = res.data
					const { alarm_datas, monitor_period } = reportData
					// this.tableData = alarm_datas
					this.MonitorData = monitor_period
				}

				// this.drawHeartChart()
				// this.drawBreathChart()

				this.$refs.healthReport.handelDayReport(elderId, reportDate)
			})
		},

		handleClose() {
			console.log('close dlg')
			this.$emit('update:visible', false)
		},

		//处理窗体打开
		handleDlgOpen() {},

		//绘制心跳图
		drawHeartChart() {
			console.log('draw...')
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

			var chartDom = this.$refs.heartBar
			this.heartChart = echarts.init(chartDom)
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

			option && this.heartChart.setOption(option)
		},

		//绘制呼吸图
		drawBreathChart() {
			console.log('draw...')
			const { elderly_id } = this.roomData
			const originData = this.vitalIotData[elderly_id] || []
			const xData = originData.map((value, index) => {
				let { date } = value
				return date
			})

			const breathData = originData.map((value, index) => {
				let { breathing } = value
				return breathing
			})

			var chartDom = this.$refs.breathBar
			this.breathChart = echarts.init(chartDom)
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
				],
			}

			option && this.breathChart.setOption(option)
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

			this.heartChart.setOption({
				xAxis: {
					data: xData,
				},

				series: [
					{
						name: '心率',
						data: heartData,
					},
				],
			})
		},

		//更新呼吸心跳图数据
		updateBreathChart() {
			const { elderly_id } = this.roomData
			const originData = this.vitalIotData[elderly_id] || []
			const xData = originData.map((value, index) => {
				let { date } = value
				return date
			})

			const breathData = originData.map((value, index) => {
				let { breathing } = value
				return breathing
			})

			this.breathChart.setOption({
				xAxis: {
					data: xData,
				},

				series: [
					{
						name: '呼吸',
						data: breathData,
					},
				],
			})
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
			align-items: flex-start;
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
					height: 100px;
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
