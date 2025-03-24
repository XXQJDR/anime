<template>
	<div class="home">
		<!-- region 侧边栏 -->
		<div class="sidebar" :id="sidebarFlag?'enableSidebar':'disableSidebar'">
			<div class="logo">
				<i class="el-icon-s-promotion"/>
			</div>

			<div class="menu">
				<div class="menu-item">
					<div
							class="menu-item-title"
							:class="{'item-title-active':contentType==='animeList'}"
							@click="changeContentType('animeList')"
					>
						<SvgIcon icon="list" :stroke="true"/>
						<div class="title">列表</div>
					</div>
				</div>
				<div class="menu-item">
					<div
							class="menu-item-title"
							:class="{'item-title-active':contentType==='viewingHistory'}"
							@click="changeContentType('viewingHistory')"
					>
						<SvgIcon icon="history" :stroke="true"/>
						<div class="title">历程</div>
					</div>
				</div>
				<div class="menu-item">
					<div
							class="menu-item-title"
							:class="{'item-title-active':contentType==='animeRandom'}"
							@click="changeContentType('animeRandom')"
					>
						<SvgIcon icon="random" :stroke="true"/>
						<div class="title">随机</div>
					</div>
				</div>
				<div class="menu-item">
					<div
							class="menu-item-title"
							:class="{'item-title-active':contentType==='addAnime'}"
							@click="changeContentType('addAnime')"
					>
						<SvgIcon icon="add" :stroke="true"/>
						<div class="title">添加</div>
					</div>
				</div>
				<div class="menu-item">
					<div
							class="menu-item-title"
							:class="{'item-title-active':contentType==='dustbin'}"
							@click="changeContentType('dustbin')"
					>
						<SvgIcon icon="dustbin" :stroke="true"/>
						<div class="title">垃圾箱</div>
					</div>
				</div>
				<div class="menu-item">
					<div class="menu-item-title">
						<SvgIcon icon="personal" :stroke="true"/>
						<div class="title">个人中心</div>
					</div>
					<div class="submenu">
						<div
								class="submenu-item"
								:class="{'item-title-active':contentType==='panel'}"
								@click="changeContentType('panel')"
						>
							<i class="el-icon-c-scale-to-original"></i>
							<div class="title">仪表盘</div>
						</div>
						<div
								class="submenu-item"
								:class="{'item-title-active':contentType==='info'}"
								@click="changeContentType('info')"
						>
							<i class="el-icon-user"></i>
							<div class="title">个人信息</div>
						</div>
						<div
								class="submenu-item"
								:class="{'item-title-active':contentType==='post'}"
								@click="changeContentType('post')"
						>
							<i class="el-icon-document"></i>
							<div class="title">帖子</div>
						</div>
						<div
								class="submenu-item"
								:class="{'item-title-active':contentType==='notice'}"
								@click="changeContentType('notice')"
						>
							<i class="el-icon-bell"></i>
							<div class="title">通知</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- endregion -->

		<div class="content">
			<MobileTopbar v-if="browserIdentity === 'MOBILE'"/>

			<transition
					mode="out-in"
					enter-active-class="animate__animated animate__fadeIn"
					leave-active-class="animate__animated animate__fadeOut"
					:duration="{enter: 300, leave: 300}"
			>
				<ContentTop :key="contentType"/>
			</transition>

			<transition
					mode="out-in"
					enter-active-class="animate__animated animate__fadeIn"
					leave-active-class="animate__animated animate__fadeOut"
					:duration="{enter: 300, leave: 300}"
			>
				<router-view/>
			</transition>
		</div>
	</div>
</template>

<script>
import MobileTopbar from "@/components/mobileTopbar.vue";
import {mapState} from "vuex";
import ContentTop from "@/components/contentTop.vue";

