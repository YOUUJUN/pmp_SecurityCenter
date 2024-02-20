<template>
	<section class="panel-container">
		<div class="panel-top">
			<span class="dlg-body-title">告警记录</span>
			<el-date-picker
				class="panel-date"
				v-model="choicedDate"
				type="date"
				placeholder="选择日期"
				@change="handleDateChange"
			></el-date-picker>
		</div>

		<div class="panel-body">
			<el-table class="dlg-table" :data="tableData" height="383px" style="width: 100%">
				<el-table-column prop="alarm_time" label="时间" width="165px" align="center"></el-table-column>
				<el-table-column prop="alarm_type" label="事件" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button @click="handleSolveAlarm(scope.row)" type="text" size="small">立即处理</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="panel-footer">
			<el-pagination
				class="table-pagging"
				background
				:current-page.sync="page"
				layout="prev, pager, next"
				:total="total"
				@current-change="getAlarmListData"
				small
			></el-pagination>
		</div>
	</section>
</template>
<script>
import { fetchAlarmList, handleAlarmSolved, fetchRoomAlarmList } from '@/api/security'
import moment from 'moment'
export default {
	props: {
		bedId: {
			type: Number,
			default: 0,
		},

		tableType: {
			type: String,
			default: 'bed',
		},
	},
	data() {
		return {
			page: 1,
			total: 0,
			//告警列表数据
			tableData: [],
			//选择的日期
			choicedDate: new Date(),
		}
	},

	mounted() {
		this.getAlarmListData()
	},

	methods: {
		handleDateChange() {
			this.page = 1
			this.total = 0
			this.getAlarmListData()
		},

		//获取告警列表数据
		getAlarmListData() {
			console.log('choicedDate', this.choicedDate)
			let date = moment(this.choicedDate).format('YYYY-MM-DD')
			let page = this.page

			const fetchAction = this.tableType === 'bed' ? fetchAlarmList : fetchRoomAlarmList

			fetchAction({
				type: 'inst',
				id: this.bedId,
				limit: 5,
				date,
				page,
			})
				.then((res) => {
					console.log('res', res)
					const { result, alarm_datas, count } = res
					if (result === 'success') {
						this.tableData = alarm_datas
						this.total = count
					}
				})
				.catch((err) => {
					console.error('err', err)
				})
		},

		//处理告警
		handleSolveAlarm(row) {
			const { id } = row
			console.log('row', row)
			handleAlarmSolved({
				ids: [id],
			})
				.then((res) => {
					console.log('res', res)
					const { result, message } = res
					if (result === 'success') {
						this.$message.success(message)
					}
				})
				.catch((err) => {})
		},
	},
}
</script>
<style lang="less" scoped>
.panel-container {
	width: 400px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.panel-top {
		flex: none;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.panel-date {
			::v-deep .el-input__inner {
				font-size: 14px;
				font-family: PingFang SC;
				padding: 0 0 0 33px;
				height: 28px;
			}

			::v-deep .el-input__prefix {
				top: -7px;
			}

			font-weight: 500;
			color: #666666;
			width: 106px;
		}
	}

	.panel-body {
		flex: auto;
		height: 100%;
		width: 100%;
		margin-top: 14px;
		.dlg-table {
			height: 100%;
			border: 1px solid #d9d9d9;
			border-radius: 10px;
			overflow: hidden;
		}
		::v-deep .el-table__header {
			height: 40px;
		}

		::v-deep .el-table th {
			background: #f1f2f6;
		}
	}

	.panel-footer {
		flex: none;
		margin-top: 8px;
		width: 100%;
		display: flex;
		justify-content: flex-end;

		.table-pagging {
		}
	}
}
</style>
