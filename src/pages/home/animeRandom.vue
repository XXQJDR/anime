<template>
	<div class="anime-random">
		<!-- region 随机模块 -->
		<div class="box">
			<div class="anime" v-loading="loading">
				<div class="img" v-show="anime.cover">
					<img v-lazy="anime.cover" alt="">
					<div class="mask" @click="addWatching(anime.animeUserId)">
						<div class="box">
							<SvgIcon icon="boldAdd" size="32" color="#FFF"/>
						</div>
					</div>
				</div>
				<div class="info" v-show="anime.name!=null">
					<h3>{{ anime.name }}</h3>
					<div>动画种类：{{ anime.kind }}</div>
					<div>首播时间：{{ anime.firstPlayDate }}</div>
					<div>播放状态：{{ anime.playStatus }}</div>
					<div>原作：{{ anime.original }}</div>
					<div>剧情类型：{{ anime.storyType }}</div>
					<div>制作公司：{{ anime.company }}</div>
					<el-tooltip
							effect="dark"
							:content="anime.description"
							placement="top"
							:visible-arrow="false"
					>
						<div class="intro">简介：{{ anime.description }}</div>
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
import {reqRandomAnime, reqUpdateAnimeWatchStatus} from "@/api";
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
				if (this.anime.name == null) {
					this.$message.warning('您的列表里没有一个未看的动漫，快去添加吧！')
				}
			} finally {
				//关闭加载动画
				this.loading = false;
			}
		}, 1000),

		//将动漫标记为正在观看
		async addWatching(animeUserId) {
			let result = await reqUpdateAnimeWatchStatus(animeUserId, null, null, null, 'WATCHING', null, null);
			if (result.code !== 200) {
				this.$message.error('添加到正在观看失败！');
				return;
			}

			this.$message.success('成功添加到正在观看列表！');
		}
	},
}
</script>

<style scoped lang="scss">
@import "@/style/common";
.anime-random {
	/* 随机模块 */
	> .box {
		margin-top: 3rem;

		.anime {
			min-height: 350px;
			display: flex;
			align-items: center;
			@include box-style;

			@media screen and (max-width: 768px) {
				min-height: 300px;
			}

			.img {
				width: 165px;
				height: 235px;
				border-radius: 10px;
				overflow: hidden;
				position: relative;
				cursor: pointer;

				@media screen and (max-width: 768px) {
					width: 122px;
					height: 170px;
				}

				@media screen and (min-width: 768px) {
					&:hover {
						/* 鼠标移入图片展示遮罩 */
						.mask {
							opacity: 1;
						}

						/* 鼠标移入图片，图片放大 */
						img {
							transform: scale(1.05);
						}
					}

					/* 鼠标移入添加按钮，添加按钮旋转 */
					.mask .box:hover {
						transform: rotateZ(180deg);
					}
				}

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					transition: transform 0.3s;
				}

				.mask {
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .4);
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					transition: opacity 0.3s;

					.box {
						width: 50px;
						height: 50px;
						background-color: rgba(0, 0, 0, .5);
						border-radius: 50%;
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						transition: all .5s;

						svg {
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							margin: auto;
						}
					}
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
				border-radius: 10px;
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