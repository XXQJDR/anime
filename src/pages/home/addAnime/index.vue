<template>
	<div class="addAnime">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3c3838" d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path></svg>
			<div>添加动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 添加方式-->
		<div class="addWay">
			<div class="btn autoRecognize" :class="{addWayBtnActive:addWay}" @click="changeAddWay(true)">
				<svg :stroke="addWay?'#2B0AFF':'#726e6e'" stroke-width="20" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#726e6e" d="M855.466667 292.266667V200.533333a21.333333 21.333333 0 1 1 42.666666 0v153.6a21.333333 21.333333 0 0 1-21.333333 21.333334h-153.6a21.333333 21.333333 0 1 1 0-42.666667h106.581333a362.666667 362.666667 0 1 0 20.949334 304.384 21.333333 21.333333 0 1 1 39.850666 15.274667 405.333333 405.333333 0 1 1-35.114666-360.192z m-312.490667 37.717333l1.706667 3.541333 129.450666 329.386667a21.333333 21.333333 0 0 1-37.973333 19.072l-1.706667-3.456-36.565333-92.928h-154.325333l-39.936 93.525333a21.333333 21.333333 0 0 1-40.448-13.141333l1.194666-3.626667 140.885334-329.386666a21.333333 21.333333 0 0 1 37.717333-2.986667z m-18.944 67.541333l-62.208 145.408h119.296l-57.088-145.408z"/></svg>
				<div>自动识别</div>
			</div>
			<div class="btn manualAdd" :class="{addWayBtnActive:!addWay}" @click="changeAddWay(false)">
				<svg :stroke="!addWay?'#2B0AFF':'#726e6e'" stroke-width="20" width="20px" height="20.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#726e6e" d="M966.991672 156.064593c-3.5845-44.828222-23.969592-85.566439-57.400944-114.712975-0.394615-0.336671-0.789229-0.667348-1.194833-0.992032-33.49529-28.68199-75.8779-42.488507-119.526275-38.764144-44.127906 3.722365-84.132839 24.81177-112.628012 59.378014l-507.404488 615.165252a57.437908 57.437908 0 0 0-11.358907 22.175345L90.312804 951.03026c-5.609522 21.397104 1.456578 44.526517 17.920499 58.849529 10.38286 9.102111 23.876683 14.120211 37.625257 14.120211 1.565471 0 3.13294-0.063938 4.699411-0.197807 6.659497-0.557456 13.150158-2.287766 19.525931-5.244878l231.389035-109.310252c7.472702-3.536546 14.020308-8.590611 19.774688-15.386973L928.669097 278.647883c28.292371-34.309495 41.908074-77.848976 38.322575-122.58329zM368.272359 846.011817l-201.593132 95.232 58.974408-221.903298 400.113265-485.096273L774.692464 353.255024 368.272359 846.011817z m505.431415-612.803559l-53.615641 65.005518-148.924566-119.010779 60.041366-72.794911c16.190189-19.630829 38.792117-31.602139 63.643847-33.699091 24.793787-2.049998 48.903243 5.901237 67.918674 22.501026 0.301705 0.261744 0.60441 0.516496 0.91111 0.767251 18.761678 16.767625 30.200507 40.076862 32.260496 65.782759 2.087961 26.144468-5.80633 51.521686-22.235286 71.448227z"/></svg>
				<div>手动添加</div>
			</div>
		</div>
		<!-- endregion -->

		<!-- region 主要内容 -->
		<div class="addAnimeContent">
			<transition
					name="fade"
					mode="out-in"
					enter-active-class="animate__animated animate__fadeIn"
					leave-active-class="animate__animated animate__fadeOut"
					:duration="{enter: 400, leave: 400}"
			>
				<router-view />
			</transition>
		</div>
		<!-- endregion -->
	</div>
</template>

<script>
export default {
	name: 'AddAnime',
	data() {
		return {
			//添加方式：true代表自动识别，false代表手动添加
			addWay: true
		}
	},
	methods: {
		//改变添加方式
		changeAddWay(type) {
			let path = type ? '/home/addAnime/autoRecognize' : '/home/addAnime/manualAdd';

			this.$router.push(path);
			this.addWay = type;
		}
	}
}
</script>

<style scoped>
/* region 模块分类名称 */
.addAnime .typeTitle {
	min-width: 110px;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
}

.addAnime .typeTitle svg {
	width: 18px;
	height: 18px;
}

.addAnime .typeTitle div {
	min-width: 76px;
	margin-left: 15px;
	font-weight: bold;
}
/* endregion */

/* region 添加方式 */
.addAnime .addWay {
	display: flex;
	margin-top: 1.5rem;
}

.addAnime .addWay .btn {
	display: flex;
	align-items: center;
	color: #726e6e;
	padding: 8px 15px;
	border-radius: 6px;
	cursor: pointer;
	transition: all 0.3s;
}

.addAnime .addWay .btn:first-child {
	margin-right: 10px;
}

.addAnime .addWay .btn:hover {
	background-color: #eae7ff;
}

.addAnime .addWayBtnActive {
	background-color: #eae7ff !important;
	color: #2B0AFF !important;
}

.addAnime .addWay .btn > div {
	margin-left: 5px;
}
/* endregion */

/* region 主要内容 */
.addAnime .addAnimeContent {
	margin-top: 1rem;
}
/* endregion */
</style>