<template>
	<div class="mobile-topbar">
		<div class="box" ref="box">
			<div class="icon" @click="clickHandle">
				<SvgIcon icon="menu" color="rgb(34, 8, 204)" :stroke="true"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MobileTopbar',
	data() {
		return {
			oldScrollTop: 0,
		}
	},
	computed: {
		//全局遮罩显示标志
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
		}
	},
	methods: {
		//点击icon
		clickHandle() {
			//展开侧边栏
			this.sidebarFlag = true;

			//打开遮罩
			this.maskFlag = true;

			//将侧边栏置于顶层
			let sidebar = document.querySelector('.sidebar');
			sidebar.style.zIndex = 200;
		},

		scrolling() {
			// 滚动条距文档顶部的距离
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
		},
	},
	mounted() {
		window.addEventListener("scroll", this.scrolling);
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.scrolling);
	}
}
</script>

<style scoped lang="scss">
.mobile-topbar {
	$mobileTopbarHeight: 50px;

	height: $mobileTopbarHeight;
	margin-bottom: 10px;

	.box {
		width: 96vw;
		height: $mobileTopbarHeight;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 5;
		transition: all .5s ease;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		overflow: hidden;

		.icon {
			width: 35px;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>