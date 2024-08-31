<template>
	<div class="animeRandom">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg width="22px" height="22px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="book-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
				<path d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"></path>
			</svg>
			<div class="title">随机动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 随机模块 -->
		<div class="box">
			<div class="anime" v-loading="loading">
				<div class="img" v-show="anime.cover">
					<img v-lazy="anime.cover" alt="">
				</div>
				<div class="info" v-show="anime.title!=null">
					<h3>{{anime.title}}</h3>
					<div>动画种类：{{anime.kind}}</div>
					<div>首播时间：{{anime.firstPlayDate}}</div>
					<div>播放状态：{{anime.status}}</div>
					<div>原作：{{anime.original}}</div>
					<div>剧情类型：{{anime.storyType}}</div>
					<div>制作公司：{{anime.company}}</div>
					<el-tooltip effect="dark" :content="anime.description" placement="top" :visible-arrow="false">
						<div class="intro">简介：{{anime.description}}</div>
					</el-tooltip>
				</div>
			</div>
			<div class="control">
				<div class="btn" @click="randomAnime">随机</div>
			</div>
		</div>
		<!-- endregion -->
	</div>
</template>

<script>
import {reqRandomAnime} from "@/api";
import _ from "lodash";

export default {
	name: 'AnimeRandom',
	data() {
		return {
			//加载动画开启标志，true代表开启
			loading: false,

			//随机到的动漫
			anime: {}
		}
	},
	methods: {
		randomAnime: _.throttle(async function () {
			try {
				//开启加载动画
				this.loading = true;

				//获取数据
				let result = await reqRandomAnime();
				if (result.code !== 200) {
					this.$message.error(result.msg);
					return;
				}
				this.anime = result.data || {};

				//无未看动漫
				if (this.anime.title == null) {
					this.$message.warning('您的列表里没有一个未看的动漫，快去添加吧！')
				}
			} finally {
				//关闭加载动画
				this.loading = false;
			}
		}, 1000),
	},
}
</script>

<style scoped lang="scss">
.animeRandom {
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

	/* 随机模块 */
	> .box {
		margin-top: 3rem;

		.anime {
			min-height: 350px;
			border-radius: 5px;
			display: flex;
			align-items: center;
			padding: 1rem;
			background-color: #FFFFFF;
			box-sizing: border-box;

			@media screen and (max-width: 768px) {
				min-height: 300px;
			}

			.img {
				width: 165px;
				height: 235px;

				@media screen and (max-width: 768px) {
					width: 122px;
					height: 170px;
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			.info {
				flex: 1;
				padding-left: 15px;

				div {
					margin-top: 8px;
				}

				.intro {
					word-break: break-all;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;

					@media screen and (max-width: 768px) {
						-webkit-line-clamp: 5;
					}
				}
			}
		}

		.control {
			margin-top: 3rem;

			.btn {
				width: 90px;
				height: 40px;
				padding: 10px;
				text-align: center;
				line-height: 40px;
				border-radius: 5px;
				background-image: linear-gradient(92.91deg, rgb(51, 0, 217) 2.18%, rgb(157, 32, 201) 44.94%, rgb(223, 122, 108) 99.91%);
				background-size: 400%;
				color: #FFFFFF;
				cursor: pointer;
				margin: 0 auto;
				transition: background-size .3s;

				&:hover {
					background-size: 200%;
				}
			}
		}
	}
}
</style>