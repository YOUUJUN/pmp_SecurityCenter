<template>
	<div class="root">
		<canvas class="canvas" ref="ecg" width="751px" height="152px"></canvas>
		<canvas class="canvas" ref="line" width="751px" height="152px"></canvas>
	</div>
</template>
<script>
export default {
	data() {
		return {}
	},

	mounted() {
		var canvas = this.$refs.ecg
		var canvas2 = this.$refs.line
		this.drawSmallGrid(canvas)
		this.drawMediumGrid(canvas)
		this.drawBigGrid(canvas)
		this.drawLine(canvas2)
	},

	methods: {
		drawSmallGrid(canvas) {
			var context = canvas.getContext('2d')
			context.strokeStyle = '#f1dedf'
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
			context.strokeStyle = '#efb7bf'
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
			context.strokeStyle = '#c90b0b'
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
			ctx.strokeStyle = '#1919a9'
			ctx.strokeWidth = 1
			let x = 2
			setInterval(() => {
				ctx.clearRect(x * 6, 0, 25, 750)
				x = x + 1
				let num = x % 10 === 0 || x % 10 === 1 ? (Math.random() * 10 - 5) * 10 + 76 : 76
				ctx.lineTo(x * 6, num)
				ctx.stroke()
				if (x > 750 / 6) {
					x = 2
					ctx.beginPath()
				}
			}, 60)
			ctx.stroke()
			ctx.closePath()
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
