<template>
	<div class="add-anime">
		<!-- region 输入框 -->
		<div class="form">
			<SvgIcon icon="search" size="20" color="#cac5c4"/>
			<input
					type="text"
					placeholder="请输入关键词(搜索请按回车键)"
					v-model="keyword"
					@keyup.enter="searchHandle"
					@focus="handleFocus"
			/>
		</div>
		<!-- endregion -->

		<!-- region 排序 -->
		<div class="sort">
			<el-popover
					:visible-arrow="false"
					placement="bottom"
					trigger="click"
					@show="openSortPopover"
					@hide="closeSortPopover"
					v-model="sortPopoverFlag"
			>
				<ul>
					<li
							@click="changeSort('DEFAULT')"
							:class="{'popover-li-active':selectedSortName === 'DEFAULT'}"
					>
						<SvgIcon icon="descSort"/>
						<div>默认排序</div>
					</li>
					<li
							@click="changeSort('PLAY_DESC')"
							:class="{'popover-li-active':selectedSortName === 'PLAY_DESC'}"
					>
						<SvgIcon icon="descSort"/>
						<div>播放时间降序</div>
					</li>
					<li
							@click="changeSort('PLAY_ASC')"
							:class="{'popover-li-active':selectedSortName === 'PLAY_ASC'}"
					>
						<SvgIcon icon="ascSort"/>
						<div>播放时间升序</div>
					</li>
				</ul>
				<div class="btn" slot="reference" ref="sortBtn">
					<SvgIcon icon="sort"/>
					<div>
						<span v-show="selectedSortName === 'DEFAULT'">默认排序</span>
						<span v-show="selectedSortName === 'PLAY_DESC'">播放时间降序</span>
						<span v-show="selectedSortName === 'PLAY_ASC'">播放时间升序</span>
					</div>
					<SvgIcon icon="downArrow"/>
				</div>
			</el-popover>
		</div>
		<!-- endregion -->

		<!-- 搜索结果 -->
		<div class="suggestion" v-show="suggestionFlag" v-loading="loading">
			<div class="item" v-for="anime in suggestionSortList" :key="anime.id">
				<div class="img">
					<img v-lazy="anime.cover" alt="">
					<div class="mask" @click="addAnimeHandle(anime)">
						<div class="box">
							<SvgIcon icon="boldAdd" size="25" color="#FFF"/>
						</div>
					</div>
				</div>
				<div class="info">
					<h3>{{ anime.name }}</h3>
					<div>动画种类：{{ anime.kind }}</div>
					<div>首播时间：{{ anime.firstPlayDate }}</div>
					<div>播放状态：{{ anime.playStatus }}</div>
					<div>原作：{{ anime.original }}</div>
					<div>剧情类型：{{ anime.storyType }}</div>
					<div>制作公司：{{ anime.company }}</div>
					<el-tooltip
							effect="dark"
							:content="anime.description"
							placement="top"
							:visible-arrow="false"
							:open-delay="300"
					>
						<div class="intro">简介：{{ anime.description }}</div>
					</el-tooltip>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import _ from "lodash";
import {reqAddAnime, reqSearchAnimeForCrawl} from "@/api";

