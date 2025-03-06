<template>
	<div class="home">
		<!-- region 侧边栏 -->
		<div class="sidebar" :id="sidebarFlag?'enableSidebar':'disableSidebar'">
			<el-popover
					:visible-arrow="false"
					placement="bottom"
					trigger="click"
					@show="maskFlag = true"
			>
				<ul>
					<li @click="logout">
						<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="right-from-bracket" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M352 146.2L462 256 352 365.8l0-53.8c0-13.3-10.7-24-24-24l-120 0 0-64 120 0c13.3 0 24-10.7 24-24l0-53.8zM512 256c0-11.5-4.6-22.5-12.7-30.6L383.2 109.6c-8.7-8.7-20.5-13.6-32.8-13.6c-25.6 0-46.4 20.8-46.4 46.4l0 33.6-96 0c-26.5 0-48 21.5-48 48l0 64c0 26.5 21.5 48 48 48l96 0 0 33.6c0 25.6 20.8 46.4 46.4 46.4c12.3 0 24.1-4.9 32.8-13.6L499.3 286.6c8.1-8.1 12.7-19.1 12.7-30.6zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z"></path>
						</svg>
						<div>退出登录</div>
					</li>
				</ul>
				<div class="user" slot="reference">
					<i class="el-icon-s-promotion" />
					<div>{{userInfo.username}}</div>
				</div>
			</el-popover>
			<div class="btns">
				<div class="btn" :class="{btnActive:contentType==='animeList'}" @click="changeContentType('animeList')">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="rectangle-history" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-metatip="true">
						<path d="M464 224c0-8.8-7.2-16-16-16L64 208c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-224zm-16-64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64l384 0zm-8-80c13.3 0 24 10.7 24 24s-10.7 24-24 24L72 128c-13.3 0-24-10.7-24-24s10.7-24 24-24l368 0zM392 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L120 48c-13.3 0-24-10.7-24-24s10.7-24 24-24L392 0z"></path>
					</svg>
					<div class="title">列表</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='viewingHistory'}" @click="changeContentType('viewingHistory')">
					<svg viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path d="M526.628571 117.028571c216.502857 0 394.971429 178.468571 394.971429 394.971429S743.131429 906.971429 526.628571 906.971429s-394.971429-178.468571-394.971428-394.971429 178.468571-394.971429 394.971428-394.971429z m0-87.771428c-266.24 0-482.742857 213.577143-482.742857 482.742857 0 266.24 213.577143 482.742857 482.742857 482.742857 266.24 0 482.742857-213.577143 482.742858-482.742857S792.868571 29.257143 526.628571 29.257143z" />
						<path d="M678.765714 760.685714c-11.702857 0-23.405714-2.925714-32.182857-14.628571l-152.137143-175.542857c-5.851429-5.851429-11.702857-17.554286-11.702857-29.257143V321.828571c0-23.405714 20.48-43.885714 43.885714-43.885714s43.885714 20.48 43.885715 43.885714v201.874286l143.36 160.914286c14.628571 17.554286 11.702857 46.811429-2.925715 61.44-11.702857 11.702857-20.48 14.628571-32.182857 14.628571z"></path>
					</svg>
					<div class="title">历程</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='animeRandom'}" @click="changeContentType('animeRandom')">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="book-open" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
						<path d="M156 32C100.6 32 48.8 46.6 27.1 53.6C10.3 59 0 74.5 0 91.1V403.5c0 26.1 24 44.2 48 40.2c19.8-3.3 54.8-7.7 100-7.7c54 0 97.5 25.5 112.5 35.6c7.5 5 16.8 8.4 27 8.4c11.5 0 21.6-4.2 29.3-9.9C330.2 460.3 369.1 436 428 436c47.7 0 80.5 4 99 7.2c23.9 4.1 49-13.8 49-40.6V91.1c0-16.5-10.3-32.1-27.1-37.5C527.2 46.6 475.4 32 420 32c-36.8 0-71.8 6.4-97.4 12.7c-12.8 3.2-23.5 6.3-30.9 8.7c-1.3 .4-2.6 .8-3.7 1.2c-1.1-.4-2.4-.8-3.7-1.2c-7.5-2.4-18.1-5.5-30.9-8.7C227.8 38.4 192.8 32 156 32zM264 97.3V417.9C238 404.2 196.8 388 148 388c-42.9 0-77.4 3.7-100 7.1V97.3C70.3 90.6 112.4 80 156 80c31.6 0 62.6 5.6 85.9 11.3c8.6 2.1 16.1 4.2 22.1 6zm48 319.2V97.3c6-1.8 13.5-3.9 22.1-6C357.4 85.6 388.4 80 420 80c43.6 0 85.7 10.6 108 17.3V394.7c-21.7-3.3-54.9-6.7-100-6.7c-51.4 0-90.8 15-116 28.6z"></path>
					</svg>
					<div class="title">随机</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='addAnime'}" @click="changeContentType('addAnime')">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path>
					</svg>
					<div class="title">添加</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='dustbin'}" @click="changeContentType('dustbin')">
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						<path d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path>
					</svg>
					<div class="title">垃圾箱</div>
				</div>
			</div>
		</div>
		<!-- endregion -->

		<div class="content">
			<MobileTopbar v-if="browserIdentity === 'MOBILE'" />
			<transition
					name="fade"
					mode="out-in"
					enter-active-class="animate__animated animate__fadeIn"
					leave-active-class="animate__animated animate__fadeOut"
					:duration="{enter: 400, leave: 400}"
			>
				<router-view />
			</transition>
		</div>
	</div>
</template>

<script>
import MobileTopbar from "@/components/mobileTopbar.vue";
import {mapState} from "vuex";

export default {
	name: 'HomePage',
	components: {MobileTopbar},
	computed: {
		...mapState({
			contentType: 'homeContentType',
			sidebarFlag: 'sidebarFlag',
			userInfo: 'userInfo',
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
		}
	},
	methods: {
		//点击切换内容类型
		changeContentType(type) {
			this.$store.commit('HOME_CONTENT_TYPE', type);
			this.$router.push('/home/' + type);

			//移动端点击后关闭侧边栏及全局遮罩
			if (this.browserIdentity === 'MOBILE') {
				this.$store.commit('SIDEBAR_FLAG', false);
				this.maskFlag = false;
			}
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

	/* 侧边栏 */
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

		.user {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 12px 5px;
			cursor: pointer;
			user-select: none;
			box-sizing: border-box;
			border-radius: 10px;
			transition: background-color .3s;
			font-size: 1.1rem;

			&:hover {
				background-color: #EAE7FF;
			}

			> i {
				color: #2b0aff;
				width: 12%;

				@media screen and (max-width: 768px) {
					font-size: 25px;
				}
			}

			> div {
				width: 88%;
				text-align: center;
			}
		}

		.btns {
			margin-top: 2rem;

			.btn {
				padding: 0.6rem 0.8rem;
				border-radius: 8px;
				cursor: pointer;
				margin-top: 1rem;
				transition: all 0.3s;

				&:hover {
					background-color: #f7f3f2;
				}

				svg {
					display: inline-block;
					width: 18px;
					height: 18px;
					vertical-align: middle;
					fill: #726e6e;
					transition: fill .3s;
				}

				.title {
					display: inline-block;
					font-size: 0.9rem;
					vertical-align: middle;
					margin-left: 8px;
				}
			}

			.btnActive {
				background-color: #eae7ff !important;
				color: #2b0aff;
				font-weight: 700;

				svg {
					fill: #2b0aff;
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