<template>
	<article class="panel-container">
		<section class="panel-left">
			<h2 class="panel-title">床位</h2>

			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<div class="panel-left-wrap">
					<RoomCard
						v-for="(item, index) in roomData"
						:roomData="item"
						:key="item.only_bed_id"
						v-show="ifBedVisible(item.only_bed_id)"
						@invokeAudioAlarm="handleAudioAlarm"
					></RoomCard>
				</div>
			</el-scrollbar>
		</section>

		<section class="panel-right">
			<h2 class="panel-title">区域</h2>
			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<!-- <div class="panel-right-wrap"> -->
				<!-- <transition-group class="panel-right-wrap" name="list-complete" tag="div">
					<AreaCard
						v-for="(item, index) in roomAlertData"
						class="list-complete-item"
						:cardInfo="item"
						:ifAlert="true"
						:key="index"
						@click.native="openAreaDlg(item)"
					></AreaCard>
				</transition-group> -->
				<!-- </div> -->
				<div class="panel-right-wrap">
					<AreaCard
						v-for="(item, index) in filteredToiletData"
						:cardInfo="item"
						:key="index"
						@openAreaDlg="openAreaDlg"
					></AreaCard>
				</div>
			</el-scrollbar>
		</section>

		<AreaDetailDlg ref="areaDlg" :visible.sync="visible"></AreaDetailDlg>

		<div ref="audioWrap" style="display: none"></div>
	</article>
</template>

<script>
import RoomCard from '@/pages/institution/components/RoomCard.vue'
import AreaCard from '@/pages/institution/components/AreaCard.vue'
import AreaDetailDlg from '../components/AreaDetailDlg.vue'
import AlertNotification from '@/components/Notify/AlertNotification.vue'

import { mapGetters } from 'vuex'

import { getAudioUrl } from '@/api/dict'

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
			dataList: [
				{
					data: {
						room_name: '212121',
						alarm_msg: '在线',
					},
				},
			],

			//告警语音循环
			talkLoopHandle: {},

			//告警弹窗队列
			alertNotifyQueue: [],
		}
	},

	computed: {
		...mapGetters(['roomData', 'classifiedData', 'roomAlertData', 'toiletData', 'filteredToiletData']),

		areaData() {
			console.log('filteredToiletData', this.filteredToiletData)
			return this.filteredToiletData.map((item) => {
				let obj = {
					data: {},
				}
				Object.assign(obj.data, {
					room_name: item.device_name,
					alarm_msg: item.status,
					device_id: item.device_id,
					only_room_id: item.only_room_id,
					room_id: item.room_id,
					alertFlag: item.alertFlag,
				})
				return obj
			})
		},

		//控制床位是否显示
		ifBedVisible() {
			return (bedId) => {
				const row = this.classifiedData.find((item) => item.only_bed_id === bedId)
				if (row) {
					return true
				} else {
					return false
				}
			}
		},
	},

	mounted() {
		// setInterval(() => {
		// 	this.add()
		// }, 1000)
	},

	methods: {
		openAreaDlg(item) {
			console.log('item', item)
			this.visible = true
			this.$refs.areaDlg.setData(item)
		},

		add() {
			this.dataList.splice(0, 0, Math.random())
		},

		//触发语音告警
		handleAudioAlarm(payload) {
			const { warn_text, bed_id, alert_text } = payload
			let alarmType = ''
			switch (warn_text.trim()) {
				case '呼吸暂停':
				case '呼吸过速':
				case '呼吸过缓':
					alarmType = 'breath'
					break
				case '心率过速':
				case '心率过缓':
					alarmType = 'heart'
					break
				case '离床未归':
					alarmType = 'leave'
					break
			}
			const audioUrl = getAudioUrl(alarmType)
			this.doTalk(alert_text, bed_id)
			this.openAlarmNotification(payload)
		},

		//开启语音播报
		async doTalk(alert_text, bed_id) {
			var text = alert_text
			var utterance = new SpeechSynthesisUtterance()
			utterance.text = text
			utterance.rate = 0.8 // 设置语速为0.8
			utterance.pitch = 1.2 // 设置音调为1.2
			utterance.volume = 0.5 // 设置音量为0.5
			speechSynthesis.speak(utterance)
			let count = 1
			let loopHandle = setInterval(() => {
				speechSynthesis.speak(utterance)
				count++
				if (count > 2) {
					clearInterval(loopHandle)
				}
			}, 5500)
			this.talkLoopHandle[bed_id] = loopHandle
		},

		//开启语音播报
		async doTalk2(url, bed_id) {
			this.creatAudio(url)

			let count = 1
			let loopHandle = setInterval(() => {
				this.creatAudio(url)
				count++
				if (count > 2) {
					clearInterval(loopHandle)
				}
			}, 5500)
			this.talkLoopHandle[bed_id] = loopHandle
		},

		//创建语音播报
		creatAudio(url) {
			let shell = this.$refs.audioWrap
			let iframe = document.createElement('iframe')
			iframe.setAttribute('allow', 'autoplay')
			iframe.setAttribute('src', `${url}#toolbar=0`)
			shell.appendChild(iframe)
		},

		//打开页面右下角告警弹窗
		openAlarmNotification(data, alertCallBack) {
			console.log('this-->', this)
			let vm = this
			console.log('data-->', data)
			const h = this.$createElement

			if (this.alertNotifyQueue.length > 4) {
				this.handleAlarmPopoverClose()
			}

			let notifyInstance = this.$notify({
				message: h(AlertNotification, {
					props: {
						renderInfo: data,
					},

					on: {
						countover: this.handleAlarmPopoverClose,
						// resolveAlert: alertCallBack,
						// handleRTCCall: this.openRTCCallDlg,
						// stopTalk: this.stopTalk,
					},
				}),
				duration: 0,
				showClose: false,
				customClass: 'alert-notification',
				position: 'bottom-right',
			})

			this.alertNotifyQueue.push(notifyInstance)
		},

		//处理页面右下角告警弹窗关闭
		handleAlarmPopoverClose(target) {
			console.log('close--')
			if (target) {
				let instanceIndex = this.alertNotifyQueue.findIndex((item) => item === target)
				this.alertNotifyQueue[instanceIndex]?.close()
				this.alertNotifyQueue.splice(instanceIndex, 1)
				return
			}

			let instance = this.alertNotifyQueue.shift()
			instance?.close()
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
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
}
</style>
