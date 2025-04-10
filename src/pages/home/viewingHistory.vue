<template>
	<div class="viewing-history">
		<!-- 动漫统计 -->
		<div class="chart" ref="chart"></div>

		<div class="time-line-box" v-loading="dataLoading">
			<div class="timeline" v-show="!emptyFlag">
				<div class="item" v-for="anime in animeList" :key="anime.animeUserId">
					<div class="content">
						<div class="anime" @click="goAnimeDetail(anime.animeUserId)">
							<div class="time">{{ anime.finishedDate }}</div>
							<img class="cover" v-lazy="anime.cover" :alt="anime.name">
							<div class="rate">
								<el-rate
										:value="anime.score"
										:colors="['#eee', '#F7BA2A', '#FF9900']"
										disabled
								>
								</el-rate>
							</div>
							<div class="name">{{ anime.name }}</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 空标志 -->
			<el-empty v-if="emptyFlag" description="暂无历程，快去观看吧！"/>

			<!-- 滚动加载动画 -->
			<scroll-animation :loading="scrollLoading"/>

			<!-- 结束标志 -->
			<end-hr content="我也是有底线的！" v-show="showEndHr"/>
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
			scrollLoading: false,

			//echarts实例
			chart: null,

			//图标数据加载标志
			chartDataLoading: false,

			//动漫数据加载标志
			dataLoading: false
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
				this.scrollLoading = true;

				//获取数据
				let result = await reqGetPageAnime(++this.current, this.size, null, 'FINISHED', 'JOIN_DESC');
				if (result.code !== 200) {
					this.$message.error('获取数据失败！');
					return;
				}

				this.animeList = this.animeList.concat(result.data.records || []);
				this.hasNext = result.data.current < result.data.pages;
				if (this.current === 1) {
					this.emptyFlag = this.animeList.length === 0;
				}
			} finally {
				//关闭加载动画
				this.scrollLoading = false;
			}
		},

		//滚动分页
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

		//获取第一页数据
		async getFirstPageAnime() {
			this.dataLoading = true;
			this.current = 1;

			//获取数据
			let result = await reqGetPageAnime(this.current, this.size, null, 'FINISHED', 'JOIN_DESC');
			if (result.code !== 200) {
				this.$message.error('获取数据失败！');
				this.dataLoading = false;
				return;
			}
			this.animeList = this.animeList.concat(result.data.records || []);
			this.hasNext = result.data.current < result.data.pages;
			if (this.current === 1) {
				this.emptyFlag = this.animeList.length === 0;
			}
			this.dataLoading = false;
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
			if (chartData.length === 0) {
				return;
			}
			this.$refs.chart.style.display = 'block';
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
@import "@/style/common";
@font-face {
	font-family: 'numberfont';
	font-display: swap;
	src: url("@/assets/fonts/number/webfont.ttf");
}

.viewing-history {
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@include content-min-height;

	/* 动漫统计 */
	.chart {
		height: 250px;
		@include box-style;
		width: 100%;
		display: none;
	}

	.time-line-box {
		flex: 1;
		margin-top: .6rem;
		@include box-style;
		padding: 0 10px;

		//使空标志居中
		position: relative;

		//防止加载动画溢出
		overflow: hidden;

		@media screen and (max-width: 768px) {
			padding: 0 8px;
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
				transform: translateX(-50%);
				background: linear-gradient(to bottom, #6e58e9, #eae7ff);

				@media screen and (max-width: 768px) {
					left: 0;
				}
			}

			.item {
				position: relative;
				margin-top: 1rem;
				display: flex;
				justify-content: flex-start;

				@media screen and (max-width: 768px) {
					justify-content: flex-start;
					margin-top: .6rem;
				}

				&:last-child {
					margin-bottom: 1rem;

					@media screen and (max-width: 768px) {
						margin-top: .6rem;
					}
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
						border: 3px solid #6e58e9;
						border-radius: 50%;
						z-index: 1;

						@media screen and (max-width: 768px) {
							left: -$marker-offset;
							right: auto;
						}
					}

					.anime {
						background: #FFFFFF;
						padding: 15px;
						border-radius: 8px;
						box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
						transition: transform 0.3s ease;
						box-sizing: border-box;
						text-align: center;
						cursor: pointer;

						&:hover {
							transform: translateY(-10px);
						}

						@media screen and (max-width: 768px) {
							padding: 10px;
							margin-left: $content-offset;
						}

						.time {
							color: #666;
							font-size: 1.2rem;
							margin-bottom: 0.5rem;
						}

						.cover {
							height: 200px;
							border-radius: 5px;
							overflow: hidden;

							@media screen and (max-width: 768px) {
								height: 150px;
							}
						}

						.name {
							color: #333;
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
	}
}
/* endregion */
</style>

<style lang="scss">
.viewing-history {
	.el-rate {
		margin: 5px 0;
	}
}
</style>