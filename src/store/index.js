import Vuex from 'vuex';
import Vue from "vue";

//使用插件
Vue.use(Vuex);

//创建actions mutations state
const state = {
	token: localStorage.getItem('token') || '',

	//用户信息
	userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},

	//主页内容类型
	homeContentType: 'animeList',

	//侧边栏显示标志
	sidebarFlag: false,

	//浏览器身份
	browserIdentity: 'MOBILE',

	//全局遮罩显示标志
	maskFlag: false,

	//复用popover显示标志
	reusePopoverFlag: false
};
const actions = {};
const mutations = {
	TOKEN(state, token) {
		state.token = token;
	},
	USER_INFO(state, userInfo) {
		state.userInfo = userInfo;
	},
	HOME_CONTENT_TYPE(state, homeContentType) {
		state.homeContentType = homeContentType;
	},
	SIDEBAR_FLAG(state, sidebarFlag) {
		state.sidebarFlag = sidebarFlag;
	},
	BROWSER_IDENTITY(state, browserIdentity) {
		state.browserIdentity = browserIdentity;
	},
	MASK_FLAG(state, maskFlag) {
		state.maskFlag = maskFlag;
	},
	REUSE_POPOVER_FLAG(state, reusePopoverFlag) {
		state.reusePopoverFlag = reusePopoverFlag;
	}
};

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
});