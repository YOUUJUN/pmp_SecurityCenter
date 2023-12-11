<template>
	<div class="bar-shell">
		<div class="bar-line-wrap">
			<div class="line-left"></div>
			<div class="line-center"></div>
			<div class="line-right"></div>
			<div class="cursor-box">
				<div class="cursor-box-top">
					<img class="cursor-icon" src="~@/assets/images/heart.png" />
					<span>呼吸：</span>
					<span>4</span>
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
	props: {},
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
