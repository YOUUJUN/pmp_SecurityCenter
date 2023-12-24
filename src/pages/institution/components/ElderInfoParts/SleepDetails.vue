<template>
	<div class="main">
		<div id="echarts1" class="echarts1" style="width: 110rem; height: 10px"></div>
		<div style="position: relative; width: 100%; border-bottom: 1rem">
			<div>
				<div class="sleep-div">
					<div class="sleep-item">
						<div class="sleep-begin sleep-begin1"></div>
						<div class="sleep-title">深睡 ：{{ deepSleepDuration.value }}</div>
						<span
							:class="[
								'sleep-title',
								'ml10',
								'sleep-title-bg',
								deepSleepDuration.comment === '正常' ? 'name-blue' : 'name-red',
							]"
						>
							{{ deepSleepDuration.comment }}
						</span>
					</div>
					<div class="sleep-item-slipe"></div>
					<div class="sleep-item">
						<div class="sleep-begin sleep-begin2"></div>
						<div class="sleep-title">浅睡 ：{{ lightSleepDuration.value }}</div>
						<span
							class="sleep-title ml10 sleep-title-bg"
							:class="[
								'sleep-title',
								'ml10',
								'sleep-title-bg',
								lightSleepDuration.comment === '正常' ? 'name-blue' : 'name-red',
							]"
						>
							{{ lightSleepDuration.comment }}
						</span>
					</div>
					<div class="sleep-item-slipe"></div>
					<div class="sleep-item">
						<div class="sleep-begin sleep-begin3"></div>
						<div class="sleep-title">清醒 ：{{ clearSleepDuration.value }}</div>
						<span
							class="sleep-title ml10 sleep-title-bg"
							:class="[
								'sleep-title',
								'ml10',
								'sleep-title-bg',
								clearSleepDuration.comment === '正常' ? 'name-blue' : 'name-red',
							]"
						>
							{{ clearSleepDuration.comment }}
						</span>
					</div>
					<div class="sleep-item-slipe"></div>
					<div class="sleep-item">
						<div class="sleep-begin sleep-begin4"></div>
						<div class="sleep-title">离床 ：{{ outBedDuration.value }}</div>
						<span
							class="sleep-title ml10 sleep-title-bg"
							:class="[
								'sleep-title',
								'ml10',
								'sleep-title-bg',
								outBedDuration.comment === '正常' ? 'name-blue' : 'name-red',
							]"
						>
							{{ outBedDuration.comment }}
						</span>
					</div>
				</div>
			</div>
			<div
				style="
					height: 22px;
					border-bottom: 1px solid rgb(217, 217, 217);
					padding-bottom: 24px;
					position: relative;
					margin-top: 10px;
					display: flex;
					justify-content: space-between;
				"
			>
				<span class="begin-end">
					<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA3hJREFUWEftmE9oHHUUxz9vZm1aMNAmaXe6UStYQQSV4qG0GOrBCgWvLR48iB56qM1OWkRawVJoLYWSTJN68KAgCIKgHvTgQQttxRylFxGq9W/T3yRNIE1Fs5mZJ79tJ213NzvNzrYNmLktv/d97/N77+2b+f2EJf7IEudjGTBvhRbM4Nph3eQmHAH6gM68gRrpVZnG4bTrcHBsr/zUyKYhYCnQ7Ql8CXTcDbAGPq8lyovjAzJau1YH2HtKu+MIu5ueewSXhvkzfoAnJ/bItVvj1gF6gb4DHL7HcNVwKvSHZRnJAjwPPH0/AFHOmAF5fmHAQ1rw1jALODeMEuArhM9F+TVW5lKxqxQSl4dRXgJ2ChRqNmX9fKLwdQKXRInTdcdlhSZsRNklDtvR+XE3bXxZvSBg6YT2JAUmbhgYHF42/XImK5vFEX2KmM8EHre2IpyPYOdEWS5kab0R3UHMx0AXgpopVnBYolR3Ww+uC7TogAEm3QJbL+3hwvqT9KFsUKkf6gJJHHNxfD+jvafoSiKOK8xWHA5M7WUmUytcHC8z2vsez8RznLXjrKtEx4+7pNIcUHjVlOUjb0h3AJuzsqBwNhyQ07fa3bHW4VxYlm+LJ7UsStAU0BvWtZrwRejTxyFcbzUHADcTUKiEPsdAtGpre3mx2k9xvDF+MKt4lt0y3+t1Y6bnA+288rrMVPvR5Y0suHS94jI41S9X7e9WtT3HtfPKWzLTdMyki48c0zWVlZTvEFA14kT4pvxt7ReldVCt3NTWxmv6NVMa0Sd0jgezICOX6dp/bB5t0zm4sTu757KA86z/PElcN2Zs7Qsd1Vlkh246pPPEyaOtvhyiWV6x/VgtcTHQQYGBPF7brVUYCn3ZVwX0Av3d9na7g+T094fxZUMKaN+T97u0tftJjC9uCnh9wC6xx/giy4B5irKcwTzZs9rlDP6vMvgPsDLvjtus/9f4siqdg+eA59ocIK+774wvfdcBh3WbJnzT4OiYN0hLeoVIHF6wJ8r5D1YvUHuaKwK/KbzfkuecIoHdwKNAaHzxrLs6QIW3Q1/ezRmrJXkx0IMCR5sCJsrWRrdMLUVcpGjdkG5xhO8XAhwD1hcSuv/aJ1OL9N0W84cGtStymAQuG19KtSX+EHjM+LKtLdFadOIFaq9afjG+vHYbYIv+7rpsyV+i/weFDG04YiwHCAAAAABJRU5ErkJggg=="
						alt=""
					/>
					<span>{{ sleepDetails.getBedIdx }}上床</span>
				</span>
				<span class="begin-end" style="right: 0px">
					<img
						src="data:image/png;base64,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"
						alt=""
						class="sleep-end"
					/>
					{{ sleepDetails.leaveBedIdx }}起床
				</span>
			</div>
			<div style="position: relative">
				<div class="zqTopArr">
					<div class="zqTipTime" v-for="(i, n) in sleepTableTimeList" :key="n">
						{{ n === 0 || n === sleepTableTimeList.length - 1 ? '' : i }}
					</div>
				</div>
			</div>
			<div class="bedSleep" id="bedSleep" style="height: 12.5rem"></div>
		</div>
		<div class="myCharts" style="height: 110px">
			<div class="bt">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABV9JREFUaEPtmAtsU2UUx3+nZSAwJRNx7VzwgTw0oi4aIEZHYpREIREMQV6a6FQIhu0OYaIg2xAJdsK6EQmo00SeihFNRBM0JkxjYNGgYgwP8bHM9U6RRRwgbO0xt+0eZeXedqPRJvuSpk3vOf/v/M4597vfd4U0H5Lm8dMH8F9XMGUVyFmvY0JBPrQAXW6mNC6UQ6mATRmA168vKCy3glZY1WTI82kF4PGrD1gSDbrCNKSkDyBOBlLWQiM2qE+VJVb/iIuKYwvSrALj3lQfFkAkRRV1j6YZwP071CfRe0Ch4qOZaQbwyAfqE4ncxKpUvPVAmgEs/lR92mUVWnvP/wTgqrU6KujiXoRxwEhVhglkIBxzCTWNRbLNyvqaL9WPUhS9B6qW3iGG9X9Olc4OKQUoIxRaRfgDOIpS5w7xyW9Py5FkltvEVqFS7ee5nDkoC4Hb7CYYPZQtBbfQ2BpkvsJllq3AyQw3G2u+Jefwn8x1CPBrhPXmCbZSLm1OMI4AnmqdSIiNwBg7sWuGwNTRcMPQ8JO3Y5fY/tv6tsbh47DrCPzyl1NoHMLFfLNQ9tpZ2gCoZFeyFGGlQL8LibgF5o6FKdeDyzEdEZWQwu4fYfNBCLaTxZlAoQ1lRVMxa0DiWsafslRdniy2AjPt6DMzYNVEyPN2Wp1uhV9PUjcyi2oXNFjooTZyj56g8OohjBuU0Wl7IADL90JLq2M1dpjNzKFcQudbxgXw+rVKodBONsMFNZPhdit4S0Xh/SNQsQ+az+Azi+WZrv6eSn0payAlSybA1FHRKwJfNULBbmjtFlrs7ALVAUOKHAE8fl0AvOKUE9/dMPemiJVV2/LP4dUDUS+ND4AQ3tA9mQeld3XeJ1u+h5LPnGYMX3/KNGRDV8uYCnj9OlzhB2Cwndz4HNg1HSTqbWV93f4uHg4AluWi8WBVI5wAhWnvwv5GR4hTAjcGDKlvt4wB8FRpDcpjTjIfz4RbsyNWtfXw0K7zPBIAsDzengb5wyO+3zTBfTucZg636xtmkRR0A8h5Wa8I9aMBGGAnM3YY7JkdsTjbBvmbof5kzwCGXwa1D8OA6Bo3aRsctB5r9uOsq43cxsVy3DLrqIDXr/OU8HpvO0omQPH4iMlrB2BFbRzzBCtgea7MhyfyIhqV+8G3zymCcNDzA4ZsigHwVOpOhOlO7vPyoCwfWs5Fsh9o6R2ANzNShcz+UFYLm9oXAvtAdpqGzIgF8Kt16B7tBOACbr4SzFORT9yRRAUsf8/gyOe738FhNW2f7rBpSHhn0NFCHr/+DWQ6ASR0PUmAhDRjjVpMQy49H8CCT3Az4DBl6gHUNMRqhpgK2OxKksxR6gEwjchTqGsL9QF01KmvAs4t29dCtjlK9xZSF6ubCmVZV8jsKl0tyrPOzZGYRUpbSGBZwJDVXUPx+vU5hRcTC8/ZKtUAEwOGxGzzvH7NV7A9oDuH3WmRSoB6s5lru51fI+fsn4HoCSCZcLvbxgOw3sG4eycL6mJ2U6Fsj6eTXa2zJET4xVcvR9A0JHyK6PokPgZc1xthgW0BQ+bYaXj9ulUheiTq8Ww/mYaMiAWo0jKU0p5KCrwXaGYW5XLOVqNU+3uz2K7wYE/nQig3i6QsBiB3nQ4Mutmjyp1JCQvNGmJlU7H4k/HLrlRrP7kCJSsZPxG+cAeZ1LBIzsQAhEWqdYBHWYryOJBrI2ydw+pE2f3PIGqa54nzi8I4YlmbdMglpylQYTKEXxbbnUcaEF43hTUUytl2uQvv/99RN82E99wxo5FgvDdkyWTxgral6iInzkKSRYgZEoznd3EOMBcl+p6J9AH0LG8XzyvtK/AvH4chT+oRq9MAAAAASUVORK5CYII="
					alt=""
				/>
				<span>
					呼吸率
					<span style="color: rgb(140, 140, 140)">
						（最低{{ breathRateVo.min }}次/分钟 &nbsp; 平均{{ breathRateVo.avg }}次/分钟
						<span class="sleep-title-bg" style="background: rgb(24, 144, 255)">
							{{ breathRateVo.avgLabel }}
						</span>
						&nbsp;最高{{ breathRateVo.max }}次/分钟）
					</span>
				</span>
			</div>
			<div
				id="breathe"
				style="
					height: 100px;
					margin: 10px auto;
					user-select: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
					position: relative;
				"
			></div>
		</div>
		<div class="myCharts" style="height: 110px">
			<div class="bt">
				<img
					src="data:image/png;base64,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"
					alt=""
				/>
				<span>
					心率
					<span style="color: rgb(140, 140, 140)">
						（最低{{ heartRateVo.min }}次/分钟 &nbsp; 平均{{ heartRateVo.avg }}次/分钟
						<span class="sleep-title-bg" style="background: rgb(24, 144, 255)">
							{{ heartRateVo.avgLabel }}
						</span>
						&nbsp;最高{{ heartRateVo.max }}次/分钟）
					</span>
				</span>
			</div>
			<div
				id="heart"
				style="
					height: 100px;
					margin: 10px auto;
					user-select: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
					position: relative;
				"
			></div>
		</div>
		<div class="myCharts">
			<div class="bt">
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABVhJREFUaEPtmmlsVFUUgL/zpqUti4gBO8UWA2GJgEYQkBJQIouhgiAIiiFxR1k6nSkKSKIRyw8KpLQRWiOBoAYrCCgJKgIxQIAokdBA2GURCjNDgQASwXbmHfO6OW1p+mbaSkn6/s179yzfPefee+69I9zjj9zj/tMMcLcjWCMC8dn6vCG8oXBFDRb4U+VMQzmpqtHAa0Bf4BCwRkSu10d/FYCELB2iBjsAo1zpaZ9BT1zyT32MWLKq2g74scDPwC2noF8CDO/MWWCkiJyMVH8VAOdSXYzwXqgyMenvTZffIzVQ7rwD2LLxOMNdP0NQy7R5BsDsZPaIyOBI9VcFyNFclGlVlBkM9blkZ6QGygE8hy6RNXqdFQlIvA/OXINoAwreggfi6CkiRyOx0egAquoMKidHfUPrc9dh3Xjo3QFzZD7G4SL4PAXGdGO6iOQ1VYBl+YeZkb4d8kbBuO58DRTl7ictYzekPwnvD2SZiKQ2OQBVfaTE5MCg1cTEt4LNL3EJ6A4M21vIhgkb4OWesHQEm0RkXJMCUNXZqmSuPwaurbB6DDzbhbkikqmqj178i4NPrCp9Z33bLSJDmhrAnC2nWOjeBsVB2PMqJLQu62lVbV9iUtTpUxicBN+Op0BE+jQ1gPgSk3P9V9EiNgqWDCt19icRSVHVKKC4ay7SqwNsmsgREenVpADKp881ewt5pY+TkrgoFgEZImWLoqr+/dgK4jq1hc2TOCEiPRodoN1CbRsbw+sInU3hkD+BL5kkxRWG43N0LCYtK34nJ5I0pTdv//InGzccpSDUwfOprEz+gjhna8gfy8VueeULqIEacK0kwOnLs+REXVC214GEJfqwRrMT5eFKpcL+YuGZqy65Yb2Lz9ZCgYfqMmp9PzwVUtbCg63K0uvpr2pKKZw0hCXeBFYySYJ30msbwJmjm1Geq65EIdvvFk+4AEemwqi10LENZDwFw63VofZnhyOKFy/MlCvVm9gCKIYDLUyuAlZNU+VR8Prd0jFcgGPvwIh86HI/zEkui0Ydz68+g6HVC0tbAGaA84bBqVoMBH1usWaVsFLoxLswdE1pWcG0vvDC+rr8t0Y+GT6PfBTa0hZA7BV+u92uNAJxNcwIJ3xpZTNIOGPg7EzotxIGJcLkXjD5exsAcDMYTULRDLlZ0doWgFWNOrN1OTC9Rg4aeLwuyQ4HwDJ6wQXdP4PRXWFEZ3jzB1sAVhQm+jxSGS/bAPGLtZVEsw5IKTUlpZXxCv9VpjFfzHAAYhxgRcBaiaf0hr5OSN1qE0D42Jcm88OOQIWAM0sHqIMuIhz0ueRIqFlntk5E/lsHanMpWpBzqXxy5RZJcVFQ4GPVhO/YZQshyFFfuuwLE4BdzhyWo0RUcN3JMYdBVMsoYgMmgVsBbttxXuE6Dqb5U8XaT5cnQoiks5YdmQmFhskfdow0dhtRcrwecYcFYAh+M0hEW74GBxLyfGlSOZnYGsTNAA0bhlyfW2aElUJRAfYFHBytUsg1rFN2tZlqMMXvkvywAKyFLDFL47QFSRq4e+epxcqNyx7xhtLWPQbAKmPLj6LsdlTjtRNhsTdN5tmPQOP5EqnmTJ9b5jYDRNp99ZYTsnxpMuuejUDoDtCCsDOI691pDakgfABhkSp1ng40pJMh6fE4MLOa7sU+t8y2n0INcLweKZx1WySwqdq8v9Drlg+aASLt1XDkwo9AI10xheN0aNv4HB0myvZqKfSh1y0L7phCjXnJFwlE+0xt44jhuECCJa8QMJX+RR6pPKb8X69ZI4HomK09TJin0MYBeRfdsq3WYi4SA3dbpvmvBs0RqGcP/AvVW5RP21VWQAAAAABJRU5ErkJggg=="
					alt=""
				/>
				<span>
					体动详情
					<span style="color: rgb(140, 140, 140)">（共{{ turnOverIndex.turnOverNum }}次）</span>
				</span>
				<div class="tooltip" style="height: 20px">
					<img
						src="https://ql-data-prd.oss-cn-beijing.aliyuncs.com/WeChat/QL/img/QL_official_account/wenhaoIcon.png"
						alt=""
						style="width: 20px; height: 20px"
						@mouseenter="entry"
						@mouseleave="leave"
					/>
					<div id="tooltiptext-sleep" class="tooltiptextSleep" style="display: none">
						<div class="ahi-title">
							{{ turnOverIndex.turnOverDetail }}
						</div>
					</div>
				</div>
			</div>
			<div
				id="turnOverIndex"
				style="
					height: 126px;
					margin: 10px auto;
					user-select: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
					position: relative;
				"
			></div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
	props: {
		sleepDetails: {
			type: Object,
			required: true,
		},
		breathRateVo: {
			type: Object,
			required: true,
		},
		heartRateVo: {
			type: Object,
			required: true,
		},
		turnOverIndex: {
			type: Object,
			required: true,
		},
	},

	data() {
		return {
			echarts1: '',
			option: '',
			echarts2: '',
			option2: '',
			sleepData: '',
			sleepData1: '',
			sleepData2: '',
			sleepData3: '',
			sleepData4: '',
			sleepData5: '',
			optionHeart: {},
			sleepTime: '',
			breathRateVoInfo: '',
			sleepTableTimeList: '',
			sleepDetailsInfo: {},
			clearSleepDuration: [],
			outBedDuration: [],
			deepSleepDuration: [],
			lightSleepDuration: [],
			clearSleepDurationRatio: [],
			outBedDurationRatio: [],
			deepSleepDurationRatio: [],
			lightSleepDurationRatio: [],
			heartRateVoInfo: [],
			optionBreathe: '',
			myChartBreathe: '',
			myChartHeart: '',
			myChartTurnOverIndex: '',
			optionTurnOverIndex: '',
			turnOverIndexInfo: '',
		}
	},
	watch: {
		sleepDetails(value) {
			console.log('cookie===', this.sleepDetails.sleepIndex)
			this.lightSleepDuration = this.sleepDetails.sleepIndex.lightSleepDuration
			this.outBedDuration = this.sleepDetails.sleepIndex.outBedDuration
			this.deepSleepDuration = this.sleepDetails.sleepIndex.deepSleepDuration
			this.clearSleepDuration = this.sleepDetails.sleepIndex.clearSleepDuration
			// 需重新赋值为空
			this.clearSleepDurationRatio = []
			this.deepSleepDurationRatio = []
			this.outBedDurationRatio = []
			this.lightSleepDurationRatio = []
			this.clearSleepDurationRatio.push(this.clearSleepDuration.ratio) // 清醒时长
			this.outBedDurationRatio.push(this.outBedDuration.ratio) // 离床时长
			this.deepSleepDurationRatio.push(this.deepSleepDuration.ratio) // 深睡时长
			this.lightSleepDurationRatio.push(this.lightSleepDuration.ratio) // 浅睡时长
			console.log(
				'cookie_watch',
				this.sleepDetails.sleepIndex,
				'深睡:',
				this.deepSleepDuration.ratio,
				'浅睡:',
				this.lightSleepDuration.ratio,
				'清醒:',
				this.clearSleepDuration.ratio,
				'离床:',
				this.outBedDuration.ratio,
			)

			this.sleepTableTimeList = this.sleepDetails.sleepCycleVo.sleepTableTimeList
			this.sleepData = this.sleepDetails.sleepCycleVo.sleepDataVoList

			this.sleepTime = this.sleepDetails.sleepCycleVo.minutesList

			this.sleepData1 = this.sleepData[0].dataList.map((i) => {
				return this.intNum(i)
			})

			this.sleepData2 = this.sleepData[1].dataList.map((i) => {
				return this.intNum(i)
			})

			this.sleepData3 = this.sleepData[2].dataList.map((i) => {
				return this.intNum(i)
			})

			this.sleepData4 = this.sleepData[3].dataList.map((i) => {
				return this.intNum(i)
			})

			this.sleepData5 = this.sleepData[4].dataList.map((i) => {
				return this.intNum(i)
			})
			this.setOption()
			this.setOptionBed()
		},
		turnOverIndex(value) {
			this.turnOverIndexInfo = value
			this.setTurnOverIndex()
		},
		heartRateVo(value) {
			this.heartRateVoInfo = value
			this.setHeart()
		},
		breathRateVo(value) {
			this.breathRateVoInfo = value
			this.setBreathe()
		},
	},
	methods: {
		entry() {
			document.getElementById('tooltiptext-sleep').style.display = 'block'
		},
		leave() {
			document.getElementById('tooltiptext-sleep').style.display = 'none'
		},
		initEcharts() {
			const chartDom = document.getElementById('echarts1')
			this.echarts1 = echarts.init(chartDom)
		},
		setOption() {
			let lightSleepDurationOption = this.lightSleepDuration
			let outBedDurationOption = this.outBedDuration
			let deepSleepDurationOption = this.deepSleepDuration
			let clearSleepDurationOption = this.clearSleepDuration

			let deepSleepDurationRatio = this.deepSleepDurationRatio
			let lightSleepDurationRatio = this.lightSleepDurationRatio
			let clearSleepDurationRatio = this.clearSleepDurationRatio
			let outBedDurationRatio = this.outBedDurationRatio

			console.log(
				'cookie_setOption',
				deepSleepDurationRatio,
				lightSleepDurationRatio,
				clearSleepDurationRatio,
				outBedDurationRatio,
			)

			this.option = {
				grid: {
					left: 0,
					top: 0,
					bottom: 0,
					right: 0,
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// Use axis to trigger tooltip
						type: 'none', // 'shadow' as default; can also be 'line' or 'shadow'
					},
					formatter: function (params) {
						console.log('cookie_1', params)
						return (
							params[0].marker +
							params[0].seriesName +
							' ' +
							deepSleepDurationOption.value +
							'</br>' +
							params[1].marker +
							params[1].seriesName +
							' ' +
							lightSleepDurationOption.value +
							'</br>' +
							params[2].marker +
							params[2].seriesName +
							' ' +
							clearSleepDurationOption.value +
							'</br>' +
							params[3].marker +
							params[3].seriesName +
							' ' +
							outBedDurationOption.value
						)
					},
				},
				chart: {
					left: '0', // 设置图表距离左侧的距离为 10%
					top: '0', // 设置图表距离顶部的距离为 20%
					width: '100%', // 设置图表宽度为 80%
					height: '60%', // 设置图表高度为 60%
				},
				xAxis: {
					show: false,
					type: 'value',
				},
				yAxis: {
					show: false,
					type: 'category',
					data: [''],
				},
				series: [
					{
						name: '深睡',
						type: 'bar',
						stack: 'total',
						color: '#448ef7',
						label: {
							show: false,
						},
						data: deepSleepDurationRatio,
					},
					{
						name: '浅睡',
						type: 'bar',
						stack: 'total',
						color: '#bc96f7',
						label: {
							show: false,
						},
						data: lightSleepDurationRatio,
					},
					{
						name: '清醒',
						type: 'bar',
						stack: 'total',
						color: '#eeb7e4',
						label: {
							show: false,
						},
						data: clearSleepDurationRatio,
					},
					{
						name: '离床',
						type: 'bar',
						color: '#eeb8b6',
						stack: 'total',
						label: {
							show: false,
						},
						data: outBedDurationRatio,
					},
				],
			}
			this.echarts1.setOption(this.option)

			window.addEventListener('resize', () => {
				this.echarts1.resize()
			})
		},
		initEchartsBed() {
			const chartDom = document.getElementById('bedSleep')
			this.echarts2 = echarts.init(chartDom)
		},
		setOptionBed() {
			this.option2 = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: function (params) {
						// console.log(params)
						for (var i = 0; i < params.length; i++) {
							if (i > 0 && params[i].value !== '-') {
								return (
									params[i].marker +
									'&nbsp' +
									params[i].seriesName +
									'<br/>' +
									'时间' +
									'&nbsp' +
									params[i].name
								)
							}
						}
					},
				},
				grid: {
					left: '3%',
					right: '3%',
					bottom: '2%',
					top: '3%',
					containLabel: true,
				},
				xAxis: {
					show: false,
					type: 'category',
					data: this.sleepTime,
					// data: (function () {
					//   let list = []
					//   for (let i = 0; i < this.sleepTime; i++) {
					//     list.push(this.sleepTime[i])
					//   }
					//   return list
					// })(),
				},
				yAxis: {
					type: 'value',
					offset: 1,
					nameLocation: 'center',
					max: 4,
					min: 0,
					axisLine: {
						show: true,
					},
					splitNumber: 5,
					splitLine: {
						show: false,
					},
					axisLabel: {
						formatter: function (value, index) {
							if (index === 0) {
								value = '深睡'
							} else if (index === 1) {
								value = '浅睡'
							} else if (index === 2) {
								value = '清醒'
							} else if (index === 3) {
								value = '离床'
							} else {
								value = ''
							}
							return value
						},
						lineHeight: 20,
						showMaxLabel: false,
						verticalAlign: 'bottom',
					},
				},
				series: [
					{
						label: {
							position: 'top',
						},
						name: '辅助',
						type: 'bar',
						stack: 'Total',
						silent: true,
						large: true,
						barWidth: '100%',
						// barMaxWidth:'1%',
						itemStyle: {
							borderColor: 'transparent',
							color: 'transparent',
						},
						emphasis: {
							itemStyle: {
								borderColor: 'transparent',
								color: 'transparent',
							},
						},
						onclick: function (params) {
							var selectedData = params.data // 获取选中的数据
							var content = '选中的数据是：' + selectedData[0] // 构造弹窗内容
							alert(content) // 弹出弹窗
						},
						data: this.sleepData5,
					},
					{
						selectedMode: 'none', // 去除选中效果
						name: '清醒',
						color: '#eeb7e4',
						type: 'bar',
						stack: 'Total',
						barWidth: '100%',
						label: {
							show: false,
							position: 'top',
						},
						data: this.sleepData3,
					},
					{
						name: '离床',
						color: '#eeb8b6',
						type: 'bar',
						stack: 'Total',
						barWidth: '100%',
						label: {
							show: false,
							position: 'bottom',
						},
						data: this.sleepData4,
					},
					{
						name: '浅睡',
						color: '#bc96f7',
						type: 'bar',
						stack: 'Total',
						barWidth: '100%',
						label: {
							show: false,
							position: 'top',
						},
						data: this.sleepData2,
					},
					{
						name: '深睡',
						color: '#448ef7',
						type: 'bar',
						stack: 'Total',
						barWidth: '100%',
						label: {
							show: false,
							position: 'bottom',
						},
						data: this.sleepData1,
					},
				],
			}
			this.echarts2.setOption(this.option2)

			window.addEventListener('resize', () => {
				this.echarts2.resize()
			})
		},
		intNum(i) {
			if (i === '1') {
				i = 1
			} else if (i === '2') {
				i = 2
			} else if (i === '3') {
				i = 3
			} else if (i === '0') {
				i = 0
			} else if (i === '4') {
				i = 4
			} else if (i === '5') {
				i = 5
			} else if (i === '6') {
				i = 6
			} else if (i === '7') {
				i = 7
			} else if (i === '8') {
				i = 8
			} else if (i === '9') {
				i = 9
			}
			return i
		},
		// 呼吸率图
		initBreathe() {
			var chartDomBreathe = document.getElementById('breathe')
			this.myChartBreathe = echarts.init(chartDomBreathe)
		},
		setBreathe() {
			// var x = new Array();
			// for (var i = 0; i < this.breathRateVo.length; i++) {
			//   x.push(i);
			// }

			this.optionBreathe = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						// textStyle: {
						//   color: "#fff"
						// }
					},
					formatter: function (params) {
						// console.log(params)
						// for (var i = 0; i < params.length; i++) {
						//   if (i > 0 && params[i].value !== '-') {
						//     return params[i].marker + '&nbsp' + params[i].seriesName + '<br/>' + '时间' + '&nbsp' + params[i].name
						//   }
						// }
						return params[0].name + '<br/>' + params[0].marker + '&nbsp' + params[0].value
					},
				},
				// backgroundColor: "#1A1835",
				grid: {
					left: '3%',
					right: '3%',
					top: '5%',
					bottom: '5%',
					containLabel: false,
				},
				xAxis: {
					type: 'category',
					data: this.sleepTime,
					axisLabel: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
				},
				yAxis: {
					type: 'value',
					splitNumber: 2,
					// 刻度名称
					axisLabel: {
						show: true,
						// color: "red",
						// formatter: function (value, index) {
						//   console.log(value, index);
						//   if (index === 0) {
						//     return value;
						//   } else {
						//     return "";
						//   }
						// }
					},
					// 刻度横线
					axisTick: {
						show: false,
					},
					// 纵坐标竖线
					axisLine: {
						show: true,
						lineStyle: {
							color: '#d7d7d7',
						},
					},
					// 背景横线
					splitLine: {
						show: false,
					},
					min: 0,
					// max: 300
				},
				// dataZoom: [{
				//   type: 'inside',
				//   zoomLock: true,
				//   start: 0,
				//   end: 27.5
				// }],
				series: [
					{
						type: 'line',
						markLine: {
							itemStyle: {
								color: '#bc96f7', // markLine线条颜色为红色
							},
							data: [
								// {
								//   // 起点和终点的项会共用一个 name
								//   // name: '最小值到最大值',
								//   type: 'min',
								// },
								// {
								//   type: 'max',
								// },
								{
									yAxis: 10,
								},
								{
									yAxis: 20,
								},
							],
							silent: true,
							symbol: 'none',
							label: {
								position: 'start',
								formatter: function () {
									return ''
								},
							},
						},
						smooth: true,
						showSymbol: false,
						data: this.breathRateVo.dataList,
						lineStyle: {
							normal: {
								color: '#9491f4',
								shadowColor: 'transparent',
								width: 1,
								shadowBlur: 10,
								shadowOffsetY: 0,
							},
						},
						markPoint: {
							symbol: 'circle',
							symbolSize: 5,
							label: {
								show: false,
								normal: {
									textStyle: {
										color: 'rgba(0,0,0,0)',
									},
								},
							},
							itemStyle: {
								color: '#fff',
								// shadowColor: "rgba(249,143,2,0.8)",
								// shadowBlur: 10,
								// shadowOffsetY: 0
							},
							// data: [{
							//   type: 'max',
							//   name: '最大值',
							// }]
						},
					},
				],
			}

			this.myChartBreathe.setOption(this.optionBreathe)
			window.addEventListener('resize', () => {
				this.myChartBreathe.resize()
			})
		},
		// 呼吸率图
		initHeart() {
			var chartDomHeart = document.getElementById('heart')
			this.myChartHeart = echarts.init(chartDomHeart)
		},
		setHeart() {
			this.optionHeart = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
						// textStyle: {
						//   color: "#fff"
						// }
					},
					formatter: function (params) {
						// console.log(params)
						// for (var i = 0; i < params.length; i++) {
						//   if (i > 0 && params[i].value !== '-') {
						//     return params[i].marker + '&nbsp' + params[i].seriesName + '<br/>' + '时间' + '&nbsp' + params[i].name
						//   }
						// }
						return params[0].name + '<br/>' + params[0].marker + '&nbsp' + params[0].value
					},
				},
				// backgroundColor: "#1A1835",
				grid: {
					left: '3%',
					right: '3%',
					top: '5%',
					bottom: '5%',
					containLabel: false,
				},
				xAxis: {
					type: 'category',
					data: this.sleepTime,
					axisLabel: {
						show: false,
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false,
					},
				},
				yAxis: {
					type: 'value',
					splitNumber: 2,
					// 刻度名称
					axisLabel: {
						show: true,
						// color: 'red',
						// formatter: function (value, index) {
						//   console.log(value, index)
						//   if (index === 0) {
						//     return value
						//   } else {
						//     return ''
						//   }
						// },
					},
					// 刻度横线
					axisTick: {
						show: false,
					},
					// 纵坐标竖线
					axisLine: {
						show: true,
						lineStyle: {
							color: '#d7d7d7',
						},
					},
					// nameTextStyle: {
					//   color: "rgba(234, 19, 19, 1)"
					// },
					// 背景横线
					splitLine: {
						show: false,
					},
					min: Math.floor(this.heartRateVo.min),
					// max: 300
				},
				// dataZoom: [{
				//   type: 'inside',
				//   zoomLock: true,
				//   start: 0,
				//   end: 27.5
				// }],
				series: [
					{
						type: 'line',
						markLine: {
							itemStyle: {
								color: '#bc96f7', // markLine线条颜色为红色
							},
							data: [
								// {
								//   // 起点和终点的项会共用一个 name
								//   // name: '最小值到最大值',
								//   type: 'min',
								// },
								{
									type: 'max',
								},
								{
									yAxis: this.heartRateVo.min + 10,
								},
								// {
								//   yAxis: 80
								// }
							],
							silent: true,
							symbol: 'none',
							label: {
								position: 'start',
								formatter: function () {
									return ''
								},
							},
						},
						smooth: true,
						showSymbol: false,
						data: this.heartRateVo.dataList,
						lineStyle: {
							normal: {
								color: '#9491f4',
								shadowColor: 'transparent',
								width: 1,
								shadowBlur: 10,
								shadowOffsetY: 0,
							},
						},
						markPoint: {
							symbol: 'circle',
							symbolSize: 5,
							label: {
								show: false,
								normal: {
									textStyle: {
										color: 'rgba(0,0,0,0)',
									},
								},
							},
							itemStyle: {
								color: '#fff',
								// shadowColor: "rgba(249,143,2,0.8)",
								// shadowBlur: 10,
								// shadowOffsetY: 0
							},
							// data: [{
							//   type: 'max',
							//   name: '最大值',
							// }]
						},
					},
				],
			}

			this.myChartHeart.setOption(this.optionHeart)
			window.addEventListener('resize', () => {
				this.myChartHeart.resize()
			})
		},

		// 体动次数
		initTurnOverIndex() {
			var chartDomTurnOverIndex = document.getElementById('turnOverIndex')
			this.myChartTurnOverIndex = echarts.init(chartDomTurnOverIndex)
		},
		setTurnOverIndex() {
			var info = this.turnOverIndex.turnOverExtendData.xtimeAxis
			this.optionTurnOverIndex = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					borderColor: '#ccccff', // 设置提示框边框颜色为红色
					formatter: function (params) {
						console.log(params)
						const axisValue = params[0].axisValue
						for (let i = 0; i < info.length; i++) {
							if (info[i] === axisValue) {
								if (i == info.length - 1) {
									return axisValue + '~' + '08:00' + '<br/>' + '体动' + params[0].value + '次'
								}
								return axisValue + '~' + info[i + 1] + '<br/>' + '体动' + params[0].value + '次'
							}
						}
					},
				},
				grid: {
					left: '1%',
					right: '4%',
					bottom: '5%',
					top: '5%',
					containLabel: true,
				},
				xAxis: [
					{
						type: 'category',
						data: this.turnOverIndex.turnOverExtendData.xtimeAxis,
						axisTick: {
							show: false,
						},
						axisLine: {
							show: true,
							// lineStyle: {
							//   color: "#f3f4f7"
							// }
						},
						axisLabel: {
							show: false,
						},
					},
				],
				yAxis: [
					{
						type: 'value',
						splitLine: {
							show: false,
						},
						axisLine: {
							show: true,
							lineStyle: {
								// color: "red"
							},
						},
					},
				],
				series: [
					{
						name: '体动次数',
						type: 'bar',
						barWidth: '80%',
						data: this.turnOverIndex.turnOverExtendData.data,
						itemStyle: {
							normal: {
								borderRadius: [10, 10, 0, 0],
							},
						},
					},
				],
			}

			this.myChartTurnOverIndex.setOption(this.optionTurnOverIndex)
			window.addEventListener('resize', () => {
				this.myChartTurnOverIndex.resize()
			})
		},
	},
	mounted() {
		this.lightSleepDuration = this.sleepDetails.sleepIndex.lightSleepDuration
		this.outBedDuration = this.sleepDetails.sleepIndex.outBedDuration
		this.deepSleepDuration = this.sleepDetails.sleepIndex.deepSleepDuration
		this.clearSleepDuration = this.sleepDetails.sleepIndex.clearSleepDuration

		// 需重新赋值为空
		this.clearSleepDurationRatio = []
		this.outBedDurationRatio = []
		this.deepSleepDurationRatio = []
		this.lightSleepDurationRatio = []

		this.clearSleepDurationRatio.push(this.clearSleepDuration.ratio) // 清醒时长
		this.outBedDurationRatio.push(this.outBedDuration.ratio) // 离床时长
		this.deepSleepDurationRatio.push(this.deepSleepDuration.ratio) // 深睡时长
		this.lightSleepDurationRatio.push(this.lightSleepDuration.ratio) // 浅睡时长
		console.log(
			'cookie_mounted',
			this.sleepDetails.sleepIndex,
			'深睡:',
			this.deepSleepDuration.ratio,
			'浅睡:',
			this.lightSleepDuration.ratio,
			'清醒:',
			this.clearSleepDuration.ratio,
			'离床:',
			this.outBedDuration.ratio,
		)

		this.sleepTableTimeList = this.sleepDetails.sleepCycleVo.sleepTableTimeList
		this.sleepData = this.sleepDetails.sleepCycleVo.sleepDataVoList

		this.sleepTime = this.sleepDetails.sleepCycleVo.minutesList

		this.sleepData1 = this.sleepData[0].dataList.map((i) => {
			return this.intNum(i)
		})

		this.sleepData2 = this.sleepData[1].dataList.map((i) => {
			return this.intNum(i)
		})

		this.sleepData3 = this.sleepData[2].dataList.map((i) => {
			return this.intNum(i)
		})

		this.sleepData4 = this.sleepData[3].dataList.map((i) => {
			return this.intNum(i)
		})

		this.sleepData5 = this.sleepData[4].dataList.map((i) => {
			return this.intNum(i)
		})

		this.initEcharts()
		this.initEchartsBed()
		this.initBreathe()
		this.initHeart()
		this.initTurnOverIndex()

		this.setOption()
		this.setBreathe()
		this.setHeart()
		this.setOptionBed()
		this.setTurnOverIndex()
	},
	created() {},
}
</script>

