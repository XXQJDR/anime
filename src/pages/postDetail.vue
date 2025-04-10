<template>
	<div class="post-detail">
		<div class="back" @click="$router.back()" v-show="browserIdentity === 'PC'">
			<SvgIcon icon="home" size="24"/>
			<SvgIcon icon="rightArrow" size="28" color="#cac5c4"/>
			<span>返回</span>
		</div>

		<div class="header">
			<div class="avatar">
				<img v-lazy="author.avatar" alt="">
			</div>
			<div class="info">
				<div class="name-follow-box">
					<div class="name">{{ author.username }}</div>
					<div
							class="follow"
							:class="{'follow-active':author.isFollow}"
							@click="handleFollow"
							v-if="user.id !== author.id"
					>
						<SvgIcon icon="follow"/>
						<div>{{ author.isFollow ? '取消关注' : '关注'}}</div>
					</div>
				</div>
				<div class="data">
					<div class="item">关注 {{ author.followCount }}</div>
					<div class="item">粉丝 {{ author.fanCount }}</div>
					<div class="item">作品 {{ author.postCount }}</div>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="date">{{ post.createDate }}</div>
			<div class="post-content">{{ post.content }}</div>
			<div class="images">
				<wc-waterfall :gap="gap" :cols="cols">
					<div class="img" v-for="img in images" :key="img.id">
						<img v-lazy="img.url" alt="">
					</div>
				</wc-waterfall>
			</div>
			<div class="post-actions">
				<div class="item like-btn" :class="{'like-btn-active':post.isLike}" @click="likePost">
					<SvgIcon icon="fillLike" color="rgb(107, 114, 128)" size="38"/>
					<div class="count">{{ post.likeCount }}</div>
				</div>
				<div class="item star-btn" :class="{'star-btn-active':post.isFavorite}" @click="handleStar">
					<SvgIcon icon="fillStar" color="rgb(107, 114, 128)" size="38"/>
					<div class="count">{{ post.favoriteCount }}</div>
				</div>
				<div class="item share-btn">
					<SvgIcon icon="share" color="rgb(107, 114, 128)" size="38"/>
				</div>
			</div>
			<div class="comment-box">
				<div class="count">{{ post.commentCount }} 评论</div>
				<el-divider></el-divider>
				<div class="input">
					<div class="avatar">
						<img v-lazy="user.avatar" alt="">
					</div>
					<el-input
							type="textarea"
							placeholder="平等表达，友善交流"
							maxlength="100"
							show-word-limit
							:autosize="{minRows: 2}"
							v-model="text"
					>
					</el-input>
					<el-button :disabled="commentDisabled" @click="handleComment">发送</el-button>
				</div>
				<div class="list">
					<div class="item" v-for="comment in commentList" :key="comment.id">
						<div class="avatar">
							<img v-lazy="comment.avatar" alt="">
						</div>
						<div class="info">
							<div class="name">{{ comment.username }}</div>
							<div class="content">{{ comment.content }}</div>
							<div class="control">
								<div class="time">{{ formatTime(comment.date) }}</div>
								<div
										class="like-btn"
										:class="{'like-btn-active':comment.isLike}"
										@click="likeComment(comment)"
								>
									<SvgIcon icon="like" color="rgb(107, 114, 128)" size="18"/>
									<div class="count">{{ comment.likeCount }}</div>
								</div>
								<div class="comment-btn" @click="showReplyInput(comment.id)">
									<SvgIcon icon="comment" color="rgb(107, 114, 128)" size="18"/>
									<div class="count">{{ comment.commentCount }}</div>
								</div>
							</div>
							<transition
									mode="out-in"
									enter-active-class="animate__animated animate__fadeIn"
									leave-active-class="animate__animated animate__fadeOut"
									:duration="{enter: 300, leave: 300}"
							>
								<div class="reply-input" v-show="currentReplyId === comment.id">
									<el-input
											type="textarea"
											placeholder="平等表达，友善交流"
											maxlength="100"
											show-word-limit
											:autosize="{minRows: 2}"
											v-model="replyText"
									>
									</el-input>
									<el-button :disabled="replyDisabled" @click="handleReplyRoot(comment)">发送</el-button>
								</div>
							</transition>
							<div class="reply-list">
								<div class="item" v-for="subComment in comment.replyList" :key="subComment.id">
									<div class="avatar">
										<img v-lazy="subComment.avatar" alt="">
									</div>
									<div class="info">
										<div class="info-header">
											<div class="name">{{ subComment.username }}</div>
											<span v-if="subComment.replyName">回复</span>
											<div class="reply-name" v-if="subComment.replyName">{{ subComment.replyName }}</div>
										</div>
										<div class="content">{{ subComment.content }}</div>
										<div class="control">
											<div class="time">{{ formatTime(subComment.date) }}</div>
											<div
													class="like-btn"
													:class="{'like-btn-active':subComment.isLike}"
													@click="likeComment(subComment)"
											>
												<SvgIcon icon="like" color="rgb(107, 114, 128)" size="18"/>
												<div class="count">{{ subComment.likeCount }}</div>
											</div>
											<div class="comment-btn" @click="showReplyInput(subComment.id)">
												<SvgIcon icon="comment" color="rgb(107, 114, 128)" size="18"/>
											</div>
										</div>
										<transition
												mode="out-in"
												enter-active-class="animate__animated animate__fadeIn"
												leave-active-class="animate__animated animate__fadeOut"
												:duration="{enter: 300, leave: 300}"
										>
											<div class="reply-input" v-show="currentReplyId === subComment.id">
												<el-input
														type="textarea"
														placeholder="平等表达，友善交流"
														maxlength="100"
														show-word-limit
														:autosize="{minRows: 2}"
														v-model="replyText"
												>
												</el-input>
												<el-button :disabled="replyDisabled" @click="handleReplyReply(comment, subComment)">发送
												</el-button>
											</div>
										</transition>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import WcWaterfall from "wc-waterfall";
