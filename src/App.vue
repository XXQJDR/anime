<template>
	<div>
		<transition
				name="fade"
				mode="out-in"
				enter-active-class="animate__animated animate__fadeIn"
				leave-active-class="animate__animated animate__fadeOut"
				:duration="{enter: 400, leave: 400}"
		>
			<router-view />
		</transition>
		<div style="position: fixed; bottom: 0; left: 0; z-index: 9999;">
			<live2d />
		</div>
	</div>
</template>

<script>
import live2d  from 'vue-live2d';
export default {
	name: 'App',
	components: {live2d},
	data () {
		return {
			direction: 'left',
			tips: {
				mouseover: [{
					selector: '.vue-live2d',
					texts: ['这样可以修改默认语句']
				}]
			}
		}
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
}
 /* endregion */

/*移动端*/
@media screen and (max-width: 700px) {
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