<style scoped>
.myCharts {
	margin-bottom: 3rem;
	position: relative;
	width: 100%;
}

.sleep-div {
	width: 100%;
	height: 25px;
	margin-top: 12px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
}

.sleep-item {
	display: inline-block;
}

.sleep-begin {
	margin-left: 0;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	display: inline-block;
}

.sleep-begin1 {
	background: #4d8ef7;
}

.sleep-title {
	height: 20px;
	font-size: 12px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #8c8c8c;
	display: inline-block;
	margin-left: 4px;
}

.sleep-title-bg {
	color: #fff;
	background: #4d8ef7;
	padding: 0 6px;
	height: 19px;
	line-height: 19px;
	border-radius: 10px 10px 10px 2px;
}

.sleep-item-slipe {
	width: 2px;
	height: 15px;
	background: #1f2635;
	opacity: 0.1;
	margin: 0 12px;
}

.sleep-begin2 {
	background: #c394fe;
}

.sleep-begin3 {
	background: #f8b4e7;
}

.sleep-begin4 {
	background: #ffb5b5;
}

.begin-end {
	padding: 3px 10px 3px 0;
	white-space: nowrap;
	background: rgba(24, 144, 255, 0.2);
	border-radius: 10px 10px 10px 1px;
	position: absolute;
	z-index: 1;
	top: 6px;
	margin-top: -6px;
	margin-bottom: 13px;
	font-size: 12px;
	display: inline-block;
}

