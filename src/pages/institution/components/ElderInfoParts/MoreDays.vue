<template>
	<div class="sevenDays">
		<div v-if="showMore" class="content">
			<div class="comNameTitWrap mt32">
				<div class="leCircle"></div>
				<div class="riFontWrap">
					<div class="fontName">睡眠指标</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 睡眠时长 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											平均睡眠时长
											<span class="colorFF7186">{{ count }}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ sleepDuration.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="deExplain">
								<div class="reportTrendsDataVo" id="reportTrendsDataVo" style="height: 180px"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 夜间醒来时长 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/Icon_alarm.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											过去30天出现连续
											<span class="colorFF7186">{{ wakeUpDuration.count }}</span>
											晚夜间醒来时长超过31分钟
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ wakeUpDuration.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="deExplain">
								<div class="reportTrendsDataVo" id="wakeUpDuration" style="height: 180px"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 深睡时长 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											平均深睡时长
											<span class="colorFF7186">{{ deepSleepDuration.count }}</span>
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ deepSleepDuration.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="deepSleepDuration" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!--离床次数-->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/Icon_alarm.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											最多离床次数
											<span class="colorFF7186">{{ outBedNum.indexVal }}次</span>
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ outBedNum.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">最高值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="outBedNum" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!--入睡时长-->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/Icon_alarm.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											平均入睡时长
											<span class="colorFF7186">{{ sleepStDuration.indexVal }}</span>
											分钟
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ sleepStDuration.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="sleepStDuration" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!--睡眠效率-->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											平均睡眠效率
											<span class="colorFF7186">{{ sleepEff.indexVal }}%</span>
											<!-- 小于80% -->
										</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ sleepEff.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="sleepEff" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!--体动指数-->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>平均体动指数{{ turnOverIndex.indexVal }}</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								{{ turnOverIndex.Ref }}
								<div class="referValRight">
									<div class="gangKuai"></div>
									<div class="gantTip">正常范围</div>
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="turnOverIndex" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 睡眠规律 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_index_icon_bed_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>睡眠规律</div>
									</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="sleepLawVo" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 呼吸率 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/h5_details_icon_breathe_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>呼吸率</div>
									</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="breathRateTrendsVo" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 心率 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/h5_details_icon_heart_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>心率</div>
									</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="heartRateTrendsVo" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="comNameTitWrap mt32">
				<div class="leCircle"></div>
				<div class="riFontWrap">
					<div class="fontName">呼吸详情</div>
				</div>
			</div>

			<div class="box-card">
				<!-- 吸呼比 -->
				<div class="nowListWrap">
					<div>
						<div class="nowList">
							<div class="nowTop">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/h5_details_icon_heart_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>
											吸呼比
											<span class="color1890FF ml10">{{ inExRatioIndexVal }}</span>
										</div>
									</div>
								</div>
							</div>
							<div style="padding-left: 1.4rem; margin: 0.5rem 0">
								<el-radio-group v-model="groupModel" @input="groupModelChnage">
									<el-radio v-for="(item, index) in inExRatio.dates" :key="index" :label="index">
										{{ item }}
									</el-radio>
								</el-radio-group>
							</div>
							<div class="referValRight" style="margin: 0.5rem 1.5rem">
								<div class="gangKuai"></div>
								<div class="gantTip">参考范围</div>
							</div>
							<div class="reportTrendsDataVo" id="inExRatio" style="height: 180px"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="box-card">
				<!--    呼吸异常指数平均  -->
				<div class="nowList">
					<div class="nowTop alignItemStart">
						<img
							src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
							class="goodImg mt5"
						/>
						<div class="titName ml10">
							<div>呼吸异常指数平均</div>
							<div class="color1890FF ml10 posRela flex_alignCen">
								{{ AHI.indexVal }}
								<div class="comment-box-more">
									<div class="tooltip">
										<img
											src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/wenhaoIcon.png"
											id="ahi"
											class="wenhaoImg"
											@mouseenter="entryAHI()"
											@mouseleave="leaveAHI()"
										/>
										<div
											class="tooltiptext"
											style="display: none; z-index: 9999"
											id="tooltiptext-AHI"
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
						</div>
						<!---->
					</div>
					<div class="referVal">
						{{ AHI.AHIRef }}
						<div class="referValRight">
							<div class="gangKuai"></div>
							<div class="gantTip">正常范围</div>
							<div class="gangWrap ml24">
								<div class="gang bgFF7186"></div>
								<div class="gang bgFF7186"></div>
								<div class="gang bgFF7186"></div>
							</div>
							<div class="gantTip">异常参考</div>
							<div class="gangWrap ml24">
								<div class="gang bg63B2FB"></div>
								<div class="gang bg63B2FB"></div>
								<div class="gang bg63B2FB"></div>
							</div>
							<div class="gantTip">平均值</div>
						</div>
					</div>
					<div>
						<div class="content-chart pd0">
							<div id="more_ahi" style="height: 110px; position: relative"></div>
						</div>
					</div>
				</div>
			</div>
			<!--   得分详情   -->
			<div class="comNameTitWrap mt32">
				<div class="leCircle"></div>
				<div class="riFontWrap">
					<div class="fontName">得分详情</div>
				</div>
			</div>
			<div class="box-card">
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>睡眠得分</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								<!-- 参考值-->
								平均值
								{{ sleepScore.indexVal }}
								<div class="referValRight">
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="sleepScore" style="height: 110px"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="box-card">
				<!--    跌倒风险  -->
				<div class="nowListWrap">
					<div>
						<div class="nowList nowList_Ques">
							<div class="nowTop alignItemStart">
								<img
									src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/report_icon_good_d@2x.png"
									class="goodImg"
								/>
								<div class="titName ml10">
									<div>
										<div>跌倒风险指数</div>
									</div>
								</div>
							</div>
							<div class="referVal">
								平均值
								{{ fallIndex.indexVal }}
								<div class="referValRight">
									<div class="gangWrap ml24">
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
										<div class="gang bg63B2FB"></div>
									</div>
									<div class="gantTip">平均值</div>
								</div>
							</div>
							<div class="reportTrendsDataVo" id="fallIndex" style="height: 110px"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div style="margin-left: 32rem">
				<img
					src="http://health.qingleitech.com/img/image_middle_empty_d@2x.1c9159e9.png"
					class="empty-img"
					style="padding-left: 5rem"
				/>
				<div style="width: 100%; font-size: 2rem; color: #909399">
					{{ errorMsgMore }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import { handelSevenDayReport } from '@/api/security'
import moment from 'moment'
export default {
	props: {
		partnerIdSeven: {
			type: Number,
			required: true,
		},
		sleepReportDataSeven: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			activeNames: [],
			myChart: '',
			option: '',
			reportTrendsDataVo: '',
			deepData: '',
			lightData: '',
			sleepDuration: '',
			sleepDay: '',
			count: '',
			groupModel: 1,
			wakeUpDuration: {}, // 夜醒时长
			deepSleepDuration: {}, // 平均深睡时长
			outBedNum: {}, // 最多离床次数
			sleepStDuration: {}, // 入睡时长
			sleepEff: {}, // 睡眠效率
			turnOverIndex: {}, //体动指数
			sleepLawVo: {}, // 睡眠规律
			breathRateTrendsVo: {}, // 呼吸率
			heartRateTrendsVo: {}, // 心率
			inExRatio: {}, // 吸呼比
			AHI: {}, // 呼吸异常指数
			sleepScore: {}, // 睡眠得分
			fallIndex: {},
			inExRatioIndexVal: '',
			partnerIdMore: 0,
			sleepReportDataMore: '',
			showMore: false,
			errorMsgMore: '',
			inExRatioDataMore: '',
			sleepCountMax: 540,
			sleepCountAvg: 0,
		}
	},
	methods: {
		entryAHI() {
			document.getElementById('tooltiptext-AHI').style.display = 'block'
		},
		leaveAHI() {
			document.getElementById('tooltiptext-AHI').style.display = 'none'
		},
		handleChange(val) {
			console.log(val)
		},
		initEcharts() {
			var chartDom = document.getElementById('reportTrendsDataVo')
			this.myChart = echarts.init(chartDom)
		},
		setOption() {
			this.option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'line', // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function (params) {
						console.log(params[0].data)
						const num1 = parseInt(params[0].value)
						const num2 = parseInt(params[1].value)
						const total = num1 + num2
						// 总时间
						var quotient = Math.floor(total / 60)
						var remainder = total % 60
						// 深睡时长
						var quotientDeep = Math.floor(num1 / 60)
						var remainderDeep = num1 % 60
						// 浅睡时长
						var quotientLight = Math.floor(num2 / 60)
						var remainderLight = num2 % 60

						if (isNaN(params[0].data) && typeof params[0].data === 'number') {
							quotient = '-'
							remainder = '-'
							quotientDeep = '-'
							remainderDeep = '-'
							quotientLight = '-'
							remainderLight = '-'
						}
						return (
							params[0].name +
							'<br/>' +
							'睡眠时长：' +
							quotient +
							'小时' +
							remainder +
							'分钟' +
							'<br/>' +
							params[0].marker +
							'深睡时长：' +
							quotientDeep +
							'小时' +
							remainderDeep +
							'分钟' +
							'<br/>' +
							params[1].marker +
							'浅睡时长：' +
							quotientLight +
							'小时' +
							remainderLight +
							'分钟'
						)
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: this.reportTrendsDataVo.xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: Math.ceil(this.sleepCountMax / 180) * 180,
					interval: 180,
					splitNumber: 3,
					// indexVal: 100,
					axisLabel: {
						show: true,
						formatter: function (value, index) {
							return (value / 180) * 3 + 'h'
						},
					},
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: '使用情况',
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: this.sleepCountAvg }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 360,
									},
									{
										yAxis: 540,
									},
								],
							],
						},
						itemStyle: {
							normal: {
								color: '#448ef7',
							},
						},
						data: this.deepData,
					},
					{
						name: '浅睡时长',
						type: 'bar',
						stack: '使用情况',
						data: this.lightData,
						itemStyle: {
							normal: {
								color: '#bc96f7',
								borderRadius: [10, 10, 0, 0],
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

		setWakeUpDuration() {
			let chartDom = document.getElementById('wakeUpDuration')
			let { xaxis, data, indexVal } = this.wakeUpDuration

			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						var num1 = parseInt(params[0].value)
						if (isNaN(num1) && typeof num1 === 'number') {
							num1 = '-'
						}
						return params[0].name + '<br/>' + '夜醒时长：' + num1 + '分钟'
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 300,
					splitNumber: 3,
					// indexVal: 100,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						// label: {
						//   show: true,
						//   position: "top",
						// },
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 0,
									},
									{
										yAxis: 31,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setDeepSleepDuration() {
			let chartDom = document.getElementById('deepSleepDuration')
			let { xaxis, data, indexVal } = this.deepSleepDuration
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						var num1 = parseInt(params[0].value)
						if (isNaN(num1) && typeof num1 === 'number') {
							num1 = '-'
						}
						return params[0].name + '<br/>' + '深睡时长：' + num1 + '%'
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					// min: 0,
					// max: 100,
					interval: 10,
					splitNumber: 3,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 20,
									},
									{
										yAxis: 60,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setOutBedNum() {
			let chartDom = document.getElementById('outBedNum')
			let { xaxis, data, indexVal, count } = this.outBedNum
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						var num1 = parseInt(params[0].value)
						if (isNaN(num1) && typeof num1 === 'number') {
							num1 = '-'
						}
						return params[0].name + '<br/>' + '离床：' + num1 + '次'
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: +count,
					splitNumber: 2,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 0,
									},
									{
										yAxis: 2,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setSleepEff() {
			let chartDom = document.getElementById('sleepEff')
			let { xaxis, data, indexVal } = this.sleepEff
			let max = Math.max(...data.join(',').replaceAll('-', 0).split(','))
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						var num1 = parseInt(params[0].value)
						if (isNaN(num1) && typeof num1 === 'number') {
							num1 = '-'
						}
						return params[0].name + '<br/>' + '睡眠效率：' + num1 + '%'
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: max > 90 ? 100 : 90,
					interval: max > 90 ? 25 : 30,
					splitNumber: max > 90 ? 4 : 3,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 80,
									},
									{
										yAxis: 100,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setSleepStDuration() {
			let chartDom = document.getElementById('sleepStDuration')
			let { xaxis, data, indexVal } = this.sleepStDuration
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						let num1 = parseInt(params[0].value)
						if (isNaN(num1) && typeof num1 === 'number') {
							num1 = '-'
						}
						return params[0].name + '<br/>' + '入睡时长：' + num1 + '分钟'
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 100,
					splitNumber: 2,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 0,
									},
									{
										yAxis: 30,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setTurnOverIndex() {
			let chartDom = document.getElementById('turnOverIndex')
			let { xaxis, data, indexVal } = this.turnOverIndex
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						var num1 = params[0].value
						return params[0].name + '<br/>' + '体动指数：' + num1
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 20,
					splitNumber: 2,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							lineStyle: {
								// color: {
								//   type: "linear",
								//   x: 0,
								//   y: 0,
								//   x2: 0,
								//   y2: 1,
								//   colorStops: [
								//     {
								//       offset: 0,
								//       color: "red", // 0% 处的颜色
								//     },
								//     {
								//       offset: 1,
								//       color: "blue", // 100% 处的颜色
								//     },
								//   ],
								//   global: false, // 缺省为 false
								// },
							},
							emphasis: {
								disabled: true,
							},
							data: [{ yAxis: +indexVal }],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 1.25,
									},
									{
										yAxis: 15,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setSleepLawVo() {
			let chartDom = document.getElementById('sleepLawVo')
			//
			let { xaxis, sleepLawDataList, sleepLawData1, sleepLawData2 } = this.sleepLawVo
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						const name = params[0].name
						console.log('params====', params)
						let sleepItem = sleepLawDataList.find((item) => {
							return item.date === name
						})
						var getBedIdx = sleepItem.getBedIdx
						var sleepStIdx = sleepItem.sleepStIdx
						var sleepEdIdx = sleepItem.sleepEdIdx
						var leaveBedIdx = sleepItem.leaveBedIdx
						if (isNaN(getBedIdx) && typeof getBedIdx === 'number') {
							getBedIdx = '-'
						}
						if (isNaN(sleepStIdx) && typeof sleepStIdx === 'number') {
							sleepStIdx = '-'
						}
						if (isNaN(sleepEdIdx) && typeof sleepEdIdx === 'number') {
							sleepEdIdx = '-'
						}
						if (isNaN(leaveBedIdx) && typeof leaveBedIdx === 'number') {
							leaveBedIdx = '-'
						}
						// 夜醒时长
						return (
							params[1].marker +
							'上床时间：' +
							getBedIdx +
							'<br/>' +
							params[1].marker +
							'入睡时间：' +
							sleepStIdx +
							'<br/>' +
							params[1].marker +
							'醒来时间：' +
							sleepEdIdx +
							'<br/>' +
							params[1].marker +
							'起床时间：' +
							leaveBedIdx +
							'<br/>'
						)
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 30,
					splitNumber: 3,
					axisLabel: {
						show: true,
						// color: "rgba(37, 224, 211, 1)",
						formatter: function (value, index) {
							const timeAMPM = ['8PM', '0AM', '4AM', '8AM']
							return timeAMPM[index]
						},
					},
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						silent: true,
						itemStyle: {
							borderColor: 'transparent',
							color: 'transparent',
						},
						emphasis: {
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent',
							},
						},
						data: sleepLawData1,
					},
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						data: sleepLawData2,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setBreathRateTrendsVo() {
			let chartDom = document.getElementById('breathRateTrendsVo')
			let { xaxis, dataList, breathRateTrendsVoData1, breathRateTrendsVoData2 } = this.breathRateTrendsVo
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						const name = params[0].name
						console.log('params====', params)
						let breathRateItem = dataList.find((item) => {
							return item.date === name
						})

						var max = breathRateItem.max
						var min = breathRateItem.min
						var avg = breathRateItem.avg
						if (isNaN(max) && typeof max === 'number') {
							max = '-'
						}
						if (isNaN(min) && typeof min === 'number') {
							min = '-'
						}
						if (isNaN(avg) && typeof avg === 'number') {
							avg = '-'
						}

						// 夜醒时长
						return (
							params[1].marker +
							'最高：' +
							max +
							'<br/>' +
							params[1].marker +
							'最低：' +
							min +
							'<br/>' +
							params[1].marker +
							'平均：' +
							avg
						)
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 30,
					splitNumber: 3,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'breathRateTrendsVo',
						silent: true,
						itemStyle: {
							borderColor: 'transparent',
							color: 'transparent',
						},
						emphasis: {
							focus: 'series',
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent',
							},
						},
						data: breathRateTrendsVoData1,
					},
					{
						name: '',
						type: 'bar',
						stack: 'breathRateTrendsVo',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 10, 10],
						},
						emphasis: {
							focus: 'series',
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						data: breathRateTrendsVoData2,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setHeartRateTrendsVo() {
			let chartDom = document.getElementById('heartRateTrendsVo')
			let { xaxis, dataList, heartRateTrendsVoData1, heartRateTrendsVoData2 } = this.heartRateTrendsVo
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						const name = params[0].name
						console.log('params====', params)
						let breathRateItem = dataList.find((item) => {
							return item.date === name
						})
						var max = breathRateItem.max
						var min = breathRateItem.min
						var avg = breathRateItem.avg

						if (isNaN(max) && typeof max === 'number') {
							max = '-'
						}
						if (isNaN(min) && typeof min === 'number') {
							min = '-'
						}
						if (isNaN(avg) && typeof avg === 'number') {
							avg = '-'
						}
						// 夜醒时长
						return (
							params[1].marker +
							'最高：' +
							max +
							'<br/>' +
							params[1].marker +
							'最低：' +
							min +
							'<br/>' +
							params[1].marker +
							'平均：' +
							avg
						)
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 40,
					max: 80,
					interval: 20,
					splitNumber: 2,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'breathRateTrendsVo',
						silent: true,
						itemStyle: {
							borderColor: 'transparent',
							color: 'transparent',
						},
						emphasis: {
							focus: 'series',
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent',
							},
						},
						data: heartRateTrendsVoData1,
					},
					{
						name: '',
						type: 'bar',
						stack: 'breathRateTrendsVo',
						// itemStyle: {
						//   borderColor: "transparent",
						//   // color: "#00ff00",
						// },
						emphasis: {
							focus: 'series',
						},
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 10, 10],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						data: heartRateTrendsVoData2,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		setInExRatio(xaxis, data) {
			data = data.map((item) => {
				return item * 100
			})
			const max = Math.max(...data)
			let chartDom = document.getElementById('inExRatio')
			let myChart = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// 夜醒时长
						const num1 = params[0].value.toFixed(2) + '%'
						const axisValue = params[0].axisValue

						return params[0].marker + num1 + '吸呼比</br>集中在' + axisValue
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					axisLabel: {
						show: true,
						formatter: function (value, index) {
							if (['0.1', '0.5', '1', '1.5', '2', '2.5'].includes(value)) {
								return value
							}
							return ''
						},
					},
					data: xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: Math.ceil(max) + 1,
					interval: Math.floor((Math.ceil(max) + 1) / 4),
					splitNumber: 4,
					axisLabel: {
						show: true,
						formatter: function (value, index) {
							return value + '%'
						},
					},
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										xAxis: '0.8',
										// yAxis: 0,
									},
									{
										xAxis: '1.6',
										// yAxis: 0.8,
									},
								],
							],
						},
						data: data,
					},
				],
			}
			myChart.setOption(option)
			window.addEventListener('resize', () => {
				myChart.resize()
			})
		},

		groupModelChnage(index) {
			const date = this.inExRatio.dates[index]
			const inExRatioDataoBJ = this.inExRatio.reportTrendsDataVo.find((item) => {
				return item.date === date
			})
			const { inExRatioData } = inExRatioDataoBJ
			const { xaxis, data } = inExRatioData

			console.log('inExRatioData======', inExRatioData)
			console.log('e======', xaxis, data)
			this.setInExRatio(xaxis, data)
		},

		setAHI() {
			let chartDom = document.getElementById('more_ahi')
			let { indexName, indexVal, AHIRef, reportTrendsDataVo } = this.AHI
			let myChartAHI = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						return params[0].axisValue + '<br/>' + '呼吸异常平均指数：' + params[0].value
					},
				},
				legend: {},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '15%',
					top: '5%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					data:
						reportTrendsDataVo.xaxis == ''
							? this.sleepScore.reportTrendsDataVo.xaxis
							: reportTrendsDataVo.xaxis,
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 20,
					splitLine: {
						show: false,
					},
					// splitNumber: 2,
				},
				series: [
					{
						name: '',
						type: 'bar',
						stack: 'Total',
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#448ef7' }, // 起始颜色
								{ offset: 1, color: '#cee1fd' }, // 结束颜色
							]),
							borderRadius: [10, 10, 0, 0],
						},
						// label: {
						//   show: true,
						//   position: "top",
						// },
						barWidth: 15,
						markLine: {
							symbol: 'none',
							label: {
								show: false,
							},
							// lineStyle: {
							// },
							emphasis: {
								disabled: true,
							},
							data: [
								{
									yAxis: 5,
									lineStyle: {
										color: 'red',
									},
								},
								{
									yAxis: indexVal,
									lineStyle: {
										color: '#63b2fb',
									},
								},
							],
						},
						markArea: {
							silent: true,
							itemStyle: {
								color: '#e7f3ff',
								borderWidth: 0,
								// borderType: "dashed",
							},
							data: [
								[
									{
										yAxis: 0,
									},
									{
										yAxis: 5,
									},
								],
							],
						},
						data: reportTrendsDataVo.data,
					},
				],
			}
			myChartAHI.setOption(option)
			window.addEventListener('resize', () => {
				myChartAHI.resize()
			})
		},

		setSleepScore() {
			let chartDom = document.getElementById('sleepScore')
			let { indexName, indexVal, reportTrendsDataVo } = this.sleepScore
			let myChartSleepScore = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						// textStyle: {
						//   color: "#fff"
						// }
					},
				},
				grid: {
					left: '5%',
					right: '3%',
					top: '5%',
					bottom: '20%',
					containLabel: false,
				},
				xAxis: {
					type: 'category',
					data: reportTrendsDataVo.xaxis,
					boundaryGap: true,
					// axisLabel: {
					//   show: false
					// },
					// axisTick: {
					//   show: false
					// },
					// axisLine: {
					//   show: false
					// }
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 100,
					splitNumber: 2,
					splitLine: {
						show: false,
					},
				},
				series: [
					{
						data: reportTrendsDataVo.data,
						// itemStyle: {
						//   color: "#0770FF",
						// },
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#cee1fd' }, // 起始颜色
								{ offset: 1, color: '#0770FF' }, // 结束颜色
							]),
						},
						type: 'line',
						areaStyle: {},
						markLine: {
							data: [
								{
									// 起点和终点的项会共用一个 name
									name: '平均值',
									type: 'average',
								},
							],
							silent: true,
							symbol: 'none',
							label: {
								position: 'start',
								formatter: function () {
									return ''
								},
							},
						},
					},
				],
			}
			myChartSleepScore.setOption(option)
			window.addEventListener('resize', () => {
				myChartSleepScore.resize()
			})
		},

		setFallIndex() {
			let chartDom = document.getElementById('fallIndex')
			let { indexName, indexVal, reportTrendsDataVo } = this.fallIndex
			let myChartFallIndex = echarts.init(chartDom)
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						// textStyle: {
						//   color: "#fff"
						// }
					},
				},
				grid: {
					left: '5%',
					right: '3%',
					top: '5%',
					bottom: '20%',
					containLabel: false,
				},
				xAxis: {
					type: 'category',
					data: reportTrendsDataVo.xaxis,
					boundaryGap: true,
					// axisLabel: {
					//   show: false
					// },
					// axisTick: {
					//   show: false
					// },
					// axisLine: {
					//   show: false
					// }
				},
				yAxis: {
					type: 'value',
					min: 0,
					max: 100,
					splitNumber: 2,
					splitLine: {
						show: false,
					},
				},
				series: [
					{
						data: reportTrendsDataVo.data,
						itemStyle: {
							color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
								{ offset: 0, color: '#cee1fd' }, // 起始颜色
								{ offset: 1, color: '#0770FF' }, // 结束颜色
							]),
						},
						type: 'line',
						areaStyle: {},
						markLine: {
							data: [
								{
									// 起点和终点的项会共用一个 name
									name: '平均值',
									type: 'average',
								},
							],
							silent: true,
							symbol: 'none',
							label: {
								position: 'start',
								formatter: function () {
									return ''
								},
							},
						},
					},
				],
			}
			myChartFallIndex.setOption(option)
			window.addEventListener('resize', () => {
				myChartFallIndex.resize()
			})
		},

		async reqGetSevenDaysInfo() {
			this.partnerIdMore = this.partnerIdSeven
			this.sleepReportDataMore = document.getElementById('margin-five').innerText
			await handelSevenDayReport({
				partner_id: this.partnerIdMore,
				search_report: this.sleepReportDataMore,
				days: '30',
			})
				.then(
					(res) => {
						if (res.status === 200 && res.data.result === 'success') {
							this.showMore = true
							this.sleepDuration = res.data.data.sleepDuration
							this.reportTrendsDataVo = res.data.data.sleepDuration.reportTrendsDataVo

							this.sleepDay = ''
							console.log(res.data.data)
							this.deepData = this.reportTrendsDataVo.deepData.map((num) => {
								if ('-' === num || !num) {
									num = 0
								}
								return parseInt(num)
							})

							this.lightData = this.reportTrendsDataVo.lightData.map((num) => {
								if ('-' === num || !num) {
									num = 0
								}
								return parseInt(num)
							})

							// 睡眠低于多少天 count
							var newArray = []
							for (let i = 0; i < this.deepData.length; i++) {
								var ele = this.deepData[i] + this.lightData[i]
								newArray.push(ele)
							}
							let sum =
								newArray.reduce((n, m) => {
									return +n + +m
								}) / newArray.length
							// 平均睡眠最大值
							this.sleepCountMax = Math.max(...newArray)

							this.sleepCountAvg = sum

							this.count = `${Math.floor(sum / 60)}小时${Math.floor(sum % 60)}分钟`

							// --- 夜醒时长 start----
							let { Ref, indexVal, reportTrendsDataVo } = res.data.data.wakeUpDuration
							let { xaxis, data } = reportTrendsDataVo
							this.wakeUpDuration.Ref = Ref
							this.wakeUpDuration.xaxis = xaxis
							this.wakeUpDuration.data = data
							this.wakeUpDuration.indexVal = indexVal
							// 夜醒时长超过31分钟
							this.wakeUpDuration.count = data.filter((num) => num > 31).length
							// --- 夜醒时长 end----

							// --- 平均深睡时长 start---
							let deepSleepDuration = res.data.data.deepSleepDuration
							this.deepSleepDuration.Ref = deepSleepDuration.Ref
							this.deepSleepDuration.indexVal = deepSleepDuration.indexVal
							this.deepSleepDuration.xaxis = deepSleepDuration.reportTrendsDataVo.xaxis
							this.deepSleepDuration.data = deepSleepDuration.reportTrendsDataVo.data
							// 平均深睡时长少于20%
							const deepDataSum = this.deepData.reduce((n, m) => {
								return n + m
							})
							this.deepSleepDuration.count = `${Math.floor(deepDataSum / 60)}小时${
								deepDataSum % 60
							}分钟(${deepSleepDuration.indexVal}%)`
							// --- 平均深睡时长 end---

							// --- 最多离床次数 start---
							let outBedNum = res.data.data.outBedNum
							this.outBedNum.Ref = outBedNum.Ref
							this.outBedNum.indexVal = outBedNum.indexVal
							this.outBedNum.xaxis = outBedNum.reportTrendsDataVo.xaxis
							this.outBedNum.data = outBedNum.reportTrendsDataVo.data
							// 最多离床次数
							this.outBedNum.count = Math.max(...outBedNum.reportTrendsDataVo.data)
							// --- 最多离床次数 end---

							// --- 入睡时长 start---
							let sleepStDuration = res.data.data.sleepStDuration
							this.sleepStDuration.Ref = sleepStDuration.Ref
							this.sleepStDuration.indexVal = sleepStDuration.indexVal
							this.sleepStDuration.xaxis = sleepStDuration.reportTrendsDataVo.xaxis
							this.sleepStDuration.data = sleepStDuration.reportTrendsDataVo.data
							// 平均入睡时长

							this.sleepStDuration.count = (
								sleepStDuration.reportTrendsDataVo.data.reduce((n, m) => {
									return +n + +m
								}) / sleepStDuration.reportTrendsDataVo.data.length
							).toFixed(1)
							// --- 入睡时长 end---

							// --- 睡眠效率 start---
							let sleepEff = res.data.data.sleepEff
							this.sleepEff.Ref = sleepEff.Ref
							this.sleepEff.indexVal = sleepEff.indexVal.split('%')[0]
							this.sleepEff.xaxis = sleepEff.reportTrendsDataVo.xaxis
							this.sleepEff.data = sleepEff.reportTrendsDataVo.data
							this.sleepEff.count = sleepEff.reportTrendsDataVo.data.filter((num) => num < 80).length
							// --- 睡眠效率 end---

							// --- 体动指数 start---
							let turnOverIndex = res.data.data.turnOverIndex
							this.turnOverIndex.Ref = turnOverIndex.Ref
							this.turnOverIndex.indexVal = turnOverIndex.indexVal
							this.turnOverIndex.xaxis = turnOverIndex.reportTrendsDataVo.xaxis
							this.turnOverIndex.data = turnOverIndex.reportTrendsDataVo.data
							this.turnOverIndex.count = turnOverIndex.reportTrendsDataVo.data.filter(
								(num) => num < 80,
							).length
							// --- 体动指数 end---

							// --- 睡眠规律 start---
							let sleepLawVo = res.data.data.sleepLawVo
							let { sleepLawDataList } = sleepLawVo
							this.sleepLawVo.sleepLawDataList = sleepLawDataList
							this.sleepLawVo.xaxis = sleepLawDataList.map((item) => {
								return item.date
							})
							let sleepLawData1 = []
							let sleepLawData2 = []
							sleepLawDataList.forEach((item) => {
								// 上床时间
								const getBedIdx = item.getBedIdx
								const getBedIdxData = moment(getBedIdx, 'hh:mm')
								const baseTime = moment('20:00', 'hh:mm')
								// 相差多少小时  / 总小时12
								const diff = getBedIdxData.diff(baseTime, 'hours') / 12
								const ydata = 30 * diff
								sleepLawData1.push(ydata)

								const leaveBedIdx = item.leaveBedIdx
								const leaveBedIdxDate = moment(leaveBedIdx, 'hh:mm').add(1, 'days')
								const diff1 = leaveBedIdxDate.diff(baseTime, 'hours') / 12
								const ydata1 = 30 * diff1
								sleepLawData2.push(ydata1)
							})
							this.sleepLawVo.sleepLawData1 = sleepLawData1
							this.sleepLawVo.sleepLawData2 = sleepLawData2
							// --- 睡眠规律 end---

							// --- 呼吸率 start---
							let breathRateTrendsVo = res.data.data.breathRateTrendsVo
							let { dataList } = breathRateTrendsVo
							this.breathRateTrendsVo.dataList = dataList
							let breathRateTrendsVoData1 = []
							let breathRateTrendsVoData2 = []
							this.breathRateTrendsVo.xaxis = dataList.map((item) => {
								breathRateTrendsVoData1.push(+item.min)
								breathRateTrendsVoData2.push(+item.max - item.min)
								return item.date
							})
							this.breathRateTrendsVo.breathRateTrendsVoData1 = breathRateTrendsVoData1
							this.breathRateTrendsVo.breathRateTrendsVoData2 = breathRateTrendsVoData2
							// --- 呼吸率 end---

							// --- 心率 start---
							let heartRateTrendsVo = res.data.data.heartRateTrendsVo
							this.heartRateTrendsVo.dataList = heartRateTrendsVo.dataList
							let heartRateTrendsVoData1 = []
							let heartRateTrendsVoData2 = []
							this.heartRateTrendsVo.xaxis = heartRateTrendsVo.dataList.map((item) => {
								heartRateTrendsVoData1.push(+item.min)
								heartRateTrendsVoData2.push(+item.max - item.min)
								return item.date
							})
							this.heartRateTrendsVo.heartRateTrendsVoData1 = heartRateTrendsVoData1
							this.heartRateTrendsVo.heartRateTrendsVoData2 = heartRateTrendsVoData2
							// --- 心率 end---

							// --- 吸呼比 start---
							let inExRatio = res.data.data.inExRatio
							this.inExRatioIndexVal = res.data.data.inExRatio.indexVal
							this.inExRatio.reportTrendsDataVo = inExRatio.reportTrendsDataVo
							this.inExRatio.dates = inExRatio.reportTrendsDataVo.map((item) => {
								return item.date
							})
							const inExRatioDataoBJ = this.inExRatio.reportTrendsDataVo[0]
							const { inExRatioData } = inExRatioDataoBJ
							this.inExRatioDataMore = inExRatioData
							// debugger;
							// --- 吸呼比 end---
							// 睡眠异常指数
							this.AHI = res.data.data.AHI
							console.log(this.AHI)

							// 睡眠得分 --- start ---
							this.sleepScore = res.data.data.score
							// 睡眠得分 --- end ---

							// 跌倒风险指数
							this.fallIndex = res.data.data.fallIndex
						} else {
							this.errorMsgMore = res.data.message
							this.showMore = false
						}
					},
					(err) => {
						console.log(err)
					},
				)
				.then(() => {
					this.$nextTick(() => {
						if (this.showMore) {
							this.initEcharts()
							this.setOption()

							this.setWakeUpDuration()
							this.setDeepSleepDuration()
							this.setOutBedNum()
							this.setSleepStDuration()
							this.setSleepEff()
							this.setTurnOverIndex()
							this.setSleepLawVo()
							this.setBreathRateTrendsVo()
							this.setHeartRateTrendsVo()
							this.setInExRatio(this.inExRatioDataMore.xaxis, this.inExRatioDataMore.data)
							this.setSleepScore()
							this.setAHI()
							this.setFallIndex()
						}
					})
				})
		},
	},
	mounted() {
		this.reqGetSevenDaysInfo()
	},
	created() {},
}
</script>

