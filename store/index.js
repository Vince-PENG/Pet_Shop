import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//为了方便测试，此处用vuex做全局数据
const store = new Vuex.Store({
	state: {
		userInfo: {},
		isLogin: false,
		orderType: 'takein',
		addresses: [{
			"id": 1,
			"user_id": 1,
			"name": "tinypuppet",
			"phone": "18226281000",
			"gender": 1,
			"address": "有间大厦",
			"complete_address": "九华南路189号",
			"description": "A栋5楼",
			"latitude": "",
			"longitude": "",
			"is_default": 1
		},
		{
			"id": 2,
			"user_id": 2,
			"name": "tony",
			"phone": "13208259532",
			"gender": 2,
			"address": "信通大厦",
			"complete_address": "南京东路388号",
			"description": "西楼18楼",
			"latitude": "",
			"longitude": "",
			"is_default": 0
		}],
		address: {},
		remark: '明天下午三点到店'
	},
	mutations: {
		SET_ORDER_TYPE(state, orderType) {
			state.orderType = orderType
		},
		SET_ADDRESS(state, address) {
			state.address = address
		},
		SET_REMARK(state, remark) {
			state.remark = remark
		},
		SET_USERINFO(state, userInfo) {
			state.userInfo = userInfo
		},
		SET_ISLOGIN(state, isLogin) {
			state.isLogin = isLogin
		}
	}
})

export default store
