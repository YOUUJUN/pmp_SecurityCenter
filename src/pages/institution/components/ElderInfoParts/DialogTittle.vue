<template>
	<!-- <div class="report-plate">
    <div class="report-plate-title1">{{ title }}</div>
  </div> -->
	<div class="sleepIndex-title">
		<img src="~@/assets/images/sleepReport/sleepIndex.png" style="width: 3rem; height: 3rem" />
		<span style="padding-left: 1rem">{{ title === '' ? '当前日期无报告可查询' : title }}</span>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
		},
	},
}
</script>
<style scoped>
.sleepIndex-title {
	display: flex;
	height: 3rem;
	margin: 2rem 0;
	align-items: flex-start;
	font-size: 2.5rem;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #1f2635;
	line-height: 3rem;
}
</style>
