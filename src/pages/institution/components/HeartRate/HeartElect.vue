<template>
	<div class="root">
		<canvas class="canvas" ref="ecg" width="751px" height="152px"></canvas>
		<canvas class="canvas" ref="line" width="751px" height="152px"></canvas>
	</div>
</template>
<script>
export default {
	data() {
		return {
			xValue: 0,
			context: null,
		}
	},

	mounted() {
		var canvas = this.$refs.ecg
		var canvas2 = this.$refs.line
		this.context = canvas2.getContext('2d')

		this.drawSmallGrid(canvas)
		this.drawMediumGrid(canvas)
		this.drawBigGrid(canvas)
		this.drawLineInit(canvas2)
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

		drawLineInit(value) {
			var ctx = this.context
			ctx.strokeStyle = '#53C31A'
			ctx.strokeWidth = 1
			ctx.stroke()
			ctx.closePath()
		},

		drawLine(value) {
			var ctx = this.context
			ctx.clearRect((this.xValue + 1) * 6, 0, 25, 750)
			this.xValue = this.xValue + 1
			let cutValue = value - 65
			let num = 76
			if (cutValue >= 0) {
				num = 76 - cutValue
			} else {
				num = 76 - cutValue
			}
			console.log('value', value)
			console.log('num', num)
			ctx.lineTo(this.xValue * 6, num)
			ctx.stroke()
			this.xValue = this.xValue + 1
			ctx.lineTo(this.xValue * 6, 76)
			ctx.stroke()
			if (this.xValue > 750 / 6) {
				this.xValue = 0
				ctx.beginPath()
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
