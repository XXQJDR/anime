<template>
	<div class="mobile-topbar">
		<div class="box" ref="box">
			<div class="icon" @click="clickHandle">
				<SvgIcon icon="menu" color="rgb(34, 8, 204)" :stroke="true"/>
			</div>

			<!-- 通知与用户 -->
			<div class="notice-and-user">
				<!-- 通知 -->
				<el-badge :value="12" class="notice">
					<SvgIcon icon="notice"/>
				</el-badge>

				<!-- 用户 -->
				<el-popover
						:visible-arrow="false"
						placement="bottom"
						trigger="click"
						@show="openPopover"
						@hide="closePopover"
						v-model="popoverFlag"
				>
					<ul>
						<li @click="goToPersonalCenter">
							<SvgIcon icon="personal"/>
							<div>个人中心</div>
						</li>
						<li @click="logout">
							<SvgIcon icon="logout" color="red"/>
							<div style="color: red">退出登录</div>
						</li>
					</ul>
					<div class="user" slot="reference" ref="user">
						<div class="avatar">
							<img src="http://q.qlogo.cn/headimg_dl?dst_uin=3124140355&spec=640&img_type=jpg" alt="">
						</div>
						<div class="name">{{ username }}</div>
						<SvgIcon icon="downArrow"/>
					</div>
				</el-popover>
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
			popoverFlag: false
		}
	},
	computed: {
		//用户名
		username() {
			return this.$store.state.userInfo.username;
		},

		//全局遮罩显示标志
		maskFlag: {
			get() {
				return this.$store.state.maskFlag;
			},
			set(val) {
				this.$store.commit('MASK_FLAG', val);
			}
		},

		//主页内容类型
		homeContentType: {
			get() {
				return this.$store.state.homeContentType;
			},
			set(val) {
				this.$store.commit('HOME_CONTENT_TYPE', val);
			}
		},
	},
	methods: {
		//点击icon
		clickHandle() {
			//展开侧边栏
			this.$store.commit('SIDEBAR_FLAG', true);

			//打开遮罩
			this.$store.commit('MASK_FLAG', true);

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

		//打开遮罩
		openPopover() {
			//打开遮罩
			this.maskFlag = true;

			//添加激活样式
			this.$refs.user.classList.add('popover-active');
		},

		//关闭遮罩
		closePopover() {
			//关闭遮罩
			this.maskFlag = false;

			//移除激活样式
			this.$refs.user.classList.remove('popover-active');
		},

		//退出登录
		logout() {
			//清除vuex中的数据
			this.$store.commit('TOKEN', '');
			this.$store.commit('USER_INFO', {});

			//清除localStorage中的用户数据
			localStorage.removeItem('token');
			localStorage.removeItem('userInfo');

			//跳转到欢迎页并刷新页面
			this.$router.push('/welcome').then(() => {
				location.reload();
			});
			this.$message.success('退出登录成功！');
		},

		//跳转到个人中心
		goToPersonalCenter() {
			this.$router.push('/home/personal/panel');
			this.homeContentType = 'panel';
			this.popoverFlag = false;
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

		/* 通知与用户 */
		.notice-and-user {
			display: flex;
			align-items: center;
			user-select: none;

			.notice {
				height: 28px;
				aspect-ratio: 1;
				margin-right: 1rem;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;

				&:hover {
					animation: tada;
					animation-duration: 1s;
				}
			}

			.user {
				display: flex;
				align-items: center;
				padding: 5px;
				cursor: pointer;
				border-radius: 15px;
				transition: background-color .3s ease;
				margin-right: 5px;

				&:hover {
					background-color: #f7f3f2;
				}

				.avatar {
					width: 30px;
					height: 30px;
					border-radius: 50%;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

				.name {
					margin: 0 10px;
					transition: color .3s ease;
				}
			}
		}
	}
}
</style>