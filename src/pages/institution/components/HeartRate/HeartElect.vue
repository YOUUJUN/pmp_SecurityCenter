<template>
	<div class="root">
		<canvas class="canvas" ref="ecg" width="751px" height="152px"></canvas>
		<canvas class="canvas" ref="line" width="751px" height="152px"></canvas>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			xValue: 0,
			context: null,
			ifOpen: false,

			valueRate: 1,
		}
	},

	computed: {
		...mapState('socketData', ['heatRate']),
	},

	watch: {
		heatRate: {
			deep: true,
			handler(newValue) {
				this.changeOpen(newValue.value)
			},
		},
	},

	mounted() {
		var canvas = this.$refs.ecg
		var canvas2 = this.$refs.line
		this.context = canvas2.getContext('2d')

		this.drawSmallGrid(canvas)
		this.drawMediumGrid(canvas)
		this.drawBigGrid(canvas)
		this.drawLine(canvas2)
		this.setLoop()
	},

	methods: {
		...mapActions('socketData', ['resetHeartRate']),

		setLoop() {
			setTimeout(() => {
				this.ifOpen = true
				this.valueRate = 0.4
				setTimeout(() => {
					this.ifOpen = false
					this.valueRate = 1
					this.setLoop()
				}, 500)
			}, 500)
		},

		drawSmallGrid(canvas) {
			var context = canvas.getContext('2d')
			context.strokeStyle = '#fff'
			context.strokeWidth = 1
			context.beginPath()
			for (var x = 0.5; x < 751; x += 3) {
				context.moveTo(x, 0)
				context.lineTo(x, 751)
				context.stroke()
			}
			for (var y = 0.5; y < 751; y += 3) {
				context.moveTo(0, y)
				context.lineTo(751, y)
				context.stroke()
			}
			context.closePath()
			return
		},

		drawMediumGrid(canvas) {
			var context = canvas.getContext('2d')
			context.strokeStyle = '#eee'
			context.strokeWidth = 1
			context.beginPath()
			for (var x = 0.5; x < 751; x += 15) {
				context.moveTo(x, 0)
				context.lineTo(x, 751)
				context.stroke()
			}
			for (var y = 0.5; y < 751; y += 15) {
				context.moveTo(0, y)
				context.lineTo(751, y)

				context.stroke()
			}
			context.closePath()
			return
		},

		drawBigGrid(canvas) {
			var context = canvas.getContext('2d')
			context.strokeStyle = '#ddd'
			context.strokeWidth = 1
			context.beginPath()
			for (var x = 0.5; x < 751; x += 75) {
				context.moveTo(x, 0)
				context.lineTo(x, 751)
				context.stroke()
			}
			for (var y = 0.5; y < 751; y += 75) {
				context.moveTo(0, y)
				context.lineTo(751, y)
				context.stroke()
			}
			context.closePath()
			return
		},

		drawLine(canvas) {
			var ctx = canvas.getContext('2d')
			ctx.strokeStyle = '#ef0a0a'
			ctx.lineWidth = 1
			let x = 2
			setInterval(async () => {
				// ctx.clearRect(x * 6, 0, 25, 750);
				// x = x + 1;
				// console.log('(Math.random() * 10 - 5) * 10', (Math.random() * 10 - 5) * 10)
				// let num = (x % 10 === 0) || (x % 10 === 1) ? (Math.random() * 10 - 5) * 10 + 50 : 50;
				// console.log('num', num)
				// ctx.lineTo(x * 6, num);
				// ctx.stroke();

				if (this.ifOpen === false) {
					ctx.clearRect(x * 6, 0, 25, 750)
					x = x + 1
					ctx.lineTo(x * 6, 76)
					ctx.stroke()
				} else {
					ctx.clearRect(x * 6, 0, 25, 750)
					x = x + 1
					ctx.lineTo(x * 6, 76)
					ctx.stroke()

					x = x + 1
					ctx.lineTo(x * 6, 76 + 76 * this.valueRate)
					ctx.stroke()

					x = x + 1
					ctx.lineTo(x * 6, 76 - 76 * this.valueRate)
					ctx.stroke()

					x = x + 1
					ctx.lineTo(x * 6, 76)
					ctx.stroke()

					this.ifOpen = false
					this.valueRate = 1
				}

				if (x > 750 / 6) {
					x = 2
					ctx.beginPath()
				}
			}, 50)
			ctx.stroke()
			ctx.closePath()
		},

		changeOpen(heartRate) {
			this.valueRate = this.calculateHeartRatePercentage(heartRate)
			console.log('valueRate', this.valueRate)
			this.ifOpen = true
		},

		calculateHeartRatePercentage(heartRate) {
			const lowerLimit = 60
			const upperLimit = 100

			if (heartRate < lowerLimit) {
				return 0
			} else if (heartRate > upperLimit) {
				return 1
			} else {
				const percentage = (heartRate - lowerLimit) / (upperLimit - lowerLimit)
				return percentage
			}
		},
	},
}
</script>
<style lang="less" scoped>
.root {
	position: relative;
	height: 152px;
	margin-bottom: 8px;
	.canvas {
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>
