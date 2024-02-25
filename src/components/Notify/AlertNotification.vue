<template>
	<article class="alert-wrap">
		<main class="alert-body">
			<div class="body-left" :class="alertLevelClass">
				<img src="@/assets/images/alarm.png" />
			</div>
			<div class="body-right">
				<span class="alert-title">{{ renderInfo.warn_text }}</span>
				<span class="alert-desc">{{ renderInfo.bed_name }}</span>
			</div>

			<i class="alert-close el-icon-close" @click="handleNotifyClose"></i>
		</main>
	</article>
</template>

<script>
import { getNotifyClass } from '@/api/dict.js'

export default {
	props: {
		renderInfo: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			count: 10,
			//倒计时循环
			countHandle: '',

			alertLevelClass: '',
			alertImgPath: '',
		}
	},

	watch: {
		renderInfo: {
			deep: true,
			immediate: true,
			handler(newValue) {
				this.doCountDown()

				console.log('newValue', newValue)
				let { warn_text } = newValue
				console.log('warn_text', warn_text)
				const alertClass = getNotifyClass(warn_text, true)
				console.log('alertClass', alertClass)
				this.alertLevelClass = alertClass
			},
		},
	},

	created() {},

	methods: {
		//控制倒计时
		doCountDown() {
			this.countHandle = setInterval(() => {
				this.count--
				if (this.count <= 0) {
					this.$emit('countover')
				}
			}, 1000)
		},

		//控制通知窗体关闭
		handleNotifyClose() {
			this.countHandle && clearInterval(this.countHandle)
			this.$emit('countover')
		},
	},
}
</script>

<style lang="less" scoped>
.card-alert {
	background-color: #ff3b30;
}

.card-off {
	background-color: #c8c8c8;
}

.card-warn {
	background-color: #eaa834;
}
</style>

<style lang="less">
.alert-notification {
	width: 230px;
	padding: 0;

	.el-notification__group {
		margin: 0;
		width: 100%;
	}

	.el-notification__content {
		margin: 0;

		.alert-wrap {
			position: relative;
			.alert-body {
				display: flex;

				.body-left {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 70px;
					height: 70px;
				}

				.body-right {
					margin-left: 15px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 8px 0;
					.alert-title {
						font-family: PingFang SC;
						font-weight: bold;
						font-size: 18px;
						color: #333333;
					}

					.alert-desc {
						font-family: PingFang SC;
						font-weight: 500;
						font-size: 16px;
						color: #333333;
					}
				}

				.alert-close {
					position: absolute;
					top: 8px;
					right: 8px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
