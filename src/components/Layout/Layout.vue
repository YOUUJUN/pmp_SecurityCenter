<template>
	<el-container class="root-wrap">
		<el-aside class="aside-wrap" width="24rem">
			<div class="logo-wrap">
				<span>感知平台</span>
			</div>
			<div class="aside">
				<el-scrollbar style="height: 100%">
					<slot name="aside"></slot>
				</el-scrollbar>
			</div>
		</el-aside>

		<el-container class="main-wrap">
			<el-header class="header-wrap" height="6rem">
				<slot name="header"></slot>
			</el-header>

			<el-main class="content-wrap">
				<div class="content">
					<el-scrollbar style="height: 100%">
						<slot></slot>
					</el-scrollbar>
				</div>
			</el-main>
			<!-- <el-footer>Footer</el-footer> -->
		</el-container>
	</el-container>
</template>

<script>
export default {
	name: 'Layout',

	components: {},

	computed: {},

	methods: {},
}
</script>

<style scoped>
.root-wrap {
	height: 100%;
}

.header-wrap {
	flex: none;
	height: 6rem;
	padding: 0;
	border-bottom: 0.1rem solid #e2dede;
	background-color: #fff;
}

.main-wrap {
	flex: auto;
}

.content-wrap,
.aside-wrap {
	/* width:24rem !important; */
	position: relative;
	transition: width 0.3s;
	border-right: 0.1rem solid #e2dede;
}

.logo-wrap {
	height: 80px;
	line-height: 80px;
	text-align: center;
}

.logo-wrap span {
	width: 160px;
	font-size: 31px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #ffffff;
}

.aside-wrap {
	background-image: url('~@/assets/images/aside_bg.png');
	background-size: cover;
}

.content {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
}

.aside {
	position: absolute;
	top: 80px;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
}

.content-wrap {
	background: #f5f5f5;
}

::v-deep .el-scrollbar .el-scrollbar__bar.is-horizontal {
	display: none;
}

::v-deep .el-scrollbar__wrap {
	overflow-x: hidden;
	overflow-y: auto;
	width: 100%;
}

::v-deep .el-scrollbar__view {
	height: 100%;
}
</style>
