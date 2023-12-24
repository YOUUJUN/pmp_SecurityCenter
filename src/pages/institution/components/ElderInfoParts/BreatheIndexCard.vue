<template>
	<div id="breath-content-main" class="breath-content-main">
		<div class="dataTitle">
			<div class="comment-details">
				<div class="comment-details-item">
					<div class="comment-details-item-box">
						<div class="details-title-breath">
							<div class="details-title">
								<div class="details-title-icon">
									<img
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAvdJREFUWEfVmUtIVFEYgL//TqO1aDIMMgoiChQRIio0sYXQrk3QAxdBEC0qjbqb0EWItChaNEGZLiIIgqhctGknuHAUoyJCEYUigiIjJZsWNU7OiXPvjM0dNec+Jm53OXP+/3zn8T+P4OFTnZ0GB2b3EjGaUewGqlFsAtZm1X1H+ARMIrxkPjNAf8Vz6erKuJ1O3AioYXMzGdpQ6jgiW9zIotQHRO5jcEsa4x+LlS0KUD1rrWQuehmRk0B5scqXGZdCqbuUpS9JfffMSrpWBFRDZguKm8CGlZS5/H+aiLTJvusP/ya3LKAa6FxFNKnBTruc2O3wXtKxc9Lc9WspwSUB1bC5BsVjFAfdzuZpvPAU4ag0xn8Uyi8CtHauLPnkn8HliDTkXOxQ4U4uBkyYPZ6OVQyoqLGnm50A5dqjaMleaYqfyd9FB2DWIB64PiYNV9cKsW22aPIdjHV7g4xIS77hLABariRdNuHJWtfXQu0p57rG78DXcddrBaaJztXkXNAfwMELtxFxbG/R2jc2wI5jzuFvHsHnkaJVOAYq1SP7b5zVv1mA2Qjx1rMTDhoQUhhs1xHHBkyYV4B2b8sFggfUKFelKd4hduD/9t51bM1fTSkAdezuX7dV1OD5esTweFmylKUAtI420yBq2Gwngz5i71+pAA06RCXMPuCwd7qS3UFtwn2iEhdGQepCCYga0zv4xZNzLrWR2PqnNeBPz/4vB1mqOwip/wIw7EccYiMRRkUNmTpzPuLLiit3Qs0Jp4qJezDz2pda280E4agjq2HXRSivsIFSs/DqGsxr+/PxWY46iFCnGaIxqGqwaaZGIJ30QZYVtUJdEMmCf5TFGnLJghWT/aZbWkkwNUk+qJ1uWYB2S8N7whpkTZK9xY6E1YL0k/IHW5NAYcpvAYa9aLIg7T5MOMvO3O1UYS7crV0Me+sja9XhbR4tHHWY22/53jK0DUwHZJhbwA7QsDbRCyO54xkiwx5Q1SBVjmcI1BTIJAYv/DxD/AYzNo3FnFbSYgAAAABJRU5ErkJggg=="
										alt=""
										srcset=""
									/>
								</div>
								<div style="margin-right: 6px">呼吸异常指数</div>
								<div
									class="details-title-num"
									:class="respiratoryDetails.inExRatio === '正常' ? 'color1890FF' : 'colorFFB971'"
								>
									{{ respiratoryDetails.respiratoryIndex }}
								</div>
								<div class="comment-box">
									<div class="tooltip">
										<img
											src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/wenhaoIcon.png"
											alt=""
											style="width: 2rem; height: 2rem"
											@mouseenter="entryTooltip"
											@mouseleave="leaveTooltip"
										/>
										<div
											class="tooltiptext-breath"
											id="tooltiptext-breath"
											style="top: -36.2rem; display: none"
										>
											<div class="ahi-title">
												呼吸异常指数是通过我们观察到的确信的呼吸异常事件发生的次数计算出来的，在一定程度上反应您呼吸的大概情况，这个指数越大，您在呼吸方面发生异常的风险越高。如果需要更精准的监测，可以使用我们的QS-600产品，数据仅供参考，如果有需要可以去专业的医疗机构寻求帮助。
											</div>
											<div class="ahi-item">AHI&lt;5 是健康</div>
											<div class="ahi-item ahi-item2">5≤AHI&lt;15 疑似低风险</div>
											<div class="ahi-item ahi-item2">15≤AHI&lt;30 疑似中风险</div>
											<div class="ahi-item ahi-item3">AHI≥30 疑似高风险</div>
										</div>
									</div>
								</div>
							</div>
							<span class="ml24 details-consult">{{ respiratoryDetails.reference }}</span>
							<div></div>
						</div>
						<div>
							<el-collapse v-model="activeNames" @change="handleChangeBreath">
								<el-collapse-item title="详细解读" name="1" style="padding-left: 1rem">
									<div class="detailed-inter">
										<div>
											<div class="detailstr-circle">
												呼吸异常指数是通过我们观察到的确信的呼吸异常事件发生的次数计算出来的，大于等于5即具有呼吸异常低风险
											</div>
											<div class="detailstr-circle">
												建议您平时要预防感冒，戒烟戒酒，采用侧睡体位，尽量不睡高枕头，保持呼吸道的通畅，必要时配合药物治疗，持续观察呼吸异常指数变化
											</div>
											<!--                      <div class="advice-item">-->
											<!--                        <img src="~@/assets/images/sleepReport/detail-time.png" alt="" srcset="">-->
											<!--                        <div> 制定规律的作息时间，并严格遵守</div>-->
											<!--                      </div>-->
											<!--                      <div class="advice-item">-->
											<!--                        <img src="~@/assets/images/sleepReport/detail-2.png" alt="" srcset="">-->
											<!--                        <div>睡眠环境尽量避免光照和噪音，室温保持在18~24℃，选择舒适的床品，睡前泡脚放松</div>-->
											<!--                      </div>-->
											<!--                      <div class="advice-item">-->
											<!--                        <img src="~@/assets/images/sleepReport/detail-3.png" alt="" srcset="">-->
											<!--                        <div>每周3～5次30分钟有氧运动，避开睡前3小时，放松心情，释放压力</div>-->
											<!--                      </div>-->
											<!--                      <div class="detailstr-circle">-->
											<!--                        在尝试了上述方法后，您可以持续观察睡眠时长的变化，如果超过6个月依然没有改善，可以找专业的医生寻求帮助-->
											<!--                      </div>-->
										</div>
									</div>
								</el-collapse-item>
							</el-collapse>
							<div class="breath-thing" v-if="respiratoryDetails.ahiExtendData">
								<div class="breath-thing-title">
									<div>呼吸事件</div>
									<div>次数</div>
								</div>
								<div class="detailed-inter-line"></div>
								<div class="breath-thing-title">
									<div>{{ respiratoryDetails.ahiExtendData.breathEventVo.breathEvent }}</div>
									<div>{{ respiratoryDetails.ahiExtendData.breathEventVo.frequency }}</div>
								</div>
							</div>
							<div class="breath-title" v-if="respiratoryDetails.ahiExtendData">
								<div class="breath-title-left">呼吸异常事件</div>
								<div class="breath-title-right">
									共{{ respiratoryDetails.ahiExtendData.breathEventVo.frequency }}次
								</div>
							</div>
							<div id="myChartsAHI1" class="myChartsAHI1"></div>
						</div>
					</div>
				</div>
				<div class="comment-details-item">
					<div class="comment-details-item-box">
						<!---->
						<div class="details-title">
							<div class="details-title-icon">
								<img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABRxJREFUWEfNmXtM1VUcwD/nXkilVYIa1+GjsoI53Sw0KO0117KslaBJ6VIMtzDMR85p5Zi1ZWtluHytP6CaLhUZkg/IHowehqTl0BzkZJgXvUyUfC1A4LRzf/f6u797f9ff715icf66O+f7+Nzz+H6/5/wE0bR86UiMZwLwuBCkIkkGhgK3+MxdBs4iqJeSw0Blcyu/slp0R+pORKIwaK1MuslBnoTZwLBIdAG3gC0d3aw/v1Q02dW1BZi0Xg7q6uJdJPOAfnaNh5FrR1DodLKqKU+ct7JlCZi4TmYJySfAYCtjEY63SMhrXiy230gvPGC+jHHFe8FejdBxpOKbPa0sZLXoNFM0BRy2Vg7odFKMZGqk3qKSF+yN6WKGe6n4J1g/FFDNXAK7ooUbPAByxsH9Q0FK+L4Rimqho8sCXbDXc4Hng2cyBNBVIDdFu6z3xENxJiTebIQ54IaZpdBpHWQ2exaL3EBtA6DvQHwZzTLFOmD/i5AS5ih98At8XGNtWUJW4MG5DugNJZ3URXtaM5JhwxQd4GIb9I+BfjFa39krML4QuqUlZIszhhR/CLoO6FonNyIxTK+lqQCB4gyYNFzr6OqGR7dA1mjIG68LpRfBqUs2rAo2eRaJBUrSC6gyRKyDk9EGYXUwjuSA06E5/64RZpdBZgqsf1IHmlYM1WdsAEL7tW5GqYzjBRxaINdIWGFL1URoyQOw/EF94PWvobgOZo6Ggif0/qnb4TePPS8C3j+7WKwU5EuHK55TUeRWr6dUF+zIgLhYzfGldkgthCsd8OZDsFCVFL6m9mCTKiPsNbenlZEisUCmCag20xk7BK5eg4a/9dEhcfBaKiT0h8Fx8PAIiPEtrZL6sBo+OqjJ734BxqsaB+1wfFEL/jNyoQ1qmuDH03pfMIOEdAW4QsCa4MFlafBGumZ4QTmUndAkip6BKaPMp6C2GZ7dAR3dcHsc/J4DDots/8c5yK2AExdCbUpYKVwFcieQGTx8YA7cOVDrrTgJ2Xu039VzYeRtocbU3nr5KzjvS1Ypg6BSFWU2WmsbPL0NGi8GCQt2KsCjwJhgO4fmQZKv/FTpalaZJnFwLozwAbZ1apu+pA62HQ+Nce89BrPHQKzTmrLqFGTtCpE7pgDPmQVnO4BVf0FWqbVztcyBKy0EjEuEjVNg+K2avsrbaZ/BaWOcbFGAbWbx778EDPcXpiVrkP72yh7Yp6Kx3tr/V8DJd8CW53Sa3HLY9WcoYK8vcbgZfOcRmH+fPjp5KxxvMUh7lzjqQ2J3D4YDrMnW9+CZy1qAD2pHhWudVJXz9GhOcU8AVRLY/5LutfAIvFVlEmbCBerePiTL02FJmg40owR+chsBvYE6XKrrbcDKWXpxqwL12E+hK6hW9Ka6cMVCbwLeNRB+nqPP1o7jsOibkP2nFQuq26zc6i3Afk7Y/JQxn2fvhooGI6BeboUpWO0AXu6AhlbrTOKXULOh0uTA/rpO81WYUAjXjBcqY8GqxINLfjuA9tHMJdXVYP4+KDdmD5UXjSW/Ug++NJVOh/QkzfDntbCiUvu9MwMm+u4ePQFUhcayb6GkPsSK+aVJiQVeO+9NgLcnglrG/B+gxVdG3R0PqyaF3n3twqqK+7AHth4Dt0l1Hfba6XfQk4u7XcgbyN344u5V7OHTR9SQdp8+lIO+/Xjkn4K+/PwWuEx99wEzgLJPPwEHzmaffUQPOZmBnyFAPQ+pzxCuoM8Q6pGjXsKhnnyG+BeV6jo4Y7ffQwAAAABJRU5ErkJggg=="
									alt=""
									srcset=""
								/>
							</div>
							<div class="" style="margin-right: 5px">吸呼比</div>
							<div class="details-title-num" style="color: rgb(24, 144, 255)">正常</div>
						</div>
						<el-collapse v-model="activeNames" @change="handleChangeBreath">
							<el-collapse-item title="详细解读" name="1" style="padding-left: 1rem">
								<div class="detailed-inter" style="height: 100%">
									<div>
										<div class="detailstr-circle">
											吸呼比是指吸气时长和呼气时长的比值，一般情况下，正常人的吸呼比集中在0.8~1.5之间，您的吸呼比落在正常范围内，无需担心。
										</div>
										<!--                    <div class="detailstr-circle">-->
										<!--                      建议您平时要预防感冒，戒烟戒酒，采用侧睡体位，尽量不睡高枕头，保持呼吸道的通畅，必要时配合药物治疗，持续观察呼吸异常指数变化-->
										<!--                    </div>-->
										<!--                      <div class="advice-item">-->
										<!--                        <img src="~@/assets/images/sleepReport/detail-time.png" alt="" srcset="">-->
										<!--                        <div> 制定规律的作息时间，并严格遵守</div>-->
										<!--                      </div>-->
										<!--                      <div class="advice-item">-->
										<!--                        <img src="~@/assets/images/sleepReport/detail-2.png" alt="" srcset="">-->
										<!--                        <div>睡眠环境尽量避免光照和噪音，室温保持在18~24℃，选择舒适的床品，睡前泡脚放松</div>-->
										<!--                      </div>-->
										<!--                      <div class="advice-item">-->
										<!--                        <img src="~@/assets/images/sleepReport/detail-3.png" alt="" srcset="">-->
										<!--                        <div>每周3～5次30分钟有氧运动，避开睡前3小时，放松心情，释放压力</div>-->
										<!--                      </div>-->
										<!--                      <div class="detailstr-circle">-->
										<!--                        在尝试了上述方法后，您可以持续观察睡眠时长的变化，如果超过6个月依然没有改善，可以找专业的医生寻求帮助-->
										<!--                      </div>-->
									</div>
								</div>
							</el-collapse-item>
						</el-collapse>
						<!--            <div class="mt10">-->
						<!--              <div class="draw_canvas-title clear"></div>-->
						<!--              <div class="colPicWrap draw_canvas" style="margin-top: 0px">-->
						<!--                <div class="colTop draw_canvas">-->
						<!--                  <div class="topIcon draw_canvas"></div>-->
						<!--                  <div class="topTit draw_canvas">参考范围</div>-->
						<!--                </div>-->
						<!--                <div class="colChartWrap draw_canvas">-->
						<!--                  <div id="myCharts_xhb" style="-->
						<!--                      height: 17rem;-->
						<!--                      margin: 0px auto;-->
						<!--                      user-select: none;-->
						<!--                      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);-->
						<!--                      position: relative;-->
						<!--                    ">-->
						<!--                    <div class=""></div>-->
						<!--                  </div>-->
						<!--                </div>-->
						<!--              </div>-->
						<!--              <div class="content-chart pd0" style="background: rgb(243, 244, 247); display: none">-->
						<!--                <div class="noVal mt15" style="height: 200px; color: rgb(144, 148, 166)">-->
						<!--                  暂无吸呼比-->
						<!--                </div>-->
						<!--              </div>-->
						<!--            </div>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	props: {
		respiratoryDetails: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			activeNames: [],
			myChart: null,
			option: {},
			myChartNormal: null,
			optionNormal: {},
			details: {},
		}
	},
	watch: {
		respiratoryDetails(value) {
			this.details = value
			this.initEcharts()
			this.setOption()
		},
	},
	methods: {
		entryTooltip() {
			console.log('entry' + JSON.stringify(this.respiratoryDetails))
			const entryTooltipEle = document.getElementById('tooltiptext-breath')
			entryTooltipEle.style.display = 'block'
		},
		leaveTooltip() {
			console.log('leave')
			const leaveTooltipEle = document.getElementById('tooltiptext-breath')
			leaveTooltipEle.style.display = 'none'
		},
		handleChangeBreath(val) {
			console.log(val)
		},
		initEcharts() {
			const chartDom = document.getElementById('myChartsAHI1')
			this.myChart = echarts.init(chartDom)
		},
		setOption() {
			this.option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					// formatter: function(params) {
					//   // var content = params[0].name + '<br/>';
					//   // for (var i = 0; i < params.length; i++) {
					//   //   content += params[i].seriesName + ' : ' + params[i].value + '<br/>';
					//   // }
					//   console.log(params)
					//   return params;
					// }
				},
				grid: {
					left: '5%',
					right: '5%',
					bottom: 0,
					top: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						show: true,
						type: 'category',
						data:
							this.respiratoryDetails.ahiExtendData === null
								? ''
								: this.respiratoryDetails.ahiExtendData.breathExEventVo.xtimeAxis,
						axisTick: {
							show: false,
							alignWithLabel: true,
							interval: 4,
							inside: true,
						},
						axisLine: {
							show: false,
						},
					},
				],
				yAxis: [
					{
						show: false,
						type: 'value',
					},
				],
				series: [
					{
						large: true,
						// name: '持续3秒',
						type: 'bar',
						// barWidth: 5,
						// barWidth: '50%',
						itemStyle: {
							normal: {
								// barBorderRadius: [10, 10, 0, 0],
							},
						},
						data:
							this.respiratoryDetails.ahiExtendData === null
								? ''
								: this.respiratoryDetails.ahiExtendData.breathExEventVo.data,
					},
				],
			}
			if (this.respiratoryDetails.ahiExtendData === null) {
				this.option.series[0].markLine = {}
			} else {
				this.option.series[0].markLine = {
					data: [
						{
							name: '平均值',
							type: 'average',
							yAxis: '1',
						},
					],
					symbolSize: 8,
					selected: false,
					lineStyle: {
						color: '#ddd',
					},
					symbol: 'none',
					label: {
						position: 'start', //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
						formatter: this.respiratoryDetails.ahiExtendData === null ? '' : '呼吸' + '\n' + '暂停',
					},
				}
			}
			this.myChart.setOption(this.option)

			window.addEventListener('resize', () => {
				this.myChart.resize()
			})
		},

		initEchartsNormal() {
			const chartDom = document.getElementById('myCharts_xhb')
			this.myChartNormal = echarts.init(chartDom)
		},
		setOptionNormal() {
			this.optionNormal = {
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
					right: '5%',
					bottom: 0,
					top: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						show: true,
						type: 'category',
						data: [
							'0',
							'0.1',
							'0.2',
							'0.3',
							'0.4',
							'0.5',
							'0.6',
							'0.7',
							'0.8',
							'0.9',
							'1',
							'1.1',
							'1.2',
							'1.3',
							'1.4',
							'1.5',
							'1.6',
							'1.7',
							'1.8',
							'1.9',
							'2',
							'2.1',
							'2.2',
							'2.3',
							'2.4',
							'2.5',
						],
						axisTick: {
							alignWithLabel: true,
							interval: 4,
							inside: true,
						},
					},
				],
				yAxis: [
					{
						show: true,
						type: 'value',
						axisLabel: {
							formatter: '{value} %', // 将y轴标签格式化为百分比
						},
					},
				],
				series: [
					{
						// name: '持续3秒',
						type: 'bar',
						// barWidth: '50%',
						itemStyle: {
							normal: {
								// barBorderRadius: [10, 10, 0, 0],
							},
						},
						data: [
							1, 10, 5, 6, 4, 8, 9, 2, 0, 5, 6, 10, 5, 6, 4, 8, 9, 2, 10, 5, 6, 4, 8, 9, 2, 4, 8, 9, 2,
						],
						markArea: {
							data: [
								[
									{
										xAxis: '0.8',
										itemStyle: {
											color: 'rgba(112, 100, 250, 0.12)',
											borderWidth: 1,
											borderColor: 'rgba(112, 100, 250, 0.6)',
											borderType: 'dashed',
										},
									},
									{
										xAxis: '1.5',
									},
								],
							],
							itemStyle: {
								color: 'rgba(220, 13, 13, 1)',
							},
							label: {
								show: true,
								position: 'bottom',
							},
						},
					},
				],
			}
			this.myChartNormal.setOption(this.optionNormal)

			window.addEventListener('resize', () => {
				this.myChartNormal.resize()
			})
		},
	},
	mounted() {
		this.initEcharts()
		this.setOption()
		// this.initEchartsNormal()
		// this.setOptionNormal()
	},
	created() {},
}
</script>

