<template>
	<div class="addAnime">
		<!-- region 模块分类名称 -->
		<div class="typeTitle">
			<svg t="1741333190936" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15383">
				<path d="M543.978319 543.978319l352.427678 0c17.665335 0 31.975249-14.312984 31.975249-31.978319 0-17.665335-14.308891-31.978319-31.975249-31.978319L543.978319 480.021681l0-352.426655c0-17.665335-14.312984-31.975249-31.978319-31.975249-17.665335 0-31.978319 14.308891-31.978319 31.975249l0 352.426655-352.426655 0c-17.665335 0-31.975249 14.310937-31.975249 31.976272 0 8.833179 3.577478 16.829294 9.363252 22.615067 5.785773 5.785773 13.778818 9.365298 22.611997 9.365298l352.426655 0 0 352.426655c0 8.833179 3.578502 16.826224 9.364275 22.611997s13.781888 9.363252 22.615067 9.363252c17.665335 0 31.977295-14.308891 31.977295-31.975249L543.978319 543.978319z" p-id="15384"></path>
			</svg>
			<div>添加动漫</div>
		</div>
		<!-- endregion -->

		<!-- region 输入框 -->
		<div class="form">
			<svg width="20px" height="20px" viewBox="0 0 24 24" focusable="false">
				<path d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"/>
			</svg>
			<input type="text" placeholder="请输入关键词(搜索请按回车键)" v-model="keyword" @keyup.enter="searchHandle" @focus="handleFocus">
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
					popper-class="sortPopover"
					v-model="sortPopoverFlag"
			>
				<ul>
					<li @click="changeSort('DEFAULT')" :class="{popoverLiActive:selectedSortName === 'DEFAULT'}">
						<svg t="1741356737068" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10826">
							<path d="M853.333333 170.666667v512h128l-170.666666 213.333333-170.666667-213.333333h128V170.666667h85.333333z m-341.333333 597.333333v85.333333H128v-85.333333h384z m85.333333-298.666667v85.333334H128v-85.333334h469.333333z m0-298.666666v85.333333H128V170.666667h469.333333z" p-id="10827"></path>
						</svg>
						<div>默认排序</div>
					</li>
					<li @click="changeSort('PLAY_DESC')" :class="{popoverLiActive:selectedSortName === 'PLAY_DESC'}">
						<svg t="1741356737068" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10826">
							<path d="M853.333333 170.666667v512h128l-170.666666 213.333333-170.666667-213.333333h128V170.666667h85.333333z m-341.333333 597.333333v85.333333H128v-85.333333h384z m85.333333-298.666667v85.333334H128v-85.333334h469.333333z m0-298.666666v85.333333H128V170.666667h469.333333z" p-id="10827"></path>
						</svg>
						<div>播放时间降序</div>
					</li>
					<li @click="changeSort('PLAY_ASC')" :class="{popoverLiActive:selectedSortName === 'PLAY_ASC'}">
						<svg t="1741356803925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11970">
							<path d="M810.666667 128l170.666666 213.333333h-128v512h-85.333333V341.333333h-128l170.666667-213.333333z m-213.333334 640v85.333333H128v-85.333333h469.333333z m0-298.666667v85.333334H128v-85.333334h469.333333z m-85.333333-298.666666v85.333333H128V170.666667h384z" p-id="11971"></path>
						</svg>
						<div>播放时间升序</div>
					</li>
				</ul>
				<div class="btn" slot="reference" ref="sortBtn">
					<svg t="1741355886874" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7629">
						<path d="M499.712645 782.909297l-76.488784 66.198125V460.775809a47.971881 47.971881 0 0 0-17.355889-36.247697A64.201429 64.201429 0 0 0 364.039768 409.578497c-15.717575 0-30.718387 5.375718-41.879401 14.949615A47.971881 47.971881 0 0 0 304.855675 460.775809v388.331613l-76.539982-66.198125a64.406219 64.406219 0 0 0-41.623414-14.335247 64.099035 64.099035 0 0 0-41.316231 15.000812 48.023079 48.023079 0 0 0-17.355889 35.735724 47.767092 47.767092 0 0 0 16.639126 35.991711l177.552279 153.591936c5.478112 4.76135 12.031368 8.549951 19.198992 11.161014a67.170874 67.170874 0 0 0 45.360819 0c7.167624-2.559866 13.72088-6.399664 19.250189-11.161014l177.552278-153.591936a47.767092 47.767092 0 0 0 16.58793-35.991711 48.023079 48.023079 0 0 0-17.304692-35.735724 64.150232 64.150232 0 0 0-41.367428-15.000812 64.406219 64.406219 0 0 0-41.623415 14.335247h-0.102395zM879.340715 168.592749l-177.552279-153.591937a59.952053 59.952053 0 0 0-19.301387-11.109816 67.785241 67.785241 0 0 0-45.207226 0 59.900855 59.900855 0 0 0-19.301387 11.109816l-177.552278 153.591937a47.767092 47.767092 0 0 0-16.58793 35.99171 48.023079 48.023079 0 0 0 17.304692 35.786922c11.007422 9.471503 25.854643 14.847221 41.367428 14.949615 15.512786 0.153592 30.462401-5.017337 41.623415-14.335248l76.642376-66.198124v388.331612c0 13.618485 6.246072 26.622602 17.355889 36.247697 11.058619 9.573897 26.110629 14.949615 41.828204 14.949615 15.717575 0 30.718387-5.375718 41.828204-14.949615a47.971881 47.971881 0 0 0 17.407086-36.247697V174.787624l76.488785 66.198124c11.161014 9.317911 26.110629 14.488839 41.623414 14.335248 15.512786-0.102395 30.360006-5.478112 41.316231-14.949615a48.023079 48.023079 0 0 0 17.355889-35.786922 47.767092 47.767092 0 0 0-16.639126-35.99171z" p-id="7630"></path>
					</svg>
					<div>
						<span v-show="selectedSortName === 'DEFAULT'">默认排序</span>
						<span v-show="selectedSortName === 'PLAY_DESC'">播放时间降序</span>
						<span v-show="selectedSortName === 'PLAY_ASC'">播放时间升序</span>
					</div>
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"></path>
					</svg>
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
							<svg width="25px" height="25px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<path d="M612.37248 411.62752V30.208h-200.74496v381.41952H30.208v200.74496h381.41952v381.41952h200.74496V612.37248h381.41952v-200.74496z"/>
							</svg>
						</div>
					</div>
				</div>
				<div class="info">
					<h3>{{anime.name}}</h3>
					<div>动画种类：{{anime.kind}}</div>
					<div>首播时间：{{anime.firstPlayDate}}</div>
					<div>播放状态：{{anime.playStatus}}</div>
					<div>原作：{{anime.original}}</div>
					<div>剧情类型：{{anime.storyType}}</div>
					<div>制作公司：{{anime.company}}</div>
					<el-tooltip effect="dark" :content="anime.description" placement="top" :visible-arrow="false" :open-delay="300">
						<div class="intro">简介：{{anime.description}}</div>
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
				return ;
			}

			this.$message.success(result.msg);

			//从搜索结果中删除添加的动漫
			this.suggestionList.splice(this.suggestionList.findIndex(item => item.id===anime.id), 1)

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
			this.$refs.sortBtn.classList.add('popoverActive');
		},

		//关闭popover
		closeSortPopover() {
			this.maskFlag = false;
			this.$refs.sortBtn.classList.remove('popoverActive');
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
.addAnime {
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

	/* 输入框 */
	.form {
		position: relative;
		margin-top: 1rem;
		background-color: #FFFFFF;
		box-shadow: 0 0 35px 0 rgba(154, 161, 171, .15);
		border-radius: 10px;
		padding: 15px;

		@media screen and (max-width: 768px) {
			padding: 10px;
		}

		svg {
			position: absolute;
			fill: #cac5c4;
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
		padding: 15px;
		display: flex;
		justify-content: center;

		@media screen and (max-width: 768px) {
			padding: 10px;
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
				background-color: #eae7ff;
			}

			svg {
				width: 18px;
				height: 18px;
				transition: all .3s;
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
							fill: #FFFFFF;
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