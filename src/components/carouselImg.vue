<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(img, index) in images" :key="index">
				<img class="swiper-img" :src="img" alt="img">
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
	name: 'CarouselImg',
	props: ['images'],
	mounted() {
		let mySwiper = new Swiper('.swiper-container', {
			//循环播放
			loop: true,
			//自动播放
			autoplay: {
				delay: 10000, // 每次轮播间隔的ms数，默认10000ms
				stopOnLastSlide: false, // 播放完最后一张图片后是否停留在最后一张图片上，停止继续轮播。默认false
				disableOnInteraction: false, // 用户操作轮播图后，比如点击轮播按钮或小圆点，停止自动轮播
			},
			//滚动一张或者切换一张图片，需要的时间，单位ms，默认300ms
			// speed: 800,

			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
				//点击指示点分页器会控制Swiper切换
				clickable: true,
			},
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		//鼠标移出隐藏按钮，移入显示按钮
		mySwiper.el.onmouseover = function () {
			mySwiper.navigation.$nextEl.removeClass('swiper-button-hide');
			mySwiper.navigation.$prevEl.removeClass('swiper-button-hide');
		}
		mySwiper.el.onmouseout = function () {
			mySwiper.navigation.$nextEl.addClass('swiper-button-hide');
			mySwiper.navigation.$prevEl.addClass('swiper-button-hide');
		}

		//获取图片宽高
		console.log(document.querySelectorAll('.swiper-img')[0].naturalWidth);
		console.log(document.querySelectorAll('.swiper-img')[1].naturalWidth);
		console.log(document.querySelectorAll('.swiper-img')[2].naturalWidth);
	}
}
</script>

<style scoped>
.swiper-container {
	width: 100%;
	height: 100%;
}

.swiper-slide {
	text-align: center;
	background-color: #000000;
}

.swiper-img {
	max-width: 100%;
	height: 100%;
	object-fit: cover;
}

/*导航显示与隐藏动画*/
.swiper-button-hide {
	opacity: 0;
}
.swiper-button-prev,
.swiper-button-next {
	transition: opacity .6s;
}
</style>