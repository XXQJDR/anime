<template>
	<div class="dustbin">
		<!-- region 动漫列表 -->
		<div class="list-box" v-loading="loading">
			<div class="list">
				<div class="item" v-for="(anime, index) in animeList" :key="anime.animeId">
					<div class="img">
						<img v-lazy="anime.cover" alt="">
					</div>
					<div class="content">
						<el-tooltip
								effect="dark"
								:content="anime.name"
								placement="top"
								:visible-arrow="false"
								:open-delay="300"
						>
							<div class="info">{{ anime.name }}</div>
						</el-tooltip>
						<div class="control">
							<SvgIcon
									icon="more"
									color="#ada8a8"
									size="26"
									@click.native="openPopover(anime.animeUserId, index, $event)"
							/>
						</div>
					</div>
				</div>
			</div>
			<el-empty v-if="emptyFlag" description="暂无动漫"/>
		</div>
		<!-- endregion -->

		<!-- region 复用弹出框 -->
		<el-popover
				:visible-arrow="false"
				trigger="manual"
				v-model="reusePopoverFlag"
				popper-class="dustbin-anime-list-popover"
		>
			<ul>
				<li @click="recover">
					<SvgIcon icon="recover"/>
					<div>恢复</div>
				</li>
				<li @click="thoroughlyRemove">
					<SvgIcon icon="cancel" color="red"/>
					<div style="color: red">彻底删除</div>
				</li>
			</ul>
		</el-popover>
		<!-- endregion -->
	</div>
</template>

<script>
import {reqGetDustbinData, reqRecoverAnime, reqDeleteAnime} from "@/api";

export default {
	name: 'Dustbin',
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
			},

			//数据加载标志
			loading: false
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
		reusePopoverFlag: {
			get() {
				return this.$store.state.reusePopoverFlag;
			},
			set(val) {
				this.$store.commit('REUSE_POPOVER_FLAG', val);
			}
		}
	},
	created() {
		this.getDustbinData();
	},
	methods: {
		//获取垃圾箱数据
		async getDustbinData() {
			this.loading = true;

			//获取数据
			let result = await reqGetDustbinData();
			if (result.code !== 200) {
				this.$message.error(result.msg);
				this.loading = false;
				return;
			}
			this.animeList = result.data || [];

			//数据为空展示空状态
			this.emptyFlag = this.animeList.length === 0;
			this.loading = false;
		},

		/**
		 * 恢复动漫
		 */
		async recover() {
			//关闭编辑动漫弹窗及全局遮罩
			this.reusePopoverFlag = false;
			this.maskFlag = false;

			let result = await reqRecoverAnime(this.popover.animeUserId);
			if (result.code !== 200) {
				this.$message.error('恢复失败！');
				return;
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
			this.reusePopoverFlag = false;
			this.maskFlag = false;

			let result = await reqDeleteAnime(this.popover.animeUserId);
			if (result.code !== 200) {
				this.$message.error('删除失败！');
				return;
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

			this.reusePopoverFlag = true;
			this.maskFlag = true;

			//定位popover的位置
			this.$nextTick(() => {
				let popover = document.querySelector('.dustbin-anime-list-popover');
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
@import "@/style/common.scss";
.dustbin {
	.list-box {
		margin-top: 1rem;
		@include box-style;
		@include content-min-height;

		//使空标志居中
		position: relative;

		//防止加载动画溢出
		overflow: hidden;

		/* 动漫列表 */
		.list {
			display: grid;
			grid-gap: 15px;

			@media screen and (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
				grid-gap: 10px;
			}

			@media screen and (min-width: 768px) and (max-width: 1000px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media screen and (min-width: 1000px) and (max-width: 1260px) {
				grid-template-columns: repeat(4, 1fr);
			}

			@media screen and (min-width: 1260px) {
				grid-template-columns: repeat(5, 1fr);
			}

			.item {
				/* item过渡时间 */
				$transitionTime: 0.3s;

				/*宽度与高度的比例*/
				aspect-ratio: 1 / 1.618;
				border-radius: 5px;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
				overflow: hidden;
				transition: all $transitionTime;
				cursor: pointer;

				/* 鼠标移入item给item添加阴影 */
				&:hover {
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

					/* 鼠标移入item给content添加背景 */
					.content {
						background-color: #f7f3f2;
					}
				}

				.img {
					height: 82%;
					overflow: hidden;

					/* 鼠标移入图片放大图片 */
					&:hover {
						img {
							transform: scale(1.05);
						}
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform $transitionTime;

						//防止图片下圆角显示不正常
						display: block;
					}
				}

				.content {
					height: 18%;
					background-color: #FFFFFF;
					transition: background-color $transitionTime;
					display: flex;
					align-items: center;

					.info {
						flex: 1;
						text-align: center;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding-left: 5px;
					}

					.control {
						width: 35px;
						display: flex;
						justify-content: center;
						align-items: center;

						.svg-icon {
							border-radius: 50%;
							transition: color, background-color .3s;
							cursor: pointer;
							margin-right: 3px;
							padding: 3px;

							/* 移入文字旁的按钮改变按钮背景色和svg颜色 */
							&:hover {
								background-color: #e5e0df;
								color: #3c3838;
							}
						}
					}
				}
			}
		}
	}
}
</style>