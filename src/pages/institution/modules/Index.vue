<template>
	<article class="panel-container">
		<section class="panel-left">
			<h2 class="panel-title">床位</h2>

			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<div class="panel-left-wrap">
					<RoomCard v-for="(item, index) in 15" :key="index"></RoomCard>
				</div>
			</el-scrollbar>
		</section>

		<section class="panel-right">
			<h2 class="panel-title">区域</h2>
			<div class="panel-right-wrap"></div>
		</section>
	</article>
</template>

<script>
import RoomCard from '@/pages/institution/components/RoomCard.vue'
export default {
	name: 'SecurityCenterInstitutionIndex',

	components: {
		RoomCard,
	},

	data() {
		return {}
	},

	mounted() {},

	methods: {},
}
</script>

<style lang="less" scoped>
.panel-container {
	display: flex;
	flex-direction: row;
	height: 100%;

	.panel-title {
		flex: none;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		font-size: 20px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		background-color: #fff;
		border-radius: 10px;
		margin: 0;
		margin-bottom: 16px;
	}
	.panel-left {
		flex: auto;
		display: flex;
		flex-direction: column;
		margin-right: 20px;
	}
	.panel-right {
		flex: none;
		display: flex;
		flex-direction: column;
		width: 400px;
	}

	.scroll-wrap {
		flex: auto;
		background-color: #fff;
		border-radius: 10px;
	}

	.panel-left-wrap,
	.panel-right-wrap {
		flex: auto;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		row-gap: 16px;
		column-gap: 16px;
		padding: 16px;
		align-items: start;
	}
}
</style>
