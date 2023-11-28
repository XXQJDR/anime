<template>
	<div class="animeList">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true"><path fill="#3c3838" d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path></svg>
			<div>动漫列表</div>
		</div>
		<!--endregion-->

		<!-- region 添加按钮与搜索框 -->
		<div class="control">
			<div class="addBtn" @click="goAddAnime">
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#f7f3f2" d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path></svg>
				<div>添加</div>
			</div>
			<div class="search">
				<form @submit.prevent="searchAnime">
					<svg viewBox="0 0 24 24" focusable="false"><path fill="#cac5c4" d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path></svg>
					<input type="text" placeholder="请输入动漫关键词" v-model="keyword">
				</form>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 列表分类 -->
		<div class="type">
			<!-- pc端 -->
			<div class="pc">
				<div class="btn" @click="changeAnimeType(1)" :class="{typePcBtnActive:selectFlag===1}">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true"><path :fill="selectFlag===1?'#2B0AFF':'#726e6e'" d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path></svg>
					<div>全部</div>
				</div>
				<div class="btn" @click="changeAnimeType(2)" :class="{typePcBtnActive:selectFlag===2}">
					<svg viewBox="0 0 1024 1024" :stroke="selectFlag===2?'#2B0AFF':'#726e6e'" stroke-width="20" xmlns="http://www.w3.org/2000/svg"><path :fill="selectFlag===2?'#2B0AFF':'#726e6e'" d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"  /></svg>
					<div>已看</div>
				</div>
				<div class="btn" @click="changeAnimeType(3)" :class="{typePcBtnActive:selectFlag===3}">
					<svg viewBox="0 0 1024 1024" :stroke="selectFlag===3?'#2B0AFF':'#726e6e'" stroke-width="20" xmlns="http://www.w3.org/2000/svg"><path :fill="selectFlag===3?'#2B0AFF':'#726e6e'" d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z" /></svg>
					<div>未看</div>
				</div>
			</div>

			<!-- 移动端 -->
			<div class="mobile">
				<div class="btn">
					<div class="box" @click="detailFlag = !detailFlag">
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="filter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgb(86, 81, 81)" d="M0 73.7C0 50.7 18.7 32 41.7 32H470.3c23 0 41.7 18.7 41.7 41.7c0 9.6-3.3 18.9-9.4 26.3L336 304.5V447.7c0 17.8-14.5 32.3-32.3 32.3c-7.3 0-14.4-2.5-20.1-7l-92.5-73.4c-9.6-7.6-15.1-19.1-15.1-31.3V304.5L9.4 100C3.3 92.6 0 83.3 0 73.7zM55 80L218.6 280.8c3.5 4.3 5.4 9.6 5.4 15.2v68.4l64 50.8V296c0-5.5 1.9-10.9 5.4-15.2L457 80H55z"></path></svg>
						<span>{{selectedTypeName}}</span>
						<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgb(86, 81, 81)" d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"></path></svg>
					</div>
					<div class="placeholder"></div>
				</div>
				<div class="detail" :id="detailFlag?'enableDetail':'disableDetail'">
					<div>帅选方式...</div>
					<ul class="type">
						<li @click="changeAnimeType(1)">
							<svg v-show="selectFlag===1" viewBox="0 0 14 14" height="16px" width="16px" focusable="false" aria-hidden="true"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg>
							<span>全部</span>
						</li>
						<li @click="changeAnimeType(2)">
							<svg v-show="selectFlag===2" viewBox="0 0 14 14" height="16px" width="16px" focusable="false" aria-hidden="true"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg>
							<span>已看</span>
						</li>
						<li @click="changeAnimeType(3)">
							<svg v-show="selectFlag===3" viewBox="0 0 14 14" height="16px" width="16px" focusable="false" aria-hidden="true"><polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon></svg>
							<span>未看</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 动漫列表 -->
		<el-skeleton :loading="loading" animated :throttle="500" :count="3">
				<div slot="template">
					<el-skeleton-item variant="image" />
					<el-skeleton-item variant="text" />
					<el-skeleton-item variant="text" />
				</div>
				<template>
					<div class="list" @click="goAnimeDetail">
						<div class="item" v-for="(anime, index) in animeList" :key="index">
							<div class="img">
								<img :src="anime.cover" alt="">
							</div>
							<div class="content">
								<div class="info">
									<div class="title">{{anime.title}}</div>
									<div class="date" v-show="selectFlag!==2">与<span>{{anime.createDate}}</span>加入</div>
									<div class="date" v-show="selectFlag===2">与<span>{{anime.finishedWatchingDate}}</span>看完</div>
								</div>
								<div class="control">
									<el-popover
											:visible-arrow="false"
											popper-class="popover"
											placement="top"
											width="200"
											:ref="'popover-' + index"
											trigger="click">
										<ul>
											<li @click="updateAnimeWatchingStatus(index, anime.collectId, true)" v-show="!anime.watchingStatus">
												<svg width="18px" height="18px" viewBox="0 0 1024 1024" stroke="black" stroke-width="20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"  /></svg>
												<div>标记为已看</div>
											</li>
											<li @click="updateAnimeWatchingStatus(index, anime.collectId, false)" v-show="anime.watchingStatus">
												<svg width="18px" height="18px" viewBox="0 0 1024 1024" stroke="black" stroke-width="20" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z" /></svg>
												<div>标记为未看</div>
											</li>
											<li @click="toDustbin(index, anime.collectId)">
												<svg width="18px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path></svg>
												<div>发送到垃圾箱</div>
											</li>
										</ul>
										<button slot="reference" @click.stop>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"></path></svg>
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
	</div>
