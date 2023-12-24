<template>
	<div class="topright" ref="shell">
		<div class="saiBtn">
			<a-popover placement="bottom" trigger="click">
				<template slot="content">
					<div
						:style="{
							width: '300px',
						}"
					>
						<a-calendar
							v-model="dateCalendar"
							:fullscreen="false"
							@select="dateChange"
							@panelChange="dateChange"
							:header-render="headerRender"
						>
							<template slot="dateCellRender" slot-scope="dateModen">
								<span :class="dateComputed(dateModen) ? 'cicla' : ''"></span>
							</template>
						</a-calendar>
					</div>
				</template>
				<div class="hoverBtns on" :class="{ actives: mode === 1 }">
					<span class="margin-five" id="margin-five">
						{{ dateCalendar.format('YYYY-MM-DD') }}
					</span>
					<a-icon type="calendar" />
				</div>
			</a-popover>
			<div
				class="hoverBtns on"
				:class="{ actives: mode === 2 }"
				title="呈现过去7天数据分析结果"
				@click="setMode(2)"
			>
				过去7天
			</div>
			<div
				class="hoverBtns on"
				:class="{ actives: mode === 3 }"
				title="呈现过去30天数据分析结果"
				@click="setMode(3)"
			>
				过去30天
			</div>
		</div>
		<a-button type="primary" icon="download" size="large" class="font14" :loading="loading" @click="downloadFile">
			下载
		</a-button>
	</div>
</template>

<script>
import moment from 'moment'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { message } from 'ant-design-vue'
export default {
	name: 'DialogHead',
	props: {
		msg: String,
		title: String,
		badgeDate: {
			type: Array,
			default() {
				return []
			},
		},
	},
	data() {
		return {
			dateCalendar: moment(),
			mode: 1,
			loading: false,
		}
	},
	computed: {
		dateComputed() {
			return function (date) {
				// TODO 做日期判断
				return this.badgeDate.includes(date.format('YYYY-MM-DD'))
			}
		},
	},
	methods: {
		setMode(mode) {
			this.mode = mode
			console.log(mode)
			this.$emit('modeChage', mode)
		},
		async downloadFile() {
			this.loading = true
			const bgColor = '#fff'
			const scale = 1.5
			let pdfDom = document.getElementById(`mode${this.mode}`)
			if (!pdfDom) {
				message.warning('等页面信息显示完整哦！')
				return
			}
			let canvas = await html2canvas(pdfDom, {
				scale: 2,
				useCORS: true,
				backgroundColor: bgColor,
			})
			this.addTitle(canvas)
			const contentWidth = canvas.width / scale
			const contentHeight = canvas.height / scale
			let pageData = canvas.toDataURL('image/jpeg', 1.0)
			// let PDF = new jsPDF("p", "pt", "a4");
			let PDF = new jsPDF('p', 'pt', [contentWidth, contentHeight])
			PDF.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight)
			PDF.save(this.title + '.pdf')
			this.loading = false
		},
		addTitle(canvas) {
			const ctx = canvas.getContext('2d')
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.font = '20px Microsoft Yahei'
			ctx.fillStyle = 'rgba(184, 184, 184, 0.8)'
			const fontWidthNpde = ctx.measureText(this.title)
			const x = (canvas.width - Math.floor(fontWidthNpde.width)) / 2
			ctx.font = '24px Microsoft Yahei'
			ctx.fillStyle = '#000000'
			ctx.fillText(this.title, x, 230)
		},
		dateChange(date) {
			this.mode = 1
			console.log('YYYY-MM-DD===', date.format('YYYY-MM-DD'))
			this.$emit('modeChage', this.mode, date.format('YYYY-MM-DD'))
		},
		visibleChange(flage) {
			console.log(flage)
		},
		headerRender({ value, onChange }) {
			const start = 0
			const end = 12
			const monthOptions = []

			for (let index = start; index < end; index++) {
				monthOptions.push(
					<a-select-option class="month-item" key={`${index}`}>
						{index + 1}月
					</a-select-option>,
				)
			}
			const month = value.month()

			const year = value.year()
			const options = []
			for (let i = year - 10; i < year + 10; i += 1) {
				options.push(
					<a-select-option key={i} value={i} class="year-item">
						{i}年
					</a-select-option>,
				)
			}
			return (
				<div style={{ padding: '10px' }}>
					<a-row type="flex" justify="end">
						<a-select
							size="small"
							dropdownMatchSelectWidth={false}
							class="my-year-select"
							onChange={(newYear) => {
								console.log('newYear==', newYear)
								const now = value.clone().year(newYear)
								onChange(now)
							}}
							getPopupContainer={(triggerNode) => {
								return triggerNode.parentNode || document.body
							}}
							value={String(year) + '年'}
						>
							{options}
						</a-select>
						<a-select
							size="small"
							dropdownMatchSelectWidth={false}
							value={String(month)}
							onChange={(selectedMonth) => {
								const newValue = value.clone()
								newValue.month(parseInt(selectedMonth, 10))
								onChange(newValue)
							}}
							getPopupContainer={(triggerNode) => {
								return triggerNode.parentNode || document.body
							}}
						>
							{monthOptions}
						</a-select>
					</a-row>
				</div>
			)
		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topright {
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between;
}

.topright,
.topright .saiBtn {
	display: flex;
}

.topright .on {
	transition: color 0.3s, background 0.3s, border-color 0.3s;
	border-radius: 2px;
	padding: 9px 12px;
	cursor: pointer;
	margin-right: 10px;
	color: #262626;
	background: #fff;
	border: 1px solid #d9d9d9;
}

.topright .actives {
	background: #e6f7ff !important;
}

.topright .actives,
.topright .hoverBtns:hover {
	color: #1890ff !important;
	border: 1px solid #1890ff !important;
}

.topright .hoverBtns {
	background: #f3f4f7 !important;
}

.margin-five {
	margin: 0 5px;
}

.cicla {
	width: 5px;
	height: 5px;
	display: inline-block;
	background: #1890ff;
	border-radius: 50%;
}

.font14 {
	color: white;
	font-size: 14px;
}
</style>
