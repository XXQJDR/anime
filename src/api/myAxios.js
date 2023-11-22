/*
	对axios二次封装
 */
import _axios from "axios";

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
axios.interceptors.request.use((config) => {
	return config;
});

/*
	1.响应拦截器
	2.参数
		2.1 成功回调
		2.2 失败回调
 */
axios.interceptors.response.use((res) => {
	return res.data;
	// eslint-disable-next-line no-unused-vars
}, (error) => {
	return Promise.reject(new Error('fail'));
});

export default axios;