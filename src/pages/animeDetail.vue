<template>
	<div class="animeDetail">
		<header>
			<div class="back">
				<svg @click="back" width="20px" height="20.00px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5V432c0 44.2 35.8 80 80 80H432c44.2 0 80-35.8 80-80V245.5l24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM112 432V204.8L288 55.5 464 204.8V432c0 17.7-14.3 32-32 32H384V312c0-22.1-17.9-40-40-40H232c-22.1 0-40 17.9-40 40V464H144c-17.7 0-32-14.3-32-32zm128 32V320h96V464H240z"></path></svg>
				<svg width="35px" height="18.00px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z"></path></svg>
				<div class="title">罪恶王冠</div>
			</div>
			<p class="quote">樱花满地集于我心，楪舞纷飞祈愿相随</p>
			<div class="arrow" @click="down">
				<svg width="32px" height="32.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M511.5 789.9 80.6 359c-22.8-22.8-22.8-59.8 0-82.6 22.8-22.8 59.8-22.8 82.6 0l348.3 348.3 348.3-348.3c22.8-22.8 59.8-22.8 82.6 0 22.8 22.8 22.8 59.8 0 82.6L511.5 789.9 511.5 789.9zM511.5 789.9" /></svg>
			</div>
		</header>
		<main ref="main">
			<div class="animeBox">
				<div class="anime">
					<div class="img">
						<img src="@/assets/home/animeList/86.jpg" alt="">
					</div>
					<div class="info">
						<h3 class="title">86-不存在的战区</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">TV</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">2021-10-02</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">完结</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">安里アサト</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">科幻 战争</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">A-1 Pictures</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">了应对吉亚迪所开发出的完全独立无人战斗兵器“军团”的入侵，其邻国圣格诺利亚共和国开发了无人战斗兵器毁灭之力。但是，无人战斗机只是空有名号，实际是没有被认可为”人“的人们——86——驾驶，被当作道具来使用。由”86“所组成的部队“先锋战队”的队长少年・辛艾，在只能等待着死亡的令人绝望的战场上为了某个目的而战斗着。在那里，共和国军队的精英・蕾娜就任了新任指挥管制官。她小时候有着被86所救助过的经历，因此想把被作为“人形猪”而遭到轻视的他们作为正常人类来对待。只不过是为了战斗而被作为道具使用的少年以及被寄予了未来期望的精英才女，本不应当有所交集的两人，在激烈的战斗中看到了未来——</span>
						</div>
					</div>
				</div>
			</div>
			<div class="carouselImg">
				<CarouselImg :images="images" />
			</div>
		</main>
	</div>
</template>

<script>
import CarouselImg from "@/components/carouselImg.vue";

export default {
	name: 'AnimeDetail',
	components: {CarouselImg},
	data() {
		return {
			images: [
				require('@/assets/animeDetail/111.png'),
				require('@/assets/animeDetail/222.png'),
				require('@/assets/animeDetail/333.jpg'),
				require('@/assets/animeDetail/444.png'),
			]
		}
	},
	methods: {
		/* 点击箭头滚动到内容区域 */
		down() {
			window.scrollTo({
				'top': this.$refs['main'].offsetTop,
				'behavior': 'smooth'
			});
		},

		//点击back按钮回到home
		back() {
			this.$router.back();
		}
	},
}
</script>

<style scoped>
/* region header */
.animeDetail header {
	width: 100%;
	height: 100vh;
	background: url("@/assets/animeDetail/background.jpg") no-repeat fixed center center;
	background-size: cover;
	position: relative;
}

.animeDetail header .back {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	background-color: #FFFFFF;
	position: fixed;
	z-index: 1000;
	top: 1rem;
	left: 1rem;
	font-size: 0.9rem;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.animeDetail header .back > svg:nth-child(1) {
	cursor: pointer;
	transition: color, transform .3s;
}

.animeDetail header .back > svg:nth-child(1):hover {
	color: #2B0AFF;
	transform: translateY(-2px);
}

.animeDetail header .back > svg:nth-child(2) {
	color: #cac5c4;
}

.animeDetail header .quote {
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	font-size: 1.5rem;
	letter-spacing: 0.3rem;
	filter: blur(6px);
	transition: filter 0.3s;
	cursor: pointer;
	background-color: rgba(255, 255, 255, .3);
	padding: 1rem 2rem;
	box-sizing: border-box;
	border-radius: 5px;
}

.animeDetail header .quote:hover {
	filter: blur(0);
}

/* 箭头跳动动画 */
@keyframes bounce {
	0%, 100% {
		transform: translateY(-25%);
		animation-timing-function: cubic-bezier(.8,0,1,1);
	}
	50% {
		transform: none;
		animation-timing-function: cubic-bezier(0,0,.2,1);
	}
}

.animeDetail header .arrow {
	position: absolute;
	bottom: 3rem;
	width: 100%;
	text-align: center;
	animation: bounce 1s infinite;
	cursor: pointer;
}
/* endregion */

/* region main */
.animeDetail main {
	min-height: 100vh;
	overflow: hidden;
}

.animeDetail main .animeBox .anime {
	width: 950px;
	margin: 1rem auto;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
	border-radius: 5px;
}

.animeDetail main .animeBox .anime .img {
	height: 200px;
	border-radius: 5px;
	overflow: hidden;
}

.animeDetail main .animeBox .anime .img img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.animeDetail main .animeBox .anime .info {
	width: 700px;
	margin-left: 15px;
}

.animeDetail main .animeBox .anime .info .other {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 30px;
	line-height: 30px;
	margin-top: 15px;
}

.animeDetail main .animeBox .anime .info .other .otherItem {
	justify-items: start;
}

.animeDetail main .animeBox .anime .info .other .otherItem .key {
	display: inline-block;
	width: 76px;
	text-align: right;
}

.animeDetail main .animeBox .anime .info .intro {
	margin-top: 5px;
}

.carouselImg {
	height: 100vh;
}
/* endregion */

@media screen and (max-width: 700px) {
	.animeDetail header .quote {
		width: 85%;
		filter: blur(0);
		top: 35%;
		line-height: 2.5rem;
		text-align: center;
	}

	.animeDetail main .animeBox .anime {
		display: block;
		width: 100%;
		box-sizing: border-box;
	}

	.animeDetail main .animeBox .anime .img {
		width: 150px;
		border-radius: 5px;
		overflow: hidden;
		margin: 0 auto;
	}

	.animeDetail main .animeBox .anime .info {
		width: 100%;
		box-sizing: border-box;
		margin-left: 0;
	}

	.animeDetail main .animeBox .anime .info .other .otherItem .key {
		width: 68px;
		font-size: 1.2rem;
	}

	.animeDetail main .animeBox .anime .info .intro {
		font-size: 1.2rem;
	}

	.carouselImg {
		width: 100%;
		height: 300px;
	}
}
</style>