</template>

<script>
import {reqGetPageAnime, reqSearchAnime, reqUpdateAnimeWacthingStatus, reqLogicalDeletion} from "@/api";
import _ from "lodash";

export default {
	name: 'AnimeList',
	data() {
		return {
			//移动端筛选详细页面开启标志
			detailFlag: false,

			//筛选方式标志，默认为全部
			selectFlag: 1,

			//加载动画标志，true显示加载动画
			loading: false,

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
			hasHext: true
		}
	},
	computed: {
		//移动端选择的筛选类型名称
		selectedTypeName() {
			let name;
			switch (this.selectFlag) {
				case 1:
					name = '全部';
					break;
				case 2:
					name = '已看';
					break;
				case 3:
					name = '未看';
					break;
			}

			return name;
		}
	},
	methods: {
		//添加按钮回调
		goAddAnime() {
			//将内容改为添加
			this.$store.commit('HOME_CONTENT_TYPE', 3);

			this.$router.push('/home/addAnime');
		},

		//点击动漫进入详情页面
		goAnimeDetail(e) {
			//判断点击元素的父元素是否是'.item'
			if (e.target.closest('.item') != null) {
				this.$router.push('/animeDetail');
			}
		},

		/**
		 * 更新动漫观看状态
		 * @param index 当前动漫在数组中的索引
		 * @param collectId 记录id
		 * @param status 状态
		 * @returns {Promise<void>}
		 */
		async updateAnimeWatchingStatus(index, collectId, status) {
			//关闭编辑动漫弹窗
			this.$refs['popover-' + index][0].doClose();

			//更改服务器数据
			let result = await reqUpdateAnimeWacthingStatus(collectId, status);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '标记成功！' : '标记失败！'
			});

			//更新列表
			if (this.selectFlag !== 1) {
				this.animeList.splice(index, 1);
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

			let result = await reqLogicalDeletion(collectId);
			this.$message({
				type: result.code === 200 ? 'success' : 'error',
				message: result.code === 200 ? '移入成功！' : '移入失败！'
			});

			//更新animeList
			this.animeList.splice(index, 1);
		},

		//获取对应分类的第一页数据
		async getFirstPageAnime() {
			//开启加载动画
			this.loading = true;

			//根据selectFlag决定参数
			let params = {
				current: 1,
				size: this.size
			};
			if (this.selectFlag === 2) {
				params.status = 1;
			} else if (this.selectFlag === 3) {
				params.status = 0;
			}

			//获取数据
			let result = await reqGetPageAnime(params);
			this.animeList = result.data || [];

			this.current++;

			//关闭加载动画
			this.loading = false;

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;

			//数据为空表示下一页无数据
			this.hasHext = (result.data || []).length !== 0;
		},

		//获取指定页动漫数据
		async getPageAnime() {
			//根据selectFlag决定参数
			let params = {
				current: this.current,
				size: this.size
			};
			if (this.selectFlag === 2) {
				params.status = 1;
			} else if (this.selectFlag === 3) {
				params.status = 0;
			}

			//获取数据
			let result = await reqGetPageAnime(params);
			this.animeList = this.animeList.concat(result.data || []);

			//数据为空表示下一页无数据
			this.hasHext = (result.data || []).length !== 0;
		},

		//搜索动漫
		searchAnime: _.throttle(async function () {
			if (this.keyword.length === 0) {
				return;
			}

			//开启加载动画
			this.loading = true;

			//获取数据
			let result = await reqSearchAnime(this.keyword, this.selectFlag);
			if (result.code !== 200) {
				this.$message.error(result.msg);
			}
			this.animeList = result.data || [];

			//关闭加载动画
			this.loading = false;

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;
		}, 1000),

		//点击动漫分类按钮
		changeAnimeType: _.throttle(function (type) {
			if (this.selectFlag === type) {
				return;
			}

			this.selectFlag = type;

			//关闭移动端选择页面
			this.detailFlag = false;

			//更改当前页为第一页
			this.current = 1;

			//获取对应分类第一页动漫数据
			this.getFirstPageAnime();
		}, 500),
	},
	created() {
		//获取全部分类中第一页数据
		this.getFirstPageAnime();
	},
	mounted() {
		window.onscroll = () => {
			let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasHext) {
				this.hasHext = false;
				this.getPageAnime();
				this.current++;
			}
		}
	}
}
</script>

