<template>
	<div class="community">
		<!-- 搜索框 -->
		<div class="search">
			<SvgIcon icon="search" size="20" color="#cac5c4"/>
			<input
					type="text"
					placeholder="请输入关键词(搜索请按回车键)"
					v-model="keyword"
			/>
		</div>

		<div class="list-box">
			<div class="post-list">
				<div class="post" v-for="post in postList" @click="goToPostDetail">
					<!-- 封面 -->
					<div class="cover">
						<img v-lazy="post.cover" alt="">
					</div>

					<!-- 信息 -->
					<div class="info">
						<div class="content">{{ post.content }}</div>
						<div class="data">
							<div class="like">
								<SvgIcon icon="like" size="0.9rem"/>
								<div class="count">{{ post.likeCount }}</div>
							</div>
							<div class="comment">
								<SvgIcon icon="comment" size="0.9rem"/>
								<div class="count">{{ post.commentCount }}</div>
							</div>
							<div class="star">
								<SvgIcon icon="star" size="0.9rem"/>
								<div class="count">{{ post.favoriteCount }}</div>
							</div>
						</div>
						<div class="user">
							<div class="avatar">
								<img v-lazy="post.avatar" alt="">
							</div>
							<div class="username">{{ post.username }}</div>
							<div class="time">
								<SvgIcon icon="time" size="0.9rem"/>
								<div>{{ formatTime(post.createDate) }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 空标志 -->
			<el-empty v-if="emptyFlag" description="暂无动漫"/>

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading"/>

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr"/>
		</div>
	</div>
</template>

<script>
import {reqGetPagePost} from "@/api";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import ScrollAnimation from "@/components/scrollAnimation.vue";
import EndHr from "@/components/endHr.vue";

export default {
	name: 'Community',
	components: {EndHr, ScrollAnimation},
	data() {
		return {
			current: 0,
			size: 10,
			keyword: '',
			postList: [],

			//滚动加载动画
			scrollLoading: false,

			//是否还有下一页数据
			hasNext: false,

			//是否显示空标志
			emptyFlag: false
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 1;
		},
	},
	methods: {
		goToPostDetail() {
			this.$router.push('/postDetail');
		},

		//获取第一页数据
		async getFirstPagePost() {
			this.current = 0;
			let result = await reqGetPagePost(++this.current, this.size, this.keyword);
			if (result.code !== 200) {
				this.$message.error(result.message);
				return;
			}

			this.postList = result.data.records || [];

			//判断是否无数据
			this.emptyFlag = this.postList.length === 0;

			//判断是否存在下一页数据
			this.hasNext = result.data.current < result.data.pages;
		},

		//分页获取数据
		async getPagePost() {
			this.scrollLoading = true;
			let result = await reqGetPagePost(++this.current, this.size, this.keyword);
			if (result.code !== 200) {
				this.$message.error(result.message);
				this.scrollLoading = false;
				return;
			}

			this.postList = this.postList.concat(result.data.records || []);
			this.hasNext = result.data.current < result.data.pages;
			this.scrollLoading = false;
		},

		//格式化时间
		formatTime(dateString) {
			return dayjs(dateString).fromNow().replace(/\s+/g, '');
		},

		//滚动分页加载
		lazyLoading() {
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
			let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
			let wheight = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

			let bottomOfWindow = scrollHeight - wheight - nowScotop;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPagePost();
			}
		},
	},
	created() {
		this.getFirstPagePost();
	},
	mounted() {
		dayjs.extend(relativeTime);
		dayjs.locale('zh-cn');
	},
	//其他页面返回
	activated() {
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	//进入其他页面
	deactivated() {
		window.removeEventListener('scroll', this.lazyLoading);
	},
	//进入当前页面
	beforeRouteEnter(to, from, next) {
		next();

		//更新数据
		if (from.name === 'PublishPost') {
			location.reload();
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";

.community {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@include content-min-height;

	/* 搜索框 */
	.search {
		position: relative;
		@include box-style;

		.svg-icon {
			position: absolute;
			top: 50%;
			left: 25px;
			transform: translateY(-50%);
		}

		@include input-style;

		input {
			/* 使输入文字居中 */
			text-align: center;
		}
	}

	.list-box {
		flex: 1;
		margin-top: .6rem;
		@include box-style;
		position: relative;

		/* 帖子列表 */
		.post-list {
			display: grid;
			align-items: start;
			grid-gap: 15px;

			@media screen and (max-width: 768px) {
				grid-template-columns: repeat(1, 1fr);
				grid-gap: 10px;
			}

			@media screen and (min-width: 768px) and (max-width: 1000px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media screen and (min-width: 1000px) and (max-width: 1260px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media screen and (min-width: 1260px) and (max-width: 1500px) {
				grid-template-columns: repeat(4, 1fr);
			}

			@media screen and (min-width: 1500px) {
				grid-template-columns: repeat(5, 1fr);
			}

			.post {
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				background-color: #FFFFFF;
				border-radius: 10px;
				transition: box-shadow .3s ease;
				cursor: pointer;
				overflow: hidden;

				&:hover {
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

					.cover img {
						transform: scale(1.05);
					}
				}

				/* 封面 */
				.cover {
					height: 150px;
					overflow: hidden;

					@media screen and (max-width: 768px) {
						height: 200px;
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform .3s ease;

						//防止图片下圆角显示不正常
						display: block;
					}
				}

				/* 信息 */
				.info {
					padding: 10px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;

					@media screen and (max-width: 768px) {
						padding: 5px;
					}

					.content {
						margin-top: 10px;
						height: 64px;
						word-break: break-all;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;

						@media screen and (max-width: 768px) {
							height: 50px;
						}
					}

					/* 数据 */
					.data {
						display: flex;
						margin-top: 10px;

						.like,
						.comment,
						.star {
							display: flex;
							align-items: center;
							color: #8A919F;
							margin-right: 10px;
							font-size: .9rem;

							.svg-icon {
								color: #8A919F !important;
							}

							.count {
								margin-left: 3px;
							}
						}
					}

					.user {
						display: flex;
						align-items: center;
						margin-top: 3px;

						.avatar {
							width: 35px;
							height: 35px;
							border-radius: 50%;
							overflow: hidden;

							@media screen and (max-width: 768px) {
								width: 30px;
								height: 30px;
							}

							img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}

						.username {
							margin-left: 5px;
						}

						.time {
							display: flex;
							align-items: center;
							color: #8A919F;
							margin-left: 10px;
							font-size: .9rem;

							.svg-icon {
								color: #8A919F !important;
							}
						}
					}
				}
			}
		}

		.el-empty {
			padding: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>