import EndHr from "@/components/endHr.vue";
import {
	reqFavoritePost,
	reqFollowUser,
	reqGetPostAuthor,
	reqGetPostComments,
	reqGetPostInfo,
	reqGetPostResource,
	reqLikeComment,
	reqLikePost,
	reqPublishComment,
	reqUnFavoritePost,
	reqUnFollowUser,
	reqUnLikeComment,
	reqUnLikePost
} from "@/api";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import _ from "lodash";

export default {
	name: 'PostDetail',
	components: {EndHr, WcWaterfall},
	data() {
		return {
			text: '',
			replyText: '',
			cols: 3, //瀑布流列数
			gap: 10, //瀑布流图片间距
			currentReplyId: -1, //当前打开回复输入框的评论id
			author: {}, //作者信息
			post: {}, //帖子信息
			images: [], //图片信息
			commentList: [], //评论列表
		}
	},
	computed: {
		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
		},

		//帖子id
		postId() {
			return this.$route.query.postId;
		},

		//帖子评论按钮禁用标志
		commentDisabled() {
			return this.text.length === 0;
		},

		//回复按钮禁用标志
		replyDisabled() {
			return this.replyText.length === 0;
		},

		//用户信息
		user() {
			return this.$store.state.userInfo;
		}
	},
	watch: {
		browserIdentity: {
			handler(val) {
				if (val === 'PC') {
					this.cols = 3;
					this.gap = 10;
				} else {
					this.cols = 2;
					this.gap = 5;
				}

				//如果图片数量小于列数，则设置列数为图片数量
				if (this.images.length > 0) {
					this.cols = this.images.length < this.cols ? this.images.length : this.cols;
				}
			},
			immediate: true
		}
	},
	methods: {
		//点击回复按钮
		showReplyInput(id) {
			if (this.currentReplyId === id) {
				this.currentReplyId = -1;
				return;
			}
			this.currentReplyId = id;
			this.replyText = '';
		},

		//获取帖子详情
		async getPostInfo() {
			let result = await reqGetPostInfo(this.postId);

			if (result.data === null) {
				await this.$router.push('/404');
				return;
			}

			if (result.code !== 200) {
				this.$message.error('帖子信息获取失败！');
				return;
			}
			this.post = result.data;
		},

		//获取帖子资源
		async getPostResources() {
			let result = await reqGetPostResource(this.postId);
			if (result.code !== 200) {
				this.$message.error('帖子资源获取失败！');
				return;
			}
			this.images = result.data;
			this.cols = this.images.length < this.cols ? this.images.length : this.cols;
		},

		//获取作者信息
		async getPostAuthor() {
			let result = await reqGetPostAuthor(this.postId);
			if (result.code !== 200) {
				this.$message.error('作者信息获取失败！');
				return;
			}
			this.author = result.data;
		},

		//评论帖子
		async handleComment() {
			let result = await reqPublishComment(this.postId, this.text);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '评论成功！' : '评论失败！'
			});
			this.text = '';

			//更新数据
			if (result.code === 200) {
				let comment = {
					id: result.data.id,
					userId: result.data.userId,
					avatar: this.user.avatar,
					username: this.user.username,
					content: result.data.content,
					date: Date.now(),
					likeCount: 0,
					commentCount: 0,
					replyList: []
				};
				this.commentList.unshift(comment);
				this.post.commentCount++;
			}
		},

		//回复一级评论
		async handleReplyRoot(rootComment) {
			let result = await reqPublishComment(this.postId, this.replyText, rootComment.id);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '评论成功！' : '评论失败！'
			});
			this.replyText = '';

			//更新数据
			if (result.code === 200) {
				let reply = {
					id: result.data.id,
					userId: result.data.userId,
					avatar: this.user.avatar,
					username: this.user.username,
					content: result.data.content,
					date: Date.now(),
					likeCount: 0
				};
				rootComment.replyList.unshift(reply);
				this.post.commentCount++;
				rootComment.commentCount++;
			}
		},

		//回复二级评论
		async handleReplyReply(rootComment, replyComment) {
			let result = await reqPublishComment(this.postId, this.replyText, rootComment.id, replyComment.userId);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '评论成功！' : '评论失败！'
			});
			this.replyText = '';

			//更新数据
			if (result.code === 200) {
				let reply = {
					id: result.data.id,
					userId: result.data.userId,
					avatar: this.user.avatar,
					username: this.user.username,
					content: result.data.content,
					date: Date.now(),
					likeCount: 0,
					replyName: replyComment.username
				};
				rootComment.replyList.unshift(reply);
				this.post.commentCount++;
				rootComment.commentCount++;
			}
		},

		//格式化时间
		formatTime(dateString) {
			return dayjs(dateString).fromNow().replace(/\s+/g, '');
		},

		//获取帖子评论
		async getPostComments() {
			let result = await reqGetPostComments(this.postId);
			if (result.code !== 200) {
				this.$message.error('评论获取失败！');
				return;
			}
			this.commentList = result.data;
		},

		//点赞或取消点赞帖子
		likePost: _.throttle(async function () {
			if (this.post.isLike) {
				let result = await reqUnLikePost(this.postId);
				if (result.code !== 200) {
					this.$message.error('取消点赞失败！');
					return;
				}
				this.post.isLike = false;
				this.post.likeCount--;
			} else {
				let result = await reqLikePost(this.postId);
				if (result.code !== 200) {
					this.$message.error('点赞失败！');
					return;
				}
				this.post.isLike = true;
				this.post.likeCount++;
			}
		}, 1000),

		//收藏或收藏帖子
		handleStar: _.throttle(async function () {
			if (this.post.isFavorite) {
				let result = await reqUnFavoritePost(this.postId);
				if (result.code !== 200) {
					this.$message.error('取消收藏失败！');
					return;
				}
				this.post.isFavorite = false;
				this.post.favoriteCount--;
			} else {
				let result = await reqFavoritePost(this.postId);
				if (result.code !== 200) {
					this.$message.error('收藏失败！');
					return;
				}
				this.post.isFavorite = true;
				this.post.favoriteCount++;
			}
		}, 1000),

		//关注或取消关注作者
		handleFollow: _.throttle(async function () {
			if (this.author.isFollow) {
				let result = await reqUnFollowUser(this.author.id);
				if (result.code !== 200) {
					this.$message.error('取消关注失败！');
					return;
				}
				this.$message.success('已取消关注！');
				this.author.isFollow = false;
				this.author.fanCount--;
			} else {
				let result = await reqFollowUser(this.author.id);
				if (result.code !== 200) {
					this.$message.error('关注失败！');
					return;
				}
				this.$message.success('关注成功！');
				this.author.isFollow = true;
				this.author.fanCount++;
			}
		}, 1000),

		//点赞或取消点赞评论
		likeComment: _.throttle(async function (comment) {
			if (comment.isLike) {
				let result = await reqUnLikeComment(comment.id);
				if (result.code !== 200) {
					this.$message.error('取消点赞失败！');
					return;
				}
				comment.isLike = false;
				comment.likeCount--;
			} else {
				let result = await reqLikeComment(comment.id);
				if (result.code !== 200) {
					this.$message.error('点赞失败！');
					return;
				}
				comment.isLike = true;
				comment.likeCount++;
			}
		}, 1000),
	},
	created() {
		this.getPostInfo();
		this.getPostResources();
		this.getPostAuthor();
		this.getPostComments();
	},
	mounted() {
		dayjs.extend(relativeTime);
		dayjs.locale('zh-cn');
	}
}
</script>