<style scoped>
/* region 模块分类名称 */
.animeList .typeTitle {
	min-width: 110px;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
}

.animeList .typeTitle svg {
	width: 18px;
	height: 18px;
}

.animeList .typeTitle div {
	min-width: 76px;
	margin-left: 15px;
	font-weight: bold;
}
/* endregion */

/* region 添加按钮与搜索框 */
.animeList > .control {
	display: flex;
	margin-top: 1.5rem;
}

.animeList > .control .addBtn {
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
}

.animeList > .control .addBtn:hover {
	background-size: 200%;
}

.animeList > .control .addBtn svg {
	display: block;
	vertical-align: middle;
	width: 18px;
	height: 18px;
}

.animeList > .control .addBtn div {
	display: block;
	vertical-align: middle;
	margin-left: 10px;
	font-weight: bold;
	color: white;
}

.animeList > .control .search {
	width: 100%;
	margin-left: 1rem;
	position: relative;
}

.animeList > .control .search svg {
	display: inline-block;
	vertical-align: middle;
	width: 18px;
	height: 18px;
	position: absolute;
	top: 14px;
	left: 14px;
}

.animeList > .control .search input {
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
}

.animeList > .control .search input:hover {
	border-color: #C0C4CC;
}

.animeList > .control .search input:focus {
	border-color: rgb(49, 130, 206);
	box-shadow: rgb(49, 130, 206) 0 0 0 1px;
	background-color: #FFFFFF;
}
/* endregion */

/* region 列表分类 */
.type {
	margin-top: 1.3rem;
}

/* pc端 */
.animeList .type .pc {
	display: flex;
}

.animeList .type .pc .btn {
	display: flex;
	padding: 8px 15px;
	border-radius: 6px;
	align-items: center;
	justify-content: center;
	color: #726e6e;
	cursor: pointer;
	margin-left: 1.2rem;
	transition: all 0.3s;
}

.animeList .type .pc .btn:nth-child(1) {
	margin-left: 0;
}

.animeList .type .pc .btn:hover {
	background-color: #eae7ff;
}

.animeList .type .pc .btn svg {
	width: 18px;
	height: 18px;
}

.animeList .type .pc .btn div {
	margin-left: 5px;
	min-width: 38px;
}

.typePcBtnActive {
	background-color: #eae7ff !important;
	color: #2B0AFF !important;
}

/* 移动端 */
.animeList .type .mobile {
	display: none;
	position: relative;
}

.animeList .type .mobile .btn {
	display: flex;
	font-size: 1.2rem;
}

.animeList .type .mobile .btn .box {
	width: 150px;
	height: 35px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	border-radius: 5px;
	cursor: pointer;
}

.animeList .type .mobile .btn .placeholder {
	width: 100%;
}

.animeList .type .mobile .btn .box svg {
	width: 18px;
	height: 18px;
}

.animeList .type .mobile .detail {
	width: 250px;
	height: 200px;
	transform-origin: top left;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
	transition: all 0.2s;
	position: absolute;
	top: 30px;
	left: 0;
	box-sizing: border-box;
	padding: 25px;
	border-radius: 10px;
	background-color: white;
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

.animeList .type .mobile .detail > div {
	color: #8f8b8b;
	font-size: 1.2rem;
}

.animeList .type .mobile .detail > ul {
	text-align: center;
	font-size: 1.3rem;
}

.animeList .type .mobile .detail > ul li {
	padding: 10px 0;
	border-radius: 10px;
	border: 1px solid transparent;
	position: relative;
	cursor: pointer;
}

.animeList .type .mobile .detail > ul li:hover {
	background-color: #e5e0df;
	border: 1px solid #e5e0df;
}

.animeList .type .mobile .detail > ul li svg {
	position: absolute;
	top: 50%;
	left: 50px;
	transform: translateY(-50%);
}
/* endregion */

/* region 动漫列表 */
.animeList .list {
	margin-top: 1.5rem;
	display: grid;
	grid-gap: 20px;
}

.animeList .list .item {
	/* item过渡时间 */
	--transitionTime: 0.3s;

	/*宽度与高度的比例*/
	aspect-ratio: 0.8;
	border-radius: 5px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
	overflow: hidden;
	transition: all var(--transitionTime);
	cursor: pointer;
}

/* 鼠标移入item给item添加阴影 */
.animeList .list .item:hover {
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);
	transform: translateY(-1px);
}

