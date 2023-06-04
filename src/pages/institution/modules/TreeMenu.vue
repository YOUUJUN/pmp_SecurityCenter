<template>
	<el-tree
		class="menu-wrap"
		:data="data"
		default-expand-all
		node-key="id"
		ref="tree"
		highlight-current
		:props="defaultProps"
		:expand-on-click-node="false"
	>
		<span class="custom-tree-node" slot-scope="{ node, data }">
			<img v-if="node.level === 1" class="menu-icon" src="~@/assets/images/institution_menu.png" />
			<img v-else-if="node.level === 2" class="menu-icon" src="~@/assets/images/building_menu.png" />
			<img v-else-if="node.level === 3" class="menu-icon" src="~@/assets/images/room_menu.png" />
			<span @click="test(node)">{{ node.label }}</span>
		</span>
	</el-tree>
</template>

<script>
export default {
	data() {
		return {
			data: [
				{
					id: 1,
					label: 'XXX养老院',
					children: [
						{
							id: 4,
							label: '1栋',
							children: [
								{
									id: 9,
									label: '101房间',
								},
								{
									id: 10,
									label: '102房间',
								},
							],
						},
					],
				},
			],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
		}
	},

	methods: {
		test(node) {
			console.log('node', node)
		},
	},
}
</script>

<style>
.menu-wrap.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	background-color: #2e8fc2 !important;
}
</style>

<style lang="less" scoped>
.menu-wrap {
	background-color: #0877b2;
	.menu-icon {
		width: 16px;
		height: 16px;
		margin: 0 6px 0 14px;
		vertical-align: text-bottom;
	}

	::v-deep .el-tree-node__content:hover {
		background-color: #2e8fc2;
	}
}

::v-deep .el-tree-node__content {
	position: relative;
	height: 5.6rem;
	line-height: 5.6rem;
	font-size: 1.4rem;
	color: #fff;
}

::v-deep .el-tree-node__expand-icon {
	position: absolute;
	right: 0;
	line-height: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 0 2rem !important;
	color: #fff;
}

::v-deep .el-tree-node__expand-icon.is-leaf {
	color: transparent;
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
	background: none;
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
	background-color: #ecf5ff !important;
}

::v-deep .el-tree-node__label {
	margin-left: 1rem;
}
</style>
