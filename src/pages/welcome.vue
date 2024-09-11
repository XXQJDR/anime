<template>
	<div class="background">
		<div class="logo-font animate__animated animate__backInDown">welcome to anime</div>
		<div class="introduce">
			<div class="pc">
				<div class="left animate__animated animate__backInLeft">
					追番已经成为了我们的一种习惯，每一次的追剧都是我生活中的一段美好回忆。随着时间的推移，遗忘是难免的，但是我们可以通过截图将动漫中的瞬间记录下来。
				</div>
				<div class="right animate__animated animate__backInRight">
					追番是很多人的爱好，但是如何决定下一步追的番却是一个让人头疼的问题。我们可以帮助你决定下一步追的番，有效解决您的选择困难症。
				</div>
			</div>
			<div class="mobile">
				<div class="left animate__animated animate__backInLeft">
					记录您的追番历程
				</div>
				<div class="right animate__animated animate__backInRight">
					帮助您决定一部番
				</div>
			</div>
		</div>
		<div class="button animate__animated animate__bounce">
			<button class="loginBtn" @click="goLogin">登 录</button>
			<button class="registerBtn" @click="goRegister">注 册</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WelcomePage',
	methods: {
		//登录按钮回调
		goLogin() {
			this.$router.push('/login');
		},

		//注册按钮回调
		goRegister() {
			this.$router.push('/register');
		}
	}
}
</script>

<style scoped>
@font-face {
	font-family: 'logofont';
	font-display: swap;
	src: url("@/assets/fonts/logo/Vampire Wars.ttf");
}

.background {
	width: 100vw;
	height: 100vh;
	background-image: url("@/assets/images/welcome/background.jpg");
	background-position: center center;
	/* 背景图不平铺 */
	background-repeat: no-repeat;
	/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
	background-attachment: fixed;
	/* 让背景图基于容器大小伸缩 */
	background-size: cover;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-around;

	.logo-font {
		font-family: "logofont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-image: linear-gradient(50deg, rgb(43, 10, 255), rgb(255, 91, 138) 49%, rgb(255, 91, 138) 53%, rgb(255, 91, 138) 55%, rgb(251, 166, 75) 77%, rgb(249, 155, 82));
		background-clip: text;
		color: transparent;
		text-align: center;
		letter-spacing: 0.3rem;
		font-size: 3.5rem;

		@media screen and (max-width: 768px) {
			font-size: 2rem;
		}
	}

	.introduce {
		color: #656565;
		text-align: center;
		letter-spacing: 0.3rem;

		.pc	{
			display: flex;
			justify-content: space-around;
			align-items: center;

			@media screen and (max-width: 768px) {
				display: none;
			}

			.left {
				width: 25%;
				margin-bottom: 3rem;
			}

			.right {
				width: 25%;
				margin-top: 3rem;
			}
		}

		.mobile {
			display: flex;
			justify-content: space-around;
			align-items: center;

			@media screen and (min-width: 768px) {
				display: none;
			}

			.left {
				margin-bottom: 3rem;
			}

			.right {
				margin-top: 3rem;
			}
		}
	}

	.button {
		text-align: center;

		.loginBtn,
		.registerBtn {
			width: 10rem;
			height: 3rem;
			background-color: rgb(20, 134, 201);
			border-radius: 5rem;
			color: white;
			transition: all 0.4s;

			&:hover {
				background-color: rgb(24, 120, 175);
				box-shadow: 0 0 4px black;
			}
		}

		.loginBtn {
			margin-right: 3rem;
			@media screen and (max-width: 768px) {
				width: 80%;
				height: 3.5rem;
				margin-right: 0;
			}
		}

		.registerBtn {
			@media screen and (max-width: 768px) {
				width: 80%;
				height: 3.5rem;
				margin-top: 2rem;
			}
		}
	}
}
</style>