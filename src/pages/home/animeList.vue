<template>
	<div class="animeList">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg width="22px" height="22px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true">
				<path d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path>
			</svg>
			<div>动漫列表</div>
		</div>
		<!--endregion-->

		<!-- region 添加按钮与搜索框 -->
		<div class="control">
			<div class="addBtn" @click="goAddAnime">
				<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path>
				</svg>
				<div>添加</div>
			</div>
			<div class="search">
				<form @submit.prevent="searchAnime">
					<svg width="18px" height="18px" viewBox="0 0 24 24" focusable="false">
						<path d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path>
					</svg>
					<input type="text" placeholder="请输入动漫关键词" v-model="keyword" @focus="handleFocus">
				</form>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 列表分类 -->
		<div class="type">
			<!-- pc端 -->
			<div class="pc">
				<div class="btn" @click="changeAnimeType('全部')" :class="{typePcBtnActive:selectedTypeName==='全部'}">
					<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true">
						<path d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path>
					</svg>
					<div>全部</div>
				</div>
				<div class="btn" @click="changeAnimeType('正在看')" :class="{typePcBtnActive:selectedTypeName==='正在看'}">
					<svg width="25px" height="25px" stroke-width="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path d="M511.95904 260.90496c177.83296 0 335.872 107.43808 403.712 269.14304l3.456 8.27904-3.456 8.23296a437.93408 437.93408 0 0 1-403.712 269.01504 437.68832 437.68832 0 0 1-403.62496-269.01504l-3.46112-8.23296 3.41504-8.27904a437.632 437.632 0 0 1 403.62496-269.14304h0.04608z m0 42.67008a394.96192 394.96192 0 0 0-364.33408 242.98496l3.584-8.27904 1.408 3.2a394.99264 394.99264 0 0 0 346.67008 231.25504l12.62592 0.16896a395.24864 395.24864 0 0 0 364.37504-242.85696l-3.62496 8.192-1.36704-3.11296a395.15136 395.15136 0 0 0-346.752-231.34208l-12.63104-0.20992h0.04608z" />
						<path d="M512 426.66496a128 128 0 1 1 0 256.00512 128 128 0 0 1 0-256z m0 42.67008A85.33504 85.33504 0 1 0 512 640a85.33504 85.33504 0 0 0 0-170.66496z" />
					</svg>
					<div>正在看</div>
				</div>
				<div class="btn" @click="changeAnimeType('已看')" :class="{typePcBtnActive:selectedTypeName==='已看'}">
					<svg width="19px" height="19px" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"></path>
					</svg>
					<div>已看</div>
				</div>
				<div class="btn" @click="changeAnimeType('未看')" :class="{typePcBtnActive:selectedTypeName==='未看'}">
					<svg width="16px" height="16px" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
						<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"></path>
					</svg>
					<div>未看</div>
				</div>
			</div>

			<!-- 移动端 -->
			<div class="mobile">
				<div class="btn" @click="detailFlag = !detailFlag">
					<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M0 73.7C0 50.7 18.7 32 41.7 32H470.3c23 0 41.7 18.7 41.7 41.7c0 9.6-3.3 18.9-9.4 26.3L336 304.5V447.7c0 17.8-14.5 32.3-32.3 32.3c-7.3 0-14.4-2.5-20.1-7l-92.5-73.4c-9.6-7.6-15.1-19.1-15.1-31.3V304.5L9.4 100C3.3 92.6 0 83.3 0 73.7zM55 80L218.6 280.8c3.5 4.3 5.4 9.6 5.4 15.2v68.4l64 50.8V296c0-5.5 1.9-10.9 5.4-15.2L457 80H55z"></path>
					</svg>
					<span>{{selectedTypeName}}</span>
					<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"></path>
					</svg>
				</div>
				<div class="detail" :id="detailFlag?'enableDetail':'disableDetail'">
					<div>帅选方式...</div>
					<ul>
						<li @click="changeAnimeType('全部')">
							<svg width="16px" height="16px" v-show="selectedTypeName==='全部'" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
								<polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
							</svg>
							<span>全部</span>
						</li>
						<li @click="changeAnimeType('正在看')">
							<svg width="16px" height="16px" v-show="selectedTypeName==='正在看'" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
								<polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
							</svg>
							<span>正在看</span>
						</li>
						<li @click="changeAnimeType('已看')">
							<svg width="16px" height="16px" v-show="selectedTypeName==='已看'" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
								<polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
							</svg>
							<span>已看</span>
						</li>
						<li @click="changeAnimeType('未看')">
							<svg width="16px" height="16px" v-show="selectedTypeName==='未看'" viewBox="0 0 14 14" focusable="false" aria-hidden="true">
								<polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
							</svg>
							<span>未看</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- 统计动漫总数 -->
			<div class="total">
				<div v-show="selectedTypeName==='全部'">
					<span>已加入</span>
					<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
					<span>部动漫</span>
				</div>
				<div v-show="selectedTypeName==='正在看'">
					<span>正在观看</span>
					<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
					<span>部动漫</span>
				</div>
				<div v-show="selectedTypeName==='已看'">
					<span>已经看了</span>
					<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
					<span>部动漫</span>
				</div>
				<div v-show="selectedTypeName==='未看'">
					<span>还有</span>
					<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
					<span>部动漫未看</span>
				</div>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 动漫列表 -->
		<el-skeleton :loading="skeletonLoading" animated :throttle="500" :count="3">
				<div slot="template">
					<el-skeleton-item variant="image" />
					<el-skeleton-item variant="text" />
					<el-skeleton-item variant="text" />
				</div>
				<template>
					<div class="list">
						<div class="item" @click="goAnimeDetail(anime.collectId, anime.animeId)" v-for="(anime, index) in animeList" :key="index">
							<div class="img">
								<img v-lazy="anime.cover" alt="">
							</div>
							<div class="content">
								<el-tooltip effect="dark" :content="anime.title" placement="top" :visible-arrow="false" :open-delay="300">
									<div class="info">
										<div class="title">{{anime.title}}</div>
										<div class="date" v-show="selectedTypeName!=='已看'">与<span>{{anime.createDate}}</span>加入</div>
										<div class="date" v-show="selectedTypeName==='已看'">与<span>{{anime.finishedDate}}</span>看完</div>
									</div>
								</el-tooltip>
								<div class="control">
									<el-popover
											:visible-arrow="false"
											popper-class="popover"
											placement="top"
											width="200"
											:ref="'popover-' + index"
											trigger="click">
										<ul>
											<li @click="updateAnimeWatchStatus(index, anime.collectId, 'WATCHING')" v-show="anime.watchStatus !== 'WATCHING'">
												<svg style="margin-left: -4px;" width="23px" height="23px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
													<path d="M511.95904 260.90496c177.83296 0 335.872 107.43808 403.712 269.14304l3.456 8.27904-3.456 8.23296a437.93408 437.93408 0 0 1-403.712 269.01504 437.68832 437.68832 0 0 1-403.62496-269.01504l-3.46112-8.23296 3.41504-8.27904a437.632 437.632 0 0 1 403.62496-269.14304h0.04608z m0 42.67008a394.96192 394.96192 0 0 0-364.33408 242.98496l3.584-8.27904 1.408 3.2a394.99264 394.99264 0 0 0 346.67008 231.25504l12.62592 0.16896a395.24864 395.24864 0 0 0 364.37504-242.85696l-3.62496 8.192-1.36704-3.11296a395.15136 395.15136 0 0 0-346.752-231.34208l-12.63104-0.20992h0.04608z" />
													<path d="M512 426.66496a128 128 0 1 1 0 256.00512 128 128 0 0 1 0-256z m0 42.67008A85.33504 85.33504 0 1 0 512 640a85.33504 85.33504 0 0 0 0-170.66496z" />
												</svg>
												<div>标记为正在看</div>
											</li>
											<li @click="updateAnimeWatchStatus(index, anime.collectId, 'FINISHED')" v-show="anime.watchStatus !== 'FINISHED'">
												<svg width="18px" height="18px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
													<path d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"></path>
												</svg>
												<div>标记为已看</div>
											</li>
											<li @click="updateAnimeWatchStatus(index, anime.collectId, 'NO_WATCH')" v-show="anime.watchStatus !== 'NO_WATCH'">
												<svg width="16px" height="16px" stroke="black" stroke-width="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
													<path d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"></path>
												</svg>
												<div>标记为未看</div>
											</li>
											<li @click="toDustbin(index, anime.collectId)">
												<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
													<path d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path>
												</svg>
												<div>发送到垃圾箱</div>
											</li>
										</ul>
										<button slot="reference" @click.stop>
											<svg width="20px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
												<path d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"></path>
											</svg>
										</button>
									</el-popover>
								</div>
							</div>
						</div>
					</div>
				</template>
			</el-skeleton>
		<el-empty v-if="emptyFlag" :image-size="250" description="暂无动漫" />
		<!-- endregion -->

		<!-- region 滚动加载动画 -->
		<scroll-animation :loading="scrollLoading" />

		<!-- 结束标志 -->
		<end-hr content="我也是有底线的！" v-show="loadingAllAnimeFlag" />
	</div>
