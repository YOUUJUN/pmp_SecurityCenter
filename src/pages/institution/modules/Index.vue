<template>
	<article class="panel-container">
		<section class="panel-left">
			<h2 class="panel-title">床位</h2>

			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<div class="panel-left-wrap">
					<RoomCard v-for="(item, index) in roomData" :roomData="item" :key="index"></RoomCard>
				</div>
			</el-scrollbar>
		</section>

		<section class="panel-right">
			<h2 class="panel-title">区域</h2>
			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<!-- <div class="panel-right-wrap"> -->
				<transition-group class="panel-right-wrap" name="list-complete" tag="div">
					<AreaCard
						v-for="(item, index) in dataList"
						class="list-complete-item"
						:key="item"
						@click.native="openAreaDlg()"
					></AreaCard>
				</transition-group>
				<!-- </div> -->
			</el-scrollbar>
		</section>

		<AreaDetailDlg :visible.sync="visible"></AreaDetailDlg>
	</article>
</template>

<script>
import RoomCard from '@/pages/institution/components/RoomCard.vue'
import AreaCard from '@/pages/institution/components/AreaCard.vue'
import AreaDetailDlg from '../components/AreaDetailDlg.vue'

import { mapGetters } from 'vuex'

export default {
	name: 'SecurityCenterInstitutionIndex',

	components: {
		RoomCard,
		AreaCard,
		AreaDetailDlg,
	},

	data() {
		return {
			visible: false,
			dataList: [1, 2, 3],
		}
	},

	computed: {
		...mapGetters(['roomData']),
	},

	mounted() {
		// setInterval(() => {
		// 	this.add()
		// }, 1000)
	},

	methods: {
		openAreaDlg() {
			this.visible = true
		},

		add() {
			this.dataList.splice(0, 0, Math.random())
		},
	},
}
</script>

<style>
.list-complete-item {
	transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
	opacity: 0;
	transform: translateX(90px);
}
.list-complete-leave-active {
	position: absolute;
}
</style>

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
		padding: 16px 0;
	}

	.panel-left-wrap {
		flex: auto;
		height: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		row-gap: 16px;
		column-gap: 16px;
		padding: 0 16px;
		align-items: start;
	}

	.panel-right-wrap {
		flex: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
}
</style>
