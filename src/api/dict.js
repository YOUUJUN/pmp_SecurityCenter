//获取告警级别类
export function getAlertLevelClass(msg_text, alertFlag, warn_count) {
	let alertClass = ''

	if (alertFlag) {
		switch (msg_text) {
			case '呼吸过速':
			case '呼吸过缓':
			case '心跳过速':
			case '心跳过缓':
			case '离床未归':
			case '翻身护理':
				alertClass = 'card-alert'
				break
			case '设备离线':
				alertClass = 'card-off'
				break
		}

		return alertClass
	} else {
		if (warn_count > 0) {
			alertClass = 'card-warn'
			return alertClass
		}

		return alertClass
	}
}

//获取弹窗告警颜色
export function getNotifyClass(msg_text) {
	let alertClass = ''

	switch (msg_text) {
		case '呼吸过速':
		case '呼吸过缓':
		case '心跳过速':
		case '心跳过缓':
			alertClass = 'card-alert'
			break
		case '离床未归':
		case '翻身护理':
			alertClass = 'card-warn'
			break
		case '设备离线':
			alertClass = 'card-off'
			break
	}

	return alertClass
}

//获取告警图片
export function getAlertLevelImg(msg_text) {
	let imgPath = ''
	let alertClass = ''
	switch (msg_text) {
		case '在线':
			alertClass = ''
			imgPath = require('@/assets/images/alert/toilet.png')
			break
		case '跌倒告警':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/fall.png')
			break
		case '紧急呼叫':
			alertClass = 'level_2_warning'
			imgPath = require('@/assets/images/alert/call.png')
			break
		case '滞留告警':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/stack.png')
			break
		case '心率异常':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/heart.png')
			break
		case '呼吸异常':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/abnormality.png')
			break
		case '离床未归':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/leave.png')
			break
		case '翻身护理':
			alertClass = 'level_1_warning'
			imgPath = require('@/assets/images/alert/roll.png')
			break
		case '设备离线':
			alertClass = 'level_3_warning'
			imgPath = require('@/assets/images/alert/offline.png')
			break
	}

	return {
		imgPath,
		alertClass,
	}
}

//获取告警语音
export function getAudioUrl(name) {
	const audioUrl = {
		breath: require('@/assets/audios/breath.mp3'), // 呼吸异常
		fall: require('@/assets/audios/fall.mp3'), // 跌倒告警
		heart: require('@/assets/audios/heart.mp3'), // 心率异常
		leave: require('@/assets/audios/leave_bed.mp3'), // 离床未归
		urgent: require('@/assets/audios/urgent.mp3'), // 紧急呼叫
	}

	if (audioUrl[name]) {
		return `${audioUrl[name]}`
	} else {
		return ''
	}
}
