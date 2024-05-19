<template>
	<div>
		<transition
				name="fade"
				mode="out-in"
				enter-active-class="animate__animated animate__fadeIn"
				leave-active-class="animate__animated animate__fadeOut"
				:duration="{enter: 400, leave: 400}"
		>
			<keep-alive include="HomePage">
				<router-view />
			</keep-alive>
		</transition>

		<div class="live2dBox" v-if="browserIdentity===1" :id="live2dPosition">
			<live2d />
		</div>

		<el-backtop :right="20" style="width: 50px;height: 50px;"></el-backtop>
	</div>
</template>

<script>
import live2d  from 'vue-live2d';
import {mapState} from "vuex";

export default {
	name: 'App',
	components: {live2d},
	computed: {
		...mapState(['browserIdentity', 'live2dPosition']),
	},
	methods: {
		//动态获取浏览器宽度
		getWindowInfo() {
			if (window.innerWidth <= 768) {
				this.$store.commit('BROWSER_IDENTITY', 'MOBILE');
				this.$store.commit('SIDEBAR_FLAG', false);
			} else {
				this.$store.commit('BROWSER_IDENTITY', 'PC');
				this.$store.commit('SIDEBAR_FLAG', true);
			}
		},
	},
	mounted() {
		//动态获取浏览器视宽来判断浏览器身份
		this.getWindowInfo();
		window.addEventListener('resize', this.getWindowInfo);
	},
	beforeDestroy() {
		//取消事件监听
		window.removeEventListener('resize', this.getWindowInfo);
	},
}
</script>

<style lang="scss">
@import '@/style/normalize.css';
@import 'animate.css';

html {
	font-size: 19px;
	width: 100%;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
}

body {
	font-size: 19px;
	width: 100%;
	font-family: 楷体, 微软雅黑, serif;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
}

/* region element样式修改 */
@import '@/style/element';
@include message-style;
@include skeleton-style;
@include empty-style;
/* endregion */

/* region 看板娘样式 */
.live2dBox {
	position: fixed;
	bottom: 0;
	z-index: 9999;
	transition: left 1.5s;
}

#left {
	left: 0;
}

#right {
	left: 100%;
	transform: translateX(-100%);
}

/*关闭看板娘功能面板*/
.vue-live2d-tool {
	display: none !important;
}

/*取消鼠标移上看板娘向右移动*/
.vue-live2d-main-on-right:hover {
	padding-right: 0 !important;
}

.vue-live2d {
	height: 200px !important;
	width: 200px !important;
}

#vue-live2d-main {
	height: 200px !important;
	cursor: default;
}
/* endregion */
</style>
