<template>
	<div class="animeRandom">
		<!-- region 模块分类名称 -->
		<div class="typeTitle" ref="typeTitle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="book-open" class="svg-inline--fa fa-book-open fa-fw fa-1x " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#3c3838" d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"></path></svg>
			<div class="title">随机动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 随机模块 -->
		<div class="content">
			<div class="box">
				<div class="img">
					<img :src="animeList[currentIndex].cover" alt="">
				</div>
				<div class="title">
					<span>{{ animeList[currentIndex].title }}</span>
				</div>
			</div>
			<div class="control">
				<button @click="random">开始/停止</button>
			</div>
		</div>
		<!-- endregion -->
	</div>
</template>

<script>
export default {
	name: 'AnimeRandom',
	data() {
		return {
			//动漫列表
			animeList: [
				{title: '86-不存在的战区', cover: require('@/assets/home/animeList/86.jpg')},
				{title: '罪恶王冠', cover: require('@/assets/home/animeList/罪恶王冠.jpg')},
				{title: '钢之炼金术师', cover: require('@/assets/home/animeList/钢之炼金术师.jpg')},
				{title: '火影忍者', cover: require('@/assets/home/animeList/火影忍者.jpg')}
			],

			//当前动漫index，默认为第一个
			currentIndex: 0,

			//定时器开关
			interval: -1
		}
	},
	methods: {
		random() {
			if (this.interval !== -1) {
				clearInterval(this.interval);
				this.interval = -1;
			} else {
				this.interval = setInterval(() => {
					this.currentIndex = Math.floor(Math.random() * (this.animeList.length));
				}, 100);
			}
		}
	}
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
.animeRandom .content .box {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5rem;

	/* 解决幽灵空白问题 */
	font-size: 0;
}

.animeRandom .content .box .img {
	border-radius: 5px;
	overflow: hidden;
}

.animeRandom .content .box .title {
	font-size: 1rem;
	margin-top: 1rem;
}

.animeRandom .content .control {
	text-align: center;
}

.animeRandom .content .control button {
	width: 6rem;
	height: 3rem;
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
	color: #FFFFFF;
	margin-top: 3rem;
}

.animeRandom .content .control button:hover {
	background-size: 200%;
}
/* endregion */
</style>