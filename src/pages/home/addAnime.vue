<template>
	<div class="addAnime">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3c3838" d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"></path></svg>
			<div>添加动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 输入框 -->
		<div class="form">
			<svg viewBox="0 0 24 24" focusable="false"><path fill="#cac5c4" d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"></path></svg>
			<input type="text" placeholder="请输入关键词(搜索请按回车键)" v-model="keyword" @keyup.enter="searchHandle" @focus="handleFocus">
			<div class="suggestion" v-show="suggestionFlag" v-loading="loading">
				<div class="item" v-for="(anime, index) in suggestionList" :key="index">
					<div class="img">
						<img v-lazy="anime.cover" alt="">
						<div class="mask" @click="addAnimeHandle(anime)">
							<div class="box">
								<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M612.37248 411.62752V30.208h-200.74496v381.41952H30.208v200.74496h381.41952v381.41952h200.74496V612.37248h381.41952v-200.74496z"/></svg>
							</div>
						</div>
					</div>
					<div class="info">
						<h3 class="title">{{anime.title}}</h3>
						<div class="other">
							<div class="otherItem notNecessary">
								<span class="key">动画种类</span>
								<span>：</span>
								<span class="value">{{anime.kind}}</span>
							</div>
							<div class="otherItem">
								<span class="key">首播时间</span>
								<span>：</span>
								<span class="value">{{anime.firstPlayDate}}</span>
							</div>
							<div class="otherItem">
								<span class="key">播放状态</span>
								<span>：</span>
								<span class="value">{{anime.status}}</span>
							</div>
							<div class="otherItem">
								<span class="key">原作</span>
								<span>：</span>
								<span class="value">{{anime.original}}</span>
							</div>
							<div class="otherItem notNecessary">
								<span class="key">剧情类型</span>
								<span>：</span>
								<span class="value">{{anime.storyType}}</span>
							</div>
							<div class="otherItem">
								<span class="key">制作公司</span>
								<span>：</span>
								<span class="value">{{anime.company}}</span>
							</div>
						</div>
						<div class="intro">
							<span class="key">简介</span>
							<span>：</span>
							<span class="value">{{anime.description}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- endregion -->
	</div>
</template>

<script>
import _ from "lodash";
import {reqAddAnime, reqSearchAnimeForAdd} from "@/api";

export default {
	name: 'AddAnime',
	data() {
		return {
			//搜索关键词
			keyword: '',

			//搜索结果列表
			suggestionList: [],

			//搜索结果框显示标志
			suggestionFlag: false,

			//加载标志
			loading: false
		}
	},
	methods: {
		//按下回车搜索回调
		searchHandle: _.throttle(async function () {
			if (this.keyword.length === 0) {
				return;
			}

			//显示结果框并开启加载动画
			this.suggestionFlag = true;
			this.loading = true;

			//搜索动漫
			let result = await reqSearchAnimeForAdd(this.keyword);
			this.suggestionList = result.data || [];

			//搜索结果为空关闭结果框
			if (this.suggestionList.length === 0) {
				this.suggestionFlag = false;
			}

			//关闭加载动画
			this.loading = false;
		}, 1000),

		//添加动漫
		async addAnimeHandle(anime) {
			let result = await reqAddAnime(anime);
			if (result.code !== 200) {
				if (result.code !== 402 && result.code !== 403) {
					this.$message.error(result.msg);
				}

				return ;
			}

			this.$message.success(result.msg);

			//从搜索结果中删除添加的动漫
			this.suggestionList = this.suggestionList.filter(item => item.id !== anime.id);

			//如果添加的动漫是搜索结果框中最后一个，关闭搜索框
			if (this.suggestionList.length === 0) {
				this.suggestionFlag = false;
			}
		},

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
		}
	}
}
</script>

