import axios from "@/api/myAxios";

//判断邮箱是否已注册
export const reqIsRegister = (email) => {
	return axios.get(`/user/isRegister/${email}`);
}

//获取邮箱验证码
export const getRegisterEmailCode = (email) => {
	return axios.get(`/user/getRegisterEmailCode/${email}`);
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
 * status：观看状态，null代表查询全部
 */
export const reqGetPageAnime = (params) => {
	return axios.post('/anime/getPageAnime', params);
}


/**
 * 更改动漫观看状态
 * @param collectId 动漫记录id
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 关键词
 * @param newStatus 新状态
 * @param oldStatus 旧状态
 * @returns 当前页最后一条数据
 */
export const reqUpdateAnimeWatchStatus = (collectId, current, size, keyword, newStatus, oldStatus) => {
	return axios.post('/anime/updateAnimeWatchStatus', {collectId, current, size, keyword, newStatus, oldStatus});
}

/**
 * 逻辑删除动漫
 * @param collectId 动漫记录id
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 关键词
 * @param status 当前分类状态
 * @returns 当前页最后一条数据
 */
export const reqLogicallyDeleteAnime = (collectId, current, size, keyword, status) => {
	return axios.post('/anime/logicallyDeleteAnime', {collectId, current, size, keyword, status});
}

/**
 * 恢复动漫
 * @param collectId 动漫记录id
 */
export const reqRecoverAnime = (collectId) => {
	return axios.get(`/anime/recoverAnime/${collectId}`);
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
export const reqGetDetailAnime = (collectId) => {
	return axios.get(`/anime/getDetailAnime/${collectId}`);
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

/**
 * 删除精彩瞬间
 * @param id
 * @param current 当前页
 * @param size 每页展示数量
 * @returns 当前页最后一条数据
 */
export const reqRemoveWonderfulMoment = (id, current, size) => {
	return axios.post('/anime/removeWonderfulMoment', {id, current, size})
}

//获取重置密码邮件验证码
export const reqGetResetPasswordCode = (email) => {
	return axios.get(`/user/getResetPasswordCode/${email}`);
}

/**
 * 重置密码身份校验
 * @param email 邮箱
 * @param code 验证码
 */
export const reqResetPasswordVerification = (email, code) => {
	return axios.post('/user/resetPasswordVerification', {email, code});
}

/**
 * 重置密码
 * @param email 邮箱
 * @param password 新密码
 */
export const reqResetPassword = (email, password) => {
	return axios.post('/user/resetPassword', {email, password});
}

/**
 * 动漫评分
 * @param collectId 记录id
 * @param score 分数
 */
export const reqRateAnime = (collectId, score) => {
	return axios.get(`/anime/rateAnime/${collectId}?score=${score}`);
}