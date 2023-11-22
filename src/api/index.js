import axios from "@/api/myAxios";

//获取邮箱验证码
export const reqGetEmailCode = (email) => {
	return axios.get(`/user/getEmailCode/${email}`);
}

//注册
export const reqRegister = (username, password, email, code) => {
	let params = {username, password, email, code};
	return axios.post('/user/register', params);
}

//获取图形验证码
export const reqGetImageCode = () => {
	return axios.get('/user/getImageCode');
}

//登录
export const reqLogin = (email, password, code) => {
	let params = {email, password, code};
	return axios.post('/user/login', params);
}