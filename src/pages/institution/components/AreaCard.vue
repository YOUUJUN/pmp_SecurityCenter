<template>
	<div class="card-wrap">
		<img class="card-logo" src="~@/assets/images/toilet.png" />
		<span>101</span>
		<span>卫生间有人</span>
		<div class="card-num">18s</div>
	</div>
</template>

<script>
export default {
	name: 'SecurityCenterAreaCard',

	data() {
		return {}
	},

	mounted() {},

	methods: {},
}
</script>

<style lang="less" scoped>
.card-wrap {
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 18px;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
	width: 360px;
	height: 60px;
	background: #ecffee;
	border-radius: 5px;
	border: 1px solid #c5cec6;
	padding: 6px 16px;
	margin: 8px 0;
	cursor: pointer;

	&:first-child {
		margin-top: 0;
	}

	.card-logo {
		width: 38px;
		height: 38px;
		border-radius: 50%;
	}
}
</style>
