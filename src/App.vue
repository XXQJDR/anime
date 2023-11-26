<template>
	<transition
			name="fade"
			mode="out-in"
			enter-active-class="animate__animated animate__fadeIn"
			leave-active-class="animate__animated animate__fadeOut"
			:duration="{enter: 600, leave: 600}"
	>
		<router-view />
	</transition>
</template>

<script>
export default {
	name: 'App',
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

/*移动端*/
@media screen and (max-width: 700px) {
	html,
	body {
		font-size: 14px;
	}
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
/* endregion */
</style>
