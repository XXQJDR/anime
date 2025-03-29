<template>
	<div class="anime-list">
		<!-- region 添加按钮与搜索框 -->
		<div class="control">
			<div class="add-btn" @click="goAddAnime">
				<SvgIcon icon="add" color="#f7f3f2" />
				<div>添加</div>
			</div>
			<div class="search">
				<form @submit.prevent="searchAnime">
					<SvgIcon icon="search" color="#cac5c4"/>
					<input
							type="text"
							placeholder="请输入动漫关键词"
							v-model="keyword"
							@focus="handleFocus"
					/>
				</form>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 筛选 -->
		<div class="filter">
			<!-- 分类 -->
			<div class="type">
				<el-popover
						:visible-arrow="false"
						placement="bottom"
						trigger="click"
						@show="openFilterPopover('type')"
						@hide="closeFilterPopover('type')"
						v-model="typePopoverFlag"
				>
					<ul>
						<li
								@click="changeFilterType('全部')"
								:class="{'popover-li-active':selectedTypeName==='全部'}"
						>
							<SvgIcon icon="list"/>
							<div>全部</div>
						</li>
						<li
								@click="changeFilterType('正在看')"
								:class="{'popover-li-active':selectedTypeName==='正在看'}"
						>
							<SvgIcon icon="eye"/>
							<div>正在看</div>
						</li>
						<li
								@click="changeFilterType('已看')"
								:class="{'popover-li-active':selectedTypeName==='已看'}"
						>
							<SvgIcon icon="right"/>
							<div>已看</div>
						</li>
						<li
								@click="changeFilterType('未看')"
								:class="{'popover-li-active':selectedTypeName==='未看'}"
						>
							<SvgIcon icon="cancel"/>
							<div>未看</div>
						</li>
					</ul>
					<div class="btn" slot="reference" ref="typeBtn">
						<SvgIcon icon="filter"/>
						<span>{{ selectedTypeName }}</span>
						<SvgIcon icon="downArrow"/>
					</div>
				</el-popover>
			</div>

			<!-- 排序 -->
			<div class="sort">
				<el-popover
						:visible-arrow="false"
						placement="bottom"
						trigger="click"
						@show="openFilterPopover('sort')"
						@hide="closeFilterPopover('sort')"
						v-model="sortPopoverFlag"
				>
					<ul>
						<li
								@click="changeFilterSort('JOIN_DESC')"
								:class="{'popover-li-active':selectedSortName === 'JOIN_DESC'}"
						>
							<SvgIcon icon="descSort"/>
							<div>加入时间降序</div>
						</li>
						<li
								@click="changeFilterSort('JOIN_ASC')"
								:class="{'popover-li-active':selectedSortName === 'JOIN_ASC'}"
						>
							<SvgIcon icon="ascSort"/>
							<div>加入时间升序</div>
						</li>
						<li
								@click="changeFilterSort('PLAY_DESC')"
								:class="{'popover-li-active':selectedSortName === 'PLAY_DESC'}"
						>
							<SvgIcon icon="descSort"/>
							<div>播放时间降序</div>
						</li>
						<li
								@click="changeFilterSort('PLAY_ASC')"
								:class="{'popover-li-active':selectedSortName === 'PLAY_ASC'}"
						>
							<SvgIcon icon="ascSort"/>
							<div>播放时间升序</div>
						</li>
					</ul>
					<div class="btn" slot="reference" ref="sortBtn">
						<SvgIcon icon="sort"/>
						<div>
							<span v-show="selectedSortName === 'JOIN_DESC'">加入时间降序</span>
							<span v-show="selectedSortName === 'JOIN_ASC'">加入时间升序</span>
							<span v-show="selectedSortName === 'PLAY_DESC'">播放时间降序</span>
							<span v-show="selectedSortName === 'PLAY_ASC'">播放时间升序</span>
						</div>
						<SvgIcon icon="downArrow"/>
					</div>
				</el-popover>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 统计动漫总数 -->
		<div class="total">
			<div v-show="selectedTypeName==='全部'">
				<span>已加入</span>
				<CountTo
						:start-val="0"
						:end-val="total"
						class="number-font"
						:duration="2000"
				/>
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='正在看'">
				<span>正在观看</span>
				<CountTo
						:start-val="0"
						:end-val="total"
						class="number-font"
						:duration="2000"
				/>
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='已看'">
				<span>已经看了</span>
				<CountTo
						:start-val="0"
						:end-val="total"
						class="number-font"
						:duration="2000"
				/>
				<span>部动漫</span>
			</div>
			<div v-show="selectedTypeName==='未看'">
				<span>还有</span>
				<CountTo
						:start-val="0"
						:end-val="total"
						class="number-font"
						:duration="2000"
				/>
				<span>部动漫未看</span>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 动漫列表 -->
		<div class="list-box">
			<div class="list">
				<div class="item" v-for="(anime, index) in animeList" :key="anime.animeId">
					<div class="img" @click="goAnimeDetail(anime.animeUserId)">
						<img v-lazy="anime.cover" alt="">
					</div>
					<div class="content">
						<div class="info">
							<el-tooltip
									effect="dark"
									:content="anime.name"
									placement="top"
									:visible-arrow="false"
									:open-delay="300"
							>
								<div class="name">{{ anime.name }}</div>
							</el-tooltip>
							<div class="date" v-show="selectedTypeName!=='已看'">
								于<span>{{ selectedTypeName === '正在看' ? anime.watchingDate : anime.createDate }}</span>加入
							</div>
							<div class="date" v-show="selectedTypeName==='已看'">
								于<span>{{ anime.finishedDate }}</span>看完
							</div>
						</div>
						<div class="control">
							<button @click="openAnimeListPopover(anime.animeUserId, anime.watchStatus, index, $event)">
								<SvgIcon icon="more" color="#ada8a8"/>
							</button>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-if="emptyFlag" description="暂无动漫"/>

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading"/>

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr"/>
		</div>
		<!-- endregion -->

		<!-- region 复用弹出框 -->
		<el-popover
				:visible-arrow="false"
				trigger="manual"
				v-model="animeListPopoverFlag"
				popper-class="anime-list-popover"
		>
			<ul>
				<li
						@click="updateAnimeWatchStatus('WATCHING')"
						v-show="popover.watchStatus !== 'WATCHING'"
				>
					<SvgIcon icon="eye"/>
					<div>标记为正在看</div>
				</li>
				<li
						@click="updateAnimeWatchStatus('FINISHED')"
						v-show="popover.watchStatus !== 'FINISHED'"
				>
					<SvgIcon icon="right"/>
					<div>标记为已看</div>
				</li>
				<li
						@click="updateAnimeWatchStatus('NO_WATCH')"
						v-show="popover.watchStatus !== 'NO_WATCH'"
				>
					<SvgIcon icon="cancel"/>
					<div>标记为未看</div>
				</li>
				<li @click="toDustbin">
					<SvgIcon icon="dustbin" color="red"/>
					<div>发送到垃圾箱</div>
				</li>
			</ul>
		</el-popover>
		<!-- endregion -->
	</div>
