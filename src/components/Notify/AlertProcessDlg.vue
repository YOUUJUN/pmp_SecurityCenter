<template>
	<section class="alarm-list-wrap">
		<el-scrollbar style="height: 100%">
			<ul class="alarm-list">
				<li class="alarm-item" v-for="(item, index) in renderData" :key="index">
					<el-tooltip effect="dark" :content="item.alarm_text" placement="top-start">
						<div class="alarm-item-left">
							{{ item.alarm_text }}
						</div>
					</el-tooltip>

					<div class="alarm-item-right">
						<el-button type="text" size="small" @click="handleAlarmResolve(item, index)">
							立即处理
						</el-button>
					</div>
				</li>
			</ul>
		</el-scrollbar>
	</section>
</template>
<script>
import { handleAlarmSolved } from '@/api/security'

import { mapGetters, mapActions } from 'vuex'

export default {
	props: {
		roomData: {
			type: Object,
			default() {
				return {}
			},
		},
		alarmData: {
			type: Array,
			required: true,
		},

		visible: {
			type: Boolean,
		},
	},

	data() {
		return {
			renderData: [],
		}
	},

	watch: {
		alarmData: {
			handler(newValue) {
				this.renderData = newValue
			},
		},
	},

	mounted() {},

	methods: {
		...mapActions('data', ['resolveBedAlarm']),

		handleAlarmResolve(row, index) {
			const { bed_id } = this.roomData
			const { id } = row
			console.log('row', row)
			handleAlarmSolved({
				ids: `[${id}]`,
			})
				.then((res) => {
					console.log('res', res)
					const { result, message } = res.data
					if (result === 'success') {
						this.$message.success(message)

						let warn_qty = this.renderData.length - 1
						this.renderData.splice(index, 1)
						this.resolveBedAlarm({
							id: bed_id,
							warn_qty,
						})

						if (this.renderData.length === 0) {
							console.log('无剩余未处理')
							this.$emit('update:visible', false)
						}

						// this.$message({
						//     showClose: true,
						//     message: "处理成功!",
						//     type: "success",
						// });
					}
				})
				.catch((err) => {})
		},
	},
}
</script>

<style>
@import url('~@/styles/alarmDlg.css');
</style>

<style scoped></style>
