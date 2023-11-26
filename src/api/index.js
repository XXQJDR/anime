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

//搜索动漫，用于添加动漫
export const reqSearchAnimeForAdd = (title) => {
	return axios.get(`/collect/searchAnimeForCrawler/${title}`);
}

//添加动漫
export const reqAddAnime = (anime) => {
	return axios.post('/collect/addAnime', anime);
}

/**
 * 获取用户已添加的动漫
 * params.status
 * 	1代表查询已看
 * 	0代表查询未看
 * 	无代表查询全部
 */
export const reqGetPageAnime = (params) => {
	return axios.post('/collect/getPageAnime', params);
}

//搜索动漫
export const reqSearchAnime = (keyword) => {
	return axios.get(`/collect/searchAnime/${keyword}`);
}

//更改动漫观看状态
export const reqUpdateAnimeWacthingStatus = (collectId, status) => {
	let params = {collectId, status};
	return axios.post('/collect/updateAnimeWacthingStatus', params);
}

//将动漫移入垃圾箱
export const reqLogicalDeletion = (collectId) => {
	return axios.get(`/collect/logicalDeletion/${collectId}`);
}