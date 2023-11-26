import Vuex from 'vuex';
import Vue from "vue";

//使用插件
Vue.use(Vuex);

//创建actions mutations state
const state = {
	token: localStorage.getItem('token') || '',

	//用户信息
	userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},

	//主页内容类型标志：1代表列表
	homeContentType: 1,

	//侧边栏显示标志
	sidebarFlag: false,
};
const actions = {};
const mutations = {
	TOKEN(state, token) {
		state.token = token;
	},
	USER_INFO(state, userInfo) {
		Object.assign(state.userInfo, userInfo);
	},
	HOME_CONTENT_TYPE(state, homeContentType) {
		state.homeContentType = homeContentType;
	},
	SIDEBAR_FLAG(state, sidebarFlag) {
		state.sidebarFlag = sidebarFlag;
	}
};

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
});