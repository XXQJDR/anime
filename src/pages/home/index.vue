<template>
	<div class="home">
		<!-- region 侧边栏 -->
		<div class="sidebar" :id="sidebarFlag?'enableSidebar':'disableSidebar'">
			<el-popover
					:visible-arrow="false"
					placement="bottom"
					trigger="click"
					@show="maskFlag = true"
					popper-class="userPopover"
			>
				<ul>
					<li @click="logout">
						<svg t="1741333593654" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18202">
							<path d="M128 213.333333c0-46.933333 38.4-85.333333 85.333333-85.333333h341.333334v85.333333H213.333333v597.333334h341.333334v85.333333H213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V213.333333z m604.842667 256L624.64 361.130667l60.330667-60.330667 211.2 211.2-211.2 211.2-60.330667-60.330667L732.842667 554.666667H451.84v-85.333334h281.002667z" p-id="18203"></path>
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
					<svg t="1741331905462" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7742">
						<path d="M955.904 858.112z" p-id="7743"></path>
						<path d="M312.832 63.488H75.264C33.792 63.488 0 97.28 0 138.752v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264V138.752c0-41.472-33.792-75.264-75.264-75.264zM305.152 368.64H82.944V146.432h222.72V368.64zM312.832 572.416H75.264c-41.472 0-75.264 33.792-75.264 75.264v237.568c0 41.472 33.792 75.264 75.264 75.264h237.568c41.472 0 75.264-33.792 75.264-75.264v-237.568c0-41.472-33.792-75.264-75.264-75.264z m-7.68 305.152H82.944v-222.72h222.72v222.72zM518.144 169.984c2.048 1.024 4.608 1.536 6.656 1.536H982.528c2.048 0 4.096-0.512 6.144-1.024 18.944-4.096 32.768-20.48 32.768-39.936 0-18.944-13.312-35.328-31.744-39.936-2.048-1.024-4.608-1.536-7.168-1.536h-457.728c-2.56 0-5.12 0.512-7.168 2.048-17.92 4.608-31.232 20.992-31.232 39.424 0 18.432 13.312 35.328 31.744 39.424zM516.608 398.336c2.56 1.536 5.12 2.048 7.68 2.048h457.728c2.56 0 4.608-0.512 7.168-1.536 18.432-4.608 31.744-20.992 31.744-39.936 0-19.456-13.824-35.84-32.768-39.936-2.048-0.512-4.096-1.024-6.144-1.024H524.288c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0.512 17.92 13.312 34.304 30.72 38.912zM517.12 704c2.56 1.536 5.12 2.048 7.68 2.048h457.728c1.024 0 2.048 0 3.072-0.512 21.504-1.536 38.4-19.456 38.4-40.96 0-22.528-18.432-41.472-41.472-41.472H524.8c-2.048 0-4.608 0.512-6.656 1.536-18.432 4.608-31.744 20.992-31.744 39.936 0 18.432 12.8 34.304 30.72 39.424zM986.624 827.392c-1.536-0.512-2.56-0.512-4.096-0.512h-457.728c-2.56 0-5.12 0.512-7.68 2.048-17.92 4.608-30.72 20.992-30.72 39.424 0 18.944 13.312 35.328 32.256 39.936 2.048 1.024 4.096 1.024 6.144 1.024h454.656c1.024 0 2.048 0.512 3.072 0.512 22.528 0 41.472-18.432 41.472-41.472 0-20.992-16.384-38.912-37.376-40.96z" p-id="7744"></path>
					</svg>
					<div class="title">列表</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='viewingHistory'}" @click="changeContentType('viewingHistory')">
					<svg t="1741333367589" viewBox="0 0 1080 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17228">
						<path d="M523.637 512 523.637 197.904c0-19.589-15.629-34.995-34.91-34.995-19.414 0-34.908 15.668-34.908 34.995l0 348.919c0 19.589 15.629 34.995 34.908 34.995 1.956 0 3.871-0.159 5.735-0.465 1.854 0.306 3.757 0.465 5.698 0.465l233.134 0c19.285 0 34.705-15.63 34.705-34.909C768 527.495 752.461 512 733.295 512L523.637 512zM512 1024C229.23 1024 0 794.77 0 512S229.23 0 512 0c282.769 0 512 229.23 512 512S794.77 1024 512 1024zM512 954.182c244.21 0 442.181-197.972 442.181-442.182 0-244.21-197.971-442.182-442.181-442.182S69.818 267.79 69.818 512C69.818 756.21 267.79 954.182 512 954.182z" p-id="17229"></path>
					</svg>
					<div class="title">历程</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='animeRandom'}" @click="changeContentType('animeRandom')">
					<svg t="1741332391116" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12388" id="mx_n_1741332391116">
						<path d="M409.6 473.6h-18.176a12.8 12.8 0 0 1 0-25.6H409.6a37.888 37.888 0 0 0 34.816-22.528 12.8 12.8 0 0 1 17.152-6.144 12.544 12.544 0 0 1 6.144 16.896A63.488 63.488 0 0 1 409.6 473.6z m-94.976 0h-76.8a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6z m-153.6 0h-76.8a12.8 12.8 0 1 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6zM25.6 433.152a12.288 12.288 0 0 1-12.288-9.984A59.648 59.648 0 0 1 12.8 409.6v-65.792a12.8 12.8 0 0 1 25.6 0V409.6a44.288 44.288 0 0 0 0 8.192 12.544 12.544 0 0 1-9.728 15.104z m435.2-65.536a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 0 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8zM25.6 279.808a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 0 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8z m435.2-65.792a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 1 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8zM25.6 126.208a12.8 12.8 0 0 1-12.8-12.8V76.8a64.256 64.256 0 0 1 18.688-45.312 13.056 13.056 0 0 1 18.176 0 13.056 13.056 0 0 1 0 18.176A38.4 38.4 0 0 0 38.4 76.8v36.608a12.8 12.8 0 0 1-12.8 12.8z m427.008-64.256a13.056 13.056 0 0 1-10.752-5.888A38.4 38.4 0 0 0 409.6 38.4h-25.6a12.8 12.8 0 0 1 0-25.6h25.6a63.744 63.744 0 0 1 53.76 29.44 12.544 12.544 0 0 1-3.84 17.664 12.8 12.8 0 0 1-6.912 2.048zM307.2 38.4H230.4a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6z m-153.6 0H76.8a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6zM947.2 1011.2h-18.176a12.8 12.8 0 1 1 0-25.6H947.2a38.4 38.4 0 0 0 35.072-22.528 12.544 12.544 0 0 1 16.896-6.144 12.8 12.8 0 0 1 6.4 16.896A64.256 64.256 0 0 1 947.2 1011.2z m-94.976 0h-76.8a12.8 12.8 0 1 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6z m-153.6 0h-76.8a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6zM563.2 970.752a12.544 12.544 0 0 1-12.288-9.984 59.648 59.648 0 0 1-0.512-13.568v-65.792a12.8 12.8 0 0 1 25.6 0V947.2a28.672 28.672 0 0 0 0 8.192 12.8 12.8 0 0 1-9.984 15.104z m435.2-65.536a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 0 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8z m-435.2-87.808a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 0 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8z m435.2-65.792a12.8 12.8 0 0 1-12.8-12.8v-76.8a12.8 12.8 0 0 1 25.6 0v76.8a12.8 12.8 0 0 1-12.8 12.8z m-435.2-87.808a12.8 12.8 0 0 1-12.8-12.8V614.4a63.744 63.744 0 0 1 18.688-45.312 12.8 12.8 0 0 1 18.176 18.176A38.4 38.4 0 0 0 576 614.4v36.608a12.8 12.8 0 0 1-12.8 12.8z m427.008-64.256a13.056 13.056 0 0 1-10.752-5.888A38.4 38.4 0 0 0 947.2 576h-25.6a12.8 12.8 0 0 1 0-25.6h25.6a63.744 63.744 0 0 1 53.76 29.44 12.544 12.544 0 0 1-3.84 17.664 12.8 12.8 0 0 1-6.912 2.048zM844.8 576h-76.8a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6z m-153.6 0h-76.8a12.8 12.8 0 0 1 0-25.6h76.8a12.8 12.8 0 0 1 0 25.6z" p-id="12389"></path>
						<path d="M563.2 25.6m51.2 0l332.8 0q51.2 0 51.2 51.2l0 332.8q0 51.2-51.2 51.2l-332.8 0q-51.2 0-51.2-51.2l0-332.8q0-51.2 51.2-51.2Z" fill-opacity=".5" p-id="12390"></path>
						<path d="M947.2 473.6H614.4a64 64 0 0 1-64-64V76.8A64 64 0 0 1 614.4 12.8h332.8A64 64 0 0 1 1011.2 76.8v332.8a64 64 0 0 1-64 64z m-332.8-435.2A38.4 38.4 0 0 0 576 76.8v332.8a38.4 38.4 0 0 0 38.4 38.4h332.8a38.4 38.4 0 0 0 38.4-38.4V76.8A38.4 38.4 0 0 0 947.2 38.4z" p-id="12391"></path>
						<path d="M25.6 563.2m51.2 0l332.8 0q51.2 0 51.2 51.2l0 332.8q0 51.2-51.2 51.2l-332.8 0q-51.2 0-51.2-51.2l0-332.8q0-51.2 51.2-51.2Z" fill-opacity=".5" p-id="12392"></path>
						<path d="M409.6 1011.2H76.8A64 64 0 0 1 12.8 947.2V614.4A64 64 0 0 1 76.8 550.4h332.8a64 64 0 0 1 64 64v332.8a64 64 0 0 1-64 64z m-332.8-435.2A38.4 38.4 0 0 0 38.4 614.4v332.8A38.4 38.4 0 0 0 76.8 985.6h332.8a38.4 38.4 0 0 0 38.4-38.4V614.4a38.4 38.4 0 0 0-38.4-38.4z" p-id="12393"></path>
					</svg>
					<div class="title">随机</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='addAnime'}" @click="changeContentType('addAnime')">
					<svg t="1741333190936" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15383">
						<path d="M543.978319 543.978319l352.427678 0c17.665335 0 31.975249-14.312984 31.975249-31.978319 0-17.665335-14.308891-31.978319-31.975249-31.978319L543.978319 480.021681l0-352.426655c0-17.665335-14.312984-31.975249-31.978319-31.975249-17.665335 0-31.978319 14.308891-31.978319 31.975249l0 352.426655-352.426655 0c-17.665335 0-31.975249 14.310937-31.975249 31.976272 0 8.833179 3.577478 16.829294 9.363252 22.615067 5.785773 5.785773 13.778818 9.365298 22.611997 9.365298l352.426655 0 0 352.426655c0 8.833179 3.578502 16.826224 9.364275 22.611997s13.781888 9.363252 22.615067 9.363252c17.665335 0 31.977295-14.308891 31.977295-31.975249L543.978319 543.978319z" p-id="15384"></path>
					</svg>
					<div class="title">添加</div>
				</div>
				<div class="btn" :class="{btnActive:contentType==='dustbin'}" @click="changeContentType('dustbin')">
					<svg t="1741332809270"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14396">
						<path d="M944 192l-188.8 0 0-44.8c0-54.4-44.8-99.2-99.2-99.2l-294.4 0c-54.4 0-99.2 44.8-99.2 99.2l0 44.8-179.2 0c-12.8 0-25.6 9.6-25.6 25.6 0 12.8 9.6 25.6 25.6 25.6l60.8 0 0 0 0 633.6c0 54.4 44.8 99.2 99.2 99.2l550.4 0c54.4 0 99.2-44.8 99.2-99.2l0-630.4 0-3.2 51.2 0c12.8 0 25.6-9.6 25.6-25.6C966.4 204.8 960 192 944 192zM316.8 147.2c0-25.6 22.4-48 48-48l294.4 0c25.6 0 48 22.4 48 48l0 44.8-390.4 0L316.8 147.2zM841.6 867.2c0 28.8-16 57.6-41.6 57.6l-550.4 0c-25.6 0-54.4-19.2-54.4-44.8l3.2-636.8 643.2 0 0 0L841.6 867.2z" p-id="14397"></path>
						<path d="M368 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C390.4 393.6 384 380.8 368 380.8z" p-id="14398"></path>
						<path d="M528 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C550.4 393.6 544 380.8 528 380.8z" p-id="14399"></path>
						<path d="M688 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C710.4 393.6 704 380.8 688 380.8z" p-id="14400"></path>
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
					transition: all .3s;
					stroke: #000000;
					stroke-width: 20px;
				}

				.title {
					display: inline-block;
					vertical-align: middle;
					margin-left: 8px;
				}
			}

			.btnActive {
				background-color: #eae7ff !important;
				color: #2b0aff;
				font-weight: 700;

				svg {
					stroke: #2b0aff;
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

<style lang="scss">
.userPopover ul {
	li:last-child {
		color: red;
		svg {
			width: 18px;
			height: 18px;
			fill: red;
		}
	}
}
</style>