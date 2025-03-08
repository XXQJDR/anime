<template>
	<div class="dustbin">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg t="1741332809270"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14396">
				<path d="M944 192l-188.8 0 0-44.8c0-54.4-44.8-99.2-99.2-99.2l-294.4 0c-54.4 0-99.2 44.8-99.2 99.2l0 44.8-179.2 0c-12.8 0-25.6 9.6-25.6 25.6 0 12.8 9.6 25.6 25.6 25.6l60.8 0 0 0 0 633.6c0 54.4 44.8 99.2 99.2 99.2l550.4 0c54.4 0 99.2-44.8 99.2-99.2l0-630.4 0-3.2 51.2 0c12.8 0 25.6-9.6 25.6-25.6C966.4 204.8 960 192 944 192zM316.8 147.2c0-25.6 22.4-48 48-48l294.4 0c25.6 0 48 22.4 48 48l0 44.8-390.4 0L316.8 147.2zM841.6 867.2c0 28.8-16 57.6-41.6 57.6l-550.4 0c-25.6 0-54.4-19.2-54.4-44.8l3.2-636.8 643.2 0 0 0L841.6 867.2z" p-id="14397"></path>
				<path d="M368 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C390.4 393.6 384 380.8 368 380.8z" p-id="14398"></path>
				<path d="M528 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C550.4 393.6 544 380.8 528 380.8z" p-id="14399"></path>
				<path d="M688 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C710.4 393.6 704 380.8 688 380.8z" p-id="14400"></path>
			</svg>
			<div class="title">垃圾箱</div>
		</div>
		<!-- endregion -->

		<!-- region 动漫列表 -->
		<div class="listBox">
			<div class="list">
				<div class="item" v-for="(anime, index) in animeList" :key="anime.animeId">
					<div class="img">
						<img v-lazy="anime.cover" alt="">
					</div>
					<div class="content">
						<el-tooltip effect="dark" :content="anime.name" placement="top" :visible-arrow="false" :open-delay="300">
							<div class="info">{{anime.name}}</div>
						</el-tooltip>
						<div class="control">
							<button @click="openPopover(anime.animeUserId, index, $event)">
								<svg width="20px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-if="emptyFlag" description="暂无动漫" />
		</div>
		<!-- endregion -->

		<!-- region 复用弹出框 -->
		<el-popover
				:visible-arrow="false"
				trigger="manual"
				v-model="animeListPopoverFlag"
				popper-class="dustbinAnimeListPopover"
		>
			<ul>
				<li @click="recover">
					<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"></path>
					</svg>
					<div>恢复</div>
				</li>
				<li @click="thoroughlyRemove">
					<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path>
					</svg>
					<div>彻底删除</div>
				</li>
			</ul>
		</el-popover>
		<!-- endregion -->
	</div>
</template>

<script>
import {reqGetDustbinData, reqRecoverAnime, reqDeleteAnime} from "@/api";