</template>

<script>
import {reqGetPageAnime, reqUpdateAnimeDeleted, reqUpdateAnimeWatchStatus} from "@/api";
import _ from "lodash";
import CountTo from "vue-count-to";
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";

export default {
	name: 'AnimeList',
	components: {CountTo, EndHr, ScrollAnimation},
	data() {
		return {
			//移动端选择的筛选类型名称
			selectedTypeName: '全部',

			//移动端筛选详细页面开启标志
			detailFlag: false,

			//骨架加载动画标志
			skeletonLoading: false,

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
		}
	},
	computed: {
		//动漫是否全部加载完成，true代表加载完所有动漫
		loadingAllAnimeFlag() {
			return this.current > 2;
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
			this.$store.commit('HOME_CONTENT_TYPE', 3);

			this.$router.push('/home/addAnime');
		},

		//点击动漫进入详情页面
		goAnimeDetail(collectId, animeId) {
			//跳转
			this.$router.push(`/animeDetail?collectId=${collectId}&animeId=${animeId}`);
		},

		/**
		 * 更新动漫观看状态
		 * @param index 当前动漫在数组中的索引
		 * @param collectId 记录id
		 * @param status 状态
		 */
		async updateAnimeWatchStatus(index, collectId, status) {
			//关闭编辑动漫弹窗
			this.$refs['popover-' + index][0].doClose();

			//更改服务器数据
			let result = await reqUpdateAnimeWatchStatus(collectId, status);
			if (result.code !== 200) {
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('标记失败！');
				}

				return ;
			}

			this.$message.success('标记成功！');
			//更新列表
			if (this.selectedTypeName !== '全部') {
				this.animeList.splice(index, 1);

				//更新动漫统计数量
				this.total--;
			} else {
				this.animeList[index].watchStatus = status;
			}
		},

		/**
		 * 将动漫移入垃圾箱
		 * @param index 当前动漫在数组中的索引
		 * @param collectId 记录id
		 * @returns {Promise<void>}
		 */
		async toDustbin(index, collectId) {
			//关闭编辑动漫弹窗
			this.$refs['popover-' + index][0].doClose();

			let result = await reqUpdateAnimeDeleted(collectId, true);
			if (result.code !== 200) {
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('移入失败！');
				}

				return ;
			}

			this.$message.success('移入成功！');
			//更新animeList
			this.animeList.splice(index, 1);

			//更新动漫总数
			this.total--;
		},

		//获取对应分类的第一页数据
		async getFirstPageAnime() {
			//开启加载动画
			this.skeletonLoading = true;

			this.current = 1;

			//根据selectFlag决定参数
			let params = {
				current: this.current,
				size: this.size,
				keyword: this.keyword
			};
			if (this.selectedTypeName === '已看') {
				params.status = 'FINISHED';
			} else if (this.selectedTypeName === '未看') {
				params.status = 'NO_WATCH';
			} else if (this.selectedTypeName === '正在看') {
				params.status = 'WATCHING';
			}

			//获取数据
			let result = await reqGetPageAnime(params);
			if (result.code !== 200) {
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('数据获取失败！');
				}

				//关闭加载动画
				this.skeletonLoading = false;

				return ;
			}

			this.animeList = result.data.records || [];
			this.current++;

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;

			//数据为空表示下一页无数据
			this.hasNext = result.data.current < result.data.pages;

			//获取动漫总数
			this.total = result.data.total;

			//关闭加载动画
			this.skeletonLoading = false;
		},

		//分页获取动漫数据
		async getPageAnime() {
			//开启加载动画
			this.scrollLoading = true;

			//根据selectFlag决定参数
			let params = {
				current: this.current,
				size: this.size,
				keyword: this.keyword
			};
			if (this.selectedTypeName === '已看') {
				params.status = 'FINISHED';
			} else if (this.selectedTypeName === '未看') {
				params.status = 'NO_WATCH';
			} else if (this.selectedTypeName === '正在看') {
				params.status = 'WATCHING';
			}

			//获取数据
			let result = await reqGetPageAnime(params);
			if (result.code !== 200) {
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error('数据获取失败！');
				}

				//关闭加载动画
				this.scrollLoading = false;

				return ;
			}

			this.animeList = this.animeList.concat(result.data.records || []);
			this.current++;
			this.hasNext = result.data.current < result.data.pages;

			//关闭加载动画
			this.scrollLoading = false;
		},

		//点击动漫分类按钮
		changeAnimeType(type) {
			if (this.selectedTypeName === type) {
				return;
			}

			//修改内容标志
			this.selectedTypeName = type;

			//关闭移动端选择页面
			this.detailFlag = false;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
		},

		lazyLoading() {
			let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageAnime();
			}
		},

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
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
@font-face {
	font-family: 'numberfont';
	font-display: swap;
	src: url("@/font/number/webfont.ttf");
}

