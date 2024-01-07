<template>
	<div class="card-wrap" :class="alertLevelClass">
		<img class="card-logo" :src="alertImgPath" />
		<span>{{ cardInfo.data.room_name }}</span>
		<span>{{ cardInfo.data.alarm_msg }}</span>
		<div class="card-num" v-if="alertCount !== 0">{{ alertCount }}s</div>
	</div>
</template>

<script>
import { getAlertLevelImg } from '@/api/dict'

export default {
	name: 'SecurityCenterAreaCard',

	props: {
		cardInfo: {
			type: Object,
			default() {
				return {}
			},
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
				let { alarm_msg } = newValue.data
				const { imgPath, alertClass } = getAlertLevelImg(alarm_msg)

				this.alertLevelClass = alertClass
				this.alertImgPath = imgPath
			},
		},
	},

	mounted() {
		this.startCountdown(18)
	},

	methods: {
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