export default {
	name: 'dustbinPage',
	data() {
		return {
			//动漫数据
			animeList: [],

			//空状态，true显示空状态
			emptyFlag: true,

			//打开popover对应的动漫数据
			popover: {
				animeUserId: 0,
				index: 0 //动漫在列表中的位置
			}
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

		//复用popover显示标志
		animeListPopoverFlag: {
			get() {
				return this.$store.state.animeListPopoverFlag;
			},
			set(val) {
				this.$store.commit('ANIME_LIST_POPOVER_FLAG', val);
			}
		}
	},
	created() {
		this.getDustbinData();
	},
	methods: {
		//获取垃圾箱数据
		async getDustbinData() {
			//获取数据
			let result = await reqGetDustbinData();
			if (result.code !== 200) {
				this.$message.error(result.msg);
				return ;
			}
			this.animeList = result.data || [];

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;
		},

		/**
		 * 恢复动漫
		 */
		async recover() {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let result = await reqRecoverAnime(this.popover.animeUserId);
			if (result.code !== 200) {
				this.$message.error('恢复失败！');
				return ;
			}

			this.$message.success('恢复成功！');

			//更新列表
			this.animeList.splice(this.popover.index, 1);
		},

		/**
		 * 彻底删除动漫
		 */
		async thoroughlyRemove() {
			//关闭编辑动漫弹窗及全局遮罩
			this.animeListPopoverFlag = false;
			this.maskFlag = false;

			let result = await reqDeleteAnime(this.popover.animeUserId);
			if (result.code !== 200) {
				this.$message.error('删除失败！');
				return ;
			}

			this.$message.success('删除成功！');

			//更新列表
			this.animeList.splice(this.popover.index, 1);

			this.emptyFlag = this.animeList.length === 0;
		},

		//打开popover
		openPopover(animeUserId, index, event) {
			//获取数据
			this.popover.animeUserId = animeUserId;
			this.popover.index = index;

			this.animeListPopoverFlag = true;
			this.maskFlag = true;

			//定位popover的位置
			this.$nextTick(() => {
				let popover = document.querySelector('.dustbinAnimeListPopover');
				if (!popover) return;

				// 获取关键尺寸
				let popoverWidth = popover.offsetWidth;
				let popoverHeight = popover.offsetHeight;
				let viewportWidth = document.documentElement.clientWidth;
				let viewportHeight = document.documentElement.clientHeight;

				// 获取滚动偏移量
				let scrollX = window.pageXOffset || document.documentElement.scrollLeft;
				let scrollY = window.pageYOffset || document.documentElement.scrollTop;

				// 计算文档流坐标
				const clickDocX = event.clientX + scrollX;
				const clickDocY = event.clientY + scrollY;

				// ===== 水平居中计算 =====
				let targetX = clickDocX - popoverWidth / 2;

				// 右侧越界修正
				if (targetX + popoverWidth > scrollX + viewportWidth) {
					targetX = scrollX + viewportWidth - popoverWidth - 5;
				}
				// 左侧越界修正
				else if (targetX < scrollX) {
					targetX = scrollX + 5;
				}

				// ===== 垂直位置计算 =====
				let targetY = clickDocY - popoverHeight - 10; // 目标位置：上方 10px

				// 上方空间不足时改为下方显示
				if (targetY < scrollY) {
					targetY = clickDocY + 10;
				}

				// 检查下方越界
				if (targetY + popoverHeight > scrollY + viewportHeight) {
					targetY = scrollY + viewportHeight - popoverHeight - 5;
				}

				// 应用最终坐标
				popover.style.left = `${Math.floor(targetX)}px`;
				popover.style.top = `${Math.floor(targetY)}px`;
			});
		}
	}
}
</script>

<style scoped lang="scss">
.dustbin {
	min-height: calc(100vh - 2.3rem);
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 768px) {
		//减去顶部导航栏高度
		min-height: calc(100vh - 6px - 60px);
	}

	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		margin-left: 1rem;

		@media screen and (max-width: 768px) {
			margin-left: 6px;
		}

		svg {
			width: 22px;
			height: 22px;
			fill: #000000;
			stroke: #000000;
			stroke-width: 20px;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}

	.listBox {
		flex: 1;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;
		position: relative;
		margin-top: 1rem;

		@media screen and (max-width: 768px) {
			padding: 10px;
		}

		/* 动漫列表 */
		.list {
			display: grid;
			grid-gap: 20px;

			@media screen and (max-width: 600px) {
				grid-template-columns: repeat(1, 1fr);
			}

			@media screen and (min-width: 600px) and (max-width: 1000px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media screen and (min-width: 1000px) and (max-width: 1260px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media screen and (min-width: 1260px) and (max-width: 1500px) {
				grid-template-columns: repeat(4, 1fr);
			}

			@media screen and (min-width: 1500px) {
				grid-template-columns: repeat(5, 1fr);
			}

			.item {
				/* item过渡时间 */
				$transitionTime: 0.3s;

				/*宽度与高度的比例*/
				aspect-ratio: 0.8;
				border-radius: 5px;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06);
				overflow: hidden;
				transition: all $transitionTime;
				cursor: pointer;

				/* 鼠标移入item给item添加阴影 */
				&:hover {
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05);

					/* 鼠标移入item给content添加背景 */
					.content {
						background-color: #f7f3f2;
					}
				}

				@media screen and (max-width: 768px) {
					aspect-ratio: 1;
				}

				.img {
					height: 82%;
					overflow: hidden;

					/* 鼠标移入图片放大图片 */
					&:hover {
						img {
							transform: scale(1.1);
						}
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform $transitionTime;
					}
				}

				.content {
					height: 18%;
					background-color: #FFFFFF;
					transition: background-color $transitionTime;

					&::after {
						content: '';
						display: block;
						clear: both;
					}

					.info {
						width: 85%;
						height: 100%;
						float: left;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-left: 5px;
						box-sizing: border-box;

						@media screen and (max-width: 768px) {
							width: 80%;
						}
					}

					.control {
						width: 15%;
						height: 100%;
						float: right;
						position: relative;

						@media screen and (max-width: 768px) {
							width: 20%;
						}

						button {
							width: 30px;
							height: 30px;
							border-radius: 50%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							transition: color, background-color .3s;

							/* 移入文字旁的按钮改变按钮背景色和svg颜色 */
							&:hover {
								background-color: #e5e0df;
								color: #3c3838;
							}

							@media screen and (max-width: 768px) {
								width: 35px;
								height: 35px;
							}

							svg {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;
								margin: auto;
								fill: #ada8a8;
							}
						}
					}
				}
			}
		}

		.el-empty {
			padding: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>

<style lang="scss">
.dustbinAnimeListPopover ul {
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