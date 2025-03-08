<template>
	<div class="viewingHistory">
		<!--region 模块分类名称-->
		<div class="typeTitle">
			<svg t="1741333367589" viewBox="0 0 1080 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17228">
				<path d="M523.637 512 523.637 197.904c0-19.589-15.629-34.995-34.91-34.995-19.414 0-34.908 15.668-34.908 34.995l0 348.919c0 19.589 15.629 34.995 34.908 34.995 1.956 0 3.871-0.159 5.735-0.465 1.854 0.306 3.757 0.465 5.698 0.465l233.134 0c19.285 0 34.705-15.63 34.705-34.909C768 527.495 752.461 512 733.295 512L523.637 512zM512 1024C229.23 1024 0 794.77 0 512S229.23 0 512 0c282.769 0 512 229.23 512 512S794.77 1024 512 1024zM512 954.182c244.21 0 442.181-197.972 442.181-442.182 0-244.21-197.971-442.182-442.181-442.182S69.818 267.79 69.818 512C69.818 756.21 267.79 954.182 512 954.182z" p-id="17229"></path>
			</svg>
			<div>观看历程</div>
		</div>
		<!--endregion-->

		<!-- 动漫统计 -->
		<div class="chart" ref="chart"></div>

		<div class="timeLineBox">
			<div class="timeline" v-show="!emptyFlag">
				<div class="item" v-for="anime in animeList" :key="anime.animeUserId">
					<div class="content">
						<div class="anime" @click="goAnimeDetail(anime.animeUserId)">
							<div class="time">{{anime.finishedDate}}</div>
							<img class="cover" :src="anime.cover" :alt="anime.name">
							<div class="name">{{anime.name}}</div>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-if="emptyFlag" description="暂无历程，快去观看吧！" />

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="loading" />

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr" />
		</div>
	</div>
</template>

<script>
import {reqGetPageAnime, reqGetWatchStatistics} from '@/api';
import EndHr from "@/components/endHr.vue";
import ScrollAnimation from "@/components/scrollAnimation.vue";
import echarts from "@/echarts";

