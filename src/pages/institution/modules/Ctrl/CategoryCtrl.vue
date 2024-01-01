<template>
	<div class="ctrl-wrap">
		<el-radio-group v-model="categoryRadio">
			<el-radio class="radio-btn" label="1" border>
				<div class="ctrl-label-wrap">
					<span>全部床位</span>
					<span>{{ allDataNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="2" border>
				<div class="ctrl-label-wrap">
					<span>空闲床位</span>
					<span>{{ emptyBedNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="3" border>
				<div class="ctrl-label-wrap">
					<span>入住床位</span>
					<span>{{ usedBedNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="4" border>
				<div class="ctrl-label-wrap">
					<span>在床老人</span>
					<span>{{ inBedNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="5" border>
				<div class="ctrl-label-wrap">
					<span>离床老人</span>
					<span>{{ offBedNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="6" border>
				<div class="ctrl-label-wrap">
					<span>离线设备</span>
					<span>{{ offlineDeviceNum }}</span>
				</div>
			</el-radio>
			<el-radio class="radio-btn" label="7" border>
				<div class="ctrl-label-wrap">
					<span>未处理告警</span>
					<span>{{ alarmBedNum }}</span>
				</div>
			</el-radio>
		</el-radio-group>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			ifDisplayEmptyBeds: true,
		}
	},

	computed: {
		...mapGetters([
			'allDataNum',
			'emptyBedNum',
			'usedBedNum',
			'inBedNum',
			'offBedNum',
			'offlineDeviceNum',
			'alarmBedNum',
		]),

		categoryRadio: {
			get() {
				return this.$store.state.display.displayCategory
			},
			set(value) {
				this.changeDisplayCategory(value)
			},
		},
	},

	methods: {
		...mapActions('display', ['changeDisplayCategory']),
	},
}
</script>

<style>
.ctrl-wrap .el-radio__label {
	padding: 0;
}
</style>

<style scoped>
.ctrl-wrap {
	display: flex;
	flex-direction: row;
	align-items: center;
}

/*---checkbox-wrap---*/

.ctrl-label-wrap span:last-child {
	margin-left: 1.5rem;
}

::v-deep .el-radio-group {
	font-size: unset;
}

::v-deep .el-radio.is-bordered {
	padding: 1.2rem 1rem 0;
}

::v-deep .radio-btn.el-radio {
	margin: 0.8rem;
}

::v-deep .radio-btn .el-radio__input {
	display: none;
}

.split {
	height: 6em;
}
</style>