/* 鼠标移入item给content添加背景 */
.animeList .list .item:hover .content {
	background-color: #f7f3f2;
}

/* 鼠标移入item放大img */
.animeList .list .item:hover .img img {
	transform: scale(1.1);
}

.animeList .list .item .img {
	height: 82%;
	overflow: hidden;
}

/* 图片自适应父盒子 */
.animeList .list .item .img img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform var(--transitionTime);
}

.animeList .list .item .content {
	height: 18%;
	background-color: #FFFFFF;
	transition: background-color var(--transitionTime);
}

.animeList .list .item .content::after {
	content: '';
	display: block;
	clear: both;
}

.animeList .list .item .content .info {
	width: 85%;
	height: 100%;
	float: left;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	text-align: center;
}

.animeList .list .item .content .info .title {
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-left: 5px;
	box-sizing: border-box;
}

.animeList .list .item .content .info .date {
	width: 100%;
	font-size: 0.8rem;
	color: #ada8a8;
}

.animeList .list .item .content .control {
	width: 15%;
	height: 100%;
	float: right;
	position: relative;
}

.animeList .list .item .content .control button {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	transition: color, background-color .3s;

	/* svg颜色 */
	color: #ada8a8;
}

/* 移入文字傍的按钮改变按钮背景色和svg颜色 */
.animeList .list .item .content .control button:hover {
	background-color: #e5e0df;
	color: #3c3838;
}

.animeList .list .item .content .control button svg {
	width: 20px;
	height: 18px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}

.popover ul li:last-child {
	color: red;
}

.popover ul li > svg {
	margin-left: 10px;
}

.popover ul li > div {
	margin-left: 10px;
}
/* endregion */

/*移动端*/
@media screen and (max-width: 700px) {
	.animeList .control {
		display: block;
	}

	.animeList .control .addBtn {
		width: 100%;
		height: 45px;
	}

	.animeList .control .search {
		width: 100%;
		margin-left: 0;
		margin-top: 1rem;
	}

	.animeList .control .search input {
		width: 100%;
	}

	.animeList .type .pc {
		display: none;
	}

	.animeList .type .mobile {
		display: block;
	}

	.animeList .list {
		grid-template-columns: repeat(1, 1fr);
	}

	.animeList .list .item {
		aspect-ratio: 1;
	}

	.animeList .list .item .content .info {
		width: 80%;
	}

	.animeList .list .item .content .control {
		width: 20%;
	}

	.animeList .list .item .content .control button {
		width: 35px;
		height: 35px;
	}
}
@media screen and (min-width: 700px) and (max-width: 1078px) {
	.animeList .list {
		grid-template-columns: repeat(2, 1fr);
	}
}
@media screen and (min-width: 1078px) and (max-width: 1355px) {
	.animeList .list {
		grid-template-columns: repeat(3, 1fr);
	}
}
@media screen and (min-width: 1355px) and (max-width: 1668px) {
	.animeList .list {
		grid-template-columns: repeat(4, 1fr);
	}
}
@media screen and (min-width: 1668px) {
	.animeList .list {
		grid-template-columns: repeat(5, 1fr);
	}
}
</style>

<style>
.el-skeleton {
	margin-top: 1.5rem;
}

.el-empty .el-empty__description p {
	font-size: 1.5rem;
}

/*移动端*/
@media screen and (max-width: 700px) {
	.el-skeleton > div {
		margin-top: 1rem;
		width: 100%;
	}

	.el-skeleton > div .el-skeleton__image {
		width: 100%;
		height: 260px;
	}
}

@media screen and (min-width: 750px) {
	.el-skeleton {
		display: flex;
	}

	.el-skeleton > div {
		margin-left: 1rem;
		width: 280px;
	}

	.el-skeleton > div .el-skeleton__image {
		width: 100%;
		height: 260px;
	}
}
</style>