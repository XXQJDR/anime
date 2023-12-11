<template>
	<div class="animeRandom">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="book-open" class="svg-inline--fa fa-book-open fa-fw fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#3c3838" d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"></path></svg>
			<div class="title">随机动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 随机模块 -->
		<div class="box">
			<div class="boxContent">
				<div class="anime" v-loading="loading">
					<div class="img">
						<img :src="anime.cover" alt="">
					</div>
					<div class="info" v-show="anime.title!=null">
						<h3 class="title">{{anime.title}}</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">{{anime.kind}}</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">{{anime.firstPlayDate}}</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">{{anime.status}}</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">{{anime.original}}</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">{{anime.storyType}}</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">{{anime.company}}</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">{{anime.description}}</span>
						</div>
					</div>
				</div>
				<div class="control">
					<div class="btn" @click="randomAnime">随机</div>
				</div>
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

			//关闭加载动画
			this.loading = false;
		}, 1000),
	},
}
</script>

<style scoped>
/* region 模块分类名称 */
.animeRandom .typeTitle {
	min-width: 110px;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
}

.animeRandom .typeTitle svg {
	width: 18px;
	height: 18px;
}

.animeRandom .typeTitle div {
	min-width: 76px;
	margin-left: 15px;
	font-weight: bold;
}
/* endregion */

/* region 随机模块 */
.animeRandom .box {
	height: calc(100vh - 33px - 50px);
	box-sizing: border-box;
	position: relative;
}

.animeRandom .box .boxContent {
	width: 90%;
	min-width: 745px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.animeRandom .box .anime {
	border-radius: 5px;
	display: flex;
	padding: 1rem;
	background-color: #FFFFFF;
}

.animeRandom .box .anime .img img {
	height: 230px;
}

.animeRandom .box .anime .info {
	padding-left: 15px;
}

.animeRandom .box .anime .info h3 {
	margin-top: 5px;
}

.animeRandom .box .anime .info .other {
	display: grid;
	grid-template-columns: repeat(2, 1fr);

	/* 默认行高 */
	grid-auto-rows: 30px;
	line-height: 30px;
	margin-top: 15px;
}

.animeRandom .box .anime .info .other .otherItem {
	justify-items: start;
}

.animeRandom .box .anime .info .other .otherItem .key {
	display: inline-block;
	width: 76px;
	text-align: right;
}

.animeRandom .box .anime .info .intro {
	margin-top: 5px;
	word-break: break-all;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

.animeRandom .box .anime .info .other .otherItem .value,
.animeRandom .box .anime .info .intro .value {
	color: #726e6e;
}

.animeRandom .box .control {
	margin-top: 2rem;
}

.animeRandom .box .control .btn {
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
}

.animeRandom .box .control .btn:hover {
	background-size: 200%;
}

/* endregion */

/*移动端*/
@media screen and (max-width: 768px) {
	.animeRandom .box {
		height: calc(100vh - 25px - 38px - 38px);
		box-sizing: border-box;
	}

	.animeRandom .box .boxContent {
		width: 100%;
		min-width: 0;
		padding: 5px;
	}

	.animeRandom .box .boxContent .anime .img img {
		height: 170px;
	}

	.animeRandom .box .boxContent .anime .info .other {
		display: block;
	}

	.animeRandom .box .boxContent .anime .info .other .notNecessary {
		display: none;
	}

	.animeRandom .box .boxContent .anime .info .other .otherItem .key {
		width: 56px;
	}

	.animeRandom .box .boxContent .anime .info .intro {
		display: none;
	}
}

@media screen and (min-width: 768px) and (max-width: 1050px) {
	.animeRandom .box .boxContent {
		min-width: 0;
	}

	.animeRandom .box .boxContent .anime .info .other {
		display: block;
	}

	.animeRandom .box .boxContent .anime .info .other .notNecessary {
		display: none;
	}

	.animeRandom .box .boxContent .anime .info .intro {
		display: none;
	}
}
</style>