<style>
.moreDays .content,
.moreDays .nodata-con {
	position: relative;
}

.content {
	margin-top: 1.2rem;
}

.comNameTitWrap {
	margin: 1rem 0;
}

.comNameTitWrap,
.moreDays .nodata-con .comNameTitWrap {
	padding: 0;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.comNameTitWrap .leCircle,
.moreDays .nodata-con .comNameTitWrap .leCircle {
	width: 19px;
	height: 19px;
	border: 4px solid #1890ff;
	border-radius: 50%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.riFontWrap,
.moreDays .nodata-con .comNameTitWrap .riFontWrap {
	margin-left: 16px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: end;
	-ms-flex-align: end;
	align-items: flex-end;
	z-index: 99;
}

.fontName,
.moreDays .nodata-con .comNameTitWrap .riFontWrap .fontName {
	font-size: 24px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #1f2635;
}

.nowList_Ques {
}

.nowTop {
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	padding-left: 1rem;
}

.goodImg {
	width: 20px;
	height: 20px;
}

.titName,
.moreDays .nowList .nowTop .titName .sleepTime {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}

.titName {
	width: 614px;
	font-size: 20px;
	color: #1f2635;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
}

.ml10 {
	margin-left: 10px !important;
}

.colorFF7186 {
	color: #ff7186 !important;
}

.referVal {
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	margin-top: 0.4rem;
	margin-left: 4rem;
	margin-bottom: 0.8rem;
	margin-right: 0.5rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	justify-content: space-between;
}

.referValRight,
.moreDays .nowList .referVal .referValRight .gangWrap {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.gangKuai {
	width: 16px;
	height: 12px;
	background: #e7f3ff;
}

.gantTip {
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #a5a9bc;
	margin-left: 4px;
}

.gangWrap {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.ml24 {
	margin-left: 24px !important;
}

.gangWrap .gang {
	width: 4px;
	height: 1px;
	background: #cd8aff;
	margin-left: 3px;
}

.gangWrap .gang {
	width: 4px;
	height: 1px;
	background: #cd8aff;
	margin-left: 3px;
}

.bg63B2FB {
	background: #63b2fb !important;
}

.bgFF7186 {
	background: red !important;
}

.gantTip {
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #a5a9bc;
	margin-left: 4px;
}

.deExplain {
	width: 100%;
	height: auto;
	/* background: #f3f4f7; */
	border-radius: 4px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding: 0 1rem;
	/* //background-color: #9094a6; */
}

.deExTop {
	width: 100%;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 10px;
}

.deExTopTip {
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
}

.deExTop_iconWrap {
	width: 20px;
	height: 100%;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: end;
	-ms-flex-pack: end;
	justify-content: flex-end;
	margin-left: auto;
}

.deExTop_iconWrap .deExTop_icon {
	width: 14px;
}

.deExTop_iconWrap .deExTop_icon img {
	vertical-align: middle;
	border-style: none;
}

.moreDays .nowListWrap .nowList {
	height: auto;
	/* //background: #fff; */
	border-radius: 4px;
	border: 1px solid #fff;
	margin: 8px auto 0;
	padding: 16px 10px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 12px;
}

.pb10 {
	padding-bottom: 10px;
}

.quesCont {
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	margin-top: 8px;
	position: relative;
}

.quesCont .title-left-dian {
	width: 3px;
	height: 3px;
	display: inline-block;
	border-radius: 50%;
	background: #9094a6;
	position: relative;
	top: -3px;
}

.mt15 {
	margin-top: 15px !important;
}

.quesCont .title-left-dian {
	width: 3px;
	height: 3px;
	display: inline-block;
	border-radius: 50%;
	background: #9094a6;
	position: relative;
	top: -3px;
}

.el-collapse-item__wrap {
	will-change: height;
	background-color: #f3f4f7;
	overflow: hidden;
	box-sizing: border-box;
	/* border-bottom: 1px solid #EBEEF5; */
}

.yxsc .yxscList {
	height: 38px;
	margin-top: 8px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.yxsc .yxscList .yxIcon {
	width: 32px;
	height: 32px;

	img {
		vertical-align: middle;
		border-style: none;
	}
}

.yxsc .yxscList .yxCont {
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	margin-left: 4px;
}

.el-collapse {
	background: #f3f4f7;
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
	background-color: #f3f4f7;
	/* color: #303133; */
	cursor: pointer;
	/* border-bottom: 0.1rem solid #EBEEF5; */
	font-size: 1.3rem;
	/* font-weight: 500; */
	-webkit-transition: border-bottom-color 0.3s;
	transition: border-bottom-color 0.3s;
	outline: 0;
}

.nowListWrap:not(:first-child) {
	margin-top: 2rem;
}

.tooltip {
	height: 34px;
	margin-left: 5px;
	position: relative;
	display: inline-block;
	border-bottom: 1px dotted #fff;
}
.wenhaoImg {
	width: 2rem;
	margin-left: 4px;
}

.tooltip .tooltiptext {
	width: 375px;
	background: #fff;
	box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	color: #ccc;
	border-radius: 6px;
	padding: 20px 20px;
	position: absolute;
	z-index: 9999;
	top: -36.5rem;
	left: -18rem;
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

.ahi-item {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #5e6779;
	margin: 10px 0;
}

.ahi-item:before {
	content: '';
	display: inline-block;
	width: 8px;
	height: 8px;
	background: #4d8ef7;
	border-radius: 50%;
	margin-right: 8px;
}

.ahi-item2:before {
	background: #ffc471;
}

.ahi-item3:before {
	background: #ff7186;
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

.box-card {
	margin-bottom: 1rem;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	padding: 2rem 0;
}

.color1890FF {
	color: #1890ff !important;
}
</style>
