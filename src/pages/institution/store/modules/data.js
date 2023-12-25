import { getPerceptionPlatformData } from '@/api/security'

const state = {
	uid: 2,

	menu: {
		data: [], //全部菜单数据
		selectedKey: '', //选中菜单ID
		filters: [], //菜单过滤项
	},

	//初始数据源
	originData: [],

	//所有房间数据
	allRoomDic: [],

	//所有卫生间区域报警数据
	allToiletDic: [],
}

const mutations = {
	//设置初始数据源
	SET_ORIGIN_DATA(state, payload) {
		state.originData = payload
	},

	//设置菜单数据源
	SET_MENU_DATA(state, payload) {
		let dataSource = payload

		state.menu.data = dataSource
		state.menu.selectedKey = dataSource[0].only_id
		state.menu.filters = [
			{
				id: payload[0].id,
				level: 1,
			},
		]
	},

	// 设置所有房间数据
	SET_ALL_ROOM_DIC(state, payload) {
		state.allRoomDic = payload
	},

	// 设置所有卫生间区域报警数据
	SET_ALL_TOILET_DIC(state, payload) {
		state.allToiletDic = payload
	},
}

const actions = {
	//获取所有床铺数据
	fetchData({ state, commit }) {
		return new Promise((resolve, reject) => {
			getPerceptionPlatformData({
				uid: state.uid,
			})
				.then((response) => {
					// const response = {
					// 	code: 0,
					// 	message: '信息取回正常',
					// 	date: '2023-08-23 00:46:59',
					// 	operation: 'sec_center_iot',
					// 	navs_area: [
					// 		{
					// 			id: 165,
					// 			only_id: 'INS165',
					// 			name: '医养中心',
					// 			items: [
					// 				{
					// 					id: 102,
					// 					only_id: 'BUI102',
					// 					name: '医养中心楼栋',
					// 					items: [
					// 						{
					// 							id: 191,
					// 							only_id: 'FLO191',
					// 							name: '10层',
					// 							items: [
					// 								{
					// 									id: 827,
					// 									only_id: 'ROM827',
					// 									name: '天伦居1001室',
					// 									items: [
					// 										{
					// 											id: 292,
					// 											only_id: 'BED2292',
					// 											name: '01床',
					// 										},
					// 									],
					// 								},
					// 							],
					// 						},
					// 					],
					// 				},
					// 			],
					// 		},
					// 	],
					// 	bed_area: [
					// 		{
					// 			id: 2389,
					// 			belong: 'inst',
					// 			elderly_id: 12,
					// 			elderly_name: '张三',
					// 			gender: '男/女/--',
					// 			inst_id: 165,
					// 			build_id: 102,
					// 			floor_id: 191,
					// 			room_id: 827,
					// 			only_inst_id: 'INS165',
					// 			only_build_id: 'BUI102',
					// 			only_floor_id: 'FLO191',
					// 			only_room_id: 'ROM827',
					// 			only_bed_id: 'BED2389',
					// 			name: '101-01',
					// 			inst_name: '机构名称',
					// 			build_name: '医养中心楼栋',
					// 			floor_name: '12层',
					// 			room_name: '避难间1200室',
					// 			bed_room: '01床',
					// 			status: '在床',
					// 			warn_text: '呼吸过速',
					// 			warn_count: 10,
					// 		},
					// 	],
					// 	toilet_area: [
					// 		{
					// 			id: 2389,
					// 			room_id: '',
					// 			only_room_id: 'ROM',
					// 			device_name: '101卫生间',
					// 			status: '有人/无人/跌倒/滞留/离线',
					// 			warn_count: 4,
					// 		},
					// 	],
					// 	all_bed: 200,
					// 	empty_bed: 10,
					// 	check_in: 10,
					// 	on_bed: 10,
					// 	offline: 10,
					// 	un_warn: 10,
					// }

					console.log('response', response)

					const { status, data } = response

					if (status === 200) {
						const { code } = data

						if (code === 0) {
							const { navs_area, bed_area, toilet_area } = data
							commit('SET_ORIGIN_DATA', data)
							commit('SET_MENU_DATA', navs_area)
							commit('SET_ALL_ROOM_DIC', bed_area)
							commit('SET_ALL_TOILET_DIC', toilet_area)
						}
					}

					resolve()
				})
				.catch((err) => {
					console.log('err', err)
					reject()
				})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
