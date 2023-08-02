<template>
	<article class="root">
		<section class="card-container">
			<div class="card-wrap bg1">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>守护老人</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg2">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>床位数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg3">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>入住率</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg4">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>设备数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg5">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>告警数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>
		</section>

		<section class="chart-container">
			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">设备类型分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart" ref="deviceCatChart"></div>
				</div>
			</div>

			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">设备类型分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart" ref="deviceStatusChart"></div>
				</div>
			</div>

			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">告警趋势分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart" ref="alertTrendChart"></div>
				</div>
			</div>

			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">告警状态分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart" ref="alertStatusChart"></div>
				</div>
			</div>
		</section>

		<section class="table-container">
			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">告警数据列表</span>
				</div>
				<div class="chart-wrap-body">
					<el-table class="table" :data="tableData" style="width: 100%">
						<el-table-column prop="date" label="序号" width="180"></el-table-column>
						<el-table-column prop="name" label="时间" width="180"></el-table-column>
						<el-table-column prop="address" label="区域"></el-table-column>
						<el-table-column prop="address" label="类型"></el-table-column>
						<el-table-column prop="address" label="状态"></el-table-column>
					</el-table>

					<el-pagination
						class="table-paging"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[100, 200, 300, 400]"
						:page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
						:total="400"
					></el-pagination>
				</div>
			</div>
		</section>

		<section class="device-container">
			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">告警数据列表</span>
				</div>
				<div class="chart-wrap-body">
					<div class="device-card">
						<div class="device-card-head">
							<img class="device-card-img" src="~@/assets/images/toilet.png" />
							<div class="device-card-desc">
								<span class="title">卫生间区域</span>
								<span class="desc">设备总数（154）</span>
							</div>
							<el-button class="device-card-num" type="danger" circle size="mini">30</el-button>
						</div>

						<div class="device-card-body">
							<span>152</span>
							<span>2</span>
							<span>873</span>
							<span>在线设备</span>
							<span>离线设备</span>
							<span>告警设备</span>
						</div>
					</div>

					<div class="device-card">
						<div class="device-card-head">
							<img class="device-card-img" src="~@/assets/images/toilet.png" />
							<div class="device-card-desc">
								<span class="title">卫生间区域</span>
								<span class="desc">设备总数（154）</span>
							</div>
							<el-button class="device-card-num" type="danger" circle size="mini">30</el-button>
						</div>

						<div class="device-card-body">
							<span>152</span>
							<span>2</span>
							<span>873</span>
							<span>在线设备</span>
							<span>离线设备</span>
							<span>告警设备</span>
						</div>
					</div>

					<div class="device-card">
						<div class="device-card-head">
							<img class="device-card-img" src="~@/assets/images/toilet.png" />
							<div class="device-card-desc">
								<span class="title">卫生间区域</span>
								<span class="desc">设备总数（154）</span>
							</div>
							<el-button class="device-card-num" type="danger" circle size="mini">30</el-button>
						</div>

						<div class="device-card-body">
							<span>152</span>
							<span>2</span>
							<span>873</span>
							<span>在线设备</span>
							<span>离线设备</span>
							<span>告警设备</span>
						</div>
					</div>

					<div class="device-card">
						<div class="device-card-head">
							<img class="device-card-img" src="~@/assets/images/toilet.png" />
							<div class="device-card-desc">
								<span class="title">卫生间区域</span>
								<span class="desc">设备总数（154）</span>
							</div>
							<el-button class="device-card-num" type="danger" circle size="mini">30</el-button>
						</div>

						<div class="device-card-body">
							<span>152</span>
							<span>2</span>
							<span>873</span>
							<span>在线设备</span>
							<span>离线设备</span>
							<span>告警设备</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</article>