export default {
	name: 'AddAnime',
	data() {
		return {
			//搜索关键词
			keyword: '',

			//原始搜索结果列表
			suggestionList: [],

			//排序结果列表
			suggestionSortList: [],

			//搜索结果框显示标志
			suggestionFlag: false,

			//加载标志
			loading: false,

			//排序方式
			selectedSortName: 'DEFAULT',

			//popover展示标志
			sortPopoverFlag: false
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
			let result = await reqSearchAnimeForCrawl(this.keyword);
			this.suggestionList = result.data || [];
			this.suggestionSortList = [...this.suggestionList];

			//排序
			switch (this.selectedSortName) {
				case 'PLAY_DESC':
					this.suggestionSortList.sort((a1, a2) => a2.firstPlayDate > a1.firstPlayDate ? 1 : -1);
					break;
				case 'PLAY_ASC':
					this.suggestionSortList.sort((a1, a2) => a1.firstPlayDate > a2.firstPlayDate ? 1 : -1);
					break;
				default:
					this.suggestionSortList = [...this.suggestionList];
					break;
			}

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
				this.$message.error(result.msg);
				return;
			}

			this.$message.success(result.msg);

			//从搜索结果中删除添加的动漫
			this.suggestionList.splice(this.suggestionList.findIndex(item => item.id === anime.id), 1)
			this.suggestionSortList.splice(this.suggestionSortList.findIndex(item => item.id === anime.id), 1)

			//如果添加的动漫是搜索结果框中最后一个，关闭搜索框
			if (this.suggestionList.length === 0) {
				this.suggestionFlag = false;
			}
		},

		//输入框获取焦点自动全选
		handleFocus(e) {
			e.currentTarget.select();
		},

		//打开popover
		openSortPopover() {
			//打开全局遮罩
			this.maskFlag = true;

			//添加激活样式
			this.$refs.sortBtn.classList.add('popover-active');
		},

		//关闭popover
		closeSortPopover() {
			this.maskFlag = false;
			this.$refs.sortBtn.classList.remove('popover-active');
		},

		changeSort(sort) {
			if (this.selectedSortName === sort) {
				return;
			}

			//修改内容标志
			this.selectedSortName = sort;

			//排序
			if (this.suggestionList.length !== 0) {
				switch (this.selectedSortName) {
					case 'PLAY_DESC':
						this.suggestionSortList.sort((a1, a2) => a2.firstPlayDate > a1.firstPlayDate ? 1 : -1);
						break;
					case 'PLAY_ASC':
						this.suggestionSortList.sort((a1, a2) => a1.firstPlayDate > a2.firstPlayDate ? 1 : -1);
						break;
					default:
						this.suggestionSortList = [...this.suggestionList];
						break;
				}
			}

			//关闭popover
			this.sortPopoverFlag = false;
		}
	}
}
</script>

<style scoped lang="scss">
.add-anime {
	/* 输入框 */
	.form {
		position: relative;
		margin-top: 1rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			padding: 8px;
		}

		svg {
			position: absolute;
			top: 50%;
			left: 1.8rem;
			transform: translateY(-50%);
		}

		/* 输入框 */
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
	}

	/* 排序 */
	.sort {
		margin-top: .6rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 10px;
		display: flex;
		justify-content: center;
		box-sizing: border-box;

		@media screen and (max-width: 768px) {
			padding: 8px;
		}

		.btn {
			display: flex;
			align-items: center;
			font-size: 1.1rem;
			border-radius: 5px;
			cursor: pointer;
			transition: background-color .3s;
			padding: 10px 15px;
			box-sizing: border-box;

			@media screen and (max-width: 768px) {
				padding: 10px;
			}

			&:hover {
				background-color: #f7f3f2;
			}

			span {
				display: block;
				width: 120px;
				text-align: center;
				margin: 0 10px;

				@media screen and (max-width: 768px) {
					width: 94px;
				}
			}
		}
	}

	/* 搜索结果 */
	.suggestion {
		width: 100%;
		min-height: 280px;
		background-color: #FFFFFF;
		margin-top: .6rem;
		border-radius: 10px;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
		position: relative;
		overflow: hidden;

		@media screen and (max-width: 768px) {
			min-height: 230px;
		}

		.item {
			width: 100%;
			display: flex;
			justify-content: start;
			align-items: center;
			padding: 10px;
			border-bottom: 1px solid rgba(0, 0, 0, .1);
			transition: all 0.5s ease;
			box-sizing: border-box;

			@media screen and (max-width: 768px) {
				padding: 10px 0;
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
				width: 170px;
				height: 236px;
				overflow: hidden;
				position: relative;
				cursor: pointer;
				border-radius: 10px;
				margin-left: 5px;

				@media screen and (max-width: 768px) {
					width: 122px;
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
				flex: 1;
				padding: 0 15px;

				@media screen and (max-width: 768px) {
					padding: 0 10px;
				}

				div {
					margin-top: 8px;
				}

				.intro {
					word-break: break-all;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
}
</style>