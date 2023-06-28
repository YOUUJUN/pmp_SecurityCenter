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
				<div class="dlg-body-right-top">
					<span class="dlg-body-right-title">告警记录</span>
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
			this.drawBarChart()
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
						// itemStyle: {
						// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						// 		{ offset: 0, color: '#83bff6' },
						// 		{ offset: 0.5, color: '#188df0' },
						// 		{ offset: 1, color: '#188df0' },
						// 	]),
						// },
						// emphasis: {
						// 	itemStyle: {
						// 		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						// 			{ offset: 0, color: '#2378f7' },
						// 			{ offset: 0.7, color: '#2378f7' },
						// 			{ offset: 1, color: '#83bff6' },
						// 		]),
						// 	},
						// },
						data: data2,
					},
				],
			}
			myChart.on('click', function (params) {
				console.log('params', params)
			})

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