</template>

<script>
import {reqGetPageAnime, reqLogicallyDeleteAnime, reqUpdateAnimeWatchStatus} from "@/api";
import _ from "lodash";
import CountTo from "vue-count-to";
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";

export default {
	name: 'AnimeList',
	components: {CountTo, EndHr, ScrollAnimation},
	data() {
		return {
			//选择分类类型
			selectedTypeName: '全部',

			//选择排序类型
			selectedSortName: 'JOIN_DESC',

			//滚动加载动画标志
			scrollLoading: false,

			//动漫数据
			animeList: [],

			//空状态，true显示空状态
			emptyFlag: false,

			//当前页
			current: 1,

			//每页显示动漫数量
			size: 10,

			//搜索关键词
			keyword: '',

			//是否还有下一页数据
			hasNext: false,

			//动漫总数
			total: 0,

			//打开popover对应的动漫数据
			popover: {
				animeUserId: 0,
				watchStatus: '',
				index: 0 //动漫在列表中的位置
			},

			//typePopover显示标志
			typePopoverFlag: false,

			//sortPopover显示标志
			sortPopoverFlag: false
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 2;
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
		animeListPopoverFlag: {
			get() {
				return this.$store.state.animeListPopoverFlag;
			},
			set(val) {
				this.$store.commit('ANIME_LIST_POPOVER_FLAG', val);
			}
		}
	},
	methods: {
		//搜索动漫
		searchAnime: _.throttle(function () {
			this.getFirstPageAnime();
		}, 1000),

		//添加按钮回调
		goAddAnime() {
			//将内容改为添加
			this.$store.commit('HOME_CONTENT_TYPE', 'addAnime');

			this.$router.push('/home/addAnime');
		},

		//点击动漫进入详情页面
		goAnimeDetail(animeUserId) {
			this.$router.push(`/animeDetail?animeUserId=${animeUserId}`);
		},

		/**
		 * 更新动漫观看状态
		 * @param newStatus 新状态
		 */
		async updateAnimeWatchStatus(newStatus) {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let oldStatus = null;
			switch (this.selectedTypeName) {
				case '全部':
					oldStatus = 'ALL';
					break;
				case '未看':
					oldStatus = 'NO_WATCH';
					break;
				case '正在看':
					oldStatus = 'WATCHING';
					break;
				case '已看':
					oldStatus = 'FINISHED';
					break;
			}

			//更改服务器数据
			let result = await reqUpdateAnimeWatchStatus(this.popover.animeUserId, this.current, this.size, this.keyword, newStatus, oldStatus, this.selectedSortName);
			if (result.code !== 200) {
				this.$message.error('标记失败！');
				return;
			}
			this.$message.success(`标记成功！${newStatus === 'FINISHED' ? '快去动漫详情页给这部动漫评分吧！' : ''}`);

			//更新列表
			if (this.selectedTypeName === '全部') {
				this.animeList[this.popover.index].watchStatus = newStatus;
			} else {
				this.animeList.splice(this.popover.index, 1);
				this.total--;
				if (result.data != null) {
					this.animeList.push(result.data);
				}
			}
		},

		/**
		 * 将动漫移入垃圾箱
		 */
		async toDustbin() {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let status = null;
			switch (this.selectedTypeName) {
				case '全部':
					status = 'ALL';
					break;
				case '未看':
					status = 'NO_WATCH';
					break;
				case '正在看':
					status = 'WATCHING';
					break;
				case '已看':
					status = 'FINISHED';
					break;
			}
			let result = await reqLogicallyDeleteAnime(this.popover.animeUserId, this.current, this.size, this.keyword, status, this.selectedSortName);
			if (result.code !== 200) {
				this.$message.error('移入失败！');
				return;
			}

			this.$message.success('移入成功！');

			//更新animeList
			this.animeList.splice(this.popover.index, 1);
			if (result.data != null) {
				this.animeList.push(result.data);
			}

			//更新动漫总数
			this.total--;
		},

		//获取对应分类的第一页数据
		async getFirstPageAnime() {
			this.current = 1;
			let status = null;
			switch (this.selectedTypeName) {
				case '全部':
					status = 'ALL';
					break;
				case '未看':
					status = 'NO_WATCH';
					break;
				case '正在看':
					status = 'WATCHING';
					break;
				case '已看':
					status = 'FINISHED';
					break;
			}

			//获取数据
			let result = await reqGetPageAnime(this.current, this.size, this.keyword, status, this.selectedSortName);
			if (result.code !== 200) {
				this.$message.error('数据获取失败！');
				return;
			}

			this.animeList = result.data.records || [];

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;

			//数据为空表示下一页无数据
			this.hasNext = result.data.current < result.data.pages;

			//获取动漫总数
			this.total = result.data.total;
		},

		//分页获取动漫数据
		async getPageAnime() {
			//开启加载动画
			this.scrollLoading = true;

			let status = null;
			switch (this.selectedTypeName) {
				case '全部':
					status = 'ALL';
					break;
				case '未看':
					status = 'NO_WATCH';
					break;
				case '正在看':
					status = 'WATCHING';
					break;
				case '已看':
					status = 'FINISHED';
					break;
			}
			try {
				//获取数据
				let result = await reqGetPageAnime(++this.current, this.size, this.keyword, status, this.selectedSortName);
				if (result.code !== 200) {
					this.$message.error('数据获取失败！');
					return;
				}

				this.animeList = this.animeList.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
			} finally {
				//关闭加载动画
				this.scrollLoading = false;
			}
		},

		//修改筛选分类
		changeFilterType(type) {
			if (this.selectedTypeName === type) {
				return;
			}

			this.typePopoverFlag = false;

			//修改内容标志
			this.selectedTypeName = type;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
		},

		lazyLoading() {
			let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
			let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
			let wheight = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

			let bottomOfWindow = scrollHeight - wheight - nowScotop;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageAnime();
			}
		},

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
		},

		//打开animeListPopover
		openAnimeListPopover(animeUserId, watchStatus, index, event) {
			//获取数据
			this.popover.animeUserId = animeUserId;
			this.popover.watchStatus = watchStatus;
			this.popover.index = index;

			this.animeListPopoverFlag = true;
			this.maskFlag = true;

			//定位popover的位置
			this.$nextTick(() => {
				let popover = document.querySelector('.anime-list-popover');
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

		//打开typePopover
		openFilterPopover(popoverType) {
			//打开全局遮罩
			this.maskFlag = true;

			//添加激活样式
			if (popoverType === 'type') {
				this.$refs.typeBtn.classList.add('popover-active');
			} else {
				this.$refs.sortBtn.classList.add('popover-active');
			}
		},

		//关闭typePopover
		closeFilterPopover(popoverType) {
			this.maskFlag = false;
			if (popoverType === 'type') {
				this.$refs.typeBtn.classList.remove('popover-active');
			} else {
				this.$refs.sortBtn.classList.remove('popover-active');
			}
		},

		//修改筛选排序
		changeFilterSort(sort) {
			if (this.selectedSortName === sort) {
				return;
			}

			this.sortPopoverFlag = false;

			//修改内容标志
			this.selectedSortName = sort;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
		}
	},
	created() {
		//获取全部分类中第一页数据
		this.getFirstPageAnime();
	},
	mounted() {
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
	},
	//从详情页面返回
	activated() {
		setTimeout(() => {
			window.addEventListener('scroll', this.lazyLoading);
		}, 500);
	},
	//进入详情页面取消滚动加载
	deactivated() {
		window.removeEventListener('scroll', this.lazyLoading);
	}
}
</script>

<style scoped lang="scss">
@import "@/style/common";
@font-face {
	font-family: 'numberfont';
	font-display: swap;
	src: url("@/assets/fonts/number/webfont.ttf");
}

.anime-list {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@include content-min-height;

	/* 添加按钮与搜索框 */
	> .control {
		display: flex;
		@include box-style;

		@media screen and (max-width: 768px) {
			display: block;
		}

		.add-btn {
			width: 10%;
			min-width: 90px;
			box-sizing: border-box;
			border-radius: 5px;
			background-attachment: scroll;
			background-blend-mode: normal;
			background-clip: border-box;
			background-color: rgba(0, 0, 0, 0);
			background-image: linear-gradient(92.91deg, rgb(51, 0, 217) 2.18%, rgb(157, 32, 201) 44.94%, rgb(223, 122, 108) 99.91%);
			background-origin: padding-box;
			background-position-x: 0;
			background-position-y: 0;
			background-size: 400%;
			transition: background-size 0.3s;
			cursor: pointer;
			display: flex;
			justify-content: center;
			align-items: center;

			&:hover {
				background-size: 200%;
			}

			@media screen and (max-width: 768px) {
				width: 100%;
				height: 45px;
			}

			div {
				margin-left: 10px;
				font-weight: bold;
				color: white;
			}
		}

		.search {
			width: 100%;
			margin-left: 1rem;
			position: relative;

			@media screen and (max-width: 768px) {
				width: 100%;
				margin-left: 0;
				margin-top: 1rem;
			}

			.svg-icon {
				position: absolute;
				top: 50%;
				left: 15px;
				transform: translateY(-50%);
			}

			/* 输入框样式 */
			@include input-style;
			input {
				padding-left: 45px;
			}
		}
	}

	/* 筛选 */
	.filter {
		margin-top: .6rem;
		user-select: none;
		display: flex;
		justify-content: space-between;
		@include box-style;

		/* 分类 */
		.type .btn span {
			width: 60px;
			text-align: center;

			@media screen and (max-width: 768px) {
				width: 47px;
			}
		}

		.type,
		.sort {
			.btn {
				display: flex;
				font-size: 1.1rem;
				align-items: center;
				border-radius: 5px;
				cursor: pointer;
				transition: background-color .3s;
				padding: 10px 15px;

				@media screen and (max-width: 768px) {
					padding: 10px;
				}

				&:hover {
					background-color: #f7f3f2;
				}

				span {
					margin: 0 10px;
				}
			}
		}
	}

	/* 统计 */
	.total {
		margin-top: .6rem;
		text-align: center;
		@include box-style;

		.number-font {
			font-family: "numberfont" !important;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
			background-clip: text;
			color: transparent;
			font-size: 1.5rem;
		}
	}

	/* 动漫列表 */
	.list-box {
		flex: 1;
		margin-top: .6rem;
		position: relative;
		@include box-style;

		.list {
			display: grid;
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

			.item {
				/* item过渡时间 */
				$transitionTime: 0.3s;

				/*宽度与高度的比例*/
				aspect-ratio: 0.8;
				border-radius: 10px;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				overflow: hidden;
				transition: all $transitionTime;

				/* 鼠标移入item给item添加阴影 */
				&:hover {
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

					/* 鼠标移入item给content添加背景 */
					.content {
						background-color: #f7f3f2;
					}
				}

				@media screen and (max-width: 768px) {
					aspect-ratio: 1;
				}

				.img {
					height: 82%;
					overflow: hidden;
					cursor: pointer;

					/* 鼠标移入图片放大图片 */
					&:hover {
						img {
							transform: scale(1.05);
						}
					}

					/* 图片自适应父盒子 */
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform $transitionTime;
					}
				}

				.content {
					height: 18%;
					background-color: #FFFFFF;
					transition: background-color $transitionTime;

					&::after {
						content: '';
						display: block;
						clear: both;
					}

					.info {
						width: 85%;
						height: 100%;
						float: left;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						text-align: center;

						@media screen and (max-width: 768px) {
							width: 80%;
						}

						.name {
							width: 100%;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding-left: 5px;
							box-sizing: border-box;
						}

						.date {
							width: 100%;
							font-size: 0.8rem;
							color: #ada8a8;
						}
					}

					.control {
						width: 15%;
						height: 100%;
						float: right;
						position: relative;

						@media screen and (max-width: 768px) {
							width: 20%;
						}

						button {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							transition: color, background-color .3s;

							/* 移入文字旁的按钮改变按钮背景色和svg颜色 */
							&:hover {
								background-color: #e5e0df;
								color: #3c3838;
							}

							@media screen and (max-width: 768px) {
								width: 35px;
								height: 35px;
							}

							svg {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								margin: auto;
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

	/* 复用popover */
	.anime-list-popover ul {
		li:last-child {
			color: red;
		}
	}
}
</style>