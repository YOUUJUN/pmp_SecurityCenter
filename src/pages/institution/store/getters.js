const getters = {
	/*---原始数据---*/
	originData: (state) => state.data.originData,
	roomData: (state) => state.data.allRoomDic,
	toiletData: (state) => state.data.allToiletDic,
	menuData: (state) => state.data.menu.data,

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
}
export default getters
