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
		<el-skeleton :loading="loading" animated :throttle="500" :count="3">
			<div slot="template">
				<el-skeleton-item variant="image" />
				<el-skeleton-item variant="text" />
				<el-skeleton-item variant="text" />
			</div>
			<template>
				<div class="list">
					<div class="item" v-for="(anime, index) in animeList" :key="index">
						<div class="img">
							<img v-lazy="anime.cover" alt="">
						</div>
						<div class="content">
							<el-tooltip effect="dark" :content="anime.title" placement="top" :visible-arrow="false" :open-delay="300">
								<div class="info">{{anime.title}}</div>
							</el-tooltip>
							<div class="control">
								<el-popover
										:visible-arrow="false"
										popper-class="popover"
										placement="top"
										width="200"
										:ref="'popover-' + index"
										trigger="click">
									<ul>
										<li @click="recover(index, anime.collectId)">
											<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
												<path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"></path>
											</svg>
											<div>恢复</div>
										</li>
										<li @click="thoroughlyRemove(index, anime.collectId)">
											<svg width="18px" height="18px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
												<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"></path>
											</svg>
											<div>彻底删除</div>
										</li>
									</ul>
									<button slot="reference" @click.stop>
										<svg width="20px" height="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M432 256a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zm-160 0a48 48 0 1 1 -96 0 48 48 0 1 1 96 0zM64 304a48 48 0 1 1 0-96 48 48 0 1 1 0 96z"></path>
										</svg>
									</button>
								</el-popover>
							</div>
						</div>
					</div>
				</div>
			</template>
		</el-skeleton>
		<el-empty v-if="emptyFlag" :image-size="250" description="暂无动漫" />
		<!-- endregion -->
	</div>
</template>

<script>
import {reqGetDustbinData, reqRecoverAnime, reqRemoveAnime} from "@/api";

export default {
	name: 'dustbinPage',
	data() {
		return {
			//加载动画标志，true显示加载动画
			loading: false,

			//动漫数据
			animeList: [],

			//空状态，true显示空状态
			emptyFlag: true,
		}
	},
	created() {
		this.getDustbinData();
	},
	methods: {
		//获取垃圾箱数据
		async getDustbinData() {
			try {
				//开启加载动画
				this.loading = true;

				//获取数据
				let result = await reqGetDustbinData();
				if (result.code !== 200) {
					this.$message.error(result.msg);
					return ;
				}
				this.animeList = result.data || [];

				//数据为空展示空状态
				this.emptyFlag = this.animeList.length === 0;
			} finally {
				//关闭加载动画
				this.loading = false;
			}
		},

		//恢复
		async recover(index, collectId) {
			//关闭编辑动漫弹窗
			this.$refs['popover-' + index][0].doClose();

			let result = await reqRecoverAnime(collectId);
			if (result.code !== 200) {
				this.$message.error('恢复失败！');
				return ;
			}

			this.$message.success('恢复成功！');

			//更新列表
			this.animeList.splice(index, 1);
		},

		//彻底删除
		async thoroughlyRemove(index, collectId) {
			//关闭编辑动漫弹窗
			this.$refs['popover-' + index][0].doClose();

			let result = await reqRemoveAnime(collectId);
			if (result.code !== 200) {
				this.$message.error('删除失败！');
				return ;
			}

			this.$message.success('删除成功！');

			//更新列表
			this.animeList.splice(index, 1);

			this.emptyFlag = this.animeList.length === 0;
		}
	}
}
</script>

<style scoped lang="scss">
.dustbin {
	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;

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

	/* 骨架屏样式 */
	.el-skeleton {
		margin-top: 1.5rem;

		> div .el-skeleton__image {
			width: 100%;
			height: 260px;
		}

		@media screen and (max-width: 768px) {
			> div {
				margin-top: 1rem;
				width: 100%;
			}

			> div .el-skeleton__image {
				margin-bottom: 5px;
			}
		}

		@media screen and (min-width: 750px) {
			display: flex;

			> div {
				margin-left: 1rem;
				width: 280px;
			}
		}
	}

	/* 动漫列表 */
	.list {
		margin-top: 1.5rem;
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
				transform: translateY(-1px);

				/* 鼠标移入item给content添加背景 */
				.content {
					background-color: #f7f3f2;
				}

				/* 鼠标移入item放大img */
				.img img {
					transform: scale(1.1);
				}
			}

			@media screen and (max-width: 768px) {
				aspect-ratio: 1;
			}

			.img {
				height: 82%;
				overflow: hidden;

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
}
</style>