</template>
<script>
import * as echarts from 'echarts'
export default {
	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
				},
			],

			currentPage: 4,
		}
	},

	mounted() {
		this.renderDeviceCategoryChart()
		this.renderDeviceStatusChart()
		this.renderAlertTrendChart()
		this.renderAlertStatusChart()
	},

	methods: {
		//绘制设备类型分析图表
		renderDeviceCategoryChart() {
			const chartDom = this.$refs.deviceCatChart
			const myChart = echarts.init(chartDom)

			let option = {
				tooltip: {
					trigger: 'item',
				},
				legend: {
					top: '5%',
					left: 'center',
				},
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['40%', '70%'],
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 10,
							borderColor: '#fff',
							borderWidth: 2,
						},
						label: {
							show: false,
							position: 'center',
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 40,
								fontWeight: 'bold',
							},
						},
						labelLine: {
							show: false,
						},
						data: [
							{ value: 1048, name: 'Search Engine' },
							{ value: 735, name: 'Direct' },
							{ value: 580, name: 'Email' },
							{ value: 484, name: 'Union Ads' },
							{ value: 300, name: 'Video Ads' },
						],
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制设备状态分析图表
		renderDeviceStatusChart() {
			const chartDom = this.$refs.deviceStatusChart
			const myChart = echarts.init(chartDom)

			let option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
						stack: 'Ad',
						emphasis: {
							focus: 'series',
						},
						data: [320, 332, 301, 334, 390, 330, 320],
					},
					{
						name: 'Email',
						type: 'bar',
						stack: 'Ad',
						emphasis: {
							focus: 'series',
						},
						data: [120, 132, 101, 134, 90, 230, 210],
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制告警趋势分析图表
		renderAlertTrendChart() {
			const chartDom = this.$refs.alertTrendChart
			const myChart = echarts.init(chartDom)
			let option = {
				title: {
					text: 'Stacked Line',
				},
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					data: ['Email', 'Union Ads', 'Video Ads'],
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true,
				},
				toolbox: {
					feature: {
						saveAsImage: {},
					},
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						name: 'Email',
						type: 'line',
						stack: 'Total',
						data: [120, 132, 101, 134, 90, 230, 210],
					},
					{
						name: 'Union Ads',
						type: 'line',
						stack: 'Total',
						data: [220, 182, 191, 234, 290, 330, 310],
					},
					{
						name: 'Video Ads',
						type: 'line',
						stack: 'Total',
						data: [150, 232, 201, 154, 190, 330, 410],
					},
				],
			}

			option && myChart.setOption(option)
		},

		//绘制告警状态分析图表
		renderAlertStatusChart() {
			const chartDom = this.$refs.alertStatusChart
			const myChart = echarts.init(chartDom)
			let option = {
				title: {
					text: 'Referer of a Website',
					subtext: 'Fake Data',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
				},
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: '50%',
						data: [
							{ value: 1048, name: 'Search Engine' },
							{ value: 735, name: 'Direct' },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			}

			option && myChart.setOption(option)
		},

		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
		},
	},
}
</script>
<style lang="less" scoped>
.root {
	padding: 35px 50px;
	background-color: #ebecee;
	.card-container {
		display: flex;
		justify-items: center;
		justify-content: space-between;
		margin-bottom: 35px;
		.card-wrap {
			width: 15%;
			display: flex;
			flex-direction: column;
			color: #fff;
			border-radius: 6px;
			padding: 16px 20px;
			.card-head {
				font-size: 20px;
			}

			.card-body {
				font-size: 20px;
				margin: 6px 0;
				margin-left: 35px;
			}

			.card-foot {
				align-self: flex-end;
				font-size: 16px;
			}
		}

		.bg1 {
			background-color: #5196ff;
		}

		.bg2 {
			background-color: #49a8ec;
		}

		.bg3 {
			background-color: #5472b4;
		}

		.bg4 {
			background-color: #f1bc45;
		}

		.bg5 {
			background-color: #d65f54;
		}
	}

	.chart-container {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-template-columns: repeat(2, 1fr);
		margin-bottom: 35px;
		column-gap: 35px;
		row-gap: 35px;
	}

	.table-container {
		margin-bottom: 35px;
		.chart-wrap-body {
			display: flex;
			flex-direction: column;
		}

		.table-paging {
			align-self: flex-end;
			margin: 16px 20px;
		}
	}

	.device-container {
		.chart-wrap-body {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			row-gap: 36px;
			column-gap: 76px;
			padding: 40px 56px;
		}

		.device-card {
			display: flex;
			flex-direction: column;
			height: 180px;
			padding: 20px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			.device-card-head {
				display: grid;
				grid-template-columns: 50px auto 50px;
				grid-template-rows: repeat(1, 1fr);
				align-items: center;
				justify-items: center;
				margin-bottom: 20px;
				.device-card-img {
					width: 36px;
					height: 36px;
				}

				.device-card-desc {
					display: flex;
					flex-direction: column;
					justify-self: start;
					padding-left: 16px;

					.title {
						font-size: 14px;
						margin-bottom: 6px;
					}

					.desc {
						font-size: 12px;
					}
				}

				.device-card-num {
					display: flex;
					width: 30px;
					height: 30px;
					align-items: center;
					justify-content: center;
				}
			}

			.device-card-body {
				flex: auto;
				padding: 12px 11px;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(2, 1fr);
				align-items: center;
				justify-items: center;
				font-size: 14px;
			}
		}
	}

	.chart-wrap {
		flex: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		overflow: hidden;
		.chart-wrap-head {
			width: 100%;
			display: flex;
			justify-content: space-between;
			background-color: #f7f7f8;
			padding: 18px 16px;
			font-size: 18px;
		}

		.chart-wrap-body {
			width: 100%;
			background-color: #fff;
			.chart {
				width: 100%;
				height: 400px;
			}
		}
	}
}
</style>
