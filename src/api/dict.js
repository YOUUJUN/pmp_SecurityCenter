//获取告警级别类
export function getAlertLevelClass(msg_text, alertFlag) {
	let alertClass = ''

	if (!alertFlag) {
		return alertClass
	}
	switch (msg_text) {
		case '呼吸过速':
		case '呼吸过缓':
		case '心跳过速':
		case '心跳过缓':
		case '离床未归':
		case '翻身护理':
			alertClass = 'card-warn'
			break
	}

	return alertClass
}
