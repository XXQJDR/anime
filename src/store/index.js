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

	//主页内容类型标志，默认为全部
	selectFlag: 1,

	//轮播图图片
	images: [],

	//轮播图对象
	mySwiper: {},

	//浏览器身份，1为pc，2为移动
	browserIdentity: 2,

	//看板娘位置，默认在左边
	live2dPosition: 'left',
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
	SELECT_FLAG(state, selectFlag) {
		state.selectFlag = selectFlag;
	},
	IMAGES(state, images) {
		state.images = images;
	},
	MY_SWIPER(state, mySwiper) {
		state.mySwiper = mySwiper;
	},
	BROWSER_IDENTITY(state, browserIdentity) {
		state.browserIdentity = browserIdentity;
	},
	LIVE2D_POSITION(state, live2dPosition) {
		state.live2dPosition = live2dPosition;
	}
};

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
});