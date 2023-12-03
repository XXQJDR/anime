<template>
	<div class="mobileTopbar">
		<div class="icon" @click="clickHandle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="rgb(34, 8, 204)" d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"></path></svg>
		</div>
		<div class="info">{{userInfo.username}}'s Personal Space</div>
	</div>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: 'MobileTopbar',
	computed: {
		...mapState(['userInfo']),
	},
	methods: {
		//点击icon展开侧边栏
		clickHandle() {
			this.$store.commit('SIDEBAR_FLAG', true);
		}
	}
}
</script>

<style scoped>
.mobileTopbar {
	height: 30px;
	display: flex;
	align-items: center;
	font-size: 1.3rem;
	font-weight: bold;
	padding-bottom: 8px;
	border-bottom: 1px solid rgb(229, 224, 223);
	margin-bottom: 8px;
}

.mobileTopbar .icon {
	height: 100%;
	width: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.mobileTopbar .info {
	height: 100%;
	width: 90%;
	text-align: center;
	line-height: 30px;
}

.mobileTopbar .icon svg {
	width: 18px;
	height: 18px;
}
</style>