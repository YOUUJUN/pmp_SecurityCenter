<template>
	<div class="card-wrap card-normal">
		<div class="card-top">
			<img class="card-avatar" src="~@/assets/images/elder.png" />
			<span class="card-name">101-01</span>
			<div class="card-time"></div>
		</div>
		<ul class="card-middle">
			<li class="card-item">
				<span class="card-item-left">状态</span>
				<span class="card-item-right">在床</span>
			</li>
			<li class="card-item">
				<span class="card-item-left">告警</span>
				<span class="card-item-right">呼吸异常</span>
			</li>
			<li class="card-item">
				<span class="card-item-left">状态</span>
				<span class="card-item-right">在床</span>
			</li>
		</ul>
		<div class="card-bottom">
			<el-button class="card-btn" plain>查看详情</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SecurityCenterRoomCard',

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
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border-radius: 10px;
	height: 240px;
	padding: 16px 0;
	.card-top {
		flex: none;
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		.card-avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}

		.card-name {
			font-size: 20px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
	}

	.card-middle {
		flex: auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		list-style: none;

		font-size: 14px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		padding: 8px 30px;

		.card-item {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}
	}

	.card-bottom {
		flex: none;
		.card-btn {
			background: #ffffff;
			border-radius: 5px;
			padding: 8px 15px;
			font-size: 14px;
		}
	}
}

.card-normal {
	background-color: #ecffee;
}

.card-alert {
	background-color: #fbe5e6;
}

.card-off {
	background-color: #ecedef;
}

.card-warn {
	background-color: #fef4dd;
}

.card-blank {
	background-color: #fff;
}
</style>
