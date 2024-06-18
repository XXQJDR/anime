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

		<el-backtop :right="20" style="width: 50px;height: 50px;"></el-backtop>
	</div>
</template>

<script>
export default {
	name: 'App',
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
	font-size: 18px;
	width: 100%;
	overflow-x: hidden;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
}

body {
	font-size: 18px;
	width: 100%;
	font-family: 楷体, 微软雅黑, serif;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
}

/* region element样式修改 */
@import '@/style/element';
@include message-style;
@include empty-style;
@include message-box-style;
@include form-style;
@include tooltip-style;
@include anime-control-popover-style;
/* endregion */
</style>
