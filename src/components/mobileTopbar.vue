<template>
	<div class="mobileTopbar">
		<div class="icon" @click="clickHandle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="rgb(34, 8, 204)" d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"></path></svg>
		</div>
		<span>zmzm's Personal Space</span>
		<div class="avatar">
			<img src="@/assets/home/default-avatar.jpg" alt="">
		</div>
	</div>
</template>

<script>
export default {
	name: 'MobileTopbar',
	methods: {
		//点击icon展开侧边栏
		clickHandle() {
			this.$bus.$emit('switchSidebar');
		}
	}
}
</script>

<style scoped>
.mobileTopbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.3rem;
	font-weight: bold;
	padding-bottom: 8px;
	border-bottom: 1px solid rgb(229, 224, 223);
	margin-bottom: 8px;
}

.mobileTopbar .icon {
	padding: 10px;
	border-radius: 10px;
}

.mobileTopbar .icon svg {
	width: 18px;
	height: 18px;
}

.mobileTopbar .avatar {
	border-radius: 50%;
	overflow: hidden;
}

.mobileTopbar .avatar img {
	width: 32px;
	height: 32px;
}
</style>