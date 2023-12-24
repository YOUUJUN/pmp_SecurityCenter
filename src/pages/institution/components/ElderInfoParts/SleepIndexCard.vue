<template>
	<div id="content-main" class="content-main">
		<div class="leCont">
			<DialogCard v-for="(i, o) in 10" :key="o"></DialogCard>
		</div>
		<div id="content-right" class="content-right">
			<img src="~@/assets/images/sleepReport/riCont-top.png" alt="" srcset="" class="riCont" />
			<div class="riCont_top" id="riCont_top"></div>
			<div class="score-ranking-grade">98</div>
			<div class="score-ranking-tips">优秀</div>
			<div class="score-ranking">超过100%的用户</div>
			<div id="content-bottom" class="content-bottom">
				<div class="botTime">
					<div class="tCont">
						<div class="flex_alignCen">
							<div class="tPoint"></div>
							<div class="tTime ml5">上床时间：20:44</div>
						</div>
					</div>
					<div class="tCont">
						<div class="flex_alignCen">
							<div class="tPoint"></div>
							<div class="tTime ml5">入睡时间：23:18</div>
						</div>
					</div>
					<div class="tCont">
						<div class="flex_alignCen">
							<div class="tPoint"></div>
							<div class="tTime ml5">醒来时间：05:25</div>
						</div>
					</div>
					<div class="tCont" style="border: none">
						<div class="flex_alignCen">
							<div class="tPoint"></div>
							<div class="tTime ml5">起床时间：05:31</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dataTitle">
			<div>
				<div class="comment-details-indexs">
					<div v-for="(i, index) in 3" :key="index">
						<div class="comment-details-item is-alarm">
							<div class="comment-details-item-box">
								<div class="details-title">
									<div class="details-title-icon">
										<img src="~@/assets/images/sleepReport/th.png" alt="" srcset="" />
									</div>
									<div style="margin-right: 6px">睡眠时长</div>
									<div class="details-title-num">5</div>
									<div>小时</div>
									<div class="details-title-num">48</div>
									<div>分钟</div>
								</div>
								<div class="details-title ml24">
									<div>连续</div>
									<div class="details-title-num">3</div>
									<div>晚睡眠时长小于6小时</div>
								</div>
								<div class="ml24 details-consult">参考值：6~10小时</div>
								<el-collapse v-model="activeNames" @change="handleChange">
									<el-collapse-item title="详细解读" name="1">
										<div class="detailed-inter" style="height: 100%">
											<div class="detailed-inter-title"></div>
											<div>
												<div class="detailstr-circle">
													根据美国南佛罗里达大学衰老研究学院助理教授Soomi
													Lee研究发现，只需要连续3个晚上的睡眠时长小于6小时，就足以导致人的精神和身体健康状况出现严重恶化
												</div>
												<div class="detailstr-circle">建议您尝试如下改善：</div>
												<div class="advice-item">
													<img
														src="~@/assets/images/sleepReport/detail-time.png"
														alt=""
														srcset=""
													/>
													<div>制定规律的作息时间，并严格遵守</div>
												</div>
												<div class="advice-item">
													<img src="~@/assets/images/sleepReport/detail-2.png" alt="" srcset="" />
													<div>
														睡眠环境尽量避免光照和噪音，室温保持在18~24℃，选择舒适的床品，睡前泡脚放松
													</div>
												</div>
												<div class="advice-item">
													<img src="~@/assets/images/sleepReport/detail-3.png" alt="" srcset="" />
													<div>
														每周3～5次30分钟有氧运动，避开睡前3小时，放松心情，释放压力
													</div>
												</div>
												<div class="detailstr-circle">
													在尝试了上述方法后，您可以持续观察睡眠时长的变化，如果超过6个月依然没有改善，可以找专业的医生寻求帮助
												</div>
											</div>
										</div>
									</el-collapse-item>
								</el-collapse>
							</div>
						</div>
					</div>
					<div>
						<div class="comment-details-item is-alarm">
							<div class="comment-details-item-box">
								<div class="details-title">
									<div class="details-title-icon">
										<img src="~@/assets/images/sleepReport/th.png" alt="" srcset="" />
									</div>
									<div style="margin-right: 6px">睡眠时长</div>
									<div class="details-title-num">5</div>
									<div>小时</div>
									<div class="details-title-num">48</div>
									<div>分钟</div>
								</div>
								<div class="details-title ml24">
									<div>连续</div>
									<div class="details-title-num">3</div>
									<div>晚睡眠时长小于6小时</div>
								</div>
								<div class="ml24 details-consult">参考值：6~10小时</div>
								<el-collapse v-model="activeNames" @change="handleChange">
									<el-collapse-item title="详细解读" name="1">
										<div class="detailed-inter" style="height: 100%">
											<div class="detailed-inter-title">
												<!--                              <div>详细解读</div>-->
												<!--                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAbpJREFUSEvtlE9LAmEQxmdmVYJuHfoOHYIOQVAkYRRFEF26ZQqBabdOaXYRlJU69r8gt0wrqK8TkhRFEUG3ILLWfSeUNtJadxctKNrjzjvP753nnRmEH/7wh3nwD2y447/D0vGp2ZZmqakVXlyXihIr2LHBdoX+wFy7ABwDIgmYHyQXpFPL8r1VqC2gf2a+Q9N4FBHpHYDwSKimlbWlOytQy0DvdLSTWRshok85gsWTyynSOyuLt2ZQS0BvINKFhEMAxnPLwAWVKHO4lriuBTUF+oKRHgYc+CiCzEUGzgNS28f/zPCsOTCbXU1cGUFrAn3TUTcjeypFuaiBdJTdjOe9wbAHgdwVcRCqA+EgtZ68+ApqCLQqZnapauiXQF8gPMhE3VbtMrIdGY6VLTlX8RzVN5gMzQ8DQ1elTVwQTtd+Zjl2Y/Q2Bo2lScwnqU35VM/7VOFEKNJLjP36ATstXz06DEKVADLKRvLSEFgK+IMLfQJEH9gc6nLu23IAAEEsHexuxc9rWqoHS5U6HZCzs7b03PL6Y3re25bPLDWN2baoJ246+PWI25rDRoNqNs13wUq6/5Y23N2/b+krgf3CHTKTAioAAAAASUVORK5CYII=" alt="" srcset="">-->
											</div>
											<!--                            <div class="detailed-inter-line"></div>-->
											<div>
												<div class="detailstr-circle">
													根据美国南佛罗里达大学衰老研究学院助理教授Soomi
													Lee研究发现，只需要连续3个晚上的睡眠时长小于6小时，就足以导致人的精神和身体健康状况出现严重恶化
												</div>
												<div class="detailstr-circle">建议您尝试如下改善：</div>
												<div class="advice-item">
													<img
														src="~@/assets/images/sleepReport/detail-time.png"
														alt=""
														srcset=""
													/>
													<div>制定规律的作息时间，并严格遵守</div>
												</div>
												<div class="advice-item">
													<img src="~@/assets/images/sleepReport/detail-2.png" alt="" srcset="" />
													<div>
														睡眠环境尽量避免光照和噪音，室温保持在18~24℃，选择舒适的床品，睡前泡脚放松
													</div>
												</div>
												<div class="advice-item">
													<img src="~@/assets/images/sleepReport/detail-3.png" alt="" srcset="" />
													<div>
														每周3～5次30分钟有氧运动，避开睡前3小时，放松心情，释放压力
													</div>
												</div>
												<div class="detailstr-circle">
													在尝试了上述方法后，您可以持续观察睡眠时长的变化，如果超过6个月依然没有改善，可以找专业的医生寻求帮助
												</div>
											</div>
										</div>
									</el-collapse-item>
								</el-collapse>
								<div class="tdxq-con">
									<div class="le">体动详情</div>
									<div class="r">共252次</div>
								</div>
								<div class="tdxq-echarts" id="tdxq-echarts"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import DialogCard from './DialogCard.vue'
