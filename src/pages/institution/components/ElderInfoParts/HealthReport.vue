<template>
	<article>
		<DialogHead :title="title" @modeChage="modeChage" :badgeDate="badgeDate"></DialogHead>
		<div class="report-header">
			<div v-if="mode === 1 && showReport" class="report-content" style="width: 100%" id="mode1">
				<DialogTittle title="睡眠指标" src="~@/assets/images/sleepReport/sleepIndex.png"></DialogTittle>

				<div class="sleepIndex-content">
					<div class="content-left">
						<div class="dialog-card">
							<DialogCard
								v-for="item in sleepInData"
								:key="item.indexName"
								:sleepItem="item"
							></DialogCard>
						</div>
					</div>
					<div id="content-right" class="content-right">
						<round :sleepIndicatorsInfo="sleepIndicatorsInfo"></round>
						<div class="score-ranking">
							{{ scheduleData.sleepProportion }}
						</div>
						<div class="content-bottom">
							<div class="botTime">
								<div class="tCont">
									<div class="tCont_align">
										<div class="tPoint"></div>
										<div class="tCont_font">上床时间：{{ scheduleData.getBedIdx }}</div>
									</div>
								</div>
								<div class="tCont">
									<div class="tCont_align">
										<div class="tPoint"></div>
										<div class="tCont_font">入睡时间：{{ scheduleData.sleepStIdx }}</div>
									</div>
								</div>
								<div class="tCont">
									<div class="tCont_align">
										<div class="tPoint"></div>
										<div class="tCont_font">醒来时间：{{ scheduleData.sleepEdIdx }}</div>
									</div>
								</div>
								<div class="tCont" style="border: none">
									<div class="tCont_align">
										<div class="tPoint"></div>
										<div class="tCont_font">起床时间：{{ scheduleData.leaveBedIdx }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--睡眠异常-->
				<div class="dataTitle">
					<div class="">
						<div class="comment-details-indexs">
							<div v-for="(item, index) in Abnormal_list" :key="index">
								<div class="comment-details-item is-alarm">
									<div class="comment-details-item-box">
										<div class="details-title">
											<div class="details-title-icon" style="width: 1rem; height: 1rem">
												<img src="~@/assets/images/sleepReport/th.png" alt="" srcset="" />
											</div>
											<div style="margin-right: 0.5rem; margin-left: 1.5rem; font-weight: 600">
												{{ item.indexName }}
											</div>
											<div class="details-title-num">
												{{ item.normalFlagTips }}
											</div>
										</div>
										<!-- <div class="details-title ml24">
                        <div>连续</div>
                        <div class="details-title-num">3</div>
                        <div>晚睡眠时长小于6小时</div>
                      </div> -->
										<div class="ml24 details-consult" style="margin-left: 45px">
											{{ item.reference }}
										</div>
										<el-collapse v-model="activeNames">
											<el-collapse-item
												title="详细解读"
												name="1"
												style="padding-left: 1rem; color: #9094a6 !important"
											>
												<div class="detailed-inter" style="height: 100%">
													<div class="detailed-inter-title"></div>
													<div>
														<div class="detailstr-circle">
															{{ item.Accord }}
														</div>
														<div class="detailstr-circle">
															{{ item.Proposal }}
														</div>
													</div>
												</div>
											</el-collapse-item>
										</el-collapse>
									</div>
								</div>
							</div>
							<div></div>
						</div>
					</div>
				</div>

				<div class="sleepIndex-title">
					<img
						src="~@/assets/images/sleepReport/breatheIndex.png"
						alt=""
						srcset=""
						style="width: 3rem; height: 3rem"
					/>
					<span style="padding-left: 1rem">呼吸详情</span>
				</div>

				<div class="sleepIndex-content">
					<BreatheIndexCard :respiratoryDetails="respiratoryDetails" />
				</div>

				<div class="sleepIndex-title">
					<img
						src="~@/assets/images/sleepReport/smxq.png"
						alt=""
						srcset=""
						style="width: 3rem; height: 3rem"
					/>
					<span>睡眠详情</span>
				</div>
				<div class="sleepIndex-content">
					<SleepDetails
						:sleepDetails="sleepDetails"
						:breathRateVo="breathRateVo"
						:heartRateVo="heartRateVo"
						:turnOverIndex="turnOverIndex"
					/>
				</div>
			</div>
			<div v-if="mode === 2" id="mode2" class="report-content" style="width: 100%">
				<seven-report-sleep-indices
					key="2"
					days="7"
					:partnerIdSeven="partnerIdSeven"
					:sleepReportDataSeven="sleepReportDataSeven"
				></seven-report-sleep-indices>
			</div>
			<div v-if="mode === 3" id="mode3" class="report-content" style="width: 100%">
				<more-days
					key="3"
					days="30"
					:partnerIdSeven="partnerIdSeven"
					:sleepReportDataSeven="sleepReportDataSeven"
				></more-days>
			</div>
			<div v-if="!showReport && mode === 1">
				<div style="margin-left: 32rem">
					<img
						src="http://health.qingleitech.com/img/image_middle_empty_d@2x.1c9159e9.png"
						class="empty-img"
						style="padding-left: 5rem"
					/>
					<div style="width: 100%; text-align: center; font-size: 2rem; color: #909399">
						{{ errorMsg }}
					</div>
				</div>
			</div>
		</div>
	</article>
</template>
<script>
import * as echarts from 'echarts'
import moment from 'moment'

import { handelDayReport, getElderlyHealthReport, getElderlyHealthReportDate } from '@/api/security.js'
import DialogHead from './DialogHead.vue'
import SleepIndexCard from './SleepIndexCard.vue'
import BreatheIndexCard from './BreatheIndexCard.vue'
import SleepDetails from './SleepDetails.vue'
import DialogTittle from './DialogTittle.vue'
import Round from './Round.vue'
import SevenReportSleepIndices from './SevenReportSleepIndices.vue'
import DialogCard from './DialogCard.vue'
import MoreDays from './MoreDays.vue'
export default {
	name: 'HealthReport',

	components: {
		DialogHead,
		// SleepIndexCard,
		BreatheIndexCard,
		SleepDetails,
		DialogTittle,
		Round,
		SevenReportSleepIndices,
		DialogCard,
		MoreDays,
	},

	props: {
		sleepReportData: {
			type: String,
			default: '',
		},

		visible: {
			type: Boolean,
			default: false,
		},

		partnerId: {
			type: Number,
			required: true,
		},
	},
	created() {},
	mounted() {
		this.handelDayReport(this.partnerId, this.sleepReportData)
		const yearMonth = moment(this.sleepReportData).format('YYYY-MM')
		this.monthChange(yearMonth)
	},
	watch: {
		visible(value) {
			if (value) {
				this.dialogVisible = value
				this.handelDayReport(this.partnerId, this.sleepReportData)
				const yearMonth = moment(this.sleepReportData).format('YYYY-MM')
				this.monthChange(yearMonth)
			}
		},
	},
	data() {
		return {
			activeNames: [],
			title: '', // 弹窗标题
			sleepInData: [],
			scheduleData: {},
			Abnormal_list: [],
			mode: 1,
			currentTab: 0,
			placeholderName: '11月11日',
			activeName: 'first',
			dialogVisible: false,
			isFirst: true,
			badgeDate: [],
			//报告搜索日期
			reportDate: '',

			//报告渲染数据
			renderData: {},
			ableVisible: false,
			respiratoryDetails: {},
			sleepDetails: {},
			breathRateVo: {},
			heartRateVo: {},
			turnOverIndex: {},
			myChartRound: '',
			option: '',
			sleepIndicatorsInfo: {},
			partnerIdSeven: 0,
			sleepReportDataSeven: '',
			showReport: false,
			errorMsg: '',
		}
	},
	methods: {
		async handelDayReport(id, data) {
			this.partnerIdSeven = this.partnerId
			this.sleepReportDataSeven = this.sleepReportData
			await handelDayReport({
				partner_id: id,
				search_report: data,
			}).then(
				(res) => {
					console.log('res12', res)
					// return;
					if (res.status === 200 && res.data.result === 'success') {
						this.showReport = true
						let {
							title,
							sleepIndicators,
							respiratoryDetails,
							sleepDetails,
							breathRateVo,
							heartRateVo,
							turnOverIndex,
						} = res?.data?.data
						this.title = title
						let {
							sleepInData,
							getBedIdx,
							sleepStIdx,
							sleepEdIdx,
							leaveBedIdx,
							Score,
							scoreLabel,
							sleepProportion,
							Abnormal_list,
						} = sleepIndicators
						this.sleepInData = sleepInData
						this.scheduleData.getBedIdx = getBedIdx
						this.scheduleData.sleepStIdx = sleepStIdx
						this.scheduleData.sleepEdIdx = sleepEdIdx
						this.scheduleData.leaveBedIdx = leaveBedIdx
						this.scheduleData.scoreLabel = scoreLabel
						this.scheduleData.Score = Score
						this.scheduleData.sleepProportion = sleepProportion
						this.Abnormal_list = Abnormal_list
						this.sleepDetails = sleepDetails
						this.respiratoryDetails = respiratoryDetails
						this.breathRateVo = breathRateVo
						this.heartRateVo = heartRateVo
						this.turnOverIndex = turnOverIndex
						this.sleepIndicatorsInfo = sleepIndicators
					} else {
						this.errorMsg = res.data.message
						this.showReport = false
					}
					console.log(res)
				},
				(error) => {
					console.log('报错===' + error)
				},
			)
		},
		modeChage(mode, date) {
			this.mode = mode
			if (mode === 1) {
				this.handelDayReport(this.partnerId, date)
			}
		},
		entry(index) {
			const eleName = 'tab-' + index
			const ele = document.getElementById(eleName)
			if (!ele.classList.contains('active')) {
				ele.classList.add('actives')
			}
		},
		leave(index) {
			const eleName = 'tab-' + index
			const ele = document.getElementById(eleName)
			if (!ele.classList.contains('active')) {
				ele.classList.remove('actives')
			}
		},
		entryReportDig() {
			console.log('111')
			this.showDatePicker()
		},
		showDatePicker() {
			this.$refs.datePicker.$el.querySelector('input').click()
		},
		//设置报告日期
		setReportDate(date) {
			this.reportDate = date
		},
		// 切换年月后重新调接口
		async monthChange(datesYearMonth) {
			const { data } = await getElderlyHealthReportDate({
				month_date: datesYearMonth,
				elderly_id: this.partnerId,
				mark: 'ql',
			})
			if (data && data.result === 'success') {
				this.badgeDate = data.data
			} else {
				this.badgeDate = []
			}
		},

		//获取报告数据
		fetchReport(date) {
			console.log('date', date)
			return new Promise((resolve, reject) => {
				this.fetchElderHealthReportByTime(this.partnerId, date)
					.then((res) => {
						console.log('res-->', res)
						if (res.status === 200) {
							this.renderData = res.data?.data[0] ?? {}
							resolve()
						}
					})
					.catch((err) => {
						console.warn('err', err)
					})
			})
		},

		handleClose() {
			// this.isFirst = true;
			this.badgeDate = []
			this.$emit('update:visible', false)
			// console.log(1112);
		},
		handleClick(tab, event) {
			console.log(tab.index)
			console.log(event)
		},
		cancel() {
			this.dialogVisible = false
			this.$emit('cancel', this.dialogVisible)
			console.group('onCancel====', this.dialogVisible)
		},

		//通过时间获取老人健康报告信息
		fetchElderHealthReportByTime(id, date = moment().subtract(1, 'days').format('YYYY-MM-DD')) {
			return getElderlyHealthReport({
				partner_id: id,
				report_date: date,
			})
		},
	},
}
</script>
<style scoped>
.report-header {
	display: flex;
	justify-content: space-between;
}

.report-download {
	height: 4rem;
	margin-top: 1rem;
}

.el-input__inner {
	border: none;
	text-align: center;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: 16rem;
	color: #3a8ee6;
	font-size: 2rem;
}

.sleepIndex-title {
	display: flex;
	height: 3rem;
	margin: 2rem 0;
	align-items: flex-start;
	font-size: 3rem;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #1f2635;
	line-height: 3rem;
}

.sleepIndex-title span {
	padding-left: 1rem;
}

.sleepIndex-content {
	display: flex;
	//margin-top: 2rem;
}

.sleepIndex-left {
	display: flex;
	flex-wrap: wrap;
}

.sleepIndex-right {
}

.tabs {
	display: flex;
	margin-top: 1rem;
}

.tab {
	font-size: 2rem;
	cursor: pointer;
	text-align: center;
	box-sizing: border-box;
	margin-right: 2rem;
	line-height: 4rem;
	border: 2px solid #d9d9d9;
}

.tab-padding {
	padding: 0 1rem;
}

.tab.active {
	border: 2px solid #3a8ee6;
	color: #3a8ee6;
	background-color: white;
}

.actives {
	border: 2px solid #3a8ee6;
	color: #3a8ee6;
	background-color: white;
}

.report-connect {
	margin-top: 1rem;
}

.content-0 {
	display: block;
	height: 3000px;
	margin-bottom: 10rem;
	padding-bottom: 10rem;
}

.content-1 {
	display: none;
	height: 200px;
	border: 1px solid red;
	margin-bottom: 10rem;
}

.content-2 {
	display: none;
	height: 300px;
	border: 1px solid yellow;
	margin-bottom: 10rem;
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

.riCont_top {
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
.dialog-card {
	display: flex;
	flex-wrap: wrap;
}
.content-left {
	width: 92rem;
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

.dataTitle {
	//margin-top: 10px;
	display: flex;
	margin-bottom: 20px;
	justify-content: flex-start;
	position: relative;
	height: auto;
}

.comment-details-indexs {
	width: 100%;
	margin-top: 8px;
	display: flex;
	flex-wrap: wrap;
}
.comment-details-indexs .is-alarm {
	border: 1px solid rgba(255, 113, 134, 0.5);
}

.comment-details-indexs .comment-details-item {
	width: 53rem;
	box-sizing: border-box;
	break-inside: avoid;
	margin-right: 1.5rem;
	margin-bottom: 1rem;
}

.comment-details-indexs .comment-details-item:nth-child(2n-1) {
	margin-right: 1.5rem;
}

.comment-details-item-box {
	width: 100%;
	height: 100%;
	padding: 16px 12px;
	background: #fff;
}

.comment-details-indexs .comment-details-item .comment-details-item-box .details-title {
	display: flex;
	align-items: center;
	font-size: 20px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.comment-details-indexs .comment-details-item .comment-details-item-box .details-title .details-title-num {
	color: #ff7186;
}

.comment-details-indexs .comment-details-item .comment-details-item-box .details-consult {
	font-size: 16px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
}

.comment-details-indexs .detailed-inter {
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

.details-title-icon img {
	width: 2rem;
	height: 2rem;
	margin-right: 4px;
	position: relative;
	top: -1.1rem;
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

.advice-item img {
	width: 34px;
	height: 34px;
	margin-right: 5px;
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

.empty-div {
	height: 367px;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	margin: 12px auto 0;
}

::v-deep .ant-modal-title {
	font-size: 2.5rem !important;
}
</style>
