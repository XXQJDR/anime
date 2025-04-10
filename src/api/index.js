import axios from "@/api/myAxios";

/**
 * 判断邮箱是否已注册
 * @param email 邮箱
 * @returns 状态码200表示未注册
 */
export const reqCheckEmailRegistered = (email) => {
	return axios.get(`/auth/check-email?email=${email}`);
}

/**
 * 获取邮箱验证码
 * @param email 邮箱
 */
export const reqGetRegisterEmailCode = (email) => {
	return axios.get(`/auth/register-email-code?email=${email}`);
}

/**
 * 注册
 * @param username 用户名
 * @param password 密码
 * @param email 邮箱
 * @param code 验证码
 */
export const reqRegister = (username, password, email, code) => {
	let params = {username, password, email, code};
	return axios.post('/auth/register', params);
}

/**
 * 获取图形验证码
 */
export const reqGetImageCode = () => {
	return axios.get('/auth/image-code');
}

/**
 * 登录
 * @param email 邮箱
 * @param password 密码
 * @param codeKey 验证码key，用于从redis中获取验证码
 * @param code 验证码
 * @returns token
 */
export const reqLogin = (email, password, codeKey, code) => {
	let params = {email, password, codeKey, code};
	return axios.post('/auth/login', params);
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export const reqGetUserInfoByToken = () => {
	return axios.get('/users/me');
}

/**
 * 爬虫搜索动漫
 * @param keyword 搜索关键词
 * @returns 分页动漫列表
 */
export const reqSearchAnimeForCrawl = (keyword) => {
	return axios.get(`/anime/crawl?keyword=${keyword}`);
}

/**
 * 添加动漫
 * @param anime 动漫实体
 */
export const reqAddAnime = (anime) => {
	return axios.post('/anime', anime);
}

/**
 * 分页获取用户已添加的动漫
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 搜索关键词
 * @param type 筛选分类
 * @param sort 筛选排序
 * @returns 动漫分页数据
 */
export const reqGetPageAnime = (current, size, keyword, type, sort) => {
	return axios({
		method: 'GET',
		url: '/anime',
		params: {current, size, keyword, type, sort}
	});
}


/**
 * 更改动漫观看状态
 * @param animeUserId 动漫用户关系id
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 关键词
 * @param newStatus 新状态
 * @param type 筛选分类
 * @param sort 排序
 * @returns 当前页最后一条数据
 */
export const reqUpdateAnimeWatchStatus = (animeUserId, current, size, keyword, newStatus, type, sort) => {
	return axios.put(`/anime/${animeUserId}/watch-status`, {current, size, keyword, newStatus, type, sort});
}

/**
 * 逻辑删除动漫
 * @param animeUserId 动漫用户关系id
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 关键词
 * @param type 筛选分类
 * @param sort 排序
 * @returns 当前页最后一条数据
 */
export const reqLogicallyDeleteAnime = (animeUserId, current, size, keyword, type, sort) => {
	return axios({
		method: 'DELETE',
		url: `/anime/${animeUserId}/soft-delete`,
		params: {current, size, keyword, type, sort}
	});
}

/**
 * 恢复动漫
 * @param animeUserId 动漫用户关系id
 */
export const reqRecoverAnime = (animeUserId) => {
	return axios.put(`/anime/${animeUserId}/recover`);
}

/**
 * 随机获取未观看动漫
 * @returns 动漫信息
 */
export const reqRandomAnime = () => {
	return axios.get('/anime/random');
}

/**
 * 获取已删除动漫
 * @returns 动漫列表
 */
export const reqGetDustbinData = () => {
	return axios.get('/anime/deleted');
}

/**
 * 彻底删除动漫
 * @param animeUserId
 */
export const reqDeleteAnime = (animeUserId) => {
	return axios.delete(`/anime/${animeUserId}`);
}

/**
 * 获取动漫详细信息
 * @param animeUserId 动漫用户关系id
 * @returns 动漫详细信息
 */
export const reqGetDetailAnime = (animeUserId) => {
	return axios.get(`/anime/${animeUserId}`);
}

/**
 * 分页获取动漫资源
 * @param current 当前页
 * @param size 每页展示数量
 * @param animeUserId 动漫用户关系id
 * @returns 动漫资源分页数据
 */
export const reqGetPageAnimeResource = (current, size, animeUserId) => {
	return axios.get(`/anime/${animeUserId}/resources?current=${current}&size=${size}`)
}

/**
 * 上传文件
 * @param animeUserId 动漫用户关系id
 * @param fileList 文件列表
 */
export const reqUpload = (animeUserId, fileList) => {
	let formData = new FormData();
	fileList.forEach(item => formData.append('fileList', item.raw));
	return axios.post(`/anime/${animeUserId}/upload`, formData);
}

/**
 * 删除动漫资源
 * @param id
 * @param current 当前页
 * @param size 每页展示数量
 * @returns 当前页最后一条数据
 */
export const reqDeleteAnimeResource = (id, current, size) => {
	return axios({
		method: 'DELETE',
		url: `/animeResources/${id}`,
		params: {current, size}
	});
}

/**
 * 获取重置密码邮件验证码
 * @param email 邮箱
 */
export const reqGetResetPasswordEmailCode = (email) => {
	return axios.get(`/auth/reset-email-code?email=${email}`);
}

/**
 * 重置密码身份校验
 * @param email 邮箱
 * @param code 验证码
 */
export const reqResetPasswordVerify = (email, code) => {
	return axios.post('/auth/reset-verify', {email, code});
}

/**
 * 重置密码
 * @param email 邮箱
 * @param password 新密码
 */
export const reqResetPassword = (email, password) => {
	return axios.put('/auth/reset-password', {email, password});
}

/**
 * 动漫评分
 * @param animeUserId 动漫用户关系id
 * @param score 分数
 */
export const reqRateAnime = (animeUserId, score) => {
	let formData = new FormData();
	formData.append('score', score);
	return axios.post(`/anime/${animeUserId}/rate`, formData);
}

/**
 * 获取动漫观看统计信息
 * @returns 统计信息
 */
export const reqGetWatchStatistics = () => {
	return axios.get('/anime/watch-statistics');
}

/**
 * 上传头像
 * @param file 头像文件
 * @returns 用户信息
 */
export const reqUploadAvatar = (file) => {
	let formData = new FormData();
	formData.append('file', file);
	return axios.post(`/users/avatar`, formData);
}

/**
 *
 * @param username 用户名
 * @returns 用户信息
 */
export const reqUpdateUserInfo = (username) => {
	return axios.put('/users', {username});
}

/**
 * 发表帖子
 * @param content 内容
 * @param coverImageIndex 封面图片索引
 * @param fileList 文件列表
 */
export const reqPublishPost = (content, coverImageIndex, fileList) => {
	let formData = new FormData();
	formData.append('content', content);
	formData.append('coverImageIndex', coverImageIndex);
	fileList.forEach(file => formData.append('fileList', file));
	return axios.post('/posts', formData);
}

/**
 * 分页获取帖子
 * @param current 当前页
 * @param size 每页展示数量
 * @param keyword 搜索关键词
 * @param isUser 是否为获取当前用户帖子
 * @returns 分页数据
 */
export const reqGetPagePost = (current, size, keyword, isUser = false) => {
	return axios.get(`/posts?current=${current}&size=${size}&keyword=${keyword}&isUser=${isUser}`);
}

/**
 * 获取帖子信息
 * @param postId 帖子id
 * @returns post
 */
export const reqGetPostInfo = (postId) => {
	return axios.get(`/posts/${postId}`);
}

/**
 * 获取帖子资源
 * @param postId 帖子id
 * @returns images
 */
export const reqGetPostResource = (postId) => {
	return axios.get(`/posts/${postId}/resources`);
}

/**
 * 获取帖子作者信息
 * @param postId
 * @returns author
 */
export const reqGetPostAuthor = (postId) => {
	return axios.get(`/posts/${postId}/author`);
}

/**
 * 发表评论
 * @param postId 帖子id
 * @param content 内容
 * @param parentId 父评论id
 * @param replyUserId 回复用户id
 * @returns comment
 */
export const reqPublishComment = (postId, content, parentId = null, replyUserId = null) => {
	return axios.post(`/posts/${postId}/comments`, {content, parentId, replyUserId});
}

/**
 * 获取帖子评论
 * @param postId 帖子id
 * @returns comments
 */
export const reqGetPostComments = (postId) => {
	return axios.get(`/posts/${postId}/comments`);
}

/**
 * 点赞帖子
 * @param postId 帖子id
 */
export const reqLikePost = (postId) => {
	return axios.post(`/posts/${postId}/like`);
}

/**
 * 取消点赞帖子
 * @param postId 帖子id
 */
export const reqUnLikePost = (postId) => {
	return axios.delete(`/posts/${postId}/like`);
}

/**
 * 收藏帖子
 * @param postId 帖子id
 */
export const reqFavoritePost = (postId) => {
	return axios.post(`/posts/${postId}/favorite`);
}

/**
 * 取消收藏帖子
 * @param postId 帖子id
 */
export const reqUnFavoritePost = (postId) => {
	return axios.delete(`/posts/${postId}/favorite`);
}

/**
 * 关注用户
 * @param followUserId 被关注用户id
 */
export const reqFollowUser = (followUserId) => {
	return axios.post(`/posts/follow/${followUserId}`);
}

/**
 * 取消关注用户
 * @param followUserId 被关注用户id
 */
export const reqUnFollowUser = (followUserId) => {
	return axios.delete(`/posts/follow/${followUserId}`);
}

/**
 * 点赞评论
 * @param commentId 评论id
 */
export const reqLikeComment = (commentId) => {
	return axios.post(`/comments/${commentId}/like`);
}

/**
 * 取消点赞评论
 * @param commentId 评论id
 */
export const reqUnLikeComment = (commentId) => {
	return axios.delete(`/comments/${commentId}/like`);
}

/**
 * 删除帖子
 * @param postId 帖子id
 */
export const reqDeletePost = (postId) => {
	return axios.delete(`/posts/${postId}`);
}