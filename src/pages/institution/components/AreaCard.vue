<template>
	<div class="card-wrap" :class="alertLevelClass">
		<div class="card-wrap-left" @click="openDlg">
			<img class="card-logo" :src="alertImgPath" />
			<span>{{ cardInfo.device_name }}</span>
			<span>{{ cardInfo.status }}</span>
		</div>
		<el-button
			type="danger"
			class="card-num"
			v-if="alertCount !== 0 && cardInfo.alertFlag"
			@click="handleSolveAlarm"
		>
			{{ alertCount }}s
		</el-button>
	</div>
</template>

<script>
import { getAlertLevelImg } from '@/api/dict'

import { mapActions } from 'vuex'

export default {
	name: 'SecurityCenterAreaCard',

	props: {
		cardInfo: {
			type: Object,
			default() {
				return {}
			},
		},

		ifAlert: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			alertImgPath: '',
			alertLevelClass: '',

			//告警计时
			alertCount: 0,
		}
	},

	watch: {
		cardInfo: {
			deep: true,
			immediate: true,
			handler(newValue) {
				console.log('newValue', newValue)
				let { status, alertFlag } = newValue
				if (alertFlag) {
					const { imgPath, alertClass } = getAlertLevelImg(status)

					this.alertLevelClass = alertClass
					this.alertImgPath = imgPath

					this.startCountdown(30)
				} else {
					const { imgPath, alertClass } = getAlertLevelImg('在线')
					this.alertLevelClass = alertClass
					this.alertImgPath = imgPath
				}
			},
		},
	},

	mounted() {},

	methods: {
		...mapActions('data', ['resolveToiletAlarm']),

		//开始告警计时
		startCountdown(duration, callback) {
			this.alertCount = duration
			this.alertTimer = setInterval(() => {
				this.alertCount--
				if (this.alertCount <= 0) {
					clearInterval(this.alertTimer)
					if (typeof callback === 'function') {
						callback()
					}
				}
			}, 1000)
		},

		openDlg() {
			this.$emit('openAreaDlg', this.cardInfo)
		},

		handleSolveAlarm() {
			this.alertCount = 0
			this.resolveToiletAlarm({
				id: this.cardInfo.room_id,
			})
		},
	},
}
</script>

<style lang="less" scoped>
.card-wrap {
	display: flex;
	width: 100%;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
	width: 360px;
	height: 60px;
	background: #ecffee;
	border-radius: 10px;
	border: 1px solid #c5cec6;
	padding: 0;
	margin: 8px 0;
	cursor: pointer;
	overflow: hidden;

	.card-wrap-left {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 18px;
	}

	&:first-child {
		margin-top: 0;
	}

	.card-logo {
		width: 38px;
		height: 38px;
		border-radius: 50%;
	}

	.card-num {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 60px;
		height: 60px;
		background-color: #ff3b30;
		color: #fff;
	}
}
</style>

<style scoped>
.level_1_warning {
	background: #fbe5e6;
}

.level_2_warning {
	background: #fbe5e6;
}

.level_3_warning {
	background: #d7d7d7;
}
</style>
