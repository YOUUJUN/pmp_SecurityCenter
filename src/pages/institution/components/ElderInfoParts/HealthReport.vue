<template>
	<article>
		<DialogHead></DialogHead>
	</article>
</template>
<script>
import * as echarts from 'echarts'
import moment from 'moment'

import { handelDayReport, getElderlyHealthReportDate } from '@/api/security.js'
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
		SleepIndexCard,
		BreatheIndexCard,
		SleepDetails,
		DialogTittle,
		Round,
		SevenReportSleepIndices,
		MoreDays,
	},

	data() {
		return {}
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
