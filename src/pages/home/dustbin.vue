<template>
	<div class="dustbin">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg width="22px" height="22px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"></path>
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
				popper-class="animeListPopover"
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
				let popover = document.querySelector('.animeListPopover');
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
			fill: #3c3838;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
			color: #3c3838;
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