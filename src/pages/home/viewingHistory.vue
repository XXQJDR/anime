<template>
	<div class="viewingHistory">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg width="22px" height="22px" viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<path d="M526.628571 117.028571c216.502857 0 394.971429 178.468571 394.971429 394.971429S743.131429 906.971429 526.628571 906.971429s-394.971429-178.468571-394.971428-394.971429 178.468571-394.971429 394.971428-394.971429z m0-87.771428c-266.24 0-482.742857 213.577143-482.742857 482.742857 0 266.24 213.577143 482.742857 482.742857 482.742857 266.24 0 482.742857-213.577143 482.742858-482.742857S792.868571 29.257143 526.628571 29.257143z" /><path fill="#3c3838" d="M678.765714 760.685714c-11.702857 0-23.405714-2.925714-32.182857-14.628571l-152.137143-175.542857c-5.851429-5.851429-11.702857-17.554286-11.702857-29.257143V321.828571c0-23.405714 20.48-43.885714 43.885714-43.885714s43.885714 20.48 43.885715 43.885714v201.874286l143.36 160.914286c14.628571 17.554286 11.702857 46.811429-2.925715 61.44-11.702857 11.702857-20.48 14.628571-32.182857 14.628571z"></path>
			</svg>
			<div>观看历程</div>
		</div>
		<!--endregion-->

		<!-- 动漫统计 -->
		<div class="total">
			<span>已经看了</span>
			<CountTo ref="refcountofore" :start-val="0" :end-val="total" class="number-font" :duration="2000" />
			<span>部动漫</span>
		</div>

		<TimeLine v-show="!emptyFlag" :animeList="animeList" />

		<!-- 空标志 -->
		<el-empty v-if="emptyFlag" :image-size="250" description="暂无历程，快去观看吧！" />

		<!-- 滚动加载动画 -->
		<scroll-animation :loading="loading" />

		<!-- 结束标志 -->
		<end-hr content="我也是有底线的！" v-show="loadingAllAnimeFlag" />
	</div>
</template>

<script>
import TimeLine from "@/components/timeLine.vue";
import {reqGetPageAnime} from '@/api';
import CountTo from "vue-count-to";
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";

export default {
	name: 'ViewingHistory',
	components: {EndHr, CountTo, TimeLine, ScrollAnimation},
	data() {
		return {
			//动漫列表
			animeList: [],

			//当前页
			current: 1,

			//每页数量
			size: 10,

			//空状态标志
			emptyFlag: false,

			//是否还有下一页数据
			hasNext: true,

			//动漫总数
			total: 0,

			//加载动画标志
			loading: false,
		}
	},
	computed: {
		//动漫是否全部加载完成，true代表加载完所有动漫
		loadingAllAnimeFlag() {
			return this.current > 2;
		}
	},
	methods: {
		//分页获取东看
		async getPageAnime() {
			try {
				//开启加载动画
				this.loading = true;

				//获取数据
				let params = {
					current: this.current,
					size: this.size,
					status: 'FINISHED'
				}
				let result = await reqGetPageAnime(params);
				if (result.code !== 200) {
					this.$message.error('获取数据失败！');
					return ;
				}

				this.animeList = this.animeList.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
				if (this.current===1) {
					this.emptyFlag = this.animeList.length===0;
				}

				this.current++;
			} finally {
				//关闭加载动画
				this.loading = false;
			}
		},

		//滚动分页
		lazyLoading() {
			let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;

			//当距离底部的距离小于300px时，请求服务器数据
			if (bottomOfWindow < 300 && this.hasNext) {
				this.hasNext = false;
				this.getPageAnime();
			}
		},

		//获取第一页数据
		async getFirstPageAnime() {
			this.current = 1;

			//获取数据
			let params = {
				current: this.current,
				size: this.size,
				status: 'FINISHED'
			}
			let result = await reqGetPageAnime(params);
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				return;
			}
			this.animeList = this.animeList.concat(result.data.records || []);
			this.hasNext = result.data.current < result.data.pages;
			if (this.current === 1) {
				this.emptyFlag = this.animeList.length === 0;
			}
			this.current++;
			this.total = result.data.total;
		}
	},
	created() {
		//获取第一页数据
		this.getFirstPageAnime();
	},
	mounted() {
		//设置500延时，防止切换到该页面时滚动页面触发滚动事件导致重复获取数据
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
	src: url("@/assets/fonts/number/webfont.ttf");
}

.viewingHistory {
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

	/* 动漫统计 */
	.total {
		text-align: center;
		margin: 1rem 0;
		font-size: 1.5rem;

		.number-font {
			font-family: "numberfont" !important;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
			background-clip: text;
			color: transparent;
			font-size: 2rem;
		}
	}
}
/* endregion */
</style>