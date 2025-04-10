<template>
	<div class="personal-post">
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

		<!-- 帖子列表 -->
		<div class="post-list" v-loading="dataLoading">
			<div class="list">
				<div
						class="post"
						v-for="(post, index) in postList"
						:key="post.id"
						@click="goToPostDetail(post.id)"
				>
					<div class="cover">
						<img v-lazy="post.cover" alt="" >
					</div>
					<div class="info">
						<div class="content">{{post.content}}</div>
						<div class="data">
							<div class="like">
								<SvgIcon icon="like" size="0.9rem"/>
								<div class="count">{{post.likeCount}}</div>
							</div>
							<div class="comment">
								<SvgIcon icon="comment" size="0.9rem"/>
								<div class="count">{{post.commentCount}}</div>
							</div>
							<div class="star">
								<SvgIcon icon="star" size="0.9rem"/>
								<div class="count">{{post.favoriteCount}}</div>
							</div>
						</div>
						<div class="time" v-text="formatTime(post.createDate)"></div>
					</div>
					<div class="control" @click.stop="openPopover(post.id, index, $event)">
						<SvgIcon icon="more" color="#9CA3AF" size="26"/>
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

		<!-- 复用弹出框 -->
		<el-popover
				:visible-arrow="false"
				trigger="manual"
				v-model="reusePopoverFlag"
				popper-class="personal-post-list-popover"
		>
			<ul>
				<li>
					<SvgIcon icon="edit"/>
					<div>编辑</div>
				</li>
				<li @click="deletePost">
					<SvgIcon icon="cancel" color="red"/>
					<div style="color: red">删除</div>
				</li>
			</ul>
		</el-popover>
	</div>
</template>

<script>
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";
import {reqDeletePost, reqGetPagePost} from "@/api";
import _ from "lodash";

export default {
	name: 'PersonalPost',
	components: {ScrollAnimation, EndHr},
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

			//打开popover对应的帖子数据
			popover: {
				postId: 0,
				index: 0 //帖子在列表中的位置
			},
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 1 && !this.emptyFlag;
		},

		//全局遮罩显示标志
		maskFlag: {
			get() {
				return this.$store.state.maskFlag;
			},
			set(val) {
				this.$store.commit('MASK_FLAG', val);
			}
		},

		//复用popover显示标志
		reusePopoverFlag: {
			get() {
				return this.$store.state.reusePopoverFlag;
			},
			set(val) {
				this.$store.commit('REUSE_POPOVER_FLAG', val);
			}
		}
	},
	methods: {
		goToPostDetail(postId) {
			this.$router.push(`/postDetail?postId=${postId}`);
		},

		//打开popover
		openPopover(postId, index, event) {
			//获取数据
			this.popover.postId = postId;
			this.popover.index = index;

			this.reusePopoverFlag = true;
			this.maskFlag = true;

			//定位popover的位置
			this.$nextTick(() => {
				let popover = document.querySelector('.personal-post-list-popover');
				if (!popover) return;

				// 获取关键尺寸
				let popoverWidth = popover.offsetWidth;
				let popoverHeight = popover.offsetHeight;
				let viewportWidth = document.documentElement.clientWidth;
				let viewportHeight = document.documentElement.clientHeight;

				// 获取滚动偏移量
				let scrollX = window.pageXOffset || document.documentElement.scrollLeft;
				let scrollY = window.pageYOffset || document.documentElement.scrollTop;

				// 计算文档流坐标
				const clickDocX = event.clientX + scrollX;
				const clickDocY = event.clientY + scrollY;

				// ===== 水平居中计算 =====
				let targetX = clickDocX - popoverWidth / 2;

				// 右侧越界修正
				if (targetX + popoverWidth > scrollX + viewportWidth) {
					targetX = scrollX + viewportWidth - popoverWidth - 5;
				}
				// 左侧越界修正
				else if (targetX < scrollX) {
					targetX = scrollX + 5;
				}

				// ===== 垂直位置计算 =====
				let targetY = clickDocY - popoverHeight - 10; // 目标位置：上方 10px

				// 上方空间不足时改为下方显示
				if (targetY < scrollY) {
					targetY = clickDocY + 10;
				}

				// 检查下方越界
				if (targetY + popoverHeight > scrollY + viewportHeight) {
					targetY = scrollY + viewportHeight - popoverHeight - 5;
				}

				// 应用最终坐标
				popover.style.left = `${Math.floor(targetX)}px`;
				popover.style.top = `${Math.floor(targetY)}px`;
			});
		},

		//获取第一页数据
		async getFirstPagePost() {
			this.dataLoading = true;
			this.current = 0;
			let result = await reqGetPagePost(++this.current, this.size, this.keyword, true);
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
			let result = await reqGetPagePost(++this.current, this.size, this.keyword, true);
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
		formatTime(date) {
			//将date格式化为yyyy年MM月dd日
			let d = new Date(date);
			let year = d.getFullYear();
			let month = d.getMonth() + 1;
			let day = d.getDate();
			return `${year}年${month}月${day}日`;
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

		//删除帖子
		deletePost() {
			this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				//关闭编辑动漫弹窗及全局遮罩
				this.reusePopoverFlag = false;
				this.maskFlag = false;

				//开启加载动画
				this.dataLoading = true;
				let result = await reqDeletePost(this.popover.postId);
				if (result.code !== 200) {
					this.$message.error('删除帖子失败！');
					this.dataLoading = false;
					return;
				}

				//删除成功后，更新数据
				this.postList.splice(this.popover.index, 1);
				this.$message.success('删除成功');
				this.dataLoading = false;
				this.emptyFlag = this.postList.length === 0;
			}).catch(() => {});
		}
	},
	created() {
		this.getFirstPagePost();
	},
	mounted() {
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
@import '@/style/common';

.personal-post {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@include content-min-height;

	//搜索框
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

	.post-list {
		flex: 1;
		margin-top: .6rem;

		//使空标志居中
		position: relative;

		//防止加载动画溢出
		overflow: hidden;

		.post {
			transition: background-color .3s ease;
			cursor: pointer;
			padding: 16px 12px;
			border-radius: 10px;
			display: flex;
			gap: 15px;
			user-select: none;

			@media screen and (max-width: 768px) {
				flex-direction: column;
				gap: 10px;
			}

			&:hover {
				background-color: #F4F4F5;

				img {
					transform: scale(1.05);
				}
			}

			.cover {
				width: 200px;
				aspect-ratio: 16 / 9;
				overflow: hidden;
				border-radius: 10px;

				//防止图片被压缩
				flex-shrink: 0;

				@media screen and (max-width: 768px) {
					width: 100%;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform .5s ease;

					//解决圆角显示问题
					display: block;
				}
			}

			.info {
				flex: 1;
				min-width: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;

				@media screen and (max-width: 768px) {
					text-align: center;
					gap: 10px;
				}

				.content {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.data {
					display: flex;
					gap: 10px;

					@media screen and (max-width: 768px) {
						justify-content: center;
					}

					.like,
					.comment,
					.star {
						display: flex;
						align-items: center;
						color: #8A919F;
						font-size: .9rem;

						.svg-icon {
							color: #8A919F !important;
						}

						.count {
							margin-left: 3px;
						}
					}
				}

				.time {
					color: #8A919F;
					font-size: .9rem;
				}
			}

			.control {
				border-radius: 5px;
				padding: 3px;
				transition: background-color .3s ease;
				align-self: center;

				&:hover {
					background-color: #E5E7EB;
				}
			}
		}
	}
}
</style>