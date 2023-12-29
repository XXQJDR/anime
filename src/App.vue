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
				this.$store.commit('BROWSER_IDENTITY', 2);
				this.$store.commit('SIDEBAR_FLAG', false);
			} else {
				this.$store.commit('BROWSER_IDENTITY', 1);
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

<style>
@import '@/style/normalize.css';
@import 'animate.css';

html,
body {
	font-size: 19px;
	width: 100%;
}

body {
	font-family: 楷体, 微软雅黑, serif;
}

/* region eleemnt样式修改 */
.el-popover {
	border-radius: 10px !important;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
	font-size: 0.9rem !important;
}

.el-popover ul li {
	display: flex;
	align-items: center;
	line-height: 38px;
	border-radius: 8px;
	cursor: pointer;
	border: 1px solid transparent;
	transition: border,background-color .3s;
}

.el-popover ul li:hover {
	background-color: #e5e0df;
	border: 1px solid #e5e0df;
}

.el-message .el-message__icon,
.el-message .el-message__content {
	font-size: 0.9rem;
}

.el-skeleton {
	margin-top: 1.5rem;
}

.el-empty .el-empty__description p {
	font-size: 1.5rem;
}
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

/*移动端*/
@media screen and (max-width: 768px) {
	html,
	body {
		font-size: 14px;
	}

	.el-skeleton > div {
		margin-top: 1rem;
		width: 100%;
	}

	.el-skeleton > div .el-skeleton__image {
		width: 100%;
		height: 260px;
	}

	/* 修改操作提示信息的宽度 */
	.el-message {
		min-width: 300px !important;
	}
}

@media screen and (min-width: 750px) {
	.el-skeleton {
		display: flex;
	}

	.el-skeleton > div {
		margin-left: 1rem;
		width: 280px;
	}

	.el-skeleton > div .el-skeleton__image {
		width: 100%;
		height: 260px;
	}
}
</style>