<style scoped>
.breath-content-main {
	width: 100%;
	display: flex;
	height: auto;
	flex-wrap: wrap;
}

.dataTitle {
	display: flex;
	margin-bottom: 20px;
	justify-content: flex-start;
	position: relative;
	height: auto;
}

.comment-details {
	width: 100%;
	column-count: 2;
	column-gap: 10px;
}

.comment-details-item {
	break-inside: avoid;
	margin-bottom: 10px;
}

.comment-details-item-box {
	width: 53.5rem;
	height: 100%;
	padding: 0 12px;
	background: #fff;
}

comment-details-item-box .details-title-breath {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
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

.comment-details-item-box .details-title .details-title-icon img {
	width: 20px;
	height: 20px;
	margin-right: 4px;
	position: relative;
}

.details-title .details-title-num {
	color: #ff7186;
}

.colorFFB971 {
	color: #ffb971 !important;
}

.colorFF7186 {
	color: #ff7186 !important;
}

.color1890FF {
	color: #1890ff !important;
}

.comment-box .tooltip {
	height: 34px;
	margin-left: 2rem;
	margin-bottom: 0;
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted #fff;
}

.comment-box .tooltip img {
	vertical-align: middle;
	border-style: none;
	left: 0.5rem;
}

.comment-box .tooltip .tooltiptext-breath {
	width: 375px;
	background: #fff;
	-webkit-box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	border-radius: 8px;
	color: #ccc;
	padding: 20px 20px;
	position: absolute;
	z-index: 1;
	top: -240px;
	left: -180px;
}

.ahi-title {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.comment-box .ahi-title:before {
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

.comment-box .ahi-item {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #5e6779;
	margin: 10px 0;
}

.comment-box .ahi-item:before {
	content: '';
	display: inline-block;
	width: 8px;
	height: 8px;
	background: #4d8ef7;
	border-radius: 50%;
	margin-right: 8px;
}

.comment-box .ahi-item2:before {
	background: #ffc471;
}

.comment-box .ahi-item3:before {
	background: #ff7186;
}

.tooltiptext-breath:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -5px;
	border-width: 8px;
	border-style: solid;
	border-color: #fff transparent transparent transparent;
}

.details-consult {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
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

.detailed-inter-title img {
	width: 14px;
	height: 14px;
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

.breath-thing {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	background: #f3f4f7;
	margin-top: 10px;
	padding: 8px 0;
}

.breath-thing-title {
	width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: distribute;
	justify-content: space-around;
}

.breath-thing-title div {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
}

.detailed-inter-line {
	width: 100%;
	height: 1px;
	border: 1px solid #e8eaed;
	margin: 12px 0;
}

.breath-thing-title {
	width: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: distribute;
	justify-content: space-around;
}

.comment-details .breath-title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.breath-title-left {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.breath-title .breath-title-right {
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #a5a9bc;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.myCharts:last-child {
	margin-bottom: 0;
}

.breath-title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.breath-title-right img {
	width: 20px;
	height: 20px;
	margin-left: 4px;
}

.dxhxEvent .dxlbWrap {
	margin-top: 5px;
	position: relative;
}

.el-carousel--horizontal {
	overflow-x: hidden;
}

.comment-details-item {
	-webkit-column-break-inside: avoid;
	-moz-column-break-inside: avoid;
	break-inside: avoid;
	margin-bottom: 10px;
}

.comment-details-item-box .details-title {
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

.details-title-icon img {
	width: 20px;
	height: 20px;
	margin-right: 4px;
	position: relative;
	top: -2px;
}

.details-title-num {
	color: #ff7186;
}

.colPicWrap .colTop {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding-top: 1rem;
}

.colPicWrap .colTop .topIcon {
	width: 16px;
	height: 5px;
	background: #f6f9fe;
	border: 1px dashed #1890ff;
}

.colPicWrap .colTop .topTit {
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1890ff;
	margin-left: 8px;
}

.ml24 {
	margin-left: 2.4rem !important;
}

.comment-details .comment-details-item .comment-details-item-box .details-consult {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
}

.myChartsAHI1 {
	width: 100%;
	height: 7rem;
}
</style>
