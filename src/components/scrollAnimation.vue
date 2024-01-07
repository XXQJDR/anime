<template>
	<div class="scrollAnimation" v-show="loading">
		<div class="box">
			<bounce-loader :loading="loading" color="#2b0aff" size="40px" />
			<span>努力加载中...</span>
		</div>
	</div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';

export default {
	name: 'ScrollAnimation',
	components: {BounceLoader},
	props: ['loading']
}
</script>

<style scoped>
.scrollAnimation {
	height: 40px;
	position: relative;
	margin-top: 10px;
}

.scrollAnimation .box {
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
}
</style>