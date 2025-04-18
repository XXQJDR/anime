<template>
	<div class="community">
		<!-- 搜索框 -->
		<div class="search">
			<SvgIcon icon="search" size="20" color="#cac5c4"/>
			<input
					type="text"
					placeholder="请输入关键词(搜索请按回车键)"
					v-model="keyword"
					@keyup.enter="searchHandle"
					@focus="handleFocus"
			/>
		</div>

		<div class="list-box" v-loading="dataLoading">
			<div class="post-list">
				<div class="post" v-for="post in postList" @click="goToPostDetail(post.id)">
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
			<el-empty v-if="emptyFlag" description="暂无帖子"/>

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
import _ from "lodash";

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
			emptyFlag: false,

			//数据加载标志
			dataLoading: false,
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 1;
		},
	},
	methods: {
		goToPostDetail(postId) {
			this.$router.push(`/postDetail?postId=${postId}`);
		},

		//获取第一页数据
		async getFirstPagePost() {
			this.dataLoading = true;
			this.current = 0;
			let result = await reqGetPagePost(++this.current, this.size, this.keyword);
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				return;
			}

			this.postList = result.data.records || [];

			//判断是否无数据
			this.emptyFlag = this.postList.length === 0;

			//判断是否存在下一页数据
			this.hasNext = this.postList.length < result.data.total;
			this.dataLoading = false;
		},

		//分页获取数据
		async getPagePost() {
			this.scrollLoading = true;
			let result = await reqGetPagePost(++this.current, this.size, this.keyword);
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				this.scrollLoading = false;
				return;
			}

			this.postList = this.postList.concat(result.data.records || []);
			this.hasNext = this.postList.length < result.data.total;
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

		//按下回车搜索回调
		searchHandle: _.throttle(function () {
			this.getFirstPagePost();
		}, 1000),

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
		},
	},
	created() {
		this.getFirstPagePost();
	},
	mounted() {
		dayjs.extend(relativeTime);
		dayjs.locale('zh-cn');
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
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

		//使空标志居中
		position: relative;

		//防止加载动画溢出
		overflow: hidden;

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
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: center;
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
								margin-right: 5px;
							}
						}
					}
				}
			}
		}
	}
}
</style>