export default {
	components: {
		DialogCard,
	},
	data() {
		return {
			myChart: '',
			myChart1: '',
			option: {},
			option1: {},
			activeNames: ['1'],
		}
	},
	methods: {
		entry() {
			const eleNameEntry = document.getElementById('tooltiptext')
			eleNameEntry.style.display = 'block'
			console.log('entry' + JSON.stringify(eleNameEntry.style))
		},
		leave() {
			const eleNameLeave = document.getElementById('tooltiptext')
			eleNameLeave.style.display = 'none'
			console.log('leave')
		},
		initStatus() {
			const chartDom = document.getElementById('riCont_top')
			this.myChart = echarts.init(chartDom)
		},
		setInit() {
			this.option = {
				color: ['#3E82F4', '#e5ecf4'] /*饼状图的颜色*/,
				series: [
					{
						type: 'pie',
						radius: ['70%', '90%'],
						center: ['50%', '50%'],
						// adjust the start angle
						avoidLabelOverlap: false,
						itemStyle: {
							borderRadius: 5,
							borderWidth: 1,
						},
						startAngle: 180,
						data: [
							{ value: 900 },
							{ value: 100 },
							{
								value: 1000,
								itemStyle: {
									color: 'none',
									decal: {
										symbol: 'none',
									},
								},
								label: {
									show: false,
								},
							},
						],
						labelLine: {
							normal: {
								show: false,
							},
						},
						label: {
							normal: {
								show: false,
							},
						},
					},
				],
			}
			this.myChart.setOption(this.option)

			window.addEventListener('resize', () => {
				this.myChart.resize()
			})
		},
		handleChange(val) {
			console.log(val)
		},
		initTDXQ_echarts() {
			const chartDom = document.getElementById('tdxq-echarts')
			this.myChart1 = echarts.init(chartDom)
		},
		setTDXQ_echarts() {
			this.option1 = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						var content = params[0].name + '<br/>'
						for (var i = 0; i < params.length; i++) {
							content += params[i].seriesName + ' : ' + params[i].value + '<br/>'
						}
						return content
					},
				},
				grid: {
					left: 0,
					right: 0,
					bottom: 0,
					top: 10,
					containLabel: true,
					width: 'auto',
				},
				xAxis: [
					{
						show: false,
						type: 'category',
						data: [
							'0～1',
							'0～2',
							'0～3',
							'0～4',
							'0～1',
							'0～2',
							'0～3',
							'0～4',
							'0～5',
							'0～6',
							'0～7',
							'0～8',
							'0～9',
							'0～10',
							'0～11',
							'0～12',
							'0～13',
							'0～14',
							'0～15',
							'0～16',
							'0～17',
							'0～18',
							'0～19',
							'0～20',
							'0～21',
							'0～22',
							'0～23',
							'0～24',
							'0～25',
							'0～34',
							'0～34',
							'0～45',
						],
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
						// name: '体动次数',
						type: 'bar',
						// barWidth: '50%',
						itemStyle: {
							normal: {
								barBorderRadius: [10, 10, 0, 0],
							},
						},
						data: [10, 5, 6, 4, 8, 9, 2, 10, 5, 6, 10, 5, 6, 4, 8, 9, 2, 10, 5, 6, 4, 8, 9, 2, 4, 8, 9, 2],
					},
				],
			}
			this.myChart1.setOption(this.option1)

			window.addEventListener('resize', () => {
				this.myChart1.resize()
			})
		},
	},
	mounted() {
		this.initStatus()
		this.setInit()
		this.initTDXQ_echarts()
		this.setTDXQ_echarts()
	},
	created() {},
}
</script>

