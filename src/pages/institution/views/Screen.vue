<template>
	<article class="root">
		<section class="card-container">
			<div class="card-wrap bg1">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>守护老人</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg2">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>床位数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg3">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>入住率</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg4">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>设备数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>

			<div class="card-wrap bg5">
				<div class="card-head">
					<span>367</span>
				</div>
				<div class="card-body">
					<span>告警数量</span>
				</div>
				<div class="card-foot">
					<span>98.00%</span>
				</div>
			</div>
		</section>

		<section class="chart-container">
			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">设备类型分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart"></div>
				</div>
			</div>

			<div class="chart-wrap">
				<div class="chart-wrap-head">
					<span class="chart-title">设备类型分析</span>
				</div>
				<div class="chart-wrap-body">
					<div class="chart"></div>
				</div>
			</div>
		</section>
	</article>
</template>
<script>
export default {
	data() {
		return {}
	},
}
</script>
<style lang="less" scoped>
.root {
	height: 100%;
	padding: 35px 50px;
	background-color: #ebecee;
	.card-container {
		display: flex;
		justify-items: center;
		justify-content: space-between;
		margin-bottom: 35px;
		.card-wrap {
			width: 15%;
			display: flex;
			flex-direction: column;
			color: #fff;
			border-radius: 6px;
			padding: 16px 20px;
			.card-head {
				font-size: 20px;
			}

			.card-body {
				font-size: 20px;
				margin: 6px 0;
				margin-left: 35px;
			}

			.card-foot {
				align-self: flex-end;
				font-size: 16px;
			}
		}

		.bg1 {
			background-color: #5196ff;
		}

		.bg2 {
			background-color: #49a8ec;
		}

		.bg3 {
			background-color: #5472b4;
		}

		.bg4 {
			background-color: #f1bc45;
		}

		.bg5 {
			background-color: #d65f54;
		}
	}

	.chart-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 35px;
		column-gap: 36px;
		.chart-wrap {
			flex: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 6px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			overflow: hidden;
			.chart-wrap-head {
				width: 100%;
				display: flex;
				justify-content: space-between;
				background-color: #f7f7f8;
				padding: 18px 16px;
				font-size: 18px;
			}

			.chart-wrap-body {
				width: 100%;
				background-color: #fff;
				.chart {
					width: 100%;
					height: 400px;
				}
			}
		}
	}
}
</style>
