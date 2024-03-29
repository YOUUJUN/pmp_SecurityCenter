<template>
	<div class="card-wrap card-normal" :class="[alertClass, emptyClass, offlineClass]">
		<el-popover popper-class="alarm-popover" placement="right" trigger="click" v-model="visible">
			<alert-process-dlg
				:id="roomData.device_id"
				:roomData="roomData"
				:alarmData="alarmList"
				:visible.sync="visible"
			></alert-process-dlg>

			<el-button
				v-show="roomData.warn_count > 0"
				slot="reference"
				@click="openAlertProcessDlg()"
				class="card-badge"
				type="danger"
				circle
				size="mini"
				trigger="manual"
			>
				{{ roomData.warn_count }}
			</el-button>
		</el-popover>
		<!-- <div class="card-badge" v-show="roomData.warn_count > 0">{{ roomData.warn_count }}</div> -->
		<div class="card-top">
			<img
				class="card-avatar"
				v-if="roomData.gender === '男'"
				src="~@/assets/images/man.png"
				@click="handleOpenResumeDlg"
			/>
			<img
				class="card-avatar"
				v-else-if="roomData.gender === '女'"
				src="~@/assets/images/women.png"
				@click="handleOpenResumeDlg"
			/>

			<img class="card-avatar" v-else src="~@/assets/images/empty_user.png" />
			<span class="card-name">{{ roomData.name }}</span>
			<el-button v-if="alertCount !== 0" class="card-num" type="danger" circle size="mini">
				{{ alertCount }}s
			</el-button>
			<span v-else></span>
		</div>
		<ul class="card-middle" v-if="roomData.elderly_id">
			<li class="card-item">
				<span class="card-item-left">状态</span>
				<span class="card-item-right">{{ roomData.status }}</span>
			</li>
			<li class="card-item">
				<span class="card-item-left">告警</span>
				<span class="card-item-right">{{ roomData.warn_text }}</span>
			</li>
		</ul>
		<div class="card-bottom" v-if="roomData.elderly_id">
			<el-button class="card-btn" plain @click="handleOpenElderDlg(roomData.elderly_id)" :loading="loading">
				查看详情
			</el-button>
		</div>

		<div class="card-empty-wrap" v-if="!roomData.elderly_id">
			<img class="card-empty-img" src="~@/assets/images/empty_bed.png" />
			<span class="card-empty-name">空闲床位</span>
		</div>

		<ElderInfoDlg
			v-if="renderElderInfoDlg"
			:visible.sync="visibleElderInfoDlg"
			ref="elderInfo"
			:roomData="roomData"
		></ElderInfoDlg>

		<ResumeDlg
			:visible.sync="visibleResumeDlg"
			:roomData="roomData"
			@invokeElderInfoDlgOpen="handleOpenElderDlg"
		></ResumeDlg>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

import ElderInfoDlg from './ElderInfoDlg.vue'
import ResumeDlg from './ResumeDlg.vue'
import AlertProcessDlg from '@/components/Notify/AlertProcessDlg.vue'

import { getAlertLevelClass } from '@/api/dict'
import { fetchAlarmList } from '@/api/security'
import moment from 'moment'