<style scoped>
.text {
	font-size: 14px;
}

.item {
	position: relative;
	width: 30rem;
	height: 6.7rem;
	border: 1px solid blue;
	margin: 1rem 0.5rem;
	background-color: #f3f4f7;
}

.content-main {
	display: flex;
	height: auto;
	flex-wrap: wrap;
}

.box-card {
	width: 85rem;
}

.content-left {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

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

.round {
	position: absolute;
	top: 1rem;
	left: 1rem;
	width: 0.8rem;
	height: 0.8rem;
	background: #1890ff;
	border-radius: 50%;
	line-height: 2rem;
}

.sleepTime {
	position: absolute;
	left: 3rem;
	margin-top: 0.5rem;
	font-size: 2rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	line-height: 2rem;
}

.status {
	position: absolute;
	top: 1rem;
	right: -0.5rem;
	font-size: 1.8rem;
	background-color: #ff7186;
	width: 4.8rem;
	height: 2rem;
	background: #1890ff;
	border-radius: 1rem 0 0 1rem;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #fff;
	margin-left: auto;
	left: 2px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.referenceValue {
	position: absolute;
	top: 3.5rem;
	width: 100%;
	font-size: 1.6rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	margin-left: 3.3rem;
	box-sizing: border-box;
	padding-right: 1rem;
}

.riCont_top {
	position: relative;
	padding-top: 20px;
	width: 100%;
	height: 18rem;
}

.score-ranking-grade {
	position: absolute;
	top: 14%;
	left: 48%;
	transform: translate(-50%, -45%);
	font-size: 3rem;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #1890ff;
	padding: 0 8px;
	border-radius: 15px;
}

.score-ranking-tips {
	position: absolute;
	top: 22%;
	left: 48%;
	-webkit-transform: translate(-50%, -45%);
	transform: translate(-50%, -45%);
	font-size: 2.5rem;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #fff;
	background: #1890ff;
	padding: 0 8px;
	border-radius: 15px;
}

.score-ranking {
	position: absolute;
	top: 28%;
	left: 12%;
	width: 18rem;
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

.botTime {
	height: auto;
	background: #e2f1ff;
	border-radius: 2px;
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
	margin: 20px auto 0;
	box-sizing: border-box;
	padding: 6px 10px;
}

.tCont {
	height: auto;
	padding: 10px 0;
	border-bottom: 1px solid #cce6ff;
}

.flex_alignCen {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.tPoint {
	width: 8px;
	height: 8px;
	background: #1890ff;
	opacity: 0.2;
	border-radius: 50%;
}

.tTime {
	font-size: 2rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #51a8f6;
	padding-left: 1rem;
}

.dataTitle {
	margin-top: 10px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	margin-bottom: 20px;
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
	position: relative;
	height: auto;
}

.comment-details-indexs {
	width: 111rem;
	margin-top: 8px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	flex-wrap: wrap;
}

.is-alarm {
	border: 1px solid rgba(255, 113, 134, 0.5);
}

.comment-details-item {
	width: 55rem;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-column-break-inside: avoid;
	-moz-column-break-inside: avoid;
	break-inside: avoid;
	margin-bottom: 10px;
}

.comment-details-item-box {
	width: 100%;
	height: 100%;
	padding: 16px 12px;
	background: #fff;
}

.details-title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	font-size: 20px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.details-title-num {
	color: #ff7186;
}

.detailed-inter {
	background: #f3f4f7;
	border-radius: 2px;
	padding: 12px;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	margin-top: 4px;
	overflow: hidden;
}

.detailed-inter-title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	overflow: hidden;
}

.detailed-inter-line {
	width: 100%;
	height: 1px;
	border: 1px solid #e8eaed;
	margin: 12px 0;
}

.detailstr-circle:before {
	content: '';
	display: inline-block;
	width: 3px;
	height: 3px;
	border-radius: 50%;
	background: #9094a6;
	position: relative;
	top: -4px;
}

.advice-item {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	margin: 5px 0;
}

.details-title img {
	width: 2rem;
	height: 2rem;
	margin-right: 0.4rem;
	position: relative;
	top: 0.3rem;
}

.detailed-inter .advice-item img {
	width: 34px;
	height: 34px;
	margin-right: 5px;
}

.el-collapse-item__header {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	height: 4.8rem;
	line-height: 4.8rem;
	background: #f3f4f7;
	color: #9094a6;
	cursor: pointer;
	font-size: 1.6rem;
	font-weight: 500;
	-webkit-transition: border-bottom-color 0.3s;
	transition: border-bottom-color 0.3s;
	outline: 0;
	padding-left: 1rem;
}

.el-collapse-item__content {
	padding-bottom: 0;
	font-size: 1.3rem;
	color: #303133;
	line-height: 1.769230769230769;
}

.ml24 {
	margin-left: 24px !important;
}

.tdxq-con {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: end;
	-ms-flex-align: end;
	align-items: flex-end;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
	margin: 8px 0;
	padding-top: 1rem;
}

.tdxq-con .le {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.tdxq-con .r {
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #a5a9bc;
}

.tdxq-echarts {
	width: 100%;
	height: 18rem;
}

.about {
	width: 2rem;
	height: 2rem;
	right: 4rem;
	position: absolute;
	left: 39.5rem;
	top: 40.5rem;
}

.about-tip {
	position: absolute;
	left: 39rem;
	top: 30rem;
	border: 2px solid #f3f4f7;
	background-color: #fff;
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.ahi-title {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.ahi-title:before {
	content: '';
	display: inline-block;
	width: 3px;
	height: 18px;
	background: #4d8ef7;
	border-radius: 2px;
	position: absolute;
}
</style>

<style>
.leCont {
	display: flex;
	width: 106rem;
	height: auto;
	background: #fff;
	border-radius: 2px;
	border: 1px solid #fff;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
}

.leList {
	width: 39.5rem;
	height: 8rem;
	background: #f3f4f7;
	border-radius: 2px;
	position: relative;
	padding: 10px 0;
	margin-right: 1rem;
	margin-bottom: 1rem;
	font-size: 2rem;
}

.ml10 {
	margin-left: 1rem !important;
}

.lePoint {
	width: 8px;
	height: 8px;
	background: #1890ff;
	border-radius: 50%;
}

.leTime {
	font-size: 2rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1890ff;
}

.tag {
	width: 48px;
	height: 20px;
	background: #1890ff;
	border-radius: 10px 0 0 10px;
	font-size: 14px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #fff;
	margin-left: auto;
	position: relative;
	left: 2px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.tag:after {
	width: 2px;
	height: 4px;
	content: '';
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAAXNSR0IArs4c6QAAAEZJREFUGFdj5A2b9Z8BBv4zHGBEFvj/768jQuA/w4HPq9MQAiDZL2syoVqgsiCjwFpgshCB0Fn7QXphFjHyhEx3AOmFCQAADc8s+5W9IfoAAAAASUVORK5CYII=)
		no-repeat;
	background-size: cover;
	position: absolute;
	right: 0;
	top: 20px;
}

.flex_alignCen {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.mt5 {
	margin-top: 5px;
}

.leCkz {
	width: 100%;
	font-size: 1.6rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	margin-left: 23px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding-left: 0.5rem;
}

.leName {
	padding-left: 1rem;
}

.tooltip {
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted #fff;
	height: 24px;
	margin-left: auto;
	right: 0.5rem;
}

.tooltiptext {
	width: 375px;
	background: #fff;
	-webkit-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	color: #ccc;
	border-radius: 6px;
	padding: 20px 20px;
	position: absolute;
	z-index: 1;
	top: -5px;
	left: 105%;
	top: -165px;
	left: -182px;
}

.ahi-title {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.ahi-title:before {
	content: '';
	display: inline-block;
	width: 3px;
	height: 18px;
	background: #4d8ef7;
	border-radius: 2px;
	position: absolute;
	top: 21px;
	left: 0;
}

.tooltiptext:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 8px;
	border-style: solid;
	border-color: #fff transparent transparent transparent;
}
</style>
