<template>
	<el-dialog class="dlg" width="290px" :visible="visible" @close="handleClose" zIndex="2">
		<div class="card-wrap">
			<div class="card-top">
				<img class="card-avatar" v-if="roomData.name === '男'" src="~@/assets/images/man.png" />
				<img class="card-avatar" v-else src="~@/assets/images/women.png" />
				<span class="card-name">{{ roomData.name }}</span>
			</div>
			<ul class="card-middle" v-if="roomData.elderly_id">
				<li class="card-item">
					<span class="card-item-left">姓名</span>
					<span class="card-item-right">{{ roomData.elderly_name }}</span>
				</li>
				<li class="card-item">
					<span class="card-item-left">性别</span>
					<span class="card-item-right">{{ roomData.gender }}</span>
				</li>
				<li class="card-item">
					<span class="card-item-left">年龄</span>
					<span class="card-item-right">{{ roomData.warn_text }}</span>
				</li>
			</ul>
			<div class="card-bottom" v-if="roomData.elderly_id">
				<el-button class="card-btn" plain @click="handleOpenElderDlg(roomData.elderly_id)" :loading="loading">
					查看报告
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>
<script>
export default {
	props: {
		roomData: {
			type: Object,
			default() {
				return {}
			},
		},

		visible: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			//数据获取中状态
			loading: false,
		}
	},

	methods: {
		handleClose() {
			this.$emit('update:visible', false)
		},

		handleOpenElderDlg(id) {},
	},
}
</script>
<style lang="less" scoped>
.dlg {
	::v-deep .el-dialog__header {
		padding: 0;
	}

	::v-deep .el-dialog__body {
		padding: 35px 0 55px;
	}

	.card-wrap {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
		height: 240px;
		.card-top {
			flex: none;
			display: flex;
			width: 100%;
			align-items: center;
			padding: 0 30px;
			.card-avatar {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				cursor: pointer;
				margin-right: 20px;
			}

			.card-name {
				font-size: 30px;
				font-family: Source Han Sans CN;
				font-weight: 400;
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

			font-size: 20px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #333333;

			padding: 0 30px;

			.card-item {
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2px dashed #999999;
				padding: 10px 0 12px;
			}
		}

		.card-bottom {
			flex: none;
			.card-btn {
				width: 150px;
				height: 40px;
				background: #0088d1;
				border-radius: 5px;
				color: #fff;
			}
		}
	}
}
</style>
