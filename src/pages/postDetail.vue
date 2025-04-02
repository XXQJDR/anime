<template>
	<div class="post-detail">
		<div class="back" @click="$router.back()" v-show="browserIdentity === 'PC'">
			<SvgIcon icon="home" size="24"/>
			<SvgIcon icon="rightArrow" size="28" color="#cac5c4"/>
			<span>返回</span>
		</div>

		<div class="header">
			<div class="avatar">
				<img src="http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg" alt="">
			</div>
			<div class="info">
				<div class="name-follow-box">
					<div class="name">ensolitude</div>
					<div class="follow">
						<SvgIcon icon="follow" />
						<div>关注</div>
					</div>
				</div>
				<div class="data">
					<div class="item">关注 8</div>
					<div class="item">粉丝 1</div>
					<div class="item">获赞 10</div>
					<div class="item">作品 20</div>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="post-content">每个人心中都有一个太太，我已经找到！</div>
			<div class="images">
				<wc-waterfall :gap="gap" :cols="cols">
					<div class="img" v-for="(img, index) in images" :key="index">
						<img :src="img" alt="">
					</div>
				</wc-waterfall>
			</div>
			<div class="post-actions">
				<div class="item like-btn">
					<SvgIcon icon="fillLike" color="rgb(107, 114, 128)" size="38"/>
					<div class="count">76</div>
				</div>
				<div class="item star-btn">
					<SvgIcon icon="fillStar" color="rgb(107, 114, 128)" size="38"/>
					<div class="count">33</div>
				</div>
				<div class="item share-btn">
					<SvgIcon icon="share" color="rgb(107, 114, 128)" size="38"/>
				</div>
			</div>
			<div class="comment-box">
				<div class="count">59 评论</div>
				<el-divider></el-divider>
				<div class="input">
					<div class="avatar">
						<img src="http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg" alt="">
					</div>
					<el-input
							type="textarea"
							placeholder="平等表达，友善交流"
							maxlength="100"
							show-word-limit
							:autosize="{minRows: 2}"
					>
					</el-input>
					<el-button>发送</el-button>
				</div>
				<div class="list">
					<div class="item" v-for="comment in commentList" :key="comment.id">
						<div class="avatar">
							<img :src="comment.avatar" alt="">
						</div>
						<div class="info">
							<div class="name">{{comment.username}}</div>
							<div class="content">{{comment.content}}</div>
							<div class="control">
								<div class="time">{{comment.time}}</div>
								<div class="like-btn">
									<SvgIcon icon="like" color="rgb(107, 114, 128)" size="18"/>
									<div class="count">{{comment.likeCount}}</div>
								</div>
								<div class="comment-btn" @click="handleReply(comment.id)">
									<SvgIcon icon="comment" color="rgb(107, 114, 128)" size="18"/>
									<div class="count">{{comment.commentCount}}</div>
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
									>
									</el-input>
									<el-button>发送</el-button>
								</div>
							</transition>
							<div class="reply-list">
								<div class="item" v-for="subComment in comment.replyList" :key="subComment.id">
									<div class="avatar">
										<img :src="subComment.avatar" alt="">
									</div>
									<div class="info">
										<div class="info-header">
											<div class="name">{{subComment.username}}</div>
											<span>回复</span>
											<div class="reply-name">{{subComment.replyName}}</div>
										</div>
										<div class="content">{{subComment.content}}</div>
										<div class="control">
											<div class="time">{{subComment.time}}</div>
											<div class="like-btn">
												<SvgIcon icon="like" color="rgb(107, 114, 128)" size="18"/>
												<div class="count">{{subComment.likeCount}}</div>
											</div>
											<div class="comment-btn" @click="handleReply(subComment.id)">
												<SvgIcon icon="comment" color="rgb(107, 114, 128)" size="18"/>
												<div class="count">{{subComment.commentCount}}</div>
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
												>
												</el-input>
												<el-button>发送</el-button>
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

export default {
	name: 'PostDetail',
	components: {EndHr, WcWaterfall},
	data() {
		return {
			images: [], //图片
			cols: 3, //瀑布流列数
			gap: 10, //瀑布流图片间距
			currentReplyId: -1, //当前打开回复输入框的评论id
			commentList: [ //评论列表
				{
					id: 1,
					avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=1070373183&spec=640&img_type=jpg',
					username: '怀名亦未寝',
					content: '我觉得这网站写得太好了！',
					time: '刚刚',
					likeCount: 1,
					commentCount: 2,
					replyList: [
						{
							id: 2,
							avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg',
							username: 'ensolitude',
							content: '点赞点赞',
							time: '刚刚',
							likeCount: 0,
							commentCount: 0,
							replyName: '怀名亦未寝'
						},
						{
							id: 3,
							avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg',
							username: 'ensolitude',
							content: '那可不，不看是谁写的！',
							time: '刚刚',
							likeCount: 0,
							commentCount: 0,
							replyName: '怀名亦未寝'
						}
					]
				},
				{
					id: 4,
					avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg',
					username: 'ensolitude',
					content: '太难写了！',
					time: '3小时前',
					likeCount: 99,
					commentCount: 29,
					replyList: []
				}
			],
		}
	},
	computed: {
		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
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
			},
			immediate: true
		}
	},
	methods: {
		generateRandomImages(count = 10, minSize = 100, maxSize = 1000) {
			const images = [];
			for (let i = 0; i < count; i++) {
				// 首先生成随机宽度（确保足够大以容纳高度）
				const width = Math.floor(Math.random() * (maxSize - minSize) + minSize);
				// 高度随机，但必须小于宽度
				const height = Math.floor(Math.random() * (width - minSize) + minSize);

				// 如果高度意外>=宽度（极小概率），强制调整
				const finalHeight = Math.min(height, width - 1);

				// 构建图片对象（可扩展其他字段）
				images.push(`https://picsum.photos/${width}/${height}?random=${Date.now() + i}`);
			}
			return images;
		},

		handleReply(id) {
			if (this.currentReplyId === id) {
				this.currentReplyId = -1;
				return;
			}
			this.currentReplyId = id;
		}
	},
	created() {
		// this.images = this.generateRandomImages(10);
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
					display: flex;
					justify-content: center;
					align-items: center;
					@include box-style;
					cursor: pointer;
					transition: all .3s ease;
					background-color: #eae7ff;

					div {
						margin-left: 5px;
					}

					&:hover {
						background-color: #e1dcfe;
						color: #2B0AFF;

						.svg-icon {
							color: #2B0AFF !important;
						}
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
		margin: 2rem auto;
		padding: 10px;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			padding: 8px;
		}

		.post-content {
			text-align: center;
			font-size: 1.1rem;
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