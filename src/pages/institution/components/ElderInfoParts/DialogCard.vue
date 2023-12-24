<template>
	<div class="leList" :class="{ leListRed: sleepItem.comment !== '正常' }">
		<div class="flex_alignCen ml10">
			<div class="lePoint"></div>
			<div class="leName ml5">{{ sleepItem.indexName }}：</div>
			<div class="leTime">{{ sleepItem.value }}</div>
			<div v-if="sleepItem.indexName === '体动'" style="display: flex">
				<div class="leName ml5">体动指数：</div>
				<div class="leTime">{{ sleepItem.Index }}</div>
			</div>

			<div class="tag">{{ sleepItem.comment }}</div>
		</div>
		<div class="flex_alignCen mt5">
			<div class="leCkz">{{ sleepItem.reference }}</div>

			<a-tooltip placement="top" v-if="sleepItem.describe">
				<!--        <template slot="title" style="background-color: #fff">-->
				<!--          <span>{{ sleepItem.describe }} </span>-->
				<!--        </template>-->
				<!--        <div class="question-cicle">-->
				<!--          <a-icon type="question" />-->
				<!--        </div>-->
				<img
					src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/wenhaoIcon.png"
					alt=""
					style="width: 2rem; height: 2rem; margin-right: 1rem"
					@mouseenter="entry"
					@mouseleave="leave"
				/>
				<div class="tooltiptext" id="tooltiptext" style="display: none">
					<div class="ahi-title">·{{ sleepItem.describe }}</div>
				</div>
			</a-tooltip>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		sleepItem: {
			type: Object,
		},
	},
	methods: {
		entry() {
			document.getElementById('tooltiptext').style.display = 'block'
		},
		leave() {
			document.getElementById('tooltiptext').style.display = 'none'
		},
	},
}
</script>
<style scoped>
.leList {
	width: 41.5rem;
	height: 8.7rem;
	background: #f3f4f7;
	border-radius: 2px;
	position: relative;
	padding: 10px 0;
	font-weight: 600;
}

.ml10 {
	margin-left: 10px !important;
}

.flex_alignCen {
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.lePoint {
	width: 8px;
	height: 8px;
	background: #1890ff;
	border-radius: 50%;
}

.leName {
	color: #262626;
}

.ml5 {
	margin-left: 5px !important;
}

.leTime {
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
	display: flex;
	align-items: center;
	justify-content: center;
}

.leListRed {
	background: #fff1f3;
	border: 1px solid #ffb8c3;
}

.leListRed .leTime {
	color: #ff7186;
}

.leListRed .tag {
	background: #ff7186;
}

.leListRed .lePoint {
	background: #ff7186;
}

.leCkz {
	width: 100%;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #9094a6;
	display: flex;
	margin-left: 23px;
	box-sizing: border-box;
	padding-right: 10px;
}

.question-cicle {
	width: 24px;
	height: 24px;
	border-radius: 50%;
}

.tooltiptext {
	width: 375px;
	background: #fff;
	box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
	color: #ccc;
	border-radius: 6px;
	padding: 20px 20px;
	position: absolute;
	z-index: 1;
	top: -12.5rem;
	left: 20rem;
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