.animeList {
	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;

		svg {
			fill: #3c3838;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
			color: #3c3838;
		}
	}

	/* 添加按钮与搜索框 */
	> .control {
		display: flex;
		margin-top: 1.5rem;

		@media screen and (max-width: 768px) {
			display: block;
		}

		.addBtn {
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

			svg {
				display: block;
				vertical-align: middle;
				fill: #f7f3f2;
			}

			div {
				display: block;
				vertical-align: middle;
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

			svg {
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 14px;
				left: 14px;
				fill: #cac5c4;
			}

			input {
				width: 50%;
				min-width: 250px;
				height: 44px;
				box-sizing: border-box;
				display: inline-block;
				vertical-align: middle;
				outline: transparent solid 2px;
				outline-offset: 2px;
				border: 1px solid #DCDFE6;
				border-radius: 5px;
				transition: all 0.2s;
				padding-left: 45px;

				&:hover {
					border-color: #C0C4CC;
				}

				&:focus {
					border-color: rgb(49, 130, 206);
					box-shadow: rgb(49, 130, 206) 0 0 0 1px;
					background-color: #FFFFFF;
				}

				@media screen and (max-width: 768px) {
					width: 100%;
				}
			}
		}
	}

	/* 列表分类 */
	.type {
		height: 38px;
		margin-top: 1.3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* pc */
		.pc {
			display: flex;

			@media screen and (max-width: 768px) {
				display: none;
			}

			.btn {
				display: flex;
				padding: 8px 15px;
				border-radius: 6px;
				align-items: center;
				justify-content: center;
				color: #726e6e;
				cursor: pointer;
				margin-left: 1.2rem;
				transition: all 0.3s;

				&:nth-child(1) {
					margin-left: 0;
				}

				&:hover {
					background-color: #eae7ff;
				}

				svg {
					fill: #726e6e;
					stroke: #726e6e;
					transition: fill .3s;
				}

				div {
					margin-left: 5px;
					min-width: 38px;
				}
			}

			.typePcBtnActive {
				background-color: #eae7ff !important;
				color: #2B0AFF !important;

				svg {
					fill: #2B0AFF;
					stroke: #2B0AFF;
				}
			}
		}

		/* 移动端 */
		.mobile {
			height: 100%;
			display: none;
			position: relative;

			@media screen and (max-width: 768px) {
				display: block;
			}

			.btn {
				height: 100%;
				display: flex;
				font-size: 1.2rem;
				align-items: center;
				border-radius: 5px;
				cursor: pointer;

				svg {
					fill: rgb(86, 81, 81);
				}

				span {
					margin: 0 10px;
				}
			}

			#disableDetail {
				opacity: 0;
				visibility: hidden;
				transform: scale(0.8) translateZ(0px);
			}

			#enableDetail {
				opacity: 1;
				visibility: visible;
				transform: none;
			}

			.detail {
				transform-origin: top left;
				box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
				transition: all 0.2s;
				position: absolute;
				top: 30px;
				left: 0;
				box-sizing: border-box;
				padding: 20px 10px;
				border-radius: 10px;
				background-color: white;
				z-index: 100;

				> div {
					color: #8f8b8b;
					font-size: 1.2rem;
					text-align: center;
				}

				> ul {
					font-size: 1.3rem;

					li {
						width: 200px;
						border-radius: 10px;
						border: 1px solid transparent;
						cursor: pointer;
						position: relative;

						&:hover {
							background-color: #e5e0df;
							border: 1px solid #e5e0df;
						}

						span {
							line-height: 40px;
							margin-left: 50px;
						}

						svg {
							position: absolute;
							top: 50%;
							left: 25px;
							transform: translateY(-50%);
						}
					}
				}
			}
		}

		/* 统计 */
		.total .number-font {
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
	.list {
		margin-top: 1.5rem;
		display: grid;
		grid-gap: 20px;

		@media screen and (max-width: 600px) {
			grid-template-columns: repeat(1, 1fr);
		}

		@media screen and (min-width: 600px) and (max-width: 1000px) {
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
			border-radius: 5px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
			overflow: hidden;
			transition: all $transitionTime;
			cursor: pointer;

			/* 鼠标移入item给item添加阴影 */
			&:hover {
				box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);

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

				/* 鼠标移入图片放大图片 */
				&:hover {
					img {
						transform: scale(1.1);
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

					.title {
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
							fill: #ada8a8;
						}
					}
				}
			}
		}
	}
}
</style>

<style lang="scss">
/* 弹出框样式 */
@import '@/style/element';
@include anime-control-popover-style;
@include tooltip-style;
</style>