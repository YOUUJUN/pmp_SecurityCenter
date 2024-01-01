<template>
	<el-tree
		class="menu-wrap"
		:data="menuData"
		default-expand-all
		node-key="only_id"
		ref="tree"
		highlight-current
		:props="defaultProps"
		:expand-on-click-node="false"
		:check-on-click-node="true"
		:show-checkbox="true"
		:default-checked-keys="menuCheckedKeys"
		:default-expanded-keys="menuExpandedKeys"
		@node-click="handleNodeClick"
		@check-change="handleCheckedChange"
	>
		<span class="custom-tree-node" slot-scope="{ node, data }">
			<img v-if="node.level === 1" class="menu-icon" src="~@/assets/images/institution_menu.png" />
			<img v-else-if="node.level === 2" class="menu-icon" src="~@/assets/images/building_menu.png" />
			<img v-else-if="node.level === 3" class="menu-icon" src="~@/assets/images/room_menu.png" />
			<span>{{ node.label }}</span>
		</span>
	</el-tree>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
			defaultProps: {
				children: 'items',
				label: 'name',
			},
		}
	},

	computed: {
		...mapGetters(['menuData', 'menuCheckedKeys', 'menuExpandedKeys', 'menuSelectedKey']),
	},

	watch: {
		// setCheckedNodes
		menuCheckedKeys: {
			handler(newValue) {
				this.setCheckedNodes(newValue)
			},
		},
	},

	methods: {
		...mapActions('data', ['changeMenuChecked', 'setMenuFilters']),

		//处理菜单点击事件
		handleNodeClick(data, node) {
			// console.log('data', data);
			let payload = [data.only_id]
			//修改菜单选中项
			this.changeMenuChecked(payload)
		},

		//设置菜单选择项
		setCheckedNodes(nodes) {
			this.$refs.tree.setCheckedNodes(nodes)
		},

		//处理菜单选中
		handleCheckedChange(data, node) {
			const treeMenu = this.$refs.tree
			let checkedNodes = treeMenu.getCheckedNodes()

			let menuFilterData = checkedNodes.map((item) => {
				let id = item.only_id
				let node = treeMenu.getNode(item)
				return {
					id,
					parentId: node?.parent?.id,
					level: node.level,
				}
			})

			console.log('menuFilterData', menuFilterData)

			//设置菜单过滤项
			this.setMenuFilters(menuFilterData)
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

::v-deep .el-tree-node__content > label.el-checkbox {
	margin: 0 8px 0 14px;
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
