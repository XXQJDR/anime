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

body {
	font-size: 19px;
	font-family: 楷体, 微软雅黑, serif;
}
</style>
