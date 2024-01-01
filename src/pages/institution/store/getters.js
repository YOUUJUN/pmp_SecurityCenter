const getters = {
	/*---原始数据---*/
	originData: (state) => state.data.originData,
	roomData: (state) => state.data.allRoomDic,
	toiletData: (state) => state.data.allToiletDic,
	menuData: (state) => state.data.menu.data,
	menuCheckedKeys: (state) => state.data.menu.checkedKeys,
	menuExpandedKeys: (state) => state.data.menu.expandedKeys,
	menuSelectedKey: (state) => state.data.menu.selectedKey,

	/*---状态栏数据---*/
	bedCount: (state, getters) => getters.originData.all_bed,
	emptyBedCount: (state, getters) => getters.originData.empty_bed,
	checkInCount: (state, getters) => getters.originData.check_in,
	onBedCount: (state, getters) => getters.originData.on_bed,
	offBedCount: (state, getters) => getters.checkInCount - getters.onBedCount,
	offlineDeviceCount: (state, getters) => getters.originData.offline,
	unHandleWarnCount: (state, getters) => getters.originData.un_warn,

	/*---socket 数据 ---*/
	vitalIotData: (state) => state.socketData.vitalIotDataCache,

	/*---渲染条件控制---*/
	displayCategory: (state) => state.display.displayCategory,
	displayCategoryMap: (state) => state.display.displayCategoryMap,
	displayCategoryLabel: (state, getters) => getters.displayCategoryMap.get(getters.displayCategory),
	displayFilters: (state) => state.data.menu.filters,

	/*---菜单过滤后的数据---*/
	filteredBedData: (state, getters) => {
		const roomData = getters.roomData
		const displayFilters = getters.displayFilters
		let result = []
		let levelQueue = displayFilters
			.map((item) => {
				return item.level
			})
			.sort((a, b) => a - b)
		console.log('levelQueue', levelQueue)
		let firstLevel = levelQueue[0]
		let filterArr = []
		switch (firstLevel) {
			case 1:
				filterArr = displayFilters.filter((item) => {
					if (item.level === 1) {
						return item
					}
				})

				filterArr.forEach((item) => {
					let cache = roomData.filter((data) => item.id === data.only_inst_id ?? item)
					result = result.concat(cache)
				})
				break
			case 2:
				filterArr = displayFilters.filter((item) => {
					if (item.level === 2) {
						return item
					}
				})

				filterArr.forEach((item) => {
					let cache = roomData.filter((data) => item.id === data.only_build_id ?? item)
					result = result.concat(cache)
				})
				break
			case 3:
				filterArr = displayFilters.filter((item) => {
					if (item.level === 3) {
						return item
					}
				})

				filterArr.forEach((item) => {
					let cache = roomData.filter((data) => item.id == data.only_floor_id ?? item)
					result = result.concat(cache)
				})
				break
			case 4:
				filterArr = displayFilters.filter((item) => {
					if (item.level === 4) {
						return item
					}
				})

				filterArr.forEach((item) => {
					let cache = roomData.filter((data) => item.id == data.only_room_id ?? item)
					result = result.concat(cache)
				})
				break
			case 5:
				filterArr = displayFilters.filter((item) => {
					if (item.level === 5) {
						return item
					}
				})

				filterArr.forEach((item) => {
					let cache = roomData.filter((data) => item.id == data.only_bed_id ?? item)
					result = result.concat(cache)
				})
				break
		}

		console.log('result-->', result)

		return result
	},
}
export default getters
