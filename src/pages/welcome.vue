<template>
	<div class="background">
		<div class="top wow toDown" data-wow-duration="3s">欢迎来到<span>Anime</span></div>
		<div class="introduce">
			<div class="left wow toRight" data-wow-duration="3.5s">
				追番已经成为了我们的一种习惯，每一次的追剧都是我生活中的一段美好回忆。随着时间的推移，遗忘是难免的，但是我们可以通过截图将动漫中的瞬间记录下来。
			</div>
			<div class="right wow toLeft" data-wow-duration="4s">
				追番是很多人的爱好，但是如何决定下一步追的番却是一个让人头疼的问题。我们可以帮助你决定下一步追的番，有效解决您的选择困难症。
			</div>
		</div>
		<div class="button wow fadeIn" data-wow-duration="4s">
			<button class="loginBtn">登 录</button>
			<button class="registerBtn">注 册</button>
		</div>
	</div>
</template>

<script>
import {WOW} from 'wowjs';

export default {
	name: 'WelcomePage',
	mounted() {
		new WOW().init();
	}
}
</script>

<style scoped>
.background {
	width: 100vw;
	height: 100vh;
	background-image: url("@/assets/welcome/background.jpg");
	background-position: center center;
	/* 背景图不平铺 */
	background-repeat: no-repeat;
	/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
	background-attachment: fixed;
	/* 让背景图基于容器大小伸缩 */
	background-size: cover;
	overflow: hidden;
}

.top,
.left,
.right,
.button{
	user-select: none;
}

.top {
	font-size: 3.5em;
	color: rgba(24, 120, 175);
	letter-spacing: 0.1em;
	text-align: center;
	margin-top: 10%;
	text-shadow: 0 0 3px rgba(24, 120, 175);
}

.top span {
	font-family: "Segoe Script", serif;
}

.introduce {
	position: relative;
	height: 35%;
}

.left,
.right {
	font-size: 1em;
	color: #656565;
	width: 25%;
	position: absolute;
}

.left {
	top: 20%;
	left: 3%;
}

.right {
	top: 50%;
	right: 3%;
}

.button {
	text-align: center;
}

.loginBtn,
.registerBtn {
	width: 10em;
	height: 3em;
	background-color: rgb(20, 134, 201);
	border-radius: 5em;
	color: white;
	transition: background-color, box-shadow  0.4s;
}

.loginBtn:hover,
.registerBtn:hover {
	background-color: rgb(24, 120, 175);
	box-shadow: 0 0 4px black;
}

.loginBtn {
	margin-right: 5%;
}
</style>