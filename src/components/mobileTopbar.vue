<template>
	<div class="mobileTopbar">
		<div class="box" ref="box">
			<div class="icon" @click="clickHandle">
				<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="rgb(34, 8, 204)" d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"></path></svg>
			</div>
			<div class="info">{{userInfo.username}}'s Personal Space</div>
		</div>
	</div>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: 'MobileTopbar',
	computed: {
		...mapState(['userInfo']),
	},
	data() {
		return {
			oldScrollTop: 0,
		}
	},
	methods: {
		//点击icon展开侧边栏
		clickHandle() {
			this.$store.commit('SIDEBAR_FLAG', true);
		},

		scrolling() {
			// 滚动条距文档顶部的距离（做兼容处理）===》不懂的可以结合画图理清逻辑
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			// 滚动条滚动的距离
			let scrollStep = scrollTop - this.oldScrollTop;
			// 更新——滚动前，滚动条距文档顶部的距离
			this.oldScrollTop = scrollTop;
			if (scrollStep > 0) {
				this.$refs['box'].style.top = '-60px';
			} else {
				this.$refs['box'].style.top = '0';
			}
		}
	},
	mounted() {
		window.addEventListener("scroll", this.scrolling);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.scrolling);
	}
}
</script>

<style scoped>
.mobileTopbar {
	--mobileTopbarHeight: 50px;
	height: var(--mobileTopbarHeight);
	margin-bottom: 10px;
}

.mobileTopbar .box {
	width: 100vw;
	height: var(--mobileTopbarHeight);
	display: flex;
	align-items: center;
	font-size: 1.3rem;
	font-weight: bold;
	border-bottom: 1px solid rgb(229, 224, 223);
	margin-bottom: 8px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	background-color: #F7F3F2;
	transition: all .5s;
}

.mobileTopbar .box .icon {
	height: 100%;
	width: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.mobileTopbar .box .info {
	height: 100%;
	width: 90%;
	text-align: center;
	line-height: var(--mobileTopbarHeight);
}

.mobileTopbar .box .icon svg {
	width: 18px;
	height: 18px;
}
</style>