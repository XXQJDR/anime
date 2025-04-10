<template>
	<div>
		<transition
				mode="out-in"
				enter-active-class="animate__animated animate__fadeIn"
				leave-active-class="animate__animated animate__fadeOut"
				:duration="{enter: 300, leave: 300}"
		>
			<keep-alive include="Home">
				<router-view/>
			</keep-alive>
		</transition>

		<el-backtop :right="20" style="width: 50px;height: 50px;"></el-backtop>

		<div
				class="app-mask"
				v-show="maskFlag"
				@click="closeMask"
				ref="appMask"
		>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App',
	computed: {
		// 遮罩显示标志
		maskFlag: {
			get() {
				return this.$store.state.maskFlag;
			},
			set(val) {
				this.$store.commit('MASK_FLAG', val);
			}
		},

		//侧边栏显示标志
		sidebarFlag: {
			get() {
				return this.$store.state.sidebarFlag;
			},
			set(val) {
				this.$store.commit('SIDEBAR_FLAG', val);
			}
		},

		//浏览器标识
		browserIdentity: {
			get() {
				return this.$store.state.browserIdentity;
			},
			set(val) {
				this.$store.commit('BROWSER_IDENTITY', val);
			}
		},

		//复用popover显示标志
		reusePopoverFlag: {
			get() {
				return this.$store.state.reusePopoverFlag;
			},
			set(val) {
				this.$store.commit('REUSE_POPOVER_FLAG', val);
			}
		}
	},
	methods: {
		//动态获取浏览器宽度
		getWindowInfo() {
			if (window.innerWidth <= 768) {
				this.browserIdentity = 'MOBILE';
				this.sidebarFlag = false;
			} else {
				this.browserIdentity = 'PC';
				this.sidebarFlag = true;
			}
		},

		//关闭遮罩
		closeMask() {
			//关闭遮罩
			this.maskFlag = false;

			//关闭复用popover
			this.reusePopoverFlag = false;

			//如果遮罩关闭，则重置侧边栏的z-index，防止侧边栏置于全局遮罩上
			let sidebar = document.querySelector('.sidebar');
			if (sidebar !== null) {
				sidebar.style.zIndex = 100;
			}

			//判断侧边栏是否需要关闭
			if (this.browserIdentity === 'MOBILE' && this.sidebarFlag) {
				this.sidebarFlag = false;
			}
		}
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
@import '@/assets/fonts/rate/style.css';

html {
	font-size: 18px;
	width: 100%;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}
}

body {
	font-size: 18px;
	width: 100%;
	font-family: 楷体, 微软雅黑, serif;
	overflow-x: hidden;

	@media screen and (max-width: 768px) {
		font-size: 14px;
	}

	.app-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 111;
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
