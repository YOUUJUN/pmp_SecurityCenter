<template>
	<el-dialog class="dlg" :visible="visible" @close="handleClose" @opened="handleDlgOpen">
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
					<div class="bar-chart" ref="bar"></div>
				</div>
				<div class="dlg-body-right">
					<div class="dlg-body-right-top">
						<span class="dlg-body-title">告警记录</span>
						<el-date-picker
							class="dlg-body-right-date"
							v-model="choicedDate"
							type="date"
							placeholder="选择日期"
						></el-date-picker>
					</div>

					<div class="dlg-body-right-bottom">
						<el-table class="dlg-table" :data="tableData" style="width: 100%">
							<el-table-column prop="date" label="时间" align="center"></el-table-column>
							<el-table-column prop="name" label="事件" align="center"></el-table-column>
							<el-table-column prop="address" label="操作" align="center"></el-table-column>
						</el-table>
					</div>

					<div class="dlg-body-right-footer">
						<el-pagination
							class="table-pagging"
							background
							layout="prev, pager, next"
							:total="1000"
							small
						></el-pagination>
					</div>
				</div>
			</section>

			<section class="monitor-chart-container">
				<div class="chart-head">
					<div class="chart-head-left">
						<img src="~@/assets/images/monitor.png" class="chart-logo" />
						<span class="chart-title">监测时段</span>
						<span class="chart-desc">(睡眠时长8小时23分钟)</span>
					</div>
				</div>

				<div class="chart-body">
					<div class="monitor-chart" ref="monitor"></div>
				</div>
			</section>
		</article>
	</el-dialog>
</template>
<script>
import * as echarts from 'echarts'
export default {
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
		handleClose() {
			this.$emit('update:visible', false)
		},

		//处理窗体打开
		handleDlgOpen() {
			this.drawHeartChart()
			this.drawMonitorChart()
		},

		//绘制呼吸心跳图
		drawHeartChart() {
			var chartDom = this.$refs.bar
			var myChart = echarts.init(chartDom)
			var option

			option = {
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					show: false,
				},
				xAxis: {
					type: 'category',
					show: false,
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
						data: [10, 11, 13, 11, 12, 12, 9],
						markLine: {
							data: [{ type: 'average', name: 'Avg' }],
						},
					},
					{
						name: '心率',
						type: 'line',
						showSymbol: false,
						data: [1, -2, 2, 5, 3, 2, 0],
						markLine: {
							data: [{ type: 'average', name: 'Avg' }],
						},
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制监测时段图表
		drawMonitorChart() {
			var chartDom = this.$refs.monitor
			var myChart = echarts.init(chartDom)
			var option

			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// Use axis to trigger tooltip
						type: 'none', // 'shadow' as default; can also be 'line' or 'shadow'
					},
				},
				legend: {
					right : '4%'
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
				series: [
					{
						name: '深睡',
						type: 'bar',
						barWidth: 20,
						stack: 'percent',
						label: {
							show: true,
						},
						// emphasis: {
						//   focus: 'series'
						// },
						data: [25],
					},
					{
						name: '浅睡',
						type: 'bar',
						stack: 'percent',
						label: {
							show: true,
						},
						emphasis: {
							focus: 'series',
						},
						data: [25],
					},
					{
						name: '清醒',
						type: 'bar',
						stack: 'percent',
						label: {
							show: true,
						},
						emphasis: {
							focus: 'series',
						},
						data: [25],
					},
					{
						name: '离床',
						type: 'bar',
						stack: 'percent',
						label: {
							show: true,
						},
						emphasis: {
							focus: 'series',
						},
						data: [25],
					},
				],
			}

			option && myChart.setOption(option)
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
		.dlg-body {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 400px;
			padding: 20px;

			.dlg-body-title {
				font-size: 17px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
			}

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

				.dlg-body-right-top {
					flex: none;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

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

		.monitor-chart-container {
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
			}
		}
	}
}
</style>
