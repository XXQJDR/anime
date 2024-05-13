import axios from "@/api/myAxios";

//判断邮箱是否已注册
export const reqIsRegister = (email) => {
	return axios.get(`/user/isRegister/${email}`);
}

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
	return axios.get(`/anime/searchAnimeForCrawler/${title}`);
}

//添加动漫
export const reqAddAnime = (anime) => {
	return axios.post('/anime/addAnime', anime);
}

/**
 * 获取用户已添加的动漫
 * current：当前页
 * size：每页显示条数
 * status
 * 	1代表查询已看
 * 	0代表查询未看
 * 	无代表查询全部
 */
export const reqGetPageAnime = (params) => {
	return axios.post('/anime/getPageAnime', params);
}

/**
 * 搜索动漫
 * @param keyword 搜索关键词
 * @param status 动漫观看状态
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const reqSearchAnime = (keyword, status) => {
	let params = {keyword, status};
	return axios.post('/anime/searchAnime', params);
}

//更改动漫观看状态
export const reqUpdateAnimeWacthingStatus = (collectId, status) => {
	let params = {collectId, status};
	return axios.post('/anime/updateAnimeWacthingStatus', params);
}

//更改动漫逻辑删除状态
export const reqUpdateAnimeDeleted = (collectId, status) => {
	let params = {collectId, status};
	return axios.post('/anime/updateAnimeDeleted', params);
}

//随机获取动漫
export const reqRandomAnime = () => {
	return axios.get('/anime/randomAnime');
}

//获取加入垃圾箱的动漫
export const reqGetDustbinData = () => {
	return axios.get('/anime/getDustbinData');
}

//彻底删除动漫
export const reqRemoveAnime = (collectId) => {
	return axios.get(`/anime/removeAnime/${collectId}`);
}

//获取动漫详细信息
export const reqGetDetailAnime = (animeId) => {
	return axios.get(`/anime/getDetailAnime/${animeId}`);
}

/**
 * 获取动漫精彩瞬间
 * @param current 当前页
 * @param size 每页展示数量
 * @param collectId 记录id
 */
export const reqGetPageWonderfulMoment = (current, size, collectId) => {
	let params = {current, size, collectId};
	return axios.post('/anime/getPageWonderfulMoment', params);
}

//上传文件
export const reqUpload = (collectId, fileList) => {
	let formData = new FormData();
	fileList.forEach(item => formData.append('fileList', item.raw));
	return axios.post(`/anime/upload/${collectId}`, formData);
}

//删除图片
export const reqRemoveWonderfulMoment = (id) => {
	return axios.get(`/anime/removeWonderfulMoment/${id}`);
}