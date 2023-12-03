<template>
	<div class="swiper-container">
		<div class="swiper-wrapper" ref="swiper-wrapper">
			<div class="swiper-slide" v-for="(img, index) in images" :key="index">
				<img class="swiper-img" :src="img.imagePath" alt="img">
			</div>
		</div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev" v-if="browserWidth > 700"></div>
		<div class="swiper-button-next" v-if="browserWidth > 700"></div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import 'viewerjs/dist/viewer.css';
import Viewer from "viewerjs";
import {mapState} from "vuex";

export default {
	name: 'CarouselImg',
	data() {
		return {
			browserWidth: 0,
		}
	},
	computed: {
		...mapState(['images']),
	},
	created() {
		//获取浏览器宽度
		this.browserWidth = window.innerWidth;
	},
	mounted() {
		let mySwiper = new Swiper('.swiper-container', {
			//当没有足够的slide切换时，例如只有1个slide，swiper会失效且隐藏导航等
			watchOverflow: true,

			//循环播放
			// loop: true,
			//自动播放
			autoplay: {
				delay: 5000, // 每次轮播间隔的ms数
				stopOnLastSlide: false, // 播放完最后一张图片后是否停留在最后一张图片上，停止继续轮播。默认false
				disableOnInteraction: false, // 用户操作轮播图后，比如点击轮播按钮或小圆点，停止自动轮播
			},
			//滚动一张或者切换一张图片，需要的时间，单位ms，默认300ms
			// speed: 800,

			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
		this.$store.commit('MY_SWIPER', mySwiper);

		//移动端
		if (this.browserWidth <= 700) {
			new Viewer(this.$refs['swiper-wrapper'], {
				button: false,
				navbar: false,
				title: false,
				toolbar: false,
				initialCoverage: 1,
			});
		}
	}
}
</script>

<style scoped>
.swiper-container {
	width: 100%;
	height: 100%;
	background-color: #000000;
}

.swiper-slide {
	text-align: center;
}

.swiper-img {
	max-width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>