export default {
	name: 'ViewingHistory',
	components: {EndHr, ScrollAnimation},
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

			//加载动画标志
			loading: false,

			//echarts实例
			chart: null,

			//饼图数据
			chartData: []
		}
	},
	computed: {
		//是否显示结束分割线
		showEndHr() {
			return this.current > 2;
		},
	},
	methods: {
		//分页获取动漫信息
		async getPageAnime() {
			try {
				//开启加载动画
				this.loading = true;

				//获取数据
				let result = await reqGetPageAnime(++this.current, this.size, null, 'FINISHED', 'JOIN_DESC');
				if (result.code !== 200) {
					this.$message.error('获取数据失败！');
					return ;
				}

				this.animeList = this.animeList.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
				if (this.current===1) {
					this.emptyFlag = this.animeList.length===0;
				}
			} finally {
				//关闭加载动画
				this.loading = false;
			}
		},

		//滚动分页
		lazyLoading() {
			let scrollHeight= document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
			let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
			let wheight= document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度

			let bottomOfWindow = scrollHeight - wheight - nowScotop;

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
			let result = await reqGetPageAnime(this.current, this.size, null, 'FINISHED', 'JOIN_DESC');
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				return;
			}
			this.animeList = this.animeList.concat(result.data.records || []);
			this.hasNext = result.data.current < result.data.pages;
			if (this.current === 1) {
				this.emptyFlag = this.animeList.length === 0;
			}
		},

		//进入动漫详情
		goAnimeDetail(animeUserId) {
			this.$router.push(`/animeDetail?animeUserId=${animeUserId}`);
		},

		//饼图响应式
		chartHandleResize() {
			this.chart.resize();
		},

		//初始化统计饼图
		async initChart() {
			//获取统计数据
			let result = await reqGetWatchStatistics();

			if (result.code !== 200) {
				this.$message.error('获取统计数据失败！');
				return;
			}

			let chartData = [];
			chartData.push({name: '正在观看', value: result.data.watchingCount});
			chartData.push({name: '已观看', value: result.data.finishedCount});
			chartData.push({name: '未观看', value: result.data.noWatchCount});

			//过滤掉值为0的项
			chartData = chartData.filter(item => item.value !== 0);
			let option = {
				tooltip: {
					trigger: 'item'
				},
				series: [
					{
						type: 'pie',
						radius: ['40%', '70%'],
						padAngle: 5,
						itemStyle: {
							borderRadius: 10
						},
						emphasis: {
							label: {
								show: true,
								fontSize: 30,
								fontWeight: 'bold'
							}
						},
						data: chartData,
						minAngle: 5
					}
				]
			}
			this.chart = echarts.init(this.$refs.chart);
			this.chart.setOption(option);

			//监听窗口大小变化，重新渲染饼图
			window.addEventListener('resize', this.chartHandleResize);
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

		//初始化饼图
		this.initChart();
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.lazyLoading);
		window.removeEventListener('resize', this.chartHandleResize);

		//销毁echarts实例
		if (this.chart) {
			this.chart.dispose();
		}
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
	min-height: calc(100vh - 2.3rem);
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 768px) {
		//减去顶部导航栏高度
		min-height: calc(100vh - 6px - 60px);
	}

	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		margin-left: 1rem;

		@media screen and (max-width: 768px) {
			margin-left: 6px;
		}

		svg {
			width: 22px;
			height: 22px;
			fill: #000000;
			stroke: #000000;
			stroke-width: 20px;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}

	/* 动漫统计 */
	.chart {
		height: 250px;
		margin-top: 1rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		box-sizing: border-box;
	}

	.timeLineBox {
		flex: 1;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		position: relative;
		box-sizing: border-box;
		padding: 0 15px;
		margin-top: .6rem;

		@media screen and (max-width: 768px) {
			padding: 0 10px;
		}

		.timeline {
			$content-offset: 18px; // 桌面端内容块与时间轴的距离
			$marker-offset: 12px; // 时间节点指示器与时间轴的距离

			position: relative;
			margin: 0 auto;

			&::before {
				content: '';
				position: absolute;
				left: 50%;
				top: 0;
				height: 100%;
				width: 2px;
				background: #e0e0e0;
				transform: translateX(-50%);

				@media screen and (max-width: 768px) {
					left: 0;
				}
			}

			.item {
				position: relative;
				margin: 2rem 0;
				display: flex;
				justify-content: flex-start;

				@media screen and (max-width: 768px) {
					justify-content: flex-start;
				}

				&:first-child {
					margin-top: 1rem;
				}

				&:last-child {
					margin-bottom: 1rem;
				}

				&:nth-child(even) {
					justify-content: flex-end;

					@media screen and (max-width: 768px) {
						justify-content: flex-start;
					}
				}

				.content {
					position: relative;
					width: calc(50% - $content-offset);

					@media screen and (max-width: 768px) {
						width: 100%
					}

					&::before {
						content: '';
						position: absolute;
						top: 20px;
						right: -$marker-offset;
						width: 20px;
						height: 20px;
						background: #fff;
						border: 3px solid #4a90e2;
						border-radius: 50%;
						z-index: 1;

						@media screen and (max-width: 768px) {
							left: -$marker-offset;
							right: auto;
						}
					}

					.anime {
						background: #FFFFFF;
						padding: 1.5rem;
						border-radius: 8px;
						box-shadow: 0 2px 8px rgba(0,0,0,0.1);
						transition: transform 0.3s ease;
						box-sizing: border-box;
						text-align: center;
						cursor: pointer;

						&:hover {
							transform: translateY(-10px);
						}

						@media screen and (max-width: 768px) {
							margin-left: $content-offset;
						}

						.time {
							color: #666;
							font-size: 1.5rem;
							margin-bottom: 0.5rem;
						}

						.cover {
							width: 170px;
							height: 236px;
							border-radius: 5px;
							overflow: hidden;
							margin-bottom: 1rem;
						}

						.name {
							color: #333;
							font-size: 1.1rem;
							font-weight: 600;
						}
					}
				}

				&:nth-child(even) .content::before {
					right: auto;
					left: -$marker-offset;

					@media screen and (max-width: 768px) {
						left: -$marker-offset;
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
/* endregion */
</style>