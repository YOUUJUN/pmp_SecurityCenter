<template>
	<article class="panel-container">
		<section class="panel-left">
			<h2 class="panel-title">床位</h2>

			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<div class="panel-left-wrap">
					<RoomCard
						v-for="(item, index) in classifiedData"
						:roomData="item"
						:key="item.only_bed_id"
						@invokeAudioAlarm="handleAudioAlarm"
					></RoomCard>
				</div>
			</el-scrollbar>
		</section>

		<section class="panel-right">
			<h2 class="panel-title">区域</h2>
			<el-scrollbar class="scroll-wrap" style="height: 100%">
				<!-- <div class="panel-right-wrap"> -->
				<transition-group class="panel-right-wrap" name="list-complete" tag="div">
					<AreaCard
						v-for="(item, index) in roomAlertData"
						class="list-complete-item"
						:cardInfo="item"
						:ifAlert="true"
						:key="index"
						@click.native="openAreaDlg(item)"
					></AreaCard>
				</transition-group>
				<!-- </div> -->
				<div class="panel-right-wrap">
					<AreaCard
						v-for="(item, index) in areaData"
						:cardInfo="item"
						:key="index"
						@click.native="openAreaDlg(item)"
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
		}
	},

	computed: {
		...mapGetters(['classifiedData', 'roomAlertData', 'toiletData']),

		areaData() {
			return this.toiletData.map((item) => {
				let obj = {
					data: {},
				}
				Object.assign(obj.data, {
					room_name: item.device_name,
					alarm_msg: item.status,
					device_id: item.device_id,
				})
				return obj
			})
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
			const { warn_text, bed_id } = payload
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
			this.doTalk(audioUrl, bed_id)
		},

		//开启语音播报
		async doTalk(url, bed_id) {
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