export default {
	name: 'SecurityCenterRoomCard',

	props: {
		roomData: {
			type: Object,
			default() {
				return {}
			},
		},
	},

	components: {
		ElderInfoDlg,
		ResumeDlg,
		AlertProcessDlg,
	},

	data() {
		return {
			renderElderInfoDlg: false,
			visibleElderInfoDlg: false,

			visibleResumeDlg: false,

			//数据获取中状态
			loading: false,

			//报警卡片类
			alertClass: '',

			//告警计时
			alertCount: 0,

			//告警计时器
			alertTimer: null,

			//弹窗控制
			popOverVisible: false,

			visible: false,

			//报警列表
			alarmList: [],
		}
	},

	computed: {
		emptyClass() {
			const { elderly_id } = this.roomData
			let className = ''
			if (!elderly_id) {
				className = 'card-blank'
			}
			return className
		},

		offlineClass() {
			const { status } = this.roomData
			let className = ''
			if (status === '离线') {
				className = 'card-off'
			}
			return className
		},
	},

	watch: {
		roomData: {
			deep: true,
			immediate: true,
			handler(newValue) {
				let { warn_text, warn_count, alertFlag } = newValue
				this.alertClass = getAlertLevelClass(warn_text, alertFlag, warn_count)
				console.log('alertClass', this.alertClass)
				if (alertFlag) {
					this.setCardAlarm()
				}
			},
		},
	},

	mounted() {},

	methods: {
		...mapActions('tempData', ['getReportData']),
		...mapActions('data', ['resetBedAlarm']),

		//打开老人健康报告窗体
		handleOpenElderDlg(elderId) {
			const currentTime = new Date().Format('yyyy-MM-dd')
			this.loading = true
			this.getReportData({
				elderId,
				reportDate: currentTime,
			})
				.then((res) => {
					this.renderElderInfoDlg = true
					this.$nextTick(() => {
						this.visibleElderInfoDlg = true
						this.$refs.elderInfo.renderInfo({
							elderId,
							reportDate: currentTime,
						})
					})
				})
				.finally(() => {
					this.loading = false
				})
		},

		//打开老人信息窗体
		handleOpenResumeDlg() {
			this.visibleResumeDlg = true
		},

		//启动卡片告警
		setCardAlarm() {
			console.log('roomData', this.roomData)
			const { bed_id, warn_text, room_name, bed_room, inst_name, build_name, floor_name } = this.roomData
			if (this.alertTimer) {
				clearInterval(this.alertTimer)
			}
			this.startCountdown(30, () => {
				this.resetBedAlarm({
					bed_id,
				})
			})

			this.$emit('invokeAudioAlarm', {
				warn_text,
				bed_id,
				bed_name: `${room_name}-${bed_room}`,
				alert_text: `${inst_name}${build_name}${floor_name}${room_name}${bed_room}发生${warn_text}事件，请及时处理！`,
			})
		},

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

		// 打开处理告警面板
		openAlertProcessDlg() {
			console.log('roomData', this.roomData)
			fetchAlarmList({
				type: 'inst',
				id: this.roomData.device_id,
				limit: 9999,
				// date: moment('2024-01-11').format('YYYY-MM-DD'),
				page: 1,
			})
				.then((res) => {
					console.log('res', res)
					const { result, alarm_datas, count } = res.data
					if (result === 'success') {
						this.alarmList = alarm_datas
						if (this.alarmList.length > 0) {
							this.visible = true
						} else {
							this.$message.warning('暂无需要处理的告警')
						}
					}
				})
				.catch((err) => {
					console.error('err', err)
				})
		},
	},
}
</script>

<style lang="less" scoped>
.card-wrap {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	border: 2px solid transparent;
	border-radius: 10px;
	height: 240px;
	padding: 16px 0;
	margin-top: 9px;

	// .card-badge {
	// 	position: absolute;
	// 	top: 0;
	// 	right: 10px;
	// 	transform: translateY(-50%) translateX(100%);
	// 	font-size: 10px;
	// 	color: #fff;
	// 	background-color: #f56c6c;
	// 	display: flex;
	// 	width: 2rem;
	// 	height: 2rem;
	// 	align-items: center;
	// 	justify-content: center;
	// 	border-radius: 50%;
	// 	cursor: pointer;
	// 	user-select: none;
	// }

	.card-top {
		flex: none;
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		.card-avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;
		}

		.card-name {
			font-size: 20px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.card-num {
			display: flex;
			width: 30px;
			height: 30px;
			align-items: center;
			justify-content: center;
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

		font-size: 14px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		padding: 8px 30px;

		.card-item {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}
	}

	.card-empty-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		.card-empty-img {
			width: 60px;
			height: 47px;
			margin: 40px 0 30px;
		}

		.card-empty-name {
			font-size: 18px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #999999;
		}
	}

	.card-bottom {
		flex: none;
		.card-btn {
			background: #ffffff;
			border-radius: 5px;
			padding: 8px 15px;
			font-size: 14px;
		}
	}
}

.card-badge {
	position: absolute;
	top: 0;
	right: 10px;
	transform: translateY(-50%) translateX(100%);
	display: flex;
	width: 2rem;
	height: 2rem;
	align-items: center;
	justify-content: center;
}

.card-normal {
	background-color: #ecffee;
}

.card-alert {
	background-color: #fbe5e6;
}

.card-off {
	background-color: #ecedef;
}

.card-warn {
	background-color: #fef4dd;
}

.card-blank {
	background-color: #fff;
	border-color: #ecedef;
}
</style>
