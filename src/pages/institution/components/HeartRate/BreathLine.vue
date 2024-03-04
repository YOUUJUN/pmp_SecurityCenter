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
			valueRate: 0,
		}
	},

	computed: {
		...mapState('socketData', ['heatRate']),
	},

	watch: {
		heatRate: {
			handler(newValue) {
				this.changeOpen(newValue)
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
	},

	methods: {
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
			ctx.strokeStyle = '#19a931' // 设置呼吸波的颜色为绿色
			ctx.lineWidth = 2 // 设置线的宽度
			ctx.lineCap = 'round' // 设置线的端点为圆形，使线更加光滑

			let x = 2
			let points = [{ x: 0, y: 76 }] // 存储贝塞尔曲线的控制点

			setInterval(() => {
				ctx.clearRect(x * 6, 0, 25, 750)
				x = x + 1
				// breath为实际的呼吸值一般为10～30之间
				// var breath = Math.floor(Math.random() * 6) + 10
				// //将波峰放大3倍:实际的breath值
				// let num = Math.sin(x / 3) * breath * 3 + 76 // 呼吸波的振幅为100，频率为5
				var breath = Math.floor(Math.random() * 6) + 10
				//将波峰放大3倍:实际的breath值
				let num = Math.sin(x / 3) * this.valueRate * 3 + 76 // 呼吸波的振幅为100，频率为5
				points.push({ x: x * 6, y: num }) // 添加新的控制点
				if (x > canvas.width / 6) {
					x = 2
					points = [{ x: 0, y: 76 }] // 重置控制点
				}

				// 绘制贝塞尔曲线
				ctx.beginPath()
				ctx.moveTo(points[0].x, points[0].y)
				for (let i = 1; i < points.length - 2; i++) {
					let xc = (points[i].x + points[i + 1].x) / 2
					let yc = (points[i].y + points[i + 1].y) / 2
					ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
				}
				// 绘制最后两个点的直线段
				ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)
				ctx.stroke()
				ctx.closePath()
			}, 60) // 设置时间间隔为30ms
		},

		drawLine2(canvas) {
			var ctx = canvas.getContext('2d')
			ctx.strokeStyle = 'green' // 设置呼吸波的颜色为绿色
			ctx.strokeWidth = 1
			let x = 2
			setInterval(() => {
				ctx.clearRect(x * 6, 0, 25, 750)
				x = x + 1
				let num = Math.sin(x / 5) * (35 + 35 * this.valueRate) + 76 // 呼吸波的振幅为100，频率为5
				ctx.lineTo(x * 6, num)
				ctx.stroke()
				if (x > 750 / 6) {
					x = 2
					ctx.beginPath()
				}

				this.valueRate = 0
			}, 30) // 设置时间间隔为30ms
			ctx.stroke()
			ctx.closePath()
		},

		changeOpen(breathRate) {
			this.valueRate = breathRate
			// this.valueRate = this.calculateRespirationRatePercentage(breathRate)
			console.log('valueRate1', this.valueRate)
			this.ifOpen = true
		},

		calculateRespirationRatePercentage(respirationRate) {
			const lowerLimit = 12
			const upperLimit = 20

			if (respirationRate < lowerLimit) {
				return 0
			} else if (respirationRate > upperLimit) {
				return 1
			} else {
				const percentage = (respirationRate - lowerLimit) / (upperLimit - lowerLimit)
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
