<template>
	<div class="content-top">
		<!-- 模块分类名称 -->
		<div class="type-title" v-show="homeContentType === 'animeList'">
			<SvgIcon icon="list" size="22" :stroke="true"/>
			<div>动漫列表</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'viewingHistory'">
			<SvgIcon icon="history" size="22" :stroke="true"/>
			<div>观看历程</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'animeRandom'">
			<SvgIcon icon="random" size="22" :stroke="true"/>
			<div class="title">随机动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'addAnime'">
			<SvgIcon icon="add" size="22" :stroke="true"/>
			<div>添加动漫</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'dustbin'">
			<SvgIcon icon="dustbin" size="22" :stroke="true"/>
			<div class="title">垃圾箱</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'panel'">
			<i class="el-icon-c-scale-to-original"></i>
			<div class="title">仪表盘</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'info'">
			<i class="el-icon-user"></i>
			<div class="title">个人信息</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'post'">
			<i class="el-icon-document"></i>
			<div class="title">帖子</div>
		</div>
		<div class="type-title" v-show="homeContentType === 'notice'">
			<i class="el-icon-bell"></i>
			<div class="title">通知</div>
		</div>

		<!-- 通知与用户 -->
		<div class="notice-and-user" v-show="browserIdentity === 'PC'">
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
	</div>
</template>

<script>
export default {
	name: 'ContentTop',
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
		},

		//浏览器身份
		browserIdentity() {
			return this.$store.state.browserIdentity;
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
.content-top {
	display: flex;
	justify-content: space-between;
	align-items: center;

	/* 模块分类名称 */
	.type-title {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		margin-left: 1rem;

		@media screen and (max-width: 768px) {
			margin-left: 6px;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}

	/* 通知与用户 */
	.notice-and-user {
		display: flex;
		align-items: center;
		user-select: none;

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
</style>