<template>
	<div class="card-wrap card-normal">
		<div class="card-top">
			<img class="card-avatar" src="~@/assets/images/elder.png" />
			<span class="card-name">{{ roomData.name }}</span>
			<el-button class="card-num" type="danger" circle size="mini">30s</el-button>
		</div>
		<ul class="card-middle">
			<li class="card-item">
				<span class="card-item-left">状态</span>
				<span class="card-item-right">{{ roomData.status }}</span>
			</li>
			<li class="card-item">
				<span class="card-item-left">告警</span>
				<span class="card-item-right">{{ roomData.warn_text }}</span>
			</li>
		</ul>
		<div class="card-bottom">
			<el-button class="card-btn" plain @click="handleOpenElderDlg(roomData.elderly_id)" :loading="loading">
				查看详情
			</el-button>
		</div>

		<ElderInfoDlg
			v-if="renderElderInfoDlg"
			:visible.sync="visibleElderInfoDlg"
			ref="elderInfo"
			:roomData="roomData"
		></ElderInfoDlg>
	</div>
</template>

<script>
import { getHealthReportDataByElderId } from '@/api/security'

import { mapActions } from 'vuex'

import ElderInfoDlg from './ElderInfoDlg.vue'
export default {
	name: 'SecurityCenterRoomCard',

	props: {
		roomData: {
			type: Object,
			default() {
				return {}
			},
		},
	},

	components: {
		ElderInfoDlg,
	},

	data() {
		return {
			renderElderInfoDlg: false,
			visibleElderInfoDlg: false,

			//数据获取中状态
			loading: false,
		}
	},

	mounted() {},

	methods: {
		...mapActions('tempData', ['getReportData']),

		handleOpenElderDlg(elderId) {
			const currentTime = new Date().Format('yyyy-MM-dd')
			this.loading = true
			this.getReportData({
				elderId,
				reportDate: currentTime,
			})
				.then((res) => {
					this.renderElderInfoDlg = true
					this.$nextTick(() => {
						this.visibleElderInfoDlg = true
						this.$refs.elderInfo.renderInfo({
							elderId,
							reportDate: currentTime,
						})
					})
				})
				.catch((err) => {})
				.finally(() => {
					this.loading = false
				})
		},
	},
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

		.card-num {
			display: flex;
			width: 30px;
			height: 30px;
			align-items: center;
			justify-content: center;
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
