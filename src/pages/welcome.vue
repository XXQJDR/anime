<template>
	<div class="background">
		<div class="top animate__animated animate__backInDown">欢迎来到<span>Anime</span></div>
		<div class="introduce">
			<div class="left left1 animate__animated animate__backInLeft">
				追番已经成为了我们的一种习惯，每一次的追剧都是我生活中的一段美好回忆。随着时间的推移，遗忘是难免的，但是我们可以通过截图将动漫中的瞬间记录下来。
			</div>
			<div class="left left2 animate__animated animate__backInLeft">
				记录您的追番历程
			</div>
			<div class="right right1 animate__animated animate__backInRight">
				追番是很多人的爱好，但是如何决定下一步追的番却是一个让人头疼的问题。我们可以帮助你决定下一步追的番，有效解决您的选择困难症。
			</div>
			<div class="right right2 animate__animated animate__backInRight">
				帮助您决定一部番
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
.button {
	user-select: none;
}

.top {
	color: rgb(24, 120, 175);
	letter-spacing: 0.3rem;
	text-align: center;
	margin-top: 10%;
	text-shadow: 0 0 3px rgb(24, 120, 175);
}

.top span {
	font-family: "Segoe Script", serif;
}

.introduce {
	position: relative;
}

.left,
.right {
	font-size: 1rem;
	color: #656565;
	position: absolute;
}

.button {
	text-align: center;
}

.loginBtn,
.registerBtn {
	background-color: rgb(20, 134, 201);
	border-radius: 5rem;
	color: white;
	transition: background-color, box-shadow 0.4s;
}

/*移动端*/
@media screen and (max-width: 768px) {
	.top {
		font-size: 2rem;
		margin-top: 6rem;
	}

	.introduce {
		margin-top: 8rem;
		height: 5rem;
	}

	.left1,
	.right1 {
		display: none;
	}

	.left2 {
		left: 4rem;
	}

	.right2 {
		top: 2rem;
		right: 4rem;
	}

	.button {
		margin-top: 5rem;
	}

	.loginBtn,
	.registerBtn {
		width: 8rem;
		height: 2.5rem;
	}

	.loginBtn {
		margin-right: 3%;
	}
}

/*PC端*/
@media screen and (min-width: 770px) {
	.top {
		font-size: 3.5rem;
	}

	.introduce {
		height: 35%;
	}

	.left2,
	.right2 {
		display: none;
	}

	.left1,
	.right1 {
		width: 25%;
	}

	.left1 {
		top: 20%;
		left: 3%;
	}

	.right1 {
		top: 50%;
		right: 3%;
	}

	.loginBtn,
	.registerBtn {
		width: 10rem;
		height: 3rem;
	}

	.loginBtn {
		margin-right: 5%;
	}

	.loginBtn:hover,
	.registerBtn:hover {
		background-color: rgb(24, 120, 175);
		box-shadow: 0 0 4px black;
	}
}
</style>