<template>
	<div class="riCont_top_Round" id="riCont_top_Round" style="height: 18rem"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
	data() {
		return {
			scheduleDataInfo: {},
			myChart: '',
		}
	},
	props: {
		sleepIndicatorsInfo: {
			type: Object,
			required: true,
		},
	},
	watch: {
		sleepIndicatorsInfo(value) {
			this.scheduleDataInfo = value
			this.echartsRound()
		},
	},
	mounted() {
		this.initRound()
		this.echartsRound()
	},
	methods: {
		initRound() {
			var chartDom = document.getElementById('riCont_top_Round')
			this.myChart = echarts.init(chartDom)
		},
		echartsRound() {
			const { Score, scoreLabel } = this.sleepIndicatorsInfo
			// 进度百分比
			var value = Score
			var option = {
				color: ['#3E82F4', '#e5ecf4'] /*饼状图的颜色*/,
				title: [
					{
						text: value,
						left: 'center',
						top: '30%',
						textStyle: {
							color: '#1890ff',
							fontSize: 20,
							fontWeight: 'bold',
						},
					},
					{
						text: scoreLabel,
						left: 'center',
						top: '50%',
						textStyle: {
							color: '#2892E8',
							fontSize: 20,
						},
					},
				],
				angleAxis: {
					show: false,
					// 后面的180表示圆环的跨越的角度， 如max设置为100*360/270,startAngle设置为-135
					max: (100 * 360) / 180,
					type: 'value',
					startAngle: 180,
					splitLine: {
						show: false,
					},
				},
				// 修改环形的宽度
				barMaxWidth: 20,
				radiusAxis: {
					show: false,
					type: 'category',
				},
				polar: {
					// 设置环形的位置
					center: ['50%', '66%'],
					// 设置环形大小
					radius: '190%',
				},
				series: [
					{
						type: 'bar',
						itemStyle: {
							borderRadius: 20,
						},
						data: [
							{
								value: value,
								itemStyle: {
									// 这里是已经达到进度的颜色
									color: '#1890ff',
								},
							},
						],
						barGap: '-100%',
						coordinateSystem: 'polar',
						z: 3,
					},
					{
						type: 'bar',
						itemStyle: {
							borderRadius: 20,
						},
						data: [
							{
								value: 100,
								itemStyle: {
									// 这里是环形底色
									// color: "rgba(0,0,0,.65)",
									borderWidth: 0,
								},
							},
						],
						barGap: '-100%',
						coordinateSystem: 'polar',
						z: 1,
					},
				],
			}
			this.myChart.setOption(option)
			window.addEventListener('resize', () => {
				this.myChart.resize()
			})
		},
	},
}
</script>

<style scoped>
.content-right {
	position: relative;
	width: 25rem;
	height: 48rem;
	background: url(~@/assets/images/sleepReport/riCont.png) no-repeat;
	background-size: cover;
	margin-left: auto;
}

.riCont {
	position: absolute;
	width: 23px;
	height: 34px;
	top: -23px;
	right: 0;
}

.riCont_top_Round {
	position: relative;
	//padding-top: 20px;
	width: 100%;
	height: 18rem;
}

.score-ranking {
	position: absolute;
	top: 29%;
	left: 9%;
	width: 20rem;
	text-align: center;
	background: #e4ecf5;
	border-radius: 1.3rem;
	padding: 0.2rem 1rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #5e6779;
	white-space: nowrap;
	font-size: 2rem;
}

.score-ranking:after {
	position: absolute;
	content: '';
	border: 8px solid transparent;
	border-bottom-color: #e4ecf5;
	top: -1.5rem;
	left: 46%;
}

.content-bottom {
	width: 23rem;
	height: auto;
	background: #e2f1ff;
	border-radius: 2px;
	backdrop-filter: blur(4px);
	margin: 3rem auto 0;
	box-sizing: border-box;
	padding: 6px 10px;
}

.tCont {
	width: 22rem;
	height: auto;
	padding: 10px 0;
	border-bottom: 1px solid #cce6ff;
}

.tCont .tCont_align {
	display: flex;
	align-items: center;
}

.tPoint {
	width: 8px;
	height: 8px;
	background: #1890ff;
	opacity: 0.2;
	border-radius: 50%;
	margin-right: 1rem;
}

.tCont .tCont_font {
	font-size: 2rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51a8f6;
}
</style>
