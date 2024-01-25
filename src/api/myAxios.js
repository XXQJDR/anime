/*
	对axios二次封装
 */
import _axios from "axios";
import store from "@/store";
import {Message} from "element-ui";
import router from "@/router";

const source = _axios.CancelToken.source();

//创建一个axios实例
const axios = _axios.create({
	//基础路径
	baseURL: 'api',

	//请求超时时间
	timeout: 20000
});

/*
请求拦截器
config对象中包含请求头信息
 */
axios.interceptors.request.use(config => {
	//非/user/**请求添加token
	if (!config.url.includes('/user')) {
		config.headers.Authorization = 'Bearer ' + store.state.token;
	}

	//全局添加cancelToken
	config.cancelToken = source.token;

	return config;
});

/*
	1.响应拦截器
	2.参数
		2.1 成功回调
		2.2 失败回调
 */
axios.interceptors.response.use(res => {
	//token有误或token过期
	if (res.data.code === 402 || res.data.code === 403) {
		//取消其他正在进行的请求
		source.cancel();

		Message.warning('登录信息已过期，请重新登录！');

		//删除vuex中用户信息
		store.commit('TOKEN', '');
		store.commit('USER_INFO', {})

		//删除localStorage中用户信息
		localStorage.removeItem('token');
		localStorage.removeItem('userInfo');

		//跳转刷新页面，刷新页面防止页面回到上次路由位置
		router.push('/login').then(() => {
			location.reload();
		});
	}

	return res.data;
}, error => {
	//取消请求的情况下，终端Promise调用链
	if (_axios.isCancel(error)) {
		return new Promise(() => {});
	} else {
		return Promise.reject(error);
	}
});

export default axios;