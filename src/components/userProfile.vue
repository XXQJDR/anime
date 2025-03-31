<template>
	<div class="user-profile" ref="userProfile">
		<!-- 通知 -->
		<el-badge
				class="notice"
				:value="100"
				:max="99"
				:hidden="false"
				@click.native="goToNotice"
		>
			<SvgIcon icon="notice" size="26"/>
		</el-badge>

		<!-- 发布帖子 -->
		<div class="publish-post" @click="goToPublishPost">
			<SvgIcon icon="addFile" size="26"/>
		</div>

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
			popoverFlag: false,
			oldScrollTop: 0
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
		},

		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
		}
	},
	watch: {
		browserIdentity() {
			if (this.browserIdentity === 'MOBILE') {
				this.$refs.userProfile.style.position = 'fixed';
				this.$refs.userProfile.style.top = '5px';
			} else {
				this.$refs.userProfile.style.position = 'absolute';
				this.$refs.userProfile.style.top = '1.3rem';
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
		},

		//跳转到消息管理
		goToNotice() {
			this.$router.push("/home/personal/notice");
			this.homeContentType = 'notice';
		},

		scrolling() {
			if (this.browserIdentity !== 'MOBILE') {
				return;
			}

			// 滚动条距文档顶部的距离
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
			// 滚动条滚动的距离
			let scrollStep = scrollTop - this.oldScrollTop;
			// 更新——滚动前，滚动条距文档顶部的距离
			this.oldScrollTop = scrollTop;
			this.$refs.userProfile.style.position = 'fixed';
			if (scrollStep > 0) {
				this.$refs.userProfile.style.top = '-60px';
			} else {
				this.$refs.userProfile.style.top = '5px';
			}
		},

		//跳转到发布帖子页面
		goToPublishPost() {
			this.$router.push("/publishPost");
		}
	},
	mounted() {
		setTimeout(() => {
			window.addEventListener("scroll", this.scrolling);
		});
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.scrolling);
	},
	//从详情页面返回
	activated() {
		setTimeout(() => {
			window.addEventListener('scroll', this.scrolling);
		}, 500);
	},
	//进入详情页面取消滚动加载
	deactivated() {
		window.removeEventListener('scroll', this.scrolling);
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
	transition: all .5s ease;

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
			animation: tada;
			animation-duration: 1s;
		}

		@media screen and (max-width: 768px) {
			.svg-icon {
				width: 22px;
				height: 22px;
			}
		}
	}

	.publish-post {
		margin-left: 3px;
		margin-right: 10px;
		cursor: pointer;

		@media screen and (max-width: 768px) {
			.svg-icon {
				width: 22px;
				height: 22px;
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