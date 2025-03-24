<template>
	<div class="user-profile">
		<!-- 通知 -->
		<el-badge class="notice" :value="100" :max="99" :hidden="false">
			<SvgIcon icon="notice" size="22"/>
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
					<SvgIcon icon="personal" :stroke="true"/>
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
				<div class="name">{{ $store.state.userInfo.username }}</div>
				<SvgIcon icon="downArrow"/>
			</div>
		</el-popover>
	</div>
</template>

<script>
export default {
	name: 'UserProfile',
	data() {
		return {
			popoverFlag: false
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

		//主页内容类型
		homeContentType: {
			get() {
				return this.$store.state.homeContentType;
			},
			set(val) {
				this.$store.commit('HOME_CONTENT_TYPE', val);
			}
		}
	},
	methods: {
		openPopover() {
			//打开遮罩
			this.maskFlag = true;

			//添加激活样式
			this.$refs.user.classList.add('popover-active');
		},

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
			this.$router.push("/home/personal/panel");
			this.homeContentType = 'panel';
			this.popoverFlag = false;
		}
	}
}
</script>

<style scoped lang="scss">
.user-profile {
	display: flex;
	align-items: center;
	user-select: none;
	position: absolute;
	top: 1.3rem;
	right: 1rem;
	z-index: 10;

	@media screen and (max-width: 768px) {
		top: 5px;
		right: 15px;
	}

	.notice {
		height: 32px;
		aspect-ratio: 1;
		margin-right: 1rem;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			height: 28px;
			animation: tada;
			animation-duration: 1s;
		}

		@media screen and (max-width: 768px) {
			.svg-icon {
				width: 18px;
				height: 18px;
			}
		}
	}

	.user {
		display: flex;
		align-items: center;
		padding: 5px;
		cursor: pointer;
		border-radius: 15px;
		transition: background-color .3s ease;

		&:hover {
			background-color: #f7f3f2;
		}

		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			@media screen and (max-width: 768px) {
				width: 30px;
				height: 30px;
			}

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
</style>