.begin-end img {
	width: 14px !important;
	margin-left: 10px;
	position: relative;
	top: 0.3rem;
}

.sleep-end {
	margin-left: 12px;
}

.zqTopArr {
	width: 100%;
	color: rgba(0, 0, 0, 0.35);
	position: absolute;
	top: -2.5rem;
	left: 0;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
}

.zqTipTime {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
}

.main {
	width: 100%;
	display: flex;
	height: auto;
	flex-wrap: wrap;
}

.bt img {
	width: 22px;
	margin-right: 5px;
	margin-top: -0.5rem;
}

.tooltip {
	position: relative;
	display: inline-block;
	border-bottom: 0.1rem dotted #fff;
	height: 2.4rem;
	margin-left: auto;
	right: 0.5rem;
}

.tooltiptextSleep {
	width: 37.5rem;
	background: #fff;
	box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.2);
	color: #ccc;
	border-radius: 0.6rem;
	padding: 2rem 2rem;
	position: absolute;
	z-index: 1;
	top: -17rem;
	left: -17.8rem;
}

.ahi-title {
	font-size: 1.6rem;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #1f2635;
}

.ahi-title:before {
	content: '';
	display: inline-block;
	width: 0.3rem;
	height: 1.8rem;
	background: #4d8ef7;
	border-radius: 0.2rem;
	position: absolute;
	top: 2.1rem;
	left: 0;
}
.tooltiptextSleep:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-left: -0.5rem;
	border-width: 0.8rem;
	border-style: solid;
	border-color: #fff transparent transparent transparent;
}

.name-blue {
	background: rgb(24, 144, 255);
}

.name-red {
	background: rgb(255, 77, 79);
}
</style>