<style scoped lang="scss">
.addAnime {
	/* 模块分类名称 */
	.typeTitle {
		min-width: 110px;
		font-size: 1.5rem;
		display: flex;
		align-items: center;

		svg {
			width: 18px;
			height: 18px;
		}

		div {
			min-width: 76px;
			margin-left: 15px;
			font-weight: bold;
		}
	}

	/* 输入框 */
	.form {
		width: 100%;
		position: relative;
		margin-top: 1rem;

		svg {
			width: 1.1rem;
			height: 1.1rem;
			position: absolute;
			top: 12px;
			left: 10px;

			@media screen and (max-width: 768px) {
				top: 16px;
			}
		}

		input {
			width: 100%;
			height: 45px;
			outline: transparent solid 2px;
			outline-offset: 2px;
			border: 1px solid #DCDFE6;
			border-radius: 5px;
			transition: all 0.2s;

			/* 使输入文字居中 */
			text-align: center;
			&:hover {
				border-color: #C0C4CC;
			}
			&:focus {
				border-color: rgb(49, 130, 206);
				box-shadow: rgb(49, 130, 206) 0 0 0 1px;
				background-color: #FFFFFF;
			}

			/* placeholder居中 */
			&::-ms-input-placeholder,
			&::-webkit-input-placeholder {
				text-align: center;
			}
		}

		/* 输入建议 */
		.suggestion {
			width: 100%;
			min-width: 710px;
			min-height: 200px;
			background-color: #FFFFFF;
			margin-top: 1rem;
			border-radius: 10px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
			font-size: 0.9rem;

			@media screen and (max-width: 768px) {
				width: 100%;
				min-width: auto;
				font-size: 1rem;
			}

			@media screen and (min-width: 768px) and (max-width: 1000px) {
				min-width: 0;
			}

			.item {
				width: 100%;
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 10px;
				border-bottom: 1px solid rgba(0, 0, 0, .1);
				transition: background-color 0.3s;
				box-sizing: border-box;

				@media screen and (max-width: 768px) {
					padding: 5px 0;
				}

				@media screen and (min-width: 768px) {
					/* 鼠标移入一行内背景颜色改变 */
					&:hover {
						background-color: #F7F3F2;
					}
				}

				&:last-child {
					border-bottom: none;
				}

				.img {
					min-width: 147px;
					max-width: 147px;
					height: 205px;
					border-radius: 5px;
					overflow: hidden;
					position: relative;
					cursor: pointer;

					@media screen and (max-width: 768px) {
						min-width: 122px;
						max-width: 122px;
						height: 170px;
					}

					@media screen and (min-width: 768px) {
						&:hover {
							/* 鼠标移入图片展示遮罩 */
							.mask {
								opacity: 1;
							}

							/* 鼠标移入图片，图片放大 */
							img {
								transform: scale(1.1);
							}
						}

						/* 鼠标移入添加按钮，添加按钮旋转 */
						.mask .box:hover {
							transform: rotateZ(180deg);
						}
					}

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
						transition: transform 0.3s;
					}

					.mask {
						width: 100%;
						height: 100%;
						background-color: rgba(0, 0, 0, .4);
						position: absolute;
						top: 0;
						left: 0;
						opacity: 0;
						transition: opacity 0.3s;

						.box {
							width: 50px;
							height: 50px;
							background-color: rgba(0, 0, 0, .5);
							border-radius: 50%;
							position: absolute;
							top: 0;
							bottom: 0;
							left: 0;
							right: 0;
							margin: auto;
							transition: all .5s;

							svg {
								width: 25px;
								height: 25px;
								position: absolute;
								top: 0;
								bottom: 0;
								left: 0;
								right: 0;
								margin: auto;
							}
						}
					}
				}

				.info {
					padding: 0 15px;

					h3 {
						margin-bottom: 5px;
					}

					.other {
						display: grid;
						grid-template-columns: repeat(2, 1fr);
						grid-auto-rows: 30px;
						line-height: 30px;

						@media screen and (max-width: 1000px) {
							display: block;
						}

						.notNecessary {
							@media screen and (max-width: 1000px) {
								display: none;
							}
						}

						.otherItem {
							justify-items: start;

							.key {
								display: inline-block;
								width: 69px;
								text-align: right;

								@media screen and (max-width: 768px) {
									width: 56px;
								}
							}

							.value {
								color: #726e6e;
							}
						}
					}

					.intro {
						margin-top: 5px;
						word-break: break-all;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;

						@media screen and (max-width: 1000px) {
							display: none;
						}

						.value {
							color: #726e6e;
						}
					}
				}
			}
		}
	}
}
</style>