<style scoped lang="scss">
@import '@/style/common';

.post-detail {
	.back {
		position: fixed;
		top: 2rem;
		left: 160px;
		@include box-style;
		cursor: pointer;
		transition: all .3s ease;
		display: flex;
		align-items: center;

		&:hover {
			background-color: #eae7ff;
			color: #2B0AFF;

			.svg-icon {
				color: #2B0AFF !important;
			}
		}
	}

	.header {
		width: 768px;
		max-width: 100%;
		height: 200px;
		@include box-style;
		border-radius: 30px;
		margin: 0 auto;
		margin-top: 2rem;
		display: flex;
		padding: 1rem;

		@media screen and (max-width: 768px) {
			height: 150px;
			padding: 1rem;
			margin-top: 10px;
		}

		.avatar {
			width: 150px;
			height: 150px;
			border-radius: 50%;
			overflow: hidden;
			flex-shrink: 0;
			align-self: center;

			@media screen and (max-width: 768px) {
				width: 100px;
				height: 100px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.info {
			margin-left: 1rem;
			width: 100%;

			@media screen and (max-width: 768px) {
				margin-left: 5px;
			}

			.name-follow-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					font-size: 36px;
					font-weight: 700;
					margin-left: 10px;

					@media screen and (max-width: 768px) {
						font-size: 24px;
					}
				}

				.follow {
					$followBtnColor: #5e44ed;
					cursor: pointer;
					position: relative;
					padding: 10px 24px;
					color: $followBtnColor;
					border: 2px solid $followBtnColor;
					border-radius: 34px;
					background-color: transparent;
					transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 5px;

					&::before {
						content: '';
						position: absolute;
						inset: 0;
						margin: auto;
						width: 50px;
						height: 50px;
						border-radius: inherit;
						scale: 0;
						z-index: -1;
						background-color: $followBtnColor;
						transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
					}

					&:hover::before {
						scale: 3;
					}

					&:hover {
						color: #ffffff;
						scale: 1.1;
						box-shadow: 0 0px 20px rgba(43, 10, 255, 0.4);

						.svg-icon {
							color: #ffffff !important;
						}
					}

					&:active {
						scale: 1;
					}

					.svg-icon {
						color: $followBtnColor !important;
					}
				}
			}

			.data {
				color: #71717A;
				display: flex;
				align-items: center;
				margin-top: 2rem;
				flex-wrap: wrap;

				.item {
					margin-right: 1rem;
					padding: 8px 12px;
					border-radius: 9999px;
					box-sizing: border-box;
					cursor: pointer;
					transition: background-color .3s ease;

					&:hover {
						background-color: #eae7ff;
					}
				}
			}
		}
	}

	.main {
		width: 768px;
		max-width: 100%;
		margin: 1rem auto;
		padding: 10px;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			padding: 8px;
		}

		.date {
			color: rgb(161, 161, 170);
			text-align: center;
		}

		.post-content {
			text-align: center;
			font-size: 1.1rem;
			margin-top: 2rem;
		}

		.like-btn-active {
			color: #f91880;

			.svg-icon {
				color: #f91880 !important;
			}
		}

		.images {
			margin-top: 2rem;
			user-select: none;

			.img {
				border-radius: 10px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;

					//防止图片下圆角显示不正常
					display: block;
				}

				/* 修改图片加载动画和加载失败大小 */
				img[lazy="loading"],
				img[lazy="error"] {
					/* 保持宽高之比为16 / 9 */
					aspect-ratio: 16 / 9;
				}
			}
		}

		.post-actions {
			display: flex;
			justify-content: center;
			margin-top: 2rem;

			.item {
				display: flex;
				align-items: center;
				margin-right: 2rem;
				color: rgb(107, 114, 128);
				cursor: pointer;
				transition: color .3s ease;
				user-select: none;

				.count {
					margin-left: 5px;
				}
			}

			.like-btn:hover {
				color: #f91880;

				.svg-icon {
					color: #f91880 !important;
				}
			}

			.star-btn:hover {
				color: #fbbf24;

				.svg-icon {
					color: #fbbf24 !important;
				}
			}

			.star-btn-active {
				color: #fbbf24;

				.svg-icon {
					color: #fbbf24 !important;
				}
			}

			.share-btn:hover {
				color: #22c55e;

				.svg-icon {
					color: #22c55e !important;
				}
			}
		}

		.avatar {
			width: 45px;
			height: 45px;
			border-radius: 50%;
			overflow: hidden;
			flex-shrink: 0;

			@media screen and (max-width: 768px) {
				width: 35px;
				height: 35px;
			}

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				display: block;
			}
		}

		.comment-box {
			margin-top: 2rem;

			.el-divider {
				margin: 12px 0;
			}

			.input {
				display: flex;
				align-items: center;

				.el-textarea {
					margin: 0 15px;
					font-size: 1rem;

					@media screen and (max-width: 768px) {
						margin: 0 5px;
					}
				}
			}

			.list {
				.item {
					display: flex;
					margin-top: 1rem;

					.info {
						flex: 1;
						margin-left: 15px;
						color: rgb(82, 82, 91);

						@media screen and (max-width: 768px) {
							margin-left: 5px;
						}

						.name {
							font-size: 1.1rem;
							color: #ff9800;
						}

						.content {
							text-align: left;
							margin: .8rem 0;
						}

						.control {
							display: flex;
							align-items: center;
							font-size: .9rem;

							.time {
								width: 80px;
							}

							.like-btn,
							.comment-btn {
								width: 60px;
								display: flex;
								align-items: center;
								cursor: pointer;
								user-select: none;

								.count {
									margin-left: 5px;
								}
							}
						}

						.reply-input {
							display: flex;
							align-items: center;
							margin-top: .8rem;

							.el-button {
								margin-left: 1rem;

								@media screen and (max-width: 768px) {
									margin-left: 5px;
								}
							}
						}

						.reply-list .item .info .info-header {
							display: flex;
							align-items: center;

							span {
								margin: 0 5px;
							}

							.reply-name {
								font-size: 1.1rem;
								color: #ff9800;
							}
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
.post-detail {
	.el-textarea__inner {
		font-size: 1rem;
		color: #000000;
		transition: border-color .3s ease, box-shadow .3s ease;

		&:focus {
			border-color: #2b0aff;
			box-shadow: #2b0aff 0 0 0 1px;
		}
	}
}
</style>