<template>
	<div class="bar-shell">
		<div class="bar-line-wrap">
			<div class="line-left"></div>
			<div class="line-center"></div>
			<div class="line-right"></div>
			<div
				class="cursor-box"
				:style="{
					left: leftValue,
				}"
			>
				<div class="cursor-box-top">
					<img v-if="type === 'heart'" class="cursor-icon" src="~@/assets/images/heart.png" />
					<img v-if="type === 'breath'" class="cursor-icon" src="~@/assets/images/breath.png" />
					<span>{{ label }}</span>
					<span>{{ value }}</span>
				</div>
				<div class="cursor-box-bottom">
					<div class="cursor-point"></div>
				</div>
			</div>
		</div>
		<div class="bar-text-wrap">
			<div class="text-left">偏低</div>
			<div class="text-center">正常</div>
			<div class="text-right">偏高</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},

		type: {
			type: String,
			default: 'heart',
		},
	},

	computed: {
		leftValue() {
			let value = this.value
			if (this.type === 'heart') {
				if (value <= 40) {
					console.log(1)
					return '0'
				} else if (40 < value > 90) {
					console.log(2)
					return '33%'
				} else {
					console.log(3)
					return '66%'
				}
			} else {
				if (value <= 12) {
					console.log(1)
					return '0'
				} else if (12 < value > 20) {
					console.log(2)
					return '33%'
				} else {
					console.log(3)
					return '66%'
				}
			}
		},

		label() {
			if (this.type === 'heart') {
				return '心率'
			} else {
				return '呼吸'
			}
		},
	},
	data() {
		return {}
	},
}
</script>
<style lang="less" scoped>
@lowColor: #fe4d4f;
@normalColor: #5bc196;
@heighColor: #c2c2c2;

.bar-shell {
	width: 100%;
	margin-top: 26px;
	.bar-line-wrap,
	.bar-text-wrap {
		display: grid;
		grid-template-columns: repeat(3, 33.33%);
		grid-template-rows: repeat(2, 1fr);
	}

	.bar-line-wrap {
		position: relative;
		height: 4px;

		.line-left {
			background: @lowColor;
		}

		.line-center {
			background: @normalColor;
		}

		.line-right {
			background: @heighColor;
		}
	}

	.bar-text-wrap {
		font-size: 14px;
		margin-top: 3px;
		justify-items: center;
	}

	.cursor-box {
		width: 33.33%;
		height: 40px;
		position: absolute;
		bottom: -13px;
		font-size: 14px;
		.cursor-box-top {
			display: flex;
			justify-content: center;
			align-items: center;

			.cursor-icon {
				margin-right: 6px;
			}
		}

		.cursor-box-bottom {
			display: flex;
			justify-content: center;
			align-items: center;
			.cursor-point {
				width: 9px;
				height: 9px;
				border-radius: 50%;
				background-color: @lowColor;
			}
		}
	}
}
</style>