export default {
	name: 'HomePage',
	components: {ContentTop, MobileTopbar},
	computed: {
		...mapState({
			sidebarFlag: 'sidebarFlag',
			browserIdentity: 'browserIdentity'
		}),

		//全局遮罩显示标志
		maskFlag: {
			get() {
				return this.$store.state.maskFlag;
			},
			set(val) {
				this.$store.commit('MASK_FLAG', val);
			}
		},

		//主页内容标志
		contentType: {
			get() {
				return this.$store.state.homeContentType;
			},
			set(val) {
				this.$store.commit('HOME_CONTENT_TYPE', val);
			}
		}
	},
	methods: {
		//点击切换内容类型
		changeContentType(type) {
			this.contentType = type;
			let path = '/home';
			switch (type) {
				case 'animeList':
					path += '/animeList';
					break;
				case 'viewingHistory':
					path += '/viewingHistory';
					break;
				case 'animeRandom':
					path += '/animeRandom';
					break;
				case 'addAnime':
					path += '/addAnime';
					break;
				case 'dustbin':
					path += '/dustbin';
					break;
				case 'panel':
					path += '/personal/panel';
					break;
				case 'info':
					path += '/personal/info';
					break;
				case 'post':
					path += '/personal/post';
					break;
				case 'notice':
					path += '/personal/notice';
					break;
			}
			this.$router.push(path);

			//移动端点击后关闭侧边栏及全局遮罩
			if (this.browserIdentity === 'MOBILE') {
				this.$store.commit('SIDEBAR_FLAG', false);
				this.maskFlag = false;
			}
		}
	}
}
</script>

<style scoped lang="scss">
.home {
	$sidebarWidth: 210px; //侧边栏宽度
	$sidebarMarginLeftWidth: 1rem; //侧边栏距离左侧的距离

	&::after {
		content: '';
		display: block;
		clear: both;
	}

	/* 侧边栏收起展开动画 */
	#disableSidebar {
		transform: translateX(calc(-100% - $sidebarMarginLeftWidth));
	}

	#enableSidebar {
		transform: translateX(0);
	}

	.sidebar {
		width: $sidebarWidth;
		height: 96vh;
		box-sizing: border-box;
		padding: 1.2rem 1rem;
		position: fixed;
		top: 2vh;
		left: 0;
		transition: transform .3s;
		background-color: white;
		z-index: 100;
		margin-left: $sidebarMarginLeftWidth;
		border-radius: 1.5rem;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		background-image: url('@/assets/images/sidebar/waves.png');
		background-repeat: no-repeat;
		user-select: none;

		.logo {
			text-align: center;

			i {
				color: #2b0aff;
				font-size: 1.5rem;
			}
		}

		.menu {
			margin-top: 1rem;

			.menu-item {
				margin-top: 10px;

				/* 取消个人中心的hover效果 */
				&:last-child .menu-item-title:hover {
					background-color: #FFFFFF;
					cursor: default;
				}

				/* item激活样式 */
				.item-title-active {
					background-color: #eae7ff !important;
					color: #2b0aff;
					font-weight: 700;

					svg {
						color: #2b0aff !important;
					}
				}

				/* 一级菜单 */
				.menu-item-title {
					padding: 0.6rem 0.8rem;
					cursor: pointer;
					transition: all 0.3s;
					display: flex;
					align-items: center;
					border-radius: 8px;

					&:hover {
						background-color: #f7f3f2;
					}

					.title {
						margin: 0 8px;
					}
				}

				/* 二级菜单 */
				.submenu {
					.submenu-item {
						padding: 0.6rem 0.8rem;
						cursor: pointer;
						transition: all 0.3s;
						display: flex;
						align-items: center;
						font-size: .9rem;
						border-radius: 8px;
						padding-left: 25px;

						&:hover {
							background-color: #f7f3f2;
						}

						.title {
							margin-left: 8px;
						}
					}
				}
			}
		}
	}

	.content {
		/* 减去滚动条的大小 */
		width: calc(100vw - $sidebarWidth - (100vw - 100%) - $sidebarMarginLeftWidth);
		min-height: 100vh;
		padding: 1.3rem 1rem 1rem 1rem;
		float: right;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			float: none;
			width: 100%;
			padding: 0 6px 6px 6px;
		}
